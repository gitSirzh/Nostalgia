/**
 * Created by jszh on 2018/08/22.
 */

import {Platform,Alert} from 'react-native';
import DeviceInfo from  'react-native-device-info'
import querystring from  'querystring'
import {sha1} from '../z_util/scrypto';
//import {containerVersion,subVersion} from '../z_model/version';
import {send} from '../z_util/eventDispatcher'
import {userInfo,logout} from './userInfoHelper'
import {push} from '../z_util/navigator'
import Login from '../z_view/index'

// const appId = 'jszh_framework';
// const appSecret = '';

export {get,post,zhGet,zhPost,zhGetText,zhPostText,zhPostAndHeaders,zhPostJSON}

/**
 * zhget
 * @param url
 * @param data
 * @param callback
 * @param eCallback
 */
function zhGet({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);

    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }
    var option = {
        method: 'GET',
    };
    fetch(url,option).then(res=>{
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        send('showBlackAlert', {show: true, title: "请求出错，请检查网络！"});
        eCallback&&eCallback(error);
    })
}

/**
 * 获取TXT文本请求
 * @param url
 * @param data
 * @param callback
 * @param eCallback
 */
function  zhGetText({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }
    var option = {
        method: 'GET',
    };

    fetch(url,option).then(res=>{
        return res.text();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        send('showBlackAlert', {show: true, title: JSON.stringify(error)});
        eCallback&&eCallback(error);
    })
};
/**
 * PostText 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function zhPostText({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        queryStr =queryStr
    }

    var option = {
        method: 'POST',
        body: queryStr,


    };
    if(userInfo!=null){
        option.headers = {Authorization:userInfo.tokenInfo.token}
    }
    fetch(url,option).then(res=>{
        return res.text();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        send('showBlackAlert', {show: true, title: JSON.stringify(error)});
        eCallback&&eCallback(error);
    })
};
/**
 * post 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function zhPost({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }

    var option = {
        method: 'POST',

    };
    if(userInfo!=null){
        option.headers = {Authorization:userInfo.tokenInfo.token}
    }
    fetch(url,option).then(res=>{
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        send('showBlackAlert', {show: true, title: JSON.stringify(error)});

        // if(error.toString().indexOf("token")>-1){
        //     push("Login",Login);
        // }else{
        //     eCallback&&eCallback(error);
        // }
    })
};
/**
 * post 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function zhPostJSON({url,data={},callback,eCallback}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        url = url + '?'+ queryStr
    }

    var option= {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    fetch(url,option).then(res=>{
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);

    })
};
function zhPostAndHeaders({url,data={},headers,callback,eCallback}) {
    var queryStr = querystring.stringify(data);

    var option = {
        method: 'POST',
        headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"},
        body: queryStr,
    };

    if(userInfo!=null){
        option.headers.Authorization = userInfo.tokenInfo.token
    }

    fetch(url,option).then(res=>{

        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=> {
        console.log(error);
        //alert(JSON.stringify(error))
        send('showBlackAlert', {show: true, title: JSON.stringify(error)});
        eCallback&&eCallback(error);
    })
};

/**
 * get 方法
 * @param option
 * {
 * @param url
 * @param data
 * @param callback
 * @param eCallback
 * }
 * @param config
 * {
 * @param silence=false
 * @headers
 * @timeout
 * }
 * @returns {Promise.<TResult>}
 */
// MD5参数
function get({url,data={},callback,eCallback},{silence=false}={silence:false}) {
    var queryStr = querystring.stringify(data);
    if(queryStr.length>0) {
        url = url + '?'+ querystring.stringify(data);
    }
    var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(data);
    var serverSignature = sha1(hashStr);
    var option = {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'platform' : Platform.OS,
            'appId' : appId,
            'signature' : serverSignature,
            'cv' :containerVersion,
            'subv':subVersion,
            'udid':DeviceInfo.getUniqueID(),
            'token':userInfo?userInfo.tokenInfo.token:'',
            'userName':userInfo?userInfo.tokenInfo.userName:''
        }
    }
    if(silence){
        fetch(url,option).then(res=>{
            if(res.status == 401){ //登录过期
                logout(()=>{
                    Alert.alert('提示','登录过期,请重新登录!',[
                        {text:'取消',onPress:()=>{}},
                        {text:'确定',onPress:()=>{push('login',Login,{})}},
                    ])
                })
                return null;
            }
            return res.json();
        }).then(res=> {
            console.log("get获取-----",res,url)
            if(res){
                if(res.code == 200){
                    callback&&callback(res.data);
                }else{
                   console.log('出错啦',res.message);
                }
            }
        }).catch(error=> {
            console.log(`网络请求错误！请稍后再试！错误信息${error} url:${url}`);
            eCallback&&eCallback(error);
        })
    }else {
        send('loading',{show:true,title:'加载中，请稍后...'});
        fetch(url,option).then(res=>{
            if(res.status == 401){ //登录过期
                logout(()=>{
                    Alert.alert('提示','登录过期,请重新登录!',[
                        {text:'取消',onPress:()=>{}},
                        {text:'确定',onPress:()=>{push('login',Login,{})}},
                    ])
                })
                return null;
            }
            return res.json();
        }).then(res=> {
            console.log("get获取-----",res,url)
            send('loading',{show:false});
            if(res){
                if(res.code == 200){
                    callback&&callback(res.data);
                }else{
                    Alert.alert('出错啦',res.message);
                }
            }
        }).catch(error=> {
            console.log(error);
            send('loading',{show:false});
            //send('showBlackAlert', {show: true, title: "网络错误，请检查网络！"});
            send('showBlackAlert', {show: true, title: "网络错误，请检查网络！"});
            eCallback&&eCallback(error);
        })
    }
};

