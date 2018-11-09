import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
    Keyboard,
    ScrollView, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {push,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";
import {send} from "../../../z_util/eventDispatcher";
import {wordGray,backgroundGray,main} from "../../../z_util/color";

export default class weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //弹窗属性
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示

            city:'', //城市

            today_shidu:'', //今天湿度
            today_pm25:'', //今天pm2.5
            today_pm10:'', //今天pm10
            today_tianqi:'',//今天天气
            today_quality:'', //今天状态
            today_wendu:'', //今天温度 （平均）
            today_ganmao:'', //简述

            //昨天的天气  yesterday
            yesterday_data:'', //昨天时间
            forecast:[], //天气数据（今天开始）

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
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        //晴  多云 阴 //--雨*雪
        //'rgba(122,197,205,1)'; //多云
        //'rgba(67,205,128,1)'; //晴
        //'rgba(139,126,102,1)'; //阴
        // 'rgba(70,130,180,1)'; //雨 - 雪
        let bgcolor;
        if(this.state.today_tianqi === "晴"){
            bgcolor = 'rgba(67,205,128,1)';
        }else if (this.state.today_tianqi ==="多云"){
            bgcolor = 'rgba(122,197,205,1)';
        }else if (this.state.today_tianqi === "阴"){
            bgcolor = 'rgba(139,126,102,1)';
        }else {
            bgcolor = 'rgba(70,130,180,1)'; //雨
        }
        //弹窗背景色
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        return (
            <View style={{width:width,height:height,backgroundColor:bgcolor}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} centerColor={'rgba(0,0,0,0)'} textColor={'#fff'} title ={this.state.city?this.state.city:'未知城市'} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{height:150*heightRatio}}/>
                    {/*今天的天气*/}
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:60*widthRatio,fontWeight:'800',color:'#fff'}}>{this.state.today_wendu}</Text>
                            <Text style={{marginTop: 15*heightRatio,fontSize:12*widthRatio,color:'#fff'}}>°C</Text>
                        </View>
                        <View style={{marginLeft:5*widthRatio,justifyContent:'center'}}>
                            <Text style={{fontSize:15*widthRatio,fontWeight:'300',color:'#fff'}}>{this.state.today_tianqi}</Text>
                            <Text style={{fontSize:15*widthRatio,fontWeight:'300',color:'#fff'}}>{this.state.today_quality}</Text>
                        </View>
                    </View>
                    {/*pm2.5 / pm10*/}
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:14*widthRatio,color:'#fff'}}>PM2.5: {this.state.today_pm25}</Text>
                        <Text style={{marginLeft:10*widthRatio,fontSize:14*widthRatio,color:'#fff'}}>PM10: {this.state.today_pm10}</Text>
                    </View>
                    <Text style={{marginTop:5*heightRatio,fontSize:13*widthRatio,fontWeight:'300',color:'#fff'}}>温馨小贴士：{this.state.today_ganmao}</Text>
                    <View style={{height:110*heightRatio}}/>
                    {/*底部卡片*/}
                    <ScrollView
                        showsHorizontalScrollIndicator ={false} //关闭滚动条
                        horizontal={true}
                    >
                        <View style={{height:200*heightRatio,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            {this.state.forecast.map((item,index) =>{
                                return(
                                    <View style={{borderRightColor:"#fff",borderRightWidth:1,height:200*heightRatio,width:width/3,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14*widthRatio,color:'#fff'}}>{item.date}</Text>
                                        {/*天氣*/}
                                        <Text style={{marginTop:5*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>{item.type}</Text>
                                        <Text style={{marginTop:5*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>{item.high}</Text>
                                        <Text style={{marginTop:5*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>{item.low}</Text>
                                        {/*风*/}
                                        <View style={{marginTop:5*heightRatio,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{marginRight:10*widthRatio,fontSize:14*widthRatio,color:'#fff'}}>{item.fx}</Text>
                                            <Text style={{fontSize:14*widthRatio,color:'#fff'}}>{item.fl}</Text>
                                        </View>
                                        {/*时间范围*/}
                                        <Text style={{marginTop:5*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>{item.sunrise} ~ {item.sunset}</Text>
                                        {/*空气指数*/}
                                        <Text style={{marginTop:5*heightRatio,fontSize:14*widthRatio,color:'#fff'}}>空气质量：{item.aqi}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                {/*悬浮搜索按钮*/}
                <TouchableOpacity
                    onPress={() =>{this.setModalVisible(true)}}
                    activeOpacity={0.6}
                    style={{backgroundColor:'#FF69B4',borderRadius:20,position:'absolute',right:20*widthRatio,top:400*heightRatio,width:40*widthRatio,height:40*heightRatio,justifyContent:'center',alignItems:'center'}}
                >
                    <Text style={{fontSize:16*widthRatio,fontWeight:'400',color:'#fff'}}>查</Text>
                </TouchableOpacity>
                {/*搜索弹窗*/}
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={""}
                    //style={{height:20*heightRatio}}
                >
                    <TouchableOpacity activeOpacity={1} onPress={()=>{this.setModalVisible(false);this.setState({nameTextmarginTop:0})}}>
                        <View style={[modalBackgroundStyle,{width:width,height:height,alignItems:"center",justifyContent:"center"}]}>
                            <View style={{backgroundColor:"white",width:width-100*widthRatio,marginBottom:this.state.nameTextmarginTop,height:135*heightRatio,borderRadius:5}}>
                                <View>
                                    <TextInput
                                        //value = {this.state.city}
                                        onChangeText = {(text)=>{this.setState({city:text})}}
                                        underlineColorAndroid='transparent'
                                        maxLength = {40}
                                        //失去焦点 位置恢复
                                        onBlur={()=>this.setState({nameTextmarginTop:0})}
                                        //获取焦点 位置改变
                                        onFocus={()=>this.setState({nameTextmarginTop:135*heightRatio})}
                                        placeholder = '请输入城市名称'
                                        style = {{width:width-150*widthRatio,borderRadius:5,paddingLeft:10*widthRatio,borderWidth:1,marginTop:20*heightRatio,height:40*heightRatio,borderColor:"rgb(25,167,255)",marginLeft:25*widthRatio}}/>
                                </View>
                                <TouchableOpacity onPress={()=>{this.requestWeather(this.state.city);this.setState({nameTextmarginTop:0})}}>
                                    <View style={{borderRadius:5,marginLeft:25*widthRatio,marginTop:10*heightRatio,height:40*heightRatio,backgroundColor:"rgb(25,167,255)",width:width-150*widthRatio,alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{color:"white",fontSize:15*widthRatio}}>确定</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
    componentDidMount() {
        //初始加载
        this.requestWeather(null);
    }
    requestWeather(citys){
        //隐藏弹窗
        this.setModalVisible(false)
        //默认上海，后续再增加地图
        let city = citys?citys:'上海';
        fetch('https://www.sojson.com/open/api/weather/json.shtml?city='+city,'GET')
            .then(res=>{
                return res.json();
            }).then(res=> {
            //alert(JSON.stringify(res))
            if (res.data){
                if (res.status === 200) {
                    this.setState({
                        city:res.city, //城市
                        today_shidu:res.data.shidu,
                        today_pm25:res.data.pm25,
                        today_pm10:res.data.pm10,
                        today_quality:res.data.quality,
                        today_wendu:res.data.wendu,
                        today_ganmao:res.data.ganmao,
                        today_tianqi:res.data.forecast[0].type,

                        yesterday_data:res.data.yesterday,
                        forecast:res.data.forecast
                    });
                }else if (res.status === 304){
                    this.setState({
                        city:"",today_shidu:"", today_pm25:"", today_pm10:"",
                        today_quality:"", today_wendu:"", yesterday_data:"",
                        forecast:[],

                        message:'请10秒后重试呦'
                    })
                }else {
                    send('showBlackAlert', {show: true, title: "出错了，请重试"});
                }
            }
        }).catch(error=> {
            send('showBlackAlert', {show: true, title: "请求出错喽，可能QQ号不存在呦！"});
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
