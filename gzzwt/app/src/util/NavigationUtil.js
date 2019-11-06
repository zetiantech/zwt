/**
 * @description 导航栏
 * @author 择天团队
*/
'use strict'
import React from "react";
import { StackActions, NavigationActions } from 'react-navigation';
//第三方库
import lodash from 'lodash'
import { 
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from "react-native";
import ScreenUtil from "./ScreenUtil";

/**
 * 导航条工具类
 */
export default class NavigationUtil {

    /**
     * [dispatch 页面跳转]
     * @param  {[StackNavigator]} route      [routeconfigs对应的路由名称]
     * @param  {[props]} props      [上下文参数]
     * @param {[Object} parameter   [参数]
     * @return {[Component]}        [返回对于的页面]
     */
    static dispatch(props, route, parameter = {}) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route}),  //要跳转的路由
            ]
        })
        props.navigation.dispatch(resetAction);
    }

    /**
     *
     * @param props
     */
    static goBack(props) {
        DeviceEventEmitter.emit("refresh", true);
        props.navigation.goBack();
    }

    /**
     *
     * @param propsH
     * @param routeName 路由名称
     * @param parameter 参数
     */
    static navigate(props, routeName, parameter = {}) {
        props.navigation.navigate(routeName, parameter);
    }

    static navigation(navigation, routeName, parameter = {}) {
        navigation._navigation.navigate(routeName, parameter);
    }


    /**
     * 更新导航配置
     * @param  {[type]} obj    [当前路由对象]
     * @param  {[type]} config [json数据]
     * @return {[type]}        [json]
     */
    static update(obj, config) {
        //设置参数，主要为了触发buildNavigation();
        obj.props.navigation.setParams({
            config: config
        });
    }

}