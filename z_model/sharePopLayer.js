import React from 'react';

import ReactNative from 'react-native';

import {width,height,heightRatio} from '../z_util/device';

import * as Animatable from 'react-native-animatable';

import {wordGray,wordBlack} from '../z_util/color';

import {send} from '../z_util/eventDispatcher';

import UText from './uText';

// import UImage from './uikit/uImage';

import Line from './line';

var {View, StyleSheet,TouchableOpacity,Image} = ReactNative;

var {Component} = React;

export default class sharePopLayer extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    render() {
        return (
            <TouchableOpacity onPress = {()=>{this.close()}} activeOpacity={1} style = {{position:'absolute',top:0,left:0,width:width,height:height}}>
                <Animatable.View ref="back" animation = 'fadeIn' duration = {450} style = {{position:'absolute',top:0,left:0,width:width,height:height,backgroundColor:'rgba(0,0,0,0.6)'}}>
                </Animatable.View>
                <Animatable.View animation = 'fadeInUp' duration = {450} ref = 'popLayer' style = {{width:width,height:150,backgroundColor:'white',position:'absolute',bottom:0}}>
                    <View style = {{width:width,height:100}}>
                        {/*微信好友 / 微信朋友圈*/}
                        <View style = {{width:width,height:100,flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{this['props'].shareCallback('WXF')}} style = {{width:width/2,height:100,alignItems:'center',justifyContent:'center'}}>
                                <Image source = {require('./img/wechat_friend.png')} style = {{width:40,height:40}}/>
                                <UText style = {{marginTop:4 * heightRatio,color:wordGray,fontSize:12,fontWeight:'300'}} color = {wordGray} fontSize = {12}>微信好友</UText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this['props'].shareCallback('WX')}} style = {{width:width/2,height:100,alignItems:'center',justifyContent:'center'}}>
                                <Image source = {require('./img/wechat_friendship.png')} style = {{width:40,height:40}}/>
                                <UText style = {{marginTop:4 * heightRatio,color:wordGray,fontSize:12,fontWeight:'300'}} color = {wordGray} fontSize = {12}>微信朋友圈</UText>
                            </TouchableOpacity>
                        </View>
                        {/*QQ好友 / QQ空间*/}
                        <View style = {{width:width,height:100,flexDirection:'row',justifyContent:'flex-start'}}>
                            <TouchableOpacity onPress={()=>{this['props'].shareCallback('QQ')}} style = {{width:width/2,height:100,alignItems:'center',justifyContent:'center'}}>
                                <Image source = {require('./img/qq.png')} style = {{width:40,height:40}}/>
                                <UText style = {{marginTop:4 * heightRatio,color:wordGray,fontSize:12,fontWeight:'300'}} color = {wordGray} fontSize = {12}>QQ好友</UText>
                            </TouchableOpacity>
                            <View  style = {{width:width/2,height:100,alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>{this['props'].shareCallback('QQAREA')}} style = {{width:width/2,height:100,alignItems:'center',justifyContent:'center'}}>
                                    <Image source = {require('./img/qq_zone.png')} style = {{width:40,height:40}}/>
                                    <UText style = {{marginTop:4 * heightRatio,color:wordGray,fontSize:12,fontWeight:'300'}} color = {wordGray} fontSize = {12}>QQ空间</UText>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <Line />
                    <TouchableOpacity onPress = {()=>{this.close()}} style = {{width:width,height:50,alignItems:'center',justifyContent:'center'}}>
                        <UText color = {wordBlack} fontSize = {15} style = {{marginTop:-1}}>
                            取消
                        </UText>
                    </TouchableOpacity>
                </Animatable.View>
            </TouchableOpacity>
        )
    }

    close(){
        this.refs.back['fadeOut'](450);

        this.refs['popLayer']['fadeOutDown'](450).then(endState=>{
            if(endState.finished){
                send('showSharePop',{shareCallback:null})
            }
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({});