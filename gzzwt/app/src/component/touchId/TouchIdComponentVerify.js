import React, {Component} from 'react'
import {
    Image,
    StyleSheet, Text, TouchableOpacity,
    View, DeviceEventEmitter,
} from 'react-native';

import TouchID from 'react-native-touch-id';
import ToastUtil from "src/util/ToastUtil";
import ScreenUtil from "src/util/ScreenUtil";
import AsyncStorageUtil from "src/util/AsyncStorageUtil";
import NavigationUtil from 'src/util/NavigationUtil';

const optionalConfigObject = {
    title: "政务通", // Android
    imageColor: '#2f74ed', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: '请验证指纹', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: '取消', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

/**
 * 指纹解锁
 */
export default class TouchIdComponentVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:"",
            type: 0
        }
    }

    /**
     * 指纹验证
     */
    touchAuthenticate(){
        // Success code
        TouchID.authenticate('需要验证您的身份', optionalConfigObject)
            .then(success => {
                if(success){
                    global.lock=true;
                    if(this.state.type==0){
                        NavigationUtil.navigate(this.props, 'ResultPage', { type: 0 })
                    }
                }
                DeviceEventEmitter.emit("lock",JSON.stringify({type:'touchId',status:false}))
                DeviceEventEmitter.emit("refresh",JSON.stringify( {
                    key: "lockVerify",
                    data: {type: 'touchId'}
                }))
            })
            .catch(error => {
            });
    }

    /**
     * 控件渲染后触发
     */
    async componentDidMount() {

        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                this.touchAuthenticate();
            })
            .catch(error => {
                // Failure code
                ToastUtil.toast('您的手机手机不支持指纹解锁')
                DeviceEventEmitter.emit("lock",false);
            });

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
    render() {
        return (
            <View style={styles.view_container}>
                <View style={styles.view_touch_container}>
                    <Text style={styles.title}>{this.state.phone.substr(0,3)+"******"+this.state.phone.substr(8)}</Text>
                    <TouchableOpacity style={styles.view_touch} onPress={this.touchAuthenticate}>
                        <Image source={require('src/res/images/login/icon_zwjs.png')} />
                        <Text style={{marginTop:20}}>
                            点击进行验证指纹
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

/**
 * 样式
 */
const styles = StyleSheet.create({
        view_container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right:0,
            bottom:0,
             width:ScreenUtil.getWidth(),
            height:ScreenUtil.getHeight(),
            backgroundColor:'white'
        },
        title:{
            position: 'absolute',
            top:100,
            color:'#333333',
            fontSize:18,
            fontWeight: 'bold',
            marginBottom:ScreenUtil.scaleSize(40)
        },
        view_touch_container:{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            },
        view_touch:{
            justifyContent:'center',
            alignItems:'center'
        },
        image:{
            width:ScreenUtil.scaleSize(40),
            height:ScreenUtil.scaleSize(40)

        }
    }
)