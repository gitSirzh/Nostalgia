import React from 'react';

import ReactNative from 'react-native';

import Spinner from 'react-native-spinkit';

import {heightRatio,widthRatio,width,height,tabbarHeight} from '../z_util/device';

var {StyleSheet, Text,View} = ReactNative;

var {Component} = React;

export default class loading extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this['state'] = {

        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    render() {
        return (
            <View style = {styles.container}>
                <Spinner isVisible={true} size={28 * widthRatio} type={'ThreeBounce'} color="white"/>
                <Text allowFontScaling = {false} style = {styles.title}>{this['props'].title?this['props'].title:'加载中...'}</Text>
            </View>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    container:{
        width:100*widthRatio,
        height:80*widthRatio,
        backgroundColor:'rgba(0,0,0,0.8)',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:height/2-50*widthRatio,
        left:width/2-50*widthRatio ,
        borderRadius:10*widthRatio
    },
    spinner:{

    },
    title:{
        marginTop :10 *heightRatio,
        color: 'white',
        fontSize:width<375?12*0.8:12,
        fontWeight:'300'
    }
});