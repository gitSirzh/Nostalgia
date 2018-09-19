import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    Text, AsyncStorage, Platform, BackAndroid
} from 'react-native';
import Index from '../z_view/index';
import {DrawerNavigator} from 'react-navigation';
import userComponent from "../z_view/userComponent";
import {widthRatio} from "../z_util/device";
import {listen, send} from "../z_util/eventDispatcher";

const DrawerNav = DrawerNavigator({
    Index: { screen: Index },
}, {
    drawerWidth: 200*widthRatio, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: userComponent,  // 自定义抽屉组件
    // contentOptions: {
    //     //initialRouteName: Main, // 默认页面组件
    //     activeTintColor: 'white',  // 选中文字颜色
    //     activeBackgroundColor: '#ff8500', // 选中背景颜色
    //     inactiveTintColor: '#666',  // 未选中文字颜色
    //     inactiveBackgroundColor: '#fff', // 未选中背景颜色
    //     gesturesEnabled:false,
    //     style: {  // 样式
    //     }
    // }

});

export default class root extends Component {

    render() {
        return (
            <DrawerNav />
        );
    }
}

const styles = StyleSheet.create({});