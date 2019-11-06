import React, {Component} from "react"
import {DeviceEventEmitter, StyleSheet, Text, View} from "react-native"
import {Gesture} from "./component/GesturePassword"
import ScreenUtil from "src/util/ScreenUtil";
import AsyncStorageUtil from "src/util/AsyncStorageUtil";
import ToastUtil from "src/util/ToastUtil";
import { Modal } from "@ant-design/react-native";

/**
 * 手势验证
 */
export default class GesturePasswordVerify extends Component {


    constructor(props) {
        super(props);
        this.state = {
            gesturePassword:'',
            password: '',
            title: '请输入手势密码',
            isWrong: false,
            result:true,
            phone:''
        }
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

        AsyncStorageUtil.getItem("GESTURE_PASSWORD",(result)=>{
            if(result){
                this.setState({gesturePassword:result})
            }

        })
    }
    onRelease = (password) => {
        if(password.length > 0) {
            if (this.state.gesturePassword === password) {
                // 取消解锁
                global.lock=false;
                DeviceEventEmitter.emit("lock",JSON.stringify({type:'gesture',status:false}))
                DeviceEventEmitter.emit("refresh",JSON.stringify( {
                    key: "lockVerify",
                    data: {type: 'gesture'}
                }))
            } else {
                this.setState({
                    password: '',
                    title: '密码错误',
                    isWrong: true,
                })
            }
        }
         
    }

    onClear = (password) => {
        if (this.state.password === '') {
            this.setState({
                title: '请输入手势密码',
                isWrong: false,
            })
        }
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
                <Text style={style.title}>{this.state.phone.substr(0,3)+"******"+this.state.phone.substr(8)}</Text>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom:0,
        width:ScreenUtil.getWidth(),
        height:ScreenUtil.getHeight(),
        backgroundColor:'white',
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

