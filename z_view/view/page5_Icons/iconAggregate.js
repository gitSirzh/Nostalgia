import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    FlatList, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../../z_util/device";
import {push,pop} from "../../../z_util/navigator";
import Navbar from "../../../z_model/navbar";
import {wordGray, backgroundGray, main, white} from "../../../z_util/color";
import Icon from "react-native-vector-icons/Ionicons";
import {data} from "../../../z_util/iconData";

export default class iconAggregate extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
            <View style={{width:width,height:height}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack} textColor={'#fff'} title ={'Icon'} />
                <ScrollView style={{width:width}}>
                    <View style={{backgroundColor:'#8B8989',width:width,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        data.map((val,key) => {
                            return(
                                <TouchableOpacity
                                    onPress={() =>{
                                        alert(val);
                                    }}
                                    activeOpacity={0.6}
                                    style={{marginLeft:6*widthRatio,width:40*widthRatio,height:40*heightRatio,justifyContent: 'center',alignItems: 'center'}}
                                >
                                    <Icon name={val} size={30} color={white} />
                                </TouchableOpacity>
                            );
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        );
    }
    refreshAll() {

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

});
