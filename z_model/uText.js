import React from 'react';

import ReactNative from 'react-native';

import {wordBlack} from '../z_util/color';

var { StyleSheet,Text} = ReactNative;

var {Component} = React;

export default class uText extends Component {

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
            <Text style = {{color:wordBlack}} {...this.props} allowFontScaling = {false}/>
        )
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({});