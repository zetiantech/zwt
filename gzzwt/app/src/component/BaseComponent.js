import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native';

/**
 * @description 组件基类
 */


export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }
}




/**
 * 样式
 */
const styles = StyleSheet.create({
        view_container: {
            flex: 1,
        }
    }
)