/**
 * Created by jszh on 2018/08/22.
 */

import ReactNative from 'react-native';
import {push} from '../z_util/navigator';
import Login from '../z_view/view/index';
import {send} from '../z_util/eventDispatcher';

var {AsyncStorage,Alert} = ReactNative;

export {userInfo,initUserInfo,checkLogin,setUserTokenInfo,setUserInfo,logout,setUserhHeadImage,setUserTokenInfo2}

var userInfo = null;

function checkLogin(callback){
    if(userInfo){
        // 这块暂时不用 ：验证用户是否过期重新登录
        // var tokenInfo = userInfo.tokenInfo;
        // //console.log(tokenInfo);
        // let curTime = new Date().getTime();
        // if(curTime>tokenInfo['expireTime']){
        //     //token过期重新登录
        //     logout(()=>{
        //         push('login',Login,{});
        //     })
        // }
        // else{
        //     callback(userInfo);
        // }
        callback(userInfo);
    }
    else{
        //登陆界面
        push('login',Login,{});
    }
}

function initUserInfo(callback) {
    AsyncStorage.getItem('userInfo',(e,r)=>{

        if(!e){
            userInfo = JSON.parse(r);
            // console.log(userInfo);
        }
        callback(userInfo);
    })
}

function saveUserInfo(callback){
    AsyncStorage.setItem('userInfo',JSON.stringify(userInfo),callback);
}

function setUserTokenInfo(token,headImage,expireTime,callback){
    userInfo = userInfo?userInfo:{};
    userInfo.headImage=headImage,
        userInfo.tokenInfo = {
            token:token,
            expireTime:expireTime
        };
    console.log(userInfo);
    saveUserInfo(callback);
}
function setUserTokenInfo2(userId,name,headImage){
    userInfo = userInfo?userInfo:{};
    userInfo.userId = userId;  //用户ID
    userInfo.name = name;       //昵称
    userInfo.headImage=headImage, //头像
    saveUserInfo();
}
function setUserhHeadImage(headImage){
    userInfo = userInfo?userInfo:{};
    userInfo.headImage=headImage
    saveUserInfo();

}
function setUserInfo(user,callback){
    if(user.result === 'success'){
        userInfo.user = user.user;
        saveUserInfo(callback);
    }
    else{
        send('showBlackAlert',{show:true,title:`获取用户信息时出错！请重新登录，或者稍后再试！`});
    }
}

function logout(callback){
    AsyncStorage.removeItem("userInfo",e=>{
        if(!e){
            userInfo = null;
            callback();
        }
    })
}
