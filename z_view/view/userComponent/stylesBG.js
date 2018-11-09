import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage, Platform, BackAndroid,
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {popToRouteIndex,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";
import {backgroundGray, main} from "../../../z_util/color";
import {send,listen} from "../../../z_util/eventDispatcher";

export default class stylesBG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolor:'',// 背景色（风格）
        }
    }
    componentWillMount () {
        this.setState({bgcolor:this.props.bgc});
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress',this.onBack);
        }
    }
    onBack = () =>{
        pop();
        return true;
    }
    render() {
        return (
            <View style={{width:width,height:height,backgroundColor:backgroundGray}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title={'皮肤风格'} />
                {/*阴影*/}
                {/*<Image source={require('../img/yinying.jpg')} style={{width:width,height:38/1125*width}}/>*/}
                <ScrollView>
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 20*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        {/*第一排 暂未做循环，如果太多了就循环出来*/}
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#0882ff'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#0882ff',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#0882ff'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#000'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#000',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#000'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FF6A6A'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },200);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FF6A6A',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FF6A6A'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FF1493'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FF1493',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FF1493'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第二排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#9400D3'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#9400D3',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#9400D3'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#CDB38B'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#CDB38B',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#CDB38B'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#EE7600'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#EE7600',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#EE7600'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#EE4000'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#EE4000',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#EE4000'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第三排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#43CD80'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#43CD80',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#43CD80'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#6A5ACD'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#6A5ACD',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#6A5ACD'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#9ACD32'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#9ACD32',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#9ACD32'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#00CED1'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#00CED1',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#00CED1'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第四排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#006400'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#006400',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#006400'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#CDCD00'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#CDCD00',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#CDCD00'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#8B7500'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#8B7500',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#8B7500'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#8B658B'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#8B658B',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#8B658B'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第五排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FFC1C1'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FFC1C1',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FFC1C1'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FF3030'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FF3030',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FF3030'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FF00FF'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FF00FF',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FF00FF'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#C71585'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#C71585',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#C71585'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第六排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FFFF00'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FFFF00',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FFFF00'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#B22222'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#B22222',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#B22222'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FA8072'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FA8072',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FA8072'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#FFA500'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#FFA500',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#FFA500'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    {/*第七排*/}
                    <View style={{flexWrap:'wrap',flexDirection:"row",marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#8B8378'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#8B8378',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#8B8378'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#836FFF'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#836FFF',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#836FFF'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#3A5FCD'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },300);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#3A5FCD',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#3A5FCD'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                        <View style={{width:10*widthRatio}}/>
                        <TouchableOpacity
                            onPress={() =>{
                                this.setState({bgcolor:'#00008B'});
                                setTimeout(()=>{
                                    send('bGcolor', {colors:this.state.bgcolor});
                                },100);
                            }}
                            activeOpacity={0.6}
                            style={{backgroundColor:'#00008B',height:80*heightRatio,width:80*widthRatio,borderRadius:5}}
                        >
                            {this.state.bgcolor==='#00008B'?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20*heightRatio}}/>
                </ScrollView>
            </View>
        );
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        //移除物理返回键监听
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
        }
    }
}

const styles = StyleSheet.create({
    txtQAQ:{
        fontSize:12*widthRatio,
        fontWeight: '400'
    },
    txt:{
        fontSize:12*widthRatio,
    },
    imgDuiGou:{
        marginLeft:60*widthRatio,
        marginTop:55*heightRatio,
        width:34/2*widthRatio,
        height:34/2*widthRatio
    },
});
