import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView, Platform, BackAndroid
} from 'react-native';
import {height, heightRatio, topHeight, width, widthRatio} from "../../z_util/device";
import {push,pop} from "../../z_util/navigator";
import Navbar from "../../z_model/navbar";
import {backgroundGray, main} from "../../z_util/color";

export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // --
        }
    }
    componentWillMount () {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress',this.onBack);
        }
    }
    onBack = () =>{
        pop();
        return true;
    }
    render() {
        return (
            <View style={{width:width,height:height,backgroundColor:backgroundGray}}>
                {/*导航条*/}
                <Navbar backCallback={this.onBack}  textColor={'#fff'} title ={'关于作者'} />
                {/*阴影*/}
                <Image source={require('../img/yinying.jpg')} style={{width:width,height:38/1125*width}}/>
                <ScrollView>
                    <View style={{marginTop: 10*heightRatio,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.txtQAQ}>作者：</Text><Text style={styles.txt}>jszh</Text>
                        </View>
                        <View style={{marginTop:5*heightRatio,flexDirection:'row'}}>
                            <Text style={styles.txtQAQ}>座右铭：</Text><Text style={styles.txt}>努力！努力！在努力！</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    txtQAQ:{
        fontSize:12*widthRatio,
        fontWeight: '400'
    },
    txt:{
        fontSize:12*widthRatio,
    },
});
