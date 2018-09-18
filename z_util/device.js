/**
 * Efforts will not regret.
 * Create time 2018/8/10
 * @jszh
 */

import ReactNative from 'react-native';
var {Dimensions, Platform ,PixelRatio} = ReactNative;

//iPhoneX适配
const X_WIDTH = 375;
const X_HEIGHT = 812;
export var statebarHeight = isIOS?(isIphoneX()?30:20):24;

//iOS平台
export var isIOS = (Platform.OS === 'ios')?true:false;
export var navbarHeight = isIOS?40:50;

//基本适配
export var width = Dimensions.get('window').width;
export var height = Dimensions.get('window').height;
export var widthRatio= width/375;
export var heightRatio = height/677;

//tabbar 宽高
export var tabbarHeight = 49,tabbarWidth = 49;
export var topHeight = statebarHeight + navbarHeight;

//其他
export var ratio = PixelRatio.get();

export var netType = 'UNKNOW';

export var tabPage = 0;

export var canbackWeb = false;



export function setCurrentNet(toNetType){
    netType = toNetType;
}

export function setCurrentTabPage(page){
    tabPage = page
}

export function setBackWeb(backWeb){
    canbackWeb = backWeb
}

export function inIOSReview(){
    if(isIOS){
        return false
    }
    return false
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */

export function ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}