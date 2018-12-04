import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView, Platform, BackAndroid,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {height, heightRatio, topHeight, width, widthRatio} from "../../z_util/device";
import {pop, push} from "../../z_util/navigator";
import Navbar from "../../z_model/navbar";
import {backgroundGray, main} from "../../z_util/color";

import QQMusic from "./page1_QQMusic/qqMusic";
import Weather from "./page2_Weather/weather";
import Siri from "./page3_FalseSiri/siri";
import Calendar from "./page4_Calendar/calendar";
import IconAggregate from "./page5_Icons/iconAggregate";
import BaiduMap from "./page6_BaiduMaps/baiduMap";
import {listen, send} from "../../z_util/eventDispatcher";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors:'',// 背景色（风格）
            animationType: 'none', //none slide fade
            transparent: true, //是否透明显示s
            alertShow:true,
        }
    }
    componentWillMount () { //渲染方法之前执行，处理渲染使用，一般不做数据处理
        //接收监听state 重新渲染 首页
        listen('bGcolor',(e)=>{
            this.setState({colors:e.colors});
        })
        //延迟获取主题颜色（解决异步问题）,目的在0.5面之后更新一次state触发重新渲染一次
        setTimeout(()=>{
            this.setState({colors:global.colors});

        },300);
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress',this.onBack);
        }
    }

    onBack = () =>{
        //抽屉是否打开/存在 存在/不存在都关闭抽屉
        this.props.navigation.closeDrawer()?this.props.navigation.closeDrawer():this.props.navigation.closeDrawer();

        //进行时间处理
        let time = new Date();
        this.lastBackPressed = this.thisBackPressed;
        this.thisBackPressed = time.getTime();
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= this.thisBackPressed) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        send('showBlackAlert', {show:true,title:"再按一次退出应用"});
        return true;
    }

    renderLeft(){
        return (
            <TouchableOpacity
                onPress={() =>{this.props.navigation.openDrawer()}}
                style={{width:30*widthRatio,height:30*heightRatio,alignItems:'center',justifyContent:'center'}}
            >
                <Image source={require('../img/menu.png')} resizeMode ={'stretch'} style={{width:22*widthRatio,height:30/42*(22*widthRatio)}}/>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={{width:width,height:height,backgroundColor:backgroundGray}}>
                {/*导航条*/}
                <View style={{backgroundColor:this.state.colors?this.state.colors:'#0882ff'}}>
                    <Navbar renderLeft={this.renderLeft.bind(this)} textColor={'#fff'} title ={'首页'} />
                </View>
                {/*背景色*/}
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    style={{flex: 1,backgroundColor:'#EAEAEA'}}
                >
                    {/*banner 恒果推荐*/}
                    <View style={{width:width,height:200*heightRatio}}>
                        <Swiper
                            //style={styles.wrapper}
                            //showsButtons={true}               //显示控制按钮
                            autoplay={true}                     //开启自动轮播
                            autoplayTimeout={2}                 //轮播间隔时间（切换时间）2秒
                            showsPagination={true}              //为false不显示下方圆点
                            paginationStyle={{bottom: 10}}
                            dot={<View style={{                 //未选中的圆点样式
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: 6*widthRatio,
                                height: 6*heightRatio,
                                borderRadius: 10,
                                marginLeft: 5*widthRatio,
                                marginRight: 5*widthRatio,
                                marginTop: 5,
                                marginBottom: 5,
                            }}/>}
                            activeDot={<View style={{           //选中的圆点样式
                                backgroundColor: this.state.colors?this.state.colors:'#0882ff',
                                width: 6*widthRatio,
                                height: 6*heightRatio,
                                borderRadius: 10,
                                marginLeft: 5*widthRatio,
                                marginRight: 5*widthRatio,
                                marginTop: 5,
                                marginBottom: 5,
                            }}/>}
                        >
                            <View style={styles.slide1}>
                                <Image style={{width:208/2*widthRatio,height:202/208*208/2*widthRatio}} source={require('../img/react_native_swiper.png')}/>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={{width:208/2*widthRatio,height:202/208*208/2*widthRatio}} source={require('../img/react_native_swiper.png')}/>
                            </View>
                            <View style={styles.slide3}>
                                <Image style={{width:208/2*widthRatio,height:202/208*208/2*widthRatio}} source={require('../img/react_native_swiper.png')}/>
                            </View>
                        </Swiper>
                    </View>

                    {/*中部按钮布局 - 自动换行*/}
                    <View style={{flexDirection:'row',flexWrap:'wrap',width:width}}>
                        {/*QQ空间音乐*/}
                        <TouchableOpacity
                            onPress={() =>{push('qqMusic',QQMusic)}} //QQMusic
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={styles.imgs} source={require('../img/index_panda.png')}/>
                                </View>
                                <Text style={styles.texts}>QQ空间音乐</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                        {/*看看天气*/}
                        <TouchableOpacity
                            onPress={() =>{push('weather',Weather)}}
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={{width:205/3.5*widthRatio,height:298/205*(205/3.5*widthRatio)}} source={require('../img/index_Monkey.png')}/>
                                </View>
                                <Text style={styles.texts}>看看天气</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                        {/*冒牌Siri*/}
                        <TouchableOpacity
                            onPress={() =>{push('siri',Siri)}}
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={{width:204/3.5*widthRatio,height:321/204*(204/3.5*widthRatio)}} source={require('../img/index_girl.png')}/>
                                </View>
                                <Text style={styles.texts}>冒牌Siri</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                        {/*查查农历*/}
                        <TouchableOpacity
                            onPress={() =>{push('calendar',Calendar)}}
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={{width:210/3.5*widthRatio,height:275/210*(210/3.5*widthRatio)}} source={require('../img/index_maomi.png')}/>
                                </View>
                                <Text style={styles.texts}>查查农历</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Icon*/}
                        <TouchableOpacity
                            onPress={() =>{push('iconAggregate',IconAggregate)}}
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={{width:211/3.5*widthRatio,height:293/211*(211/3.5*widthRatio)}} source={require('../img/index_Tortoise.png')}/>
                                </View>
                                <Text style={styles.texts}>Icons</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                        {/*尽情期待 3*/}
                        <TouchableOpacity
                            onPress={() =>{push('baiduMap',BaiduMap)}}
                            activeOpacity={0.6}
                            style={styles.view1}
                        >
                            <View style={styles.sonView}>
                                <View style={styles.imgSonView}>
                                    <Image style={{width:235/3.5*widthRatio,height:325/235*(235/3.5*widthRatio)}} source={require('../img/index_huimaomi.png')}/>
                                </View>
                                <Text style={styles.texts}>百度地图</Text>
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.CTR}>点击:999</Text>
                                <Text style={styles.likes}>喜欢:999</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/*首次启动没有颜色获取，但是会在启动页加载时闪一下此弹窗，不好用*/}
                {/*{!this.state.colors?*/}
                    {/*<Modal*/}
                        {/*animationType={this.state.animationType}*/}
                        {/*transparent={this.state.transparent}*/}
                        {/*visible={this.state.alertShow}*/}
                        {/*onRequestClose={""}*/}
                        {/*style={{flex:1}}*/}
                    {/*>*/}
                        {/*<StylesBG />*/}
                    {/*</Modal>:null*/}
                {/*}*/}
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
    contentContainer:{

    },
    swipers:{
        height:300*heightRatio
    },
    slide1: {
        width:width,
        height:200*heightRatio,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    view1:{
        borderRadius:5,
        borderWidth:2*widthRatio,
        borderColor:'#FEFEFE',
        backgroundColor:'#fff',
        marginTop:35/3.5*heightRatio,
        marginLeft:35/3.5*widthRatio,
        justifyContent:'center',
        alignItems:'center',
        height:615/3.5*heightRatio,
        width:389/3.5*widthRatio
    },
    sonView:{
        height:515/3.5*heightRatio,
        width:385/3.5*widthRatio,
        justifyContent:'center',
        alignItems:'center'
    },
    imgSonView:{
        height:340/3.5*heightRatio,
        width:385/3.5*widthRatio,
        justifyContent:'center',
        alignItems:'center'
    },
    imgs:{
        width:232/3.5*widthRatio,
        height:268/232*(232/3.5*widthRatio)
    },
    texts:{
        marginTop:20*heightRatio,
        fontSize:15*widthRatio,
        color:'#000',
        fontWeight:'400'
    },
    view2:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:(615-515)/3.5*heightRatio,
        width:385/3.5*widthRatio
    },
    CTR:{
        marginLeft:10*widthRatio,
        fontSize:10*widthRatio,
        color:'#9B8137'
    },
    likes:{
        marginRight:10*widthRatio,
        fontSize:10*widthRatio,
        color:'#9B8137'
    },
});
