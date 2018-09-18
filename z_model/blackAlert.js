import React from 'react';

import ReactNative from 'react-native';

import * as Animatable from 'react-native-animatable';

import {widthRatio, width, height, heightRatio} from '../z_util/device';

import {send} from '../z_util/eventDispatcher';

var {View, StyleSheet, Text} = ReactNative;

var {Component} = React;

export default class blackAlert extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            title:''
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        this.setState({title:this['props'].title})
    }

    render() {
        return (
            <Animatable.View
                ref = 'blackAlert'
                pointerEvents='none'
                style = {{zIndex:999,opacity:0,width:width,height:height,position :'absolute',justifyContent:'center',alignItems:'center', top:0, left:0}}
            >
                <View style={styles.container}>
                    <Text allowFontScaling = {false} style = {[{fontSize:width<375?14*0.85:14,color:'white'}]}>{this.state.title}</Text>
                </View>
            </Animatable.View>
        )
    }

    componentDidMount() {
        this.refs['blackAlert'].fadeIn(500).then((endstate)=>{
            if(endstate.finished){
                this.outTimer = setTimeout(()=>{
                    this.refs['blackAlert'].fadeOut(500).then((endstate)=>{
                        if(endstate.finished){
                            send('showBlackAlert',{show:false});
                        }
                    })
                },1000);
            }
        })
    }

    componentWillUnmount() {
        this.outTimer&&clearTimeout(this.outTimer);
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.8)',
        width : 140 * widthRatio,
        marginTop: height-140*heightRatio,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        padding:6,
    }
});