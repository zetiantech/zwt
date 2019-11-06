/**
 * @description  本地存储
 * @author 择天科技 Jonne
 * @time 2019/10/3
 * @version 0.1
 **/
import {
    AsyncStorage,
} from 'react-native';
import {debug} from "./LogUtil";
import LogUtil from "./LogUtil";
import validator from 'validator';

export default class AsyncStorageUtil {

    /**
     * @description 本地保存  : AsyncStorageUtil.setItem(key，vall)
     * @param key 保存的的主键
     * @param value 数据
     * @param callback // 存储错误的回调  (非必填)
     * @example AsyncStorageUtil.setItem("name", "12",(error)=>{
     *              error:{ name: string,
     *                      message: string,
     *                      stack?: string,}
     *      }])
     *
     */
    static setItem(key, value, callback) {
        try {
            AsyncStorage.setItem(
                key,
                value,
                (error) => {
                    LogUtil.debug(error);
                }
            );
        } catch (error) {
            LogUtil.debug(error);
        }
    }

    /**
     * @description 根据key获取本地存储数据 该执行是异步必须要有回调用参数
     * @param key 主键
     * @param callback 回调方法，成功返回result ，错误异常 返回 error对象方法 ,key不存在则返回空字符串
     * @example:  AsyncStorageUtil.getItem(name, (error: ?Error, result: ?string) => {
     *                  result：获取到存储的内容
     *                  error:{ name: string,
     *                  message: string,
     *                  stack?: string}
     *
     *              })
     */
    static getItem(key, callback) {
        try {
            if (!(callback && callback instanceof Function)) {//没有回调函数处理
                LogUtil.debug('callback is undefined')
                return;
            }
            AsyncStorage.getItem(
                key,
                (error, result) => {
                    if (error) {
                        callback("")
                    } else {
                        if (result!=null && !validator.isEmpty(result)) {
                            LogUtil.debug("getItem:"+result);
                            callback(result)
                        } else {
                            callback("")
                        }
                    }
                });
        }
        catch (error) {
            LogUtil.debug(error);
        }
    }

    static removeItem(key, callback) {
        try {
            if (!(callback && callback instanceof Function)) {//没有回调函数处理
                LogUtil.debug('callback is undefined')
                return;
            }
            AsyncStorage.removeItem(
                key,
                (error, result) => {
                    if (error) {
                        callback("")
                    } else {
                        if (result!=null && !validator.isEmpty(result)) {
                            LogUtil.debug("removeItem:"+result);
                            callback(result)
                        } else {
                            callback("")
                        }
                    }
                });
        }
        catch (error) {
            LogUtil.debug(error);
        }
    }
    
    static clear(callback){
        try {
            if (!(callback && callback instanceof Function)) {//没有回调函数处理
                LogUtil.debug('callback is undefined')
                return;
            }
            AsyncStorage.clear(error => {
                if (error) {
                    LogUtil.debug(error);
                } else {
                    callback()
                }
            });
        }
        catch (error) {
            LogUtil.debug(error);
        }
    }
}