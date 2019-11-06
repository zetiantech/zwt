import React, { Component } from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types'
import ScreenUtil from "src/util/ScreenUtil";

/**
 * @description 控制视图的方法
 * @time 2019/10/16
 **/
export default class LoadingComponent extends Component {
    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any, //加载中的样式
    };

    static map = {}

    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }

    static unBind(key = 'default') {
        this.map[key] = null
        delete this.map[key];
    }

    static show(text = 'Loading...', timeout = -1, key = 'default') {
        this.map[key] && this.map[key].setState({"isShow": true, "text": text, "timeout": timeout});
    }

    static dismis(key = 'default') {
        this.map[key] && this.map[key].setState({"isShow": false});
    }

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "加载中..."
        }
        LoadingComponent.bind(this, this.props.type || 'default');
    }

    componentWillUnmount() {
        clearTimeout(this.handle);
        LoadingComponent.unBind(this.props.type || 'default');
    }

    render() {
        clearTimeout(this.handle);
        (this.state.timeout != -1) && (this.handle = setTimeout(() => {
            LoadingComponent.dismis(this.props.type || 'default');
        }, this.state.timeout));
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {
                    LoadingComponent.dismis(this.props.type || 'default');
                }}>
                <View style={[styles.load_box, this.props.loadingStyle]}>
                    <ActivityIndicator animating={true} color={this.props.color || '#FFF'}
                                       size={'large'}
                                       style={styles.load_progress}/>
                    <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#0008',
        alignItems: 'center',
        marginLeft: ScreenUtil.getWidth() / 2 - 50,
        marginTop: ScreenUtil.getHeight() / 2 - 50,
        borderRadius: 10
    },
    load_progress: {
        position: 'absolute',
        width: 100,
        height: 90
    },
    load_text: {
        marginTop: 70,
        color: '#FFF',
    }
});