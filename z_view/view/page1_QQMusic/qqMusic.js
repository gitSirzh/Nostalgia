import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
    Keyboard, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {push,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";
import {send} from "../../../z_util/eventDispatcher";
import {wordGray,backgroundGray,main} from "../../../z_util/color";

import Player from "./player";

//伪造数据
import MusicList from "./musicList";

export default class qqMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist:[], //列表数据
            xmusicnum:'', //数据条数 （几首歌）
            curtime:'', //请求时间
            qqId:'', //qq号
            xsong_name:'', //歌曲名字
            xsinger_name:'', //歌手名字
            cover:'',  //背景图片
            url:'', //歌曲文件路径
        }
    }
    componentWillMount () {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress',this.onBack);
        }
    }
    onBack = () =>{
        pop();
        return true;
    }
    nextQQID(){
        Keyboard.dismiss();
        if(!this.state.qqId){
            send('showBlackAlert', {show: true, title: "请输入你的QQ号"});
        }
        this.requestQQ(this.state.qqId);
    }

    render() {
        let footTitle = this.state.playlist?'':'别扯了,到底了!';//恒果努力加载中...
        return (
            <View style={{width:width,height:height,backgroundColor:backgroundGray}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title ={'QQ空间收藏音乐'} />
                {/*阴影*/}
                <Image source={require('../../img/yinying.jpg')} style={{width:width,height:38/1125*width}}/>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {/*搜索框*/}
                    <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.input_view}>
                            <TextInput
                                value={this.state.qqId}
                                onChange={(event) => this.setState({qqId:event.nativeEvent.text})}//event.nativeEvent.text
                                underlineColorAndroid="transparent"
                                style={styles.inputs}
                                placeholderTextColor='#bababa'
                                placeholder={'请输入你的QQ号呦'}
                                maxLength={20}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() =>{this.nextQQID()}}
                            activeOpacity={0.6}
                            style={{borderRadius:20,width:80*widthRatio,height:40*heightRatio,backgroundColor:'blue',justifyContent: 'center',alignItems: 'center'}}
                        >
                            <Text style={{color:'#fff',fontSize: 15*widthRatio}}>搜 索</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:10*heightRatio}}/>
                    <FlatList
                        style={{width:width}}
                        data={this.state.playlist}
                        renderItem={({item,index}) => {
                            return(
                                <View style={{marginTop:10*heightRatio,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{width:40*widthRatio,height:50*heightRatio,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontWeight:'100',fontSize:16*widthRatio}}>{index+1}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>{
                                            send('startVideo',{indexTF:true,index:1,url:item.url,paused:true});
                                            this.setState({xsong_name:item.xsong_name,xsinger_name:item.xsinger_name,cover:item.cover,url:item.url});
                                        }}
                                        activeOpacity={0.6}
                                        style={{width:width-40*widthRatio}}
                                    >
                                        <View style={{width:width-40*widthRatio}}>
                                            <Text style={{fontWeight:'600',fontSize:15*widthRatio}}>{item.xsong_name}</Text>
                                            <Text style={{marginTop:5*heightRatio,fontSize:12*widthRatio}}>{item.xsinger_name}</Text>
                                            <View style={{marginTop:5*heightRatio,height:0.5*heightRatio,backgroundColor: '#c5c5c5'}}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        // onEndReached={()=>{
                        //     send('showBlackAlert', {show: true, title: "上拉了"});
                        // }}
                        // onEndReachedThreshold={0.3}
                        ListFooterComponent={()=>{
                            return(
                                <View style={{backgroundColor:'#c5c5c5',marginBottom: 170*heightRatio,marginTop:5*heightRatio,width:width,height:30*heightRatio,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:wordGray,fontSize:13*widthRatio,fontWeight:'300'}}>{footTitle}</Text>
                                </View>
                            )
                        }}

                    />
                </View>
                {/*底部播放条*/}
                <View style={{flex:1,position:'absolute',top:height-60*heightRatio,justifyContent:'center',alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{flexDirection:'row',backgroundColor: 'rgba(224,255,255,0.9)',width:width, height: 60*heightRatio,justifyContent: 'center', alignItems: 'center'}}
                        onPress={()=>{
                            if (this.state.xsong_name){
                                push('player',Player,{mu_title:this.state.xsong_name,mu_gName:this.state.xsinger_name,cover:this.state.cover,url: this.state.url});
                            } else {
                                send('showBlackAlert', {show: true, title: "你还未播放歌曲呦"});
                            }
                        }}
                        activeOpacity={1}
                    >
                        {/*歌曲图片*/}
                        <View style={{width:50*widthRatio,height:50*widthRatio}}>
                            {this.state.cover?
                                <Image source={{uri:this.state.cover}} style={{borderRadius:10,width:50*widthRatio,height:50*widthRatio}}/>
                                :
                                <Image source={require('../../img/music_hui.png')} style={{borderRadius:10,width:50*widthRatio,height:602/647*(50*widthRatio)}}/>
                            }

                        </View>
                        {/*歌曲名 - 歌手名*/}
                        <View style={{marginLeft: 20*widthRatio,width:width-150*widthRatio}}>
                            <Text style={{fontWeight:'600',fontSize:14*widthRatio}}>{this.state.xsong_name?this.state.xsong_name:'未选择播放歌曲'}</Text>
                            <Text style={{marginTop:5*heightRatio,fontSize:11*widthRatio}}>{this.state.xsinger_name?this.state.xsinger_name:'未知歌手'}</Text>
                        </View>
                        {/*播放 - 暂停*/}
                        <View style={{width:30*widthRatio,height:103/103*(30*widthRatio)}}>
                            <TouchableOpacity
                                style={{width:30*widthRatio,height:103/103*(30*widthRatio)}}
                                onPress={()=>{
                                    send('showBlackAlert', {show: true, title: "后续完成，播放功能"});
                                }}
                            >
                                <Image source={require('../../img/strat.png')} resizeMode ={'stretch'} style={{width:30*widthRatio,height:103/103*(30*widthRatio)}}/>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    componentDidMount() {
        // this.requestQQ(null);
        //回填伪造数据
        this.setState({playlist:MusicList.list});
    }
    //QQ搜索
    requestQQ(qqId){
        //请求QQ空间收藏的音乐
        let qqhao = qqId?qqId:'1067338206'; //不存在为默认王胖子的空间歌曲，因为他的歌曲多，嘻嘻
        fetch('https://www.sojson.com/api/qqmusic/'+qqhao,'GET')
            .then(res=>{
                return res.json();
            }).then(res=> {
            //alert(JSON.stringify(res.data))
            if (res.data){
                if (res.status === 200) {
                    //是否有一首歌 （接口问题，有一首歌时为对象没有数组）
                    if (res.data.xmusicnum === "1"){
                        this.setState({
                            playlist:[res.data.playlist.song], //列表数据
                            xmusicnum:res.data.xmusicnum,//数据条数 （几首歌）
                            curtime:res.data.curtime, //请求时间
                        });
                    }else {
                        this.setState({
                            playlist:res.data.playlist, //列表数据
                            xmusicnum:res.data.xmusicnum,//数据条数 （几首歌）
                            curtime:res.data.curtime, //请求时间
                        });
                    }
                }else {
                    send('showBlackAlert', {show: true, title: "好气呀！企鹅关闭数据啦"});
                }
            }
        }).catch(error=> {
            send('showBlackAlert', {show: true, title: "请求啦，可能QQ号不存在呦！"});
        })
    }
    componentWillUnmount() {
        //移除物理返回键监听
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
        }
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
