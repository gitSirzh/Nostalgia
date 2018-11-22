/**
 * AudioPlayerDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * @guangqiang
 */

import React, {Component} from 'react'
import {View} from 'react-native';
import Video from 'react-native-video';
import {send,listen} from "../z_util/eventDispatcher";

const mockData = require('../z_view/view/page1_QQMusic/musicList.json');

export default class video extends Component {

    constructor(props) {
        super(props);
        this.player = '';
        this.musicList = [];
        this.state = {
            paused: false, // false: 表示暂停，true: 表示播放
            duration: 0.00,
            slideValue: 0.00,
            currentTime: 0.00,
            currentIndex: 0,
            playMode: 0,
            musicInfo: {},
            url:'',
            isPlay:1
        }
    }

    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = duration - min * 60;
        min = min >= 10 ? min : '0' + min;
        second = second >= 10 ? second : '0' + second;
        return min + ':' + second
    }


    componentDidMount() {
        // this.setState({musicInfo: mockData.list[this.state.currentIndex]});
        // alert(JSON.stringify(this.props));
        switch (this.props.indexBtn) {  //0 : 上一首 ， 1 : 播放暂停 ， 2 : 下一首
            case 0:
                this.preSong();
                break;
            case 1:
                this.play();
                break;
            case 2:
                this.nextSong();
                break;
            default:
                break
        }


    }

    setDuration(duration) {
        this.setState({duration: duration.duration})
    }

    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime
        })
    }

    //下一首 this.state.currentIndex + 1
    nextSong(currentIndex) {
        this.reset()
        this.setState({currentIndex: currentIndex >= mockData.list.length ? 0 : currentIndex})
    }

    //上一首 this.state.currentIndex - 1
    preSong(currentIndex) {
        this.reset()
        this.setState({currentIndex: currentIndex < 0 ? mockData.list.length - 1 : currentIndex})
    }

    reset() {
        this.setState({
            currentTime: 0.00,
            slideValue: 0.00,
            musicInfo: {}
        })
    }

    //播放 - 暂停
    play() {
        setTimeout(() => {
            this.setState({paused: !this.state.paused});
        },300);
    }

    onEnd(data) {
        if (this.state.playMode === 0) {
            this.nextSong(this.state.currentIndex + 1)
        } else if (this.state.playMode === 1) {
            this.player.seek(0)
        } else {
            this.nextSong(Math.floor(Math.random() * this.musicList.length))
        }
    }

    videoError(error) {
        send('showBlackAlert', {show:true,title:"播放器报错啦"});
    }

    render() {
        const data = mockData.list[this.state.currentIndex];
        let musicInfo = mockData.list[this.state.currentIndex];
        return (
            data.url ?
                <Video
                    ref={video => this.player = video}
                    source={{uri: this.props.url}}
                    volume={1.0}
                    paused={!this.state.paused}
                    playInBackground={true}
                    onLoadStart={this.loadStart}
                    onLoad={data => this.setDuration(data)}
                    onProgress={(data) => this.setTime(data)}
                    onEnd={(data) => this.onEnd(data)}
                    onError={(data) => this.videoError(data)}
                    onBuffer={this.onBuffer}
                    onTimedMetadata={this.onTimedMetadata}
                /> : null
        )
        // return(
        //     <View></View>
        // )
    }
}
