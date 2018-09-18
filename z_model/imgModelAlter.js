import React from 'react';

import ReactNative from 'react-native';
import { Linking } from 'react-native';

import {widthRatio, width, height, heightRatio} from '../z_util/device';
import {send} from "../z_util/eventDispatcher";

var {View, StyleSheet, Text,Modal,TouchableOpacity,Image} = ReactNative;

var {Component} = React;

export default class gzhModalAlter extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this['state'] = {
            animationType: 'none', //none slide fade
            transparent: true, //是否透明显示s
            alertShow:true,
        }
    }

    _setClipboardContent(){
        this._close();
        // 2、跳转代码
        Linking.canOpenURL('weixin://').then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL('weixin://');
            } else {
                this. _close();
                send('showBlackAlert',{show:true,title:'请先安装微信!'});
            }
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
    }
    _close(){
        this.setState({alertShow:false})
        global.alertShow=false
    }
    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={global.alertShow}
                onRequestClose={""}
                style={{height:height}}
            >
                <TouchableOpacity onPress={()=>{this._close()}}>
                    <View style={[modalBackgroundStyle,{width:width,height:height,alignItems:"center",justifyContent:"center"}]}>
                        {/*关注公众号*/}
                        <TouchableOpacity
                            onPress={()=>{this._setClipboardContent()}}
                            activeOpacity={1}
                            style={{justifyContent:'center',alignItems:'center',position:"absolute",top:height/4-(1287/843*(width-100*widthRatio))/5,width:width-100*widthRatio,height:1287/843*(width-100*widthRatio)}}
                        >
                            <Text style={{fontSize:20*widthRatio,color:'blue'}}>我是弹窗</Text>
                        </TouchableOpacity>
                        {/*关闭*/}
                        <TouchableOpacity
                            onPress={()=>{this._close()}}
                            style={{position:"absolute",top:height/4-(1287/843*(width-100*widthRatio))/5+1287/843*(width-100*widthRatio)+ 30*heightRatio,width:width-346*widthRatio,height:width-346*widthRatio}}
                        >
                            <Image source ={require('../z_view/img/gzhclose.png')}  style={{width:width-346*widthRatio,height:width-346*widthRatio}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    componentDidMount() {

    }


}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.8)',
        width : 140 * widthRatio,
        padding : 4 *widthRatio,
    },
    btnView:{
        width:190*widthRatio,
        marginTop:10*heightRatio,
        height:35*heightRatio,
        borderRadius:5,backgroundColor:"rgb(25,167,255)",
        alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        color:"white",
        fontSize:15
    },
    contentContainer:{

    }

});