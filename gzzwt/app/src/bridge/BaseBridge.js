
/**
 * @description 连接桥
 * @author Jonne
 */
import JavaScriptString from "./JavaScriptString";
import ToastUtil from "../util/ToastUtil";


/**
 * 基础类，
 */
export default class BaseBridge {

    constructor(comp) {
        this.jstring = JavaScriptString;
        this.props = comp.props;
        this.comp = comp;
        if (new.target === BaseBridge) {
            throw new Error('本类不能实例化');
        }
    }
    setWebView(webview) {
        this.webview = webview;
    }
    /**
     * 回来调方法
     * @param data
     */
    jsBridgeCallBack(data) {
        try {
        this.webview.injectJavaScript("rn.app.callback('" + data + "')");
        } catch (e) {

        }
    }
    jsBridgeBroadcast(data) {
        try {
            this.webview.injectJavaScript("if(window.broadcastListener){window.broadcastListener('" + data + "')}");
        } catch (e) {

        }
    }

    /**
     * 执行脚本
     * @param  {[string]} js [只接收字符串拼接格式的javascript脚本]
     * @return {[void]}    [执行对应子类的方法]
     */
    execute(js) {
        try {
            console.log(js);
            eval(js);
        } catch (e) {}
    }


}