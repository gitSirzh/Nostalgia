import React, { Component } from 'react';

import ReactNative from 'react-native';

import {width} from '../z_util/device'
import {deepGray} from '../z_util/color';

var {View, StyleSheet} = ReactNative;

export default class Line extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this['state'] = {}
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style = {[styles.line,this['props'].style]}/>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    line :
        {
            width  : width,
            height : 0.5,
            backgroundColor : deepGray,
        }
});