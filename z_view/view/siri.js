import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Keyboard,
    ScrollView
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../z_util/device";
import {push,pop} from "../../z_util/navigator";
import Navbar from "../../z_model/navbar";
import {send} from "../../z_util/eventDispatcher";
import {wordGray,backgroundGray,main} from "../../z_util/color";
import Player from "./player";

export default class siri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //弹窗属性
            val:'', //初始值
            siri_speak:'', //

        }
    }
    componentWillMount () {

    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='position' >
                <View style={{width:width,height:height,backgroundColor:global.colors}}>
                    {/*导航条*/}
                    <Navbar backCallback={()=>{pop()}} centerColor={'rgba(0,0,0,0)'} textColor={'#fff'} title ={'偶是盗版 Siri'} />
                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                        <View style={{width:width-20*widthRatio,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize: 20*widthRatio,color:'#000',fontWeight: '300'}}>{this.state.siri_speak}</Text>
                        </View>
                        <View style={{height:100*heightRatio}}/>
                    </View>
                    {/*底部播放条*/}
                    <View style={{flex:1,position:'absolute',top:height-60*heightRatio,justifyContent:'center',alignItems: 'center'}}>
                        <View style={{flexDirection:'row',backgroundColor: 'rgba(224,255,255,0.9)',width:width, height: 60*heightRatio,justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput
                                style={{height:40*heightRatio,width:260*widthRatio,fontSize:15*widthRatio}}
                                value = {this.state.val}
                                onChangeText = {(text)=>{this.setState({val:text})}}
                                underlineColorAndroid='transparent'
                                maxLength = {40}
                                //失去焦点
                                onBlur={()=>{ }}
                                //获取焦点
                                onFocus={()=>{ }}
                                placeholder = '请输入想对Siri说的话'
                            />

                            <TouchableOpacity
                                style={{borderRadius: 20,width:80*widthRatio,height:40*heightRatio,justifyContent:'center',alignItems: 'center',backgroundColor:global.colors}}
                                onPress={() =>{
                                    this.requestWeather(this.state.siri_speak);
                                }}>
                                <Text>biu 发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
    componentDidMount() {
        //初始加载
        this.requestWeather('你好！');
    }
    requestWeather(vals){
        if(!vals){
            send('showBlackAlert', {show: true, title: '请输入想说的话'});
        }
        send('loading',{show:true,title:'Siri思考中'});
        setTimeout(() => {
            fetch('http://api.qingyunke.com/api.php?key=free&appid=0&msg='+ vals,'GET')
                .then(res=>{
                    return res.json();
                }).then(res=> {
                //alert(JSON.stringify(res))
                if (res.result === 0){
                    // alert(JSON.stringify(res.content))
                    this.setState({siri_speak:res.content});
                }else {
                    this.setState({siri_speak:'Siri不想回答你，该接口以和谐，没办法啦'});
                }
            }).catch((error)=> {
                send('showBlackAlert', {show: true, title: "Siri停机了"});
                this.setState({siri_speak:'Siri不想回答你，接口不稳定，没办法啦'});
            })
            send('loading',{show:false});
        }, 2000);
    }
}

const styles = StyleSheet.create({
    inputs:{
        marginTop:5*heightRatio,
        fontSize:14*widthRatio,
        width:200*widthRatio,
        height:40*heightRatio,
    },
    input_view:{
        width:240*widthRatio,
        height:40*heightRatio,
        borderRadius: 20,
        borderColor:'blue',
        borderWidth:1*widthRatio,
        justifyContent:'center',
        alignItems:'center',
        marginRight: 20*widthRatio
    },
});
