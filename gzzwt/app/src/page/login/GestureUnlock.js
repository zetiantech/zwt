/**
 * @description 手势解锁
 * @author 择天团队 Jonne
 */
import React, {Component} from "react"
import {DeviceEventEmitter, StyleSheet, Text, View} from "react-native"
import {Gesture, GesturePad} from "src/component/gesture/component/GesturePassword"
import ScreenUtil from "src/util/ScreenUtil";
import AsyncStorageUtil from "src/util/AsyncStorageUtil";
import NavigationUtil from "src/util/NavigationUtil";

import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import ToastUtil from "../../util/ToastUtil";


class SetGesturePasswordPage extends Component {

    state = {
        password: '',
        title: '路径至少包括4个点',
        isWrong: false,
        phone: '',
    }

    /**
     * 控件渲染前触发
     */
    componentWillMount() {
        AsyncStorageUtil.getItem("PHONE",(result)=>{
            if(result){
                this.setState({phone:result});
            }

        })
    }

    onRelease = (password) => {
        const _this = this
        if (this.state.password === '') {
            if (password.length < 4) {
                this.setState({
                    title: '路径至少包括4个点，请重新绘制',
                    isWrong: true,
                })
                return
            }

            this.setState({
                password,
                title: '请再次绘制',
            })

        } else if (this.state.password.length > 0) {
            if (this.state.password === password) {
                this.gestureSetting(password, ()=>{}); 
                AsyncStorageUtil.setItem("GESTURE_PASSWORD",password);
                NavigationUtil.navigate(this.props, 'ResultPage', { type: 0});
                // 刷新选择页面
                DeviceEventEmitter.emit("refresh", JSON.stringify( {
                    key: "lockSet",
                    data: {type: 'gestureSet'}
                }));

            } else {
                //密码不一致
                this.setState({
                    password: '',
                    title: '密码路径不一致',
                    isWrong: true,
                })
            }
        }
    }

    onClear = (password) => {
        if (this.state.password === '') {
            this.setState({
                title: '路径至少包括4个点',
                isWrong: false,
            })
        }
    }

    gestureSetting(gesture, callback){
        const _this = this
        const data = {
            phone: this.state.phone,
            gesture: gesture
        };
        HttpUtil.post(API.GESTURE_SETTING, data).then((responseJson) => {
            const { code, data, msg } = responseJson.data
            if(code === 0){
                callback && callback()
            }else{
                // ToastUtil.toast(msg)
            }
           
        })
    }

    render() {
        const {password, title, isWrong} = this.state
        let textStyle, circleStyle, centerStyle, lineStyle
        if (isWrong) {
            textStyle = style.text
            circleStyle = style.circle
            centerStyle = style.center
            lineStyle = style.line
        }else{
            textStyle=style.title_tips
        }
        return (
            <View style={style.view}>
                <Text style={style.title}>设置你的解锁方式,保护隐私信息</Text>
                <Text style={textStyle}>{title}</Text>
                <Gesture
                    clearTime={1000}
                    linedCircleStyle={circleStyle}
                    linedCenterStyle={centerStyle}
                    lineStyle={lineStyle}
                    onRelease={this.onRelease}
                    onClear={this.onClear}
                />
            </View>
        )
    }
}

const COLOR_RED = 'rgba(252, 13, 27, 1)'
const COLOR_RED_02 = 'rgba(252, 13, 27, 0.2)'
const COLOR_RED_04 = 'rgba(252, 13, 27, 0.4)'

const style = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    title:{
        color:'#333333',
        fontSize:18,
        fontWeight: 'bold',
        marginBottom:ScreenUtil.scaleSize(20)

    },
    title_tips:{
      color:"#666666",
      marginBottom:15,

    },
    circle: {
        backgroundColor: COLOR_RED_02,
        borderColor: COLOR_RED_04,
    },
    center: {
        backgroundColor: COLOR_RED,
    },
    line: {
        backgroundColor: COLOR_RED,
    },
    text: {
        color: COLOR_RED,
        marginBottom:15,
    }

})

export default SetGesturePasswordPage