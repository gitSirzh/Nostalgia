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
    ScrollView,
    Platform,
    BackAndroid
} from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {push,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";

export default class baiduMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
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

    render() {
        return (
            <View style={{width:width,height:height,backgroundColor:'#fff'}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title ={'百度地图'} />
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0)'}}>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        marker={this.state.marker}
                        markers={this.state.markers}
                        style={{flex: 1}}
                        onMapClick={(e) => {
                        }}
                    >
                    </MapView>
                </View>
            </View>
        );
    }
    componentDidMount() {
        Geolocation.getCurrentPosition().then(
            (data) => {
                this.setState({
                    zoom:18,
                    markers:[{
                        latitude:data.latitude,
                        longitude:data.longitude,
                        title:'我的位置'
                    }],
                    center:{
                        latitude:data.latitude,
                        longitude:data.longitude,
                    }
                })
            }
        ).catch(error => {
            console.warn(error,'error');
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
