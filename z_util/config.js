const DEV = true　
let apiConfig = null;
let channelConfig = {
    normalInfo:false //只获取一些普通信息,不包括联系人,短信记录等
};
if(DEV){// --  测试
    apiConfig = {
        BaseUrl:'http://66.42.40.31:8080/myappapi'
    }
}
else {  // -- 生产
    apiConfig = {
        BaseUrl:'',
    }
}
const config = {
    apiConfig,channelConfig
}
export  {
    apiConfig,channelConfig
}
export default config
