/***
 * @description 高德地图组件
 * @author Jonne
 * 
 ***/

 import React, { Component } from 'react'
 import PropTypes from 'prop-types'

 import {
    View,
    Text,
    StyleSheet
 } from  'react-native'

import { MapView } from 'react-native-amap3d'



export default class MapComponent extends Component{
    static propTypes = {
        style: PropTypes.object, 
        coordinate: PropTypes.object,// 中心坐标
        zoomLevel: PropTypes.number, // 缩放级别
        rotation: PropTypes.number, // 旋转角度
        tilt: PropTypes.number, //  倾斜度
        mapType: PropTypes.string, // 地图类型 标准（standard） 卫星（satellite） 导航（navigation） 公交（bus） 夜间（night）
        locationInterval: PropTypes.number, //定位间隔(ms)，默认 2000
        region: PropTypes.object ,// 显示区域
        distanceFilter: PropTypes.number, //定位的最小更新距离
        locationEnabled: PropTypes.bool, // 开启定位
        showslocationbutton: PropTypes.bool, //显示定位按钮
        showsCompass: PropTypes.bool,
        showsscale: PropTypes.bool,
        showsTraffic: PropTypes.bool,
        onLocation: PropTypes.func,
        onPress: PropTypes.func, //定位事件
        onLongPress: PropTypes.func, // 长按钮事件
        onStatusChange: PropTypes.func, // 地图状态变化事件，变化过程会一直调用
        onStatusChangeComplete: PropTypes.func // 地图状态变化结束事件
    }

    constructor(props) {
        super(props)
    }

    render() {;
        return (
            <MapView
                style={styles.container}
                coordinate={this.props.coordinate}
                zoomLevel={this.props.zoomLevel}
                rotation={this.props.rotation}
                tilt={this.props.tilt}
                mapType={this.props.mapType}
                locationInterval={this.props.locationInterval}
                region={this.props.region}
                distanceFilter={this.props.distanceFilter}     //定位的最小更新距离
                locationEnabled={this.props.locationEnabled}  //开启定位
                showslocationbutton={this.props.showslocationbutton}
                showsCompass={this.props.showsCompass}
                showsscale={this.props.showsscale}
                showsTraffic={this.showsTraffic}
                //onlocation 启动定位显示  regison  中的显示区域
                onLocation={({nativeEvent}) => this.props.onLocation} //定位事件
                onPress={this.props.onPress} 
                onLongPress={this.props.onLongPress} // 长按钮事件
                onStatusChange={this.props.onStatusChange} // 地图状态变化事件，变化过程会一直调用
                onStatusChangeComplete={this.props.onStatusChangeComplete} // 地图状态变化结束事件
            >
                {this.props.children}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});