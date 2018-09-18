/**
 * Created by jszh on 2018/08/22.
 */

export {push,pop,setNavigator,popToTop,navigator,popToRouteIndex,setTabbarIndex,getTabbarIndex}

var navigator = null;

function popToRouteIndex(index){
    if(navigator){
        navigator.popToRoute(navigator.getCurrentRoutes()[index]);
    }
}

//推入
function push(name,component,params){
    if(navigator){
        navigator.push({
            name:name,
            component:component,
            params:params
        })
    }
}

//推出
function pop(){
    navigator&&navigator.pop();
}

//推出到顶部
function popToTop(){
    navigator&&navigator.popToTop();
}

//设置nav
function setNavigator(nav){
    navigator = nav;
}

//设置tabbar
var tabbarIndex = 0;
function setTabbarIndex(index) {
    tabbarIndex = index;
}

function getTabbarIndex() {
    return tabbarIndex
}