/**
 * 广播 -- 监听
 * Created by jszh on 2018/08/22.
 */

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import ReactNative from 'react-native';
var {NativeAppEventEmitter,NativeEventEmitter,Platform} = ReactNative;
export {listen,send,remove,nativeEventListen,removeNativeEvent}


var Events = {};
var NativeEvents = {};

//监听事件
function listen(eventName,handler){
    var event = RCTDeviceEventEmitter.addListener(eventName,handler);
    Events[eventName] = event;
}

//发送事件
function send(eventName,param){
    RCTDeviceEventEmitter.emit(eventName,param);
}

//移除事件
function remove(eventName){
    Events[eventName] && Events[eventName].remove();
    delete Events[eventName];
}

//本地事件
function nativeEventListen(eventName,handler,nativeModule){
    if(Platform.OS == 'ios'){
        const Emitter = new NativeEventEmitter(nativeModule);
        var event = Emitter.addListener(eventName,handler);
        NativeEvents[eventName] = event;
    }
    else{
        var event = NativeAppEventEmitter.addListener(eventName,handler);
        NativeEvents[eventName] = event;
    }
}

//移除本地事件
function removeNativeEvent(eventName){
    NativeEvents[eventName] && NativeEvents[eventName].remove();
    delete NativeEvents[eventName];
}