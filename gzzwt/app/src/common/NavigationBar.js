/*
* @des 导航和状态配置
* @author Jonne
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
    DeviceEventEmitter
} from 'react-native';

import GlobalStyles from '../res/styles/GlobalStyles'

const NAV_BAR_HEIGHT_IOS = GlobalStyles.nav_bar_height_ios;
const NAV_BAR_HEIGHT_ANDROID = GlobalStyles.nav_bar_height_android;
const STATUS_BAR_HEIGHT = 20;
const IPHONE_X_STATUS_BAR_HEIGHT = 44;

// 按钮默认配置
const ButtonShape = {
    title: PropTypes.string,
    style: PropTypes.object,
    handler: PropTypes.func
}

// 状态栏默认配置
/**
 *  @param barStyle light-content：黑底白字  dark-content: 白底黑字 设置状态栏文本的颜色
 **/
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']), 
    networkActivityIndicatorVisible: PropTypes.bool, // 指定是否显示网络活动提示符
    showHideTransition: PropTypes.oneOf(['fade', 'slide']), // 通过hidden属性来显示或隐藏状态栏时所使用的动画效果
    hidden: PropTypes.bool, // 是否显示状态栏
    translucent: PropTypes.bool, // 指定状态栏是否透明。设置为true时，应用会延伸到状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用
    backgroundColor: PropTypes.string,
    animated: PropTypes.bool // 指定状态栏的变化是否应以动画形式呈现
}


export default class NavigationBar extends Component {
    static propTypes = {
        style: PropTypes.object,
        titleLayoutStyle: PropTypes.object,
        navigator: PropTypes.object,
        leftHidden: PropTypes.bool,
        leftButtonTitle: PropTypes.string,
        popEnabled: PropTypes.bool,
        onLeftButtonClick: PropTypes.func,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        leftButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),

    }
    static defaultProps = {
        statusBar: {
            barStyle: 'default',
            hidden: false,
            translucent: false,
            animated: false,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            popEnabled: true,
            hide: true,
            leftHidden: false
        }
    }
    /**
     *  @description 左侧内容
     * **/
    leftView () {
        var leftView = this.props.leftHidden ? <></> : this.props.leftButtonTitle ?
            <Text style={styles.title}>{this.props.leftButtonTitle}</Text> : <Image style={styles.back} source={require('../res/images/back.png')} />;
        return (
            <TouchableOpacity
                onPress={() => this.onLeftButtonClick()}>
                <View style={{ width: 50, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    {this.props.leftView ? this.props.leftView : leftView}
                </View>
            </TouchableOpacity>
        )
    }
    /**
     * @description 左侧事件
    **/
    onLeftButtonClick () {
        if (this.props.navigator && this.props.popEnabled) this.props.navigator.pop();
        if (this.props.onLeftButtonClick) this.props.onLeftButtonClick();
    }
    getButtonElement (data = {}, style) {
        return (
            <View style={styles.navBarButton}>
                {(!!data.props) ? data : (
                    <NavBarButton
                        title={data.title}
                        style={[data.style, style,]}
                        tintColor={data.tintColor}
                        handler={data.handler} />
                )}
            </View>
        );
    }
    render () {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar barStyle='dark-content' {...this.props.statusBar} style={styles.statusBar}/>
            </View> : <></>;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.title} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.leftView()}
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton, { marginRight: 8, })}
            </View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

class NavBarButton extends Component {
    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        tintColor: PropTypes.string,
        title: PropTypes.string,
        handler: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        title: '',
        tintColor: '#0076FF',
        onPress: () => ({}),
    };
    render () {
        const { style, tintColor, margin, title, handler } = this.props;
        return (
            <TouchableOpacity style={styles.navBarButton} onPress={handler}>
                <View style={style}>
                    <Text style={[styles.title, { color: tintColor, },]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4caf50',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        borderStyle: 'solid',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 18,
        color: '#000000'
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios'
            ? Platform.OS === 'ios' &&
                !Platform.isPad &&
                !Platform.isTVOS &&
                ((GlobalStyles.window_height === 896 &&
                    GlobalStyles.window_width === 414) ||
                    (GlobalStyles.window_height === 812 &&
                        GlobalStyles.window_width === 375))
                ? IPHONE_X_STATUS_BAR_HEIGHT
                : STATUS_BAR_HEIGHT
            : 0,
        backgroundColor: '#2F74ED',
    },
    back: {
        width: 28,
        height: 28,
    }
})
