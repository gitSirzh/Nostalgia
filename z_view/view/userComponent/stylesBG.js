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
import Bgcolor from "./bgcolor";

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
    };
    render() {

        return (
            <View style={{width:width,height:height,backgroundColor:backgroundGray}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title={'皮肤风格'} />
                <ScrollView>
                    <View style={{width:width,alignItems:'center'}}>
                        <View style={{width:width-20*widthRatio,flexWrap:'wrap',flexDirection:"row",alignItems:'center'}}>
                            {Bgcolor.list.map((data,index)=>{
                                return(
                                    <TouchableOpacity
                                        onPress={() =>{
                                            this.setState({bgcolor:data.color});
                                            setTimeout(()=>{
                                                send('bGcolor', {colors:this.state.bgcolor});
                                            },300);
                                        }}
                                        activeOpacity={0.6}
                                        style={{backgroundColor:data.color,marginTop:10*widthRatio,marginLeft: 5*widthRatio,marginRight: 3*widthRatio,height:80*widthRatio,width:80*widthRatio,borderRadius:5}}
                                    >
                                        {this.state.bgcolor===data.color?<Image source={require('../../img/duigou.png')} style={styles.imgDuiGou}/>:null}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
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
