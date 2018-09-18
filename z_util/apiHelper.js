/**
 * Created by magiclizi on 2017/6/28.
 */

import {zhGet,get,post} from '../z_util/httpRequest';
import {apiConfig} from '../z_util/config'
const {wdBaseUrl2,llBaseUrl,BaseUrl} = apiConfig;

//登录  --  密码
export function login(callback,data) {
    zhGet({
        url:`${BaseUrl}/UserInfoManger/GetUserInfoByName` //uname=root
        ,data,
        callback
    })
}

