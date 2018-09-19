import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Easing,
    Image,
    Animated,
    ScrollView,
    ImageBackground, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../z_util/device";
import {push,pop} from "../../z_util/navigator";
import Navbar from "../../z_model/navbar";
import {send} from "../../z_util/eventDispatcher";
import {white} from "../../z_util/color";
import Icon from "react-native-vector-icons/Ionicons";
import {DatePicker} from 'react-native-pickers';


export default class calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //日期弹窗
            unit: ['年', '月', '日'], //日期格式，年 月 日
            startYear: 1900, //最小年限
            //弹窗属性
            val:'', //初始值
            data:'', //总数据
            jieqi1:'', //节气
            jieqi2:'', //节气
        }
        this.spinValue = new Animated.Value(0); //初始化动画
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

    //旋转
    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 4000,
            easing: Easing.linear
        }).start(() => this.spin())
    }
    renderRight(){
        return (
            <TouchableOpacity
                style={{width:30*widthRatio,height:30*heightRatio,justifyContent:'center',alignItems:'center'}}
                onPress={()=>this.DatePicker.show()}
            >
                <Icon name="ios-calendar" size={30} color={white} />
            </TouchableOpacity>
        )
    }
    render() {
        //映射 0-1的值 映射 成 0 - 360 度
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        return (
            <ImageBackground
                //blurRadius={8} //模糊度
                source={require('../../z_view/img/nongliBGImg.jpg')}
                style={{width:width,height:height}}
            >
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title ={'农历小册子'} renderRight={this.renderRight.bind(this)}/>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{height:60*heightRatio}}/>
                    {/*年月日 星期*/}
                    <Text style={{fontSize:16*widthRatio,color:'#000',fontWeight: '400'}}>
                        {this.state.data.year}年 {this.state.data.month}月{this.state.data.day}日
                        星期{
                                this.state.data.week==='Monday'?'一'
                                :this.state.data.week==='Tuesday'?'二'
                                :this.state.data.week==='Wednesday'?'三'
                                :this.state.data.week==='Thursday'?'四'
                                :this.state.data.week==='Friday'?'五'
                                :this.state.data.week==='Saturday'?'六'
                                :this.state.data.week==='Sunday'?'日':null
                            }
                    </Text>
                    {/*农历*/}
                    <Text style={{marginTop:15*heightRatio,fontSize:35*widthRatio,fontWeight:'800',color:'#000'}}>{this.state.data.cnmonth}月{this.state.data.cnday}</Text>
                    <View style={{marginTop:20*heightRatio,width:width,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                        <Animated.Image style={[styles.circle,{transform:[{rotate:spin}]}]} source={require('../../z_view/img/xiaohonghua.png')}/>
                        <Text style={{fontSize:20*widthRatio,color:'#9B8137',fontWeight:'300'}}> {this.state.data.cnyear}</Text>
                        <Animated.Image style={[styles.circle,{transform:[{rotate:spin}]}]} source={require('../../z_view/img/xiaohonghua.png')}/>
                    </View>
                    {/*中部*/}
                    <View style={{width:width,marginTop:40*heightRatio}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20*widthRatio,fontWeight:'400'}}>{this.state.data.animal}年</Text>
                            <View style={{width:40*widthRatio}}/>
                            <Text style={{fontSize:20*widthRatio,fontWeight:'400'}}>{this.state.data.cyclicalYear}年 {this.state.data.cyclicalMonth}月 {this.state.data.cyclicalDay}日</Text>
                        </View>
                        <View  style={{marginTop:10*heightRatio,width:width,justifyContent:'center',alignItems:'center'}}>
                            <Text>最大日月：{this.state.data.maxDayInMonth}</Text>
                        </View>
                    </View>
                    {/*底部*/}
                    <View style={{marginTop:40*heightRatio,borderColor:'#696969',borderWidth: 1,alignItems:'center',borderRadius: 5,width:width-20*widthRatio}}>
                        {/*宜*/}
                        <View style={{marginTop:5*heightRatio,width:width-20*widthRatio,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{marginLeft: 10*widthRatio,fontSize:20*widthRatio,fontWeight:'300',color:'#00CD00'}}>宜 </Text>
                            <View style={{width:620/2*widthRatio}}>
                                <Text style={{fontSize:12*widthRatio,color:'#000'}}>{this.state.data.suit}</Text>
                            </View>
                        </View>
                        <View style={{marginTop:5*heightRatio,width:width-50*widthRatio,height:0.5*heightRatio,backgroundColor:'#696969'}}/>
                        {/*禁忌*/}
                        <View style={{marginTop:5*heightRatio,width:width-20*widthRatio,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{marginLeft: 10*widthRatio,fontSize:20*widthRatio,fontWeight:'300',color:'red'}}>忌 </Text>
                            <Text style={{fontSize:12*widthRatio,color:'#000'}}>{this.state.data.taboo}</Text>
                        </View>
                        <View style={{height:5*heightRatio}}/>
                    </View>
                </View>
                <DatePicker
                    HH={false}
                    mm={false}
                    ss={false}
                    unit={this.state.unit}
                    startYear={this.state.startYear}
                    cancelTextColor={'red'}
                    confirmTextColor={'#0882ff'}
                    onPickerConfirm={(value) => {
                        this.choiceDate(value);
                    }}
                    onPickerCancel={() => {}} //取消事件
                    ref={ref => this.DatePicker = ref} />
            </ImageBackground>
        );
    }

    componentDidMount() {
        //获取当前时间戳(全部为 年月日 时分秒)
        var publishTime = new Date()/1000,
            date = new Date(publishTime*1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            today;
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        //格式完成当天时间
        today = Y + '-' + M + '-' + D;

        //初始加载
        this.requestDate(today);
        //初次渲染完，执行动画
        this.spin();
    }
    //时间选择 回调方法
    choiceDate(value){
        let year,month,day,YMD;
        //分割并去除分割带来的 "，" 号
        year=value[0].split("年").join("");
        month=value[1].split("月").join("");
        day=value[2].split("日").join("");
        YMD = year+'-'+month+'-'+day;
        send('loading',{show:true,title:'请稍等几秒钟哟'});
        setTimeout(() => {
            if (YMD){
                this.requestDate(YMD);
            }
            send('loading',{show:false});
        }, 3000);
    }
    //农历方法接口
    requestDate(vals){
        fetch('https://www.sojson.com/open/api/lunar/json.shtml?date='+ vals,'GET')
            .then(res=>{
                return res.json();
            }).then(res=> {
            if (res.message === "success"){
                this.setState({data:res.data});
                //节气判断
                this.setState({

                });
            }else {
                send('showBlackAlert', {show: true, title: "你输入的信息有误"});
            }
        }).catch((error)=> {
            send('showBlackAlert', {show: true, title: "请求出错啦！"});
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
    circle:{
        width:20*widthRatio,
        height:20*heightRatio
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
