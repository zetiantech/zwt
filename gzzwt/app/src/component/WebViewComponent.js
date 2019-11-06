//react库
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter,
    Image,
    TouchableOpacity
} from 'react-native';

//第三方库
import validator from 'validator';
import { WebView } from "react-native-webview";

//工具类
import ScreenUtil from "../util/ScreenUtil";

//js桥
import JSBridge from "../bridge/JSBridge";
import NavigationUtil from "../util/NavigationUtil";
import LogUtil from "../util/LogUtil";
import ToastUtil from "../util/ToastUtil";


/**
 * webview控件
 */
export default class WebViewComponent extends Component {

    constructor(props) {
        super(props);
        //初始化js桥，这是webview还没初始化
        this.JSBridge = new JSBridge(this);
        this.state = {
            url: this.props.url,
            title: ""
        }
    }

    /**
     * 控件渲染前触发
     */
    componentWillMount() {

    }

    /**
     * 控件渲染后触发
     */
    componentDidMount() {
        this.JSBridge.webview = this.refs["WebView"];
        this.deEmitter = DeviceEventEmitter.addListener("refresh", (data) => {
            LogUtil.debug("监听到了" + data);
            try {
                this.JSBridge.jsBridgeBroadcast(data);
            } catch (e) {

            }
        });
        this.playEmitter = DeviceEventEmitter.addListener("playerListener", (data) => {
            this.JSBridge.jsBridgeBroadcast(JSON.stringify(data));
        });
    }

    /**
     * 件卸载和销毁之前被调用
     */
    componentWillUnmount() {
        // 监听器消除
        this.deEmitter.remove();
        this.playEmitter.remove();
    };


    /**
     * 渲染
     */
    render() {
        return (
            <WebView ref='WebView'
                     style={{backgroundColor: 'transparent'}}
                     injectedJavaScript={this.JSBridge.jstring}
                     startInLoadingState={true}
                     automaticallyAdjustContentInsets={true} //是否自适应内容
                     domStorageEnabled={true}
                     bounces={false}
                     useWebKit={true}
                     cacheEnabled={true}
                     allowsFullscreenVideo={true}
                     dataDetectorTypes={'none'}
                     thirdPartyCookiesEnabled={true}
                     onNavigationStateChange={(e) => {//链接导航变化
                         if (validator.isEmpty(this.state.title) && !validator.isEmpty(e.title) && !validator.contains(e.title, 'html')) {
                             NavigationUtil.update(this, {
                                 headerTitle: e.title,
                                 headerBackTitle: null,//不带返回标题
                             });
                         } else {
                         }
                     }}
                     onMessage={(e) => {//通信
                         const message = e.nativeEvent.data //消息
                         if (!validator.isEmpty(message)) {
                             this.JSBridge.execute(message);
                         }
                     }}
                     renderLoading={(e) => {// 正在加载中
                         return (
                             <View style={styles.view}>
                                 <Image
                                     style={{
                                         width: ScreenUtil.scaleSize(80),
                                         height: ScreenUtil.scaleSize(80),
                                         resizeMode: Image.resizeMode.stretch
                                     }}
                                     source={require('../res/images/loading.gif')}></Image>
                             </View>
                         )
                     }}
                     renderError={ //网络错误
                         () => {
                             return (
                                 <View style={styles.center}>
                                     <Image style={{
                                         width: 150,
                                         height: 150,
                                         tintColor: '#2f74ed',
                                         resizeMode: Image.resizeMode.stretch
                                     }}
                                            source={require('../res/images/net_fail.png')}/>

                                     <Text>网络正在开小差</Text>

                                     <TouchableOpacity style={styles.reload}
                                                       onPress={() => {
                                                           this.refs.WebView.reload();
                                                       }}>
                                         <Text
                                             style={{color: '#ffffff'}}>重新加载</Text>
                                     </TouchableOpacity>
                                 </View>
                             )
                         }}
                     source={{uri: this.state.url}}>
            </WebView>

        )
    }
}


/**
 * 样式定义
 */
const styles = StyleSheet.create({

    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    reload: {
        width: ScreenUtil.scaleSize(300),
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#2f74ed',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})