/**
 * post 方法
 * @param url
 * @param headers
 * @param data
 * @param callback
 * @param eCallback
 * @returns {Promise.<TResult>}
 */
function post({url,data={},callback,eCallback},{silence=false}={silence:false}) {
    const searchParams = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');

    var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(data);
    var serverSignature = sha1(hashStr);

    var option= {
        method: 'POST',
        body: searchParams,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'platform' : Platform.OS,
            'appId' : appId,
            'signature' : serverSignature,
            'cv' :containerVersion,
            'subv':subVersion,
            'udid':DeviceInfo.getUniqueID(),
            'token':userInfo?userInfo.tokenInfo.token:'',
            'userName':userInfo?userInfo.tokenInfo.userName:''
        }
    }
    if(silence){
        fetch(url,option).then(res=>{
            if(res.status == 401){
                logout(()=>{
                    Alert.alert('提示','登录过期,请重新登录!',[
                        {text:'取消',onPress:()=>{}},
                        {text:'确定',onPress:()=>{push('login',Login,{})}},
                    ])
                })
                return null;
            }
            return res.json();
        }).then(res=> {
            console.log("post获取-----",res,)
            send('loading',{show:false});
            if(res){
                if(res.code == 200){
                    callback&&callback(res.data);
                }else{
                    console.log('出错啦',res.message);
                }
            }
        }).catch(error=>
        {
            console.log(`网络请求错误！请稍后再试！错误信息${error} url:${url}`);
            eCallback&&eCallback(error);
        })
    }else {
        send('loading',{show:true,title:'加载中，请稍后...'});
        fetch(url,option).then(res=>{
            if(res.status == 401){
                logout(()=>{
                    Alert.alert('提示','登录过期,请重新登录!',[
                        {text:'取消',onPress:()=>{}},
                        {text:'确定',onPress:()=>{push('login',Login,{})}},
                    ])
                })
                return null;
            }
            return res.json();
        }).then(res=> {
            console.log("post获取-----",res,)
            send('loading',{show:false});
            if(res){
                if(res.code == 200){
                    callback&&callback(res.data);
                }else{
                    Alert.alert('出错啦',res.message);
                }
            }
        }).catch(error=>
        {
            send('loading',{show:false});
            send('showBlackAlert', {show: true, title: "网络错误，请检查网络！"});
            eCallback&&eCallback(error);
        })
    }
}
function jsonPost({url,data,callback},{silence=false}={silence:false}) {
    var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(data);
    var serverSignature = sha1(hashStr);

    var option= {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'platform' : Platform.OS,
            'appId' : appId,
            'signature' : serverSignature,
            'cv' :containerVersion,
            'subv':subVersion,
            'udid':DeviceInfo.getUniqueID(),
            'token':userInfo?userInfo.tokenInfo.token:'',
            'userName':userInfo?userInfo.tokenInfo.userName:''
        }
    }

    if(silence){
        fetch(url,option).then(res=>{
            return res.json();
        }).then(res=> {
            console.log("post获取-----",url,res,)
        }).catch(error=> {
            console.log(`网络请求错误！请稍后再试！错误信息${error} url:${url}`);
        })
    }else {
        send('loading',{show:true,title:'加载中，请稍后...'});
        fetch(url,option).then(res=>{
            return res.json();
        }).then(res=> {
            console.log("post获取-----",url,res,)
            send('loading',{show:false});
            if(res.code == 200){
                callback&&callback(res.data);
            }else{
                Alert.alert('出错啦',res.message);
            }
        }).catch(error=>
        {
            send('loading',{show:false});
            send('showBlackAlert', {show: true, title: "网络错误，请检查网络！"});
        })
    }
}
function wdPost(url,params,callback,eCallback){
    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(params);
    var serverSignature = sha1(hashStr);

    var option= {
        method: 'POST',
        body: searchParams,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'platform' : Platform.OS,
            'appId' : appId,
            'signature' : serverSignature,
            'cv' :containerVersion,
            'subv':subVersion,
            'udid':DeviceInfo.getUniqueID()
        }
    }
    console.log(url);
    fetch(url,option).then(res=>{
        // console.log(res);
        return res.json();
    }).then(res=> {
        callback&&callback(res);
    }).catch(error=>
    {
        send('showBlackAlert', {show: true, title: "网络错误，请检查网络！"});
        eCallback&&eCallback(error);
    })
}

