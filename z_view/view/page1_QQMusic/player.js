import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    Image,
    ImageBackground,
    ScrollView,
    Easing, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {push,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/Ionicons';

import {send} from "../../../z_util/eventDispatcher";
import {wordGray, backgroundGray, main, white} from "../../../z_util/color";
import {Normal,Tip} from "../../../z_util/a_player_util/TextComponent";

import Video from 'react-native-video';
import MusicList from './musicList';

export default class player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgRotate: new Animated.Value(0), //开始 初始化0
            showLyic: false, //初次显示旋转图片
            times:0, //模拟时间进度
            playing:true, //播放
            loadings:true, //
            paused:true, // false: 播放，true: 暂停

            duration:0.00, //进行时间
        };
        this.isGoing = true; //为真旋转
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 12000, //转速
            easing: Easing.linear, //Easing.inOut(Easing.linear) 线性函数，和Easing.linear 一样并且这个效果更好点
        });
        this.player= '';
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
    //动画-执行
    imgMoving = () => {
        if (this.isGoing) {
            this.state.imgRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            });
            // 监听值的变化范围（0-1）
            // this.state.imgRotate.addListener((state) => {
            //     deg = state.value;
            // });
        }
    };

    //播放 / 暂停
    playing(){
        // this.player.seek(0);
        this.setState({playing:!this.state.playing,loadings:!this.state.loadings});//  ,paused: !this.state.paused    音乐播放 paused
        //在显示歌词状态时 暂停动画 showLyic=true 是显示歌词
        if(!this.state.showLyic){
            this.animated();
        }
        //暂停发送监听（暂时）
        // setTimeout(()=>{
        //     if (this.state.playing){
        //         send('startVideo',{indexTF:true,index:1,url:this.props.url,paused:true});
        //     }else {
        //         send('startVideo',{indexTF:true,index:1,url:this.props.url,paused:false});
        //     }
        // },200);
    };
    //旋转图片 / 歌词
    showLyric(){
        this.setState({showLyic:!this.state.showLyic});
        //切换歌词之前通过播放按钮确认是否在播放，若为播放则 暂停动画
        if(this.state.playing){
            this.animated();
        }
    };
    //旋转 / 暂停旋转
    animated(){
        this.isGoing = !this.isGoing;
        if (this.isGoing) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: 12000,
                    easing: Easing.linear,
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1-oneTimeRotate) * 12000,
                    easing: Easing.linear,
                });
            });
        }
    }

    render() {
        /**
         * 为了播放页面的流畅，从父组件拿出几个必要的参数
         * 1.背景图片/胶片 共用一个
         * 2.歌曲名称 为title
         * 3.歌手名字
         **/
        let datas = this.props;

        // let mu_title = this.props.mu_title;
        // let mu_gName = this.props.mu_gName;

        //动画范围 * 360度旋转一周
        var interpolatedAnimation = this.state.imgRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        //开始暂停
        var st = this.state.playing?'ios-pause-outline':'ios-play-outline';
        return (
            <ImageBackground
                blurRadius={8}
                source={{uri:datas.cover}}
                style={{width:width,height:height,alignItems:'center'}}
            >
                {/*导航条*/}
                <Navbar backCallback={this.onBack} centerColor={'rgba(0,0,0,0)'} textColor={'#fff'} title ={datas.mu_title} />
                {/*分割线*/}
                <View style={{width:width-100*widthRatio,height:0.34811*widthRatio,backgroundColor:'rgba(220,220,220,0.5)',alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:width-110*widthRatio,height:0.34812*widthRatio,backgroundColor:'rgba(220,220,220,0.5)',alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:width-140*widthRatio,height:0.34813*widthRatio,backgroundColor:'rgba(220,220,220,0.7)',alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:width-200*widthRatio,height:0.7*widthRatio,backgroundColor:'rgba(220,220,220,0.8)'}}/>
                        </View>
                    </View>
                </View>
                {/*中部 - 旋转*/}
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>{this.showLyric()}}
                        style={styles.cdContainer}
                    >
                        {this.state.showLyic?(
                            //歌词
                            <View style={styles.cdContainer}>
                                <ScrollView
                                    style={{width:width}}
                                    contentContainerStyle={{alignItems: 'center',}}  //alignItems: 'center',paddingTop: '30%', paddingBottom: '30%'
                                    ref={lyricScroll => this.lyricScroll = lyricScroll}
                                >
                                    <Text style={{marginTop: 260*heightRatio,fontSize:12*widthRatio,color:'#fff'}}>这里是歌词，正在实现此功能呦</Text>
                                    {/*{*/}
                                        {/*lyricArr.map((v, i) => (*/}
                                            {/*<Normal color={v === currentLrc ?main?main:'#0882ff':'#fff'} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>*/}
                                        {/*))*/}
                                    {/*}*/}
                                </ScrollView>
                            </View>)
                            ://胶片
                            (<View style={styles.cdContainer}>
                                <View style={{position:'absolute',top:0,left:34*widthRatio,width:width,alignItems:'center',zIndex:1}}>
                                    <Image source={require('../../img/needle-ip6.png')} style={{width:100*widthRatio,height:140*widthRatio}}/>
                                </View>
                                <ImageBackground source={require('../../img/disc-ip6.png')} style={{width:width-40*widthRatio,height:width-40*widthRatio,justifyContent:'center',alignItems:'center'}}>
                                    <Animated.Image
                                        //source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}}
                                        source={{uri:datas.cover}}
                                        style={[{width:width-152*widthRatio,height:width-152*widthRatio,borderRadius:(width-152*widthRatio)/2},
                                            {transform: [
                                                {rotate: interpolatedAnimation},
                                            ]}
                                        ]}
                                    />
                                </ImageBackground>
                            </View>)
                        }
                    </TouchableOpacity>
                    <View style={{height:30*heightRatio}}/>
                    {/*底部条*/}
                    {/*伪进度条静态  --  有歌曲的时候在回填数据*/}
                    <View style={styles.sliderBtn}>
                        <Tip style={{width:35*widthRatio}} color={'#fff'}>{'00:00'}</Tip>
                        <Slider
                            maximumTrackTintColor={white}
                            minimumTrackTintColor={main?main:'#0882ff'}
                            thumbStyle={{
                                width: 20*widthRatio,height: 20*heightRatio,
                                backgroundColor: main?main:'#0882ff',
                                borderColor: white, borderWidth: 7*widthRatio, borderRadius: 10,
                            }}
                            trackStyle={{height:2*heightRatio}}
                            style={{width:width-100*widthRatio}}
                            value={0.1}  //this.state.times
                            //onValueChange={(value)=>{this.sliderChange(this.state.times)}}
                        />
                        <Tip style={{marginLeft:10*widthRatio,width:35*widthRatio}} color="#fff">{'00:00'}</Tip>
                    </View>
                    {/*底部按钮 //TODO */}
                    <View style={styles.footerBtn}>
                        {/*<TouchableOpacity*/}
                            {/*onPress={() =>{send('showBlackAlert', {show: true, title: "后续实现"});}}*/}
                        {/*>*/}
                            {/*<Icon name="ios-repeat-outline" size={30} color={white} />*/}
                        {/*</TouchableOpacity>*/}
                        <Icon name="ios-repeat-outline" size={30} color={white} />
                        <Icon name="ios-skip-backward-outline" size={30} color={white} />
                        {/*模拟 播放和暂停*/}
                        <TouchableOpacity onPress={() => this.playing()} style={styles.playBtn}>
                            <Icon name={st} size={30} color={white} />
                        </TouchableOpacity>
                        <Icon name="ios-skip-forward-outline" size={30} color={white} />
                        <Icon name="ios-list-outline" size={30} color={white} />
                    </View>
                    <Video
                        ref={video => this.player = video}
                        source={{uri: MusicList.list[2].url}}
                        volume={1.0}
                        paused={this.state.paused}
                        playInBackground={true}
                        onLoadStart={this.loadStart}
                        onLoad={data => this.setDuration(data)}
                        // onProgress={(data) => this.setTime(data)}
                        onEnd={(data) => this.playing()}
                        onError={(data) => this.videoError(data)}
                        onBuffer={this.onBuffer}
                        // onTimedMetadata={this.onTimedMetadata}
                    />
                </View>
            </ImageBackground>
        );
    }
    setDuration(duration) {
        this.setState({duration: duration.duration})
    }
    videoError(error) {
        // alert(JSON.stringify(error));
        send('showBlackAlert', {show:true,title:`播放失败: ${JSON.stringify(error)}`});
    }

    //进度条
    sliderChange(value){
        // const { currentPlay, dispatch } = this.props;
        // dispatch(setPlaySong({sliderProgress: value, ff: currentPlay.duration * value}));
        // alert(value);
        // setInterval(()=>{
        //     this.setState({times:value+0.01})
        // },1000)
    };
    componentDidMount() {
        //初始加载
        this.requestWeather(null);
        this.imgMoving();
    }
    requestWeather(){

    }
    componentWillUnmount() {
        //移除物理返回键监听
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
        }
    }
}

const styles = StyleSheet.create({
    cdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderBtn: {
        height: 40*heightRatio,
        paddingLeft: 10*widthRatio,
        paddingRight: 10*widthRatio,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    //进度条上的点
    thumb: {
        width: 20*widthRatio,
        height: 20*heightRatio,
        backgroundColor: main?main:'#0882ff',
        borderColor: white,
        borderWidth: 7*widthRatio,
        borderRadius: 10,
    },
    //底部按钮
    footerBtn: {
        height: 50*heightRatio,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    playBtn:{
        height:40*widthRatio,
        width:40*widthRatio,
        alignItems:'center',
        justifyContent:'center'
    }
});
