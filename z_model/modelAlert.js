import React from 'react';

import ReactNative from 'react-native';

import {widthRatio, width, height, heightRatio} from '../z_util/device';

var {View, StyleSheet, Text,Modal,TouchableOpacity,ScrollView} = ReactNative;

var {Component} = React;

export default class modelAlert extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this['state'] = {
            animationType: 'none', //none slide fade
            transparent: true, //是否透明显示s
            btntext:[],
            btnval:'',
            modalVisible:true
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
    }
    _close(){
        global.modalVisible = false;
        this.setState({modalVisible:false})
    }
    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let modalHeight={};
        if (this['props'].btntext.length == 2){
            modalHeight={height:105*heightRatio};
        } else if(this['props'].btntext.length == 3) {
            modalHeight={height:150*heightRatio};
        } else if(this['props'].btntext.length == 4) {
            modalHeight={height:195*heightRatio};
        } else if(this['props'].btntext.length >= 5) {
            modalHeight={height:255*heightRatio};
        } else {
            modalHeight={height:255*heightRatio};
        }
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={global.modalVisible}
                onRequestClose={""}
                style={{height:height}}
            >
                <TouchableOpacity onPress={()=>{ this._close()}}>
                    <View style={[modalBackgroundStyle,{width:width,height:height,alignItems:"center",justifyContent:"center"}]}>
                        <View style={[modalHeight,{backgroundColor:"white",width:width-150*widthRatio,alignItems:"center",marginBottom:this.state.nameTextmarginTop,borderRadius:5}]}>

                            <View style={{marginBottom:2*heightRatio}} />
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                                {this['props'].btntext.map((object,index) => {
                                    return(
                                        <TouchableOpacity onPress={()=>{
                                            this._close();
                                            this.props.showModelAlertCallback(object)
                                        }}>
                                            <View style={styles.btnView}>
                                                <Text style={styles.btnText}>{object}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                            <View style={{marginBottom:12*heightRatio}} />

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    componentDidMount() {

    }


}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.8)',
        width : 140 * widthRatio,
        padding : 4 *widthRatio,
    },
    btnView:{
        width:190*widthRatio,
        marginTop:10*heightRatio,
        height:35*heightRatio,
        borderRadius:5,
        backgroundColor:"rgb(25,167,255)",
        alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        color:"white",
        fontSize:15
    },
    contentContainer:{

    }

});