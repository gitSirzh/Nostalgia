import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    Alert,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {checkLogin,userInfo,logout} from '../../../z_util/userInfoHelper';
import {heightRatio, width, widthRatio} from '../../../z_util/device';
import {listen, send} from "../../../z_util/eventDispatcher";
import {pop, push} from "../../../z_util/navigator";
import {main} from "../../../z_util/color";

import Profile from "./profile";
import StylesBG from "./stylesBG";

var bgc;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors:'',// 背景色（风格）
        }
    }
    componentWillMount() {
        AsyncStorage.getItem("bgColor",function(errs,result){
            if (!errs) {
                bgc = JSON.parse(result);
            }
        });
        //接收监听state 重新渲染 首页
        listen('bGcolor',(e)=>{
            this.setState({colors:e.colors});
        })
        //延迟获取主题颜色（解决异步问题）
        setTimeout(()=>{
            this.setState({colors:global.colors});
        },1000);
    }

    render() {
        return (
            <ScrollView>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ImageBackground source={require('../../img/userHeadBG.jpg')} style={{justifyContent:'center',alignItems:'center',width:200*widthRatio,height:810/1080*200*widthRatio}}>
                        <TouchableOpacity
                            onPress={() =>{
                                send('showBlackAlert', {show: true, title: "恒果正在努力找好点的服务器,后续增加登录注册功能"});
                            }}
                            activeOpacity={0.6}
                            style={{justifyContent:'center',alignItems:'center'}}
                        >
                            <Image style={{width:50*widthRatio,height:50*widthRatio,borderRadius:25}} source={require('../../img/userHead.jpg')}/>
                            <Text style={{marginTop:8*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>恒果果</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    {/*阴影*/}
                    <Image source={require('../../img/yinying.jpg')} style={{width:200*widthRatio,height:38*1.5/1125*(200*widthRatio)}}/>
                    {/*菜单项*/}
                    <View style={{height:10*heightRatio}}/>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        {/*换背景皮肤*/}
                        <TouchableOpacity
                            onPress={() =>{push('stylesBG',StylesBG,{bgc:global.colors})}}
                            activeOpacity={0.6}
                            style={{backgroundColor:this.state.colors,height:45*heightRatio,width:200*widthRatio,justifyContent:'center'}}
                        >
                            <Text style={{marginLeft:20*widthRatio,fontSize:13*widthRatio,color:'#fff'}}>更换皮肤</Text>
                        </TouchableOpacity>
                        <View style={{height:5*heightRatio}}/>
                        {/*关于作者*/}
                        <TouchableOpacity
                            onPress={() =>{push('profile',Profile)}}
                            activeOpacity={0.6}
                            style={{backgroundColor:this.state.colors,height:45*heightRatio,width:200*widthRatio,justifyContent:'center'}}
                        >
                            <Text style={{marginLeft:20*widthRatio,fontSize:13*widthRatio,color:'#fff'}}>关于作者</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({});
