import React from 'react';

import ReactNative, {AsyncStorage} from 'react-native';

import {width, topHeight, statebarHeight, navbarHeight, heightRatio, widthRatio} from '../z_util/device';

import {wordBlack,main} from '../z_util/color';
import {listen} from "../z_util/eventDispatcher";



var {View, StyleSheet, TouchableOpacity,Image,Text} = ReactNative;

var {Component} = React;
export default class Navbar extends Component {


    static propTypes = {

    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
            colors:''
        };

        this.centerColor = this.props.centerColor?this.props.centerColor:main;
    }

    componentWillMount() {
        AsyncStorage.getItem("bgColor",function(errs,r){
            if (!errs)
                global.colors = JSON.parse(r);
        });
        listen('bGcolor',(e)=>{
            this.setState({colors:e.colors});
        })
    }

    render() {
        AsyncStorage.getItem("bgColor",function(errs,r){
            if (!errs)
                global.colors = JSON.parse(r);
        });
        return (
            <View style = {[styles.container,this['props'].style,{backgroundColor:this.props.centerColor?this.props.centerColor:this.state.colors?this.state.colors:global.colors}]}>
                <View style = {[styles.beside,{backgroundColor:this.props.centerColor?this.props.centerColor:this.state.colors?this.state.colors:global.colors}]}>
                    {this.renderBack()}
                    {this.renderLeft()}
                </View>

                <View style = {[styles.middle,{backgroundColor:this.props.centerColor?this.props.centerColor:this.state.colors?this.state.colors:global.colors}]}>
                    <Text style = {{fontSize:16*widthRatio,fontWeight:'400',color:this.props.textColor?this.props.textColor:'white'}}>
                        {this['props'].title}</Text>
                    {this['props'].children}
                </View>

                <View style = {[styles.beside,{backgroundColor:this.props.centerColor?this.props.centerColor:this.state.colors?this.state.colors:global.colors}]}>
                    {this.renderRight()}
                </View>
            </View>
        )
    }


    renderLeft()
    {
        if(this['props'].renderLeft)
        {
            return this['props'].renderLeft();
        }
    }

    renderRight()
    {
        if(this['props'].renderRight)
        {
            return this['props'].renderRight();
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    renderBack()
    {
        var backCallback = this['props']['backCallback'];
        if(backCallback)
        {
            return(
                <TouchableOpacity style = {{alignItems:'center',justifyContent:'center',width : width * 0.1,height : navbarHeight,position:'absolute',top:0,left:0}} onPress = {()=>{backCallback()}}>
                    <Image source = {require('../z_view/img/navback.png')} style ={[styles.navBack,{tintColor: this.props.textColor?this.props.textColor:'#000'}]}/>
                </TouchableOpacity>
            )
        }else {
            return null;
        }
    }
}


const styles = StyleSheet.create({
    container:{
        width : width,
        height :topHeight,
        paddingTop:statebarHeight,
        // position:'absolute',
        // top:0,
        // left:0,
        flexDirection:'row'
    },

    beside:{
        width : width * 0.2,
        height : navbarHeight,
        // top : statebarHeight,
        alignItems:'center',
        justifyContent:'center',
    },

    middle:{
        width : width * 0.6,
        height : navbarHeight,
        // top : statebarHeight,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'rgba(255,255,255,0.9)',
        flexDirection:'row'
    },
    navBack:
        {
            width : 12*widthRatio,
            height :60/33*(12*widthRatio),
            tintColor:wordBlack
        }
});