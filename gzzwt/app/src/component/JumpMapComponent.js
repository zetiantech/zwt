
/**
 * 例子
const [MapFlag, setMapFlag] = useState(false);    
{MapFlag && <JumpMap setMapFlag={setMapFlag} data={data} />}
 * 
 */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Provider,
    Button,
    Modal
} from '@ant-design/react-native';
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位

/**
 * 
 * @param {*} setMapFlag 显示隐藏
 *  @param {*} data 终点名称终点经纬度
 * data {
 * address,latitude,longitude
 *  } 
 */
const JumpMap = ({ setMapFlag, data }) => {
    const [mapList, setMapList] = useState([]);
    const [coords, setCoords] = useState([]);
    useEffect(() => {
        judgeMap().then((list) => {
            list.length && setMapList(list);
        })
        //获取当前位置
        GeolocationUtil.getCurrentPosition().then((coords) => {
            setCoords(coords);
        }).catch((error) => {
            if (error.code === 12) {
                ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
            }
        });
    }, [])
    /**
    * 判断拥有哪些地图
    */
    async function judgeMap() {
        let mapList = [];
        const androidamap = await Linking.canOpenURL("androidamap://keywordNavi")
        androidamap && mapList.push('高德地图')
        const baidumap = await Linking.canOpenURL("baidumap://map/")
        baidumap && mapList.push('百度地图')
        // const qqmap = await Linking.canOpenURL("qqmap://map/routeplan")
        // qqmap && mapList.push('腾讯地图')
        if (Platform.OS == 'ios') {
            const iosMap = await Linking.canOpenURL(`http://maps.apple.com/`)
            iosMap && mapList.push('ios地图')
        }
        !mapList.length && mapList.push('暂无地图,请先下载地图');
        return mapList;
    }
    /**
  * 打开地图
  */
    function openMap(mapName) {
        // let mapUrl = {
        //     '百度地图': BaiduMap,
        //     '高德地图': GaodeMap,
        //     '腾讯地图': QqMap,
        //     'ios地图': iosMap
        // }[mapName];
        // mapUrl(data);
        JumpMap(mapName)
    }
    /**
     * 跳转对应地图
     * @param {*} name 地图名 
     */
    function JumpMap(name) {
        /**
         * 每个地图对应的官方文档
         * 百度地图：https://lbsyun.baidu.com/index.php?title=uri/api/android
         * 高德地图：https://lbs.amap.com/api/amap-mobile/guide/ios/route
         * 腾讯地图：https://lbs.qq.com/uri_v1/guide-mobile-navAndRoute.html
         */
        //referer 是腾讯地图的key值
        let urlObj = {
            '腾讯地图': `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=${coords.latitude},${coords.longitude}&to=${data.address}&tocoord=${data.latitude},${data.longitude}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
        };
        if (Platform.OS == 'ios') {
            urlObj = {
                ...urlObj,
                '百度地图': `baidumap://map/direction?origin=name:我的位置|latlng:${coords.latitude},${coords.longitude}&destination=name:${data.address}|latlng:${data.latitude},${data.longitude}&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo`,
                '高德地图': `iosamap://path?sourceApplication=applicationName&sid=&slat=${coords.latitude}&slon=${coords.longitude}&sname=我的位置&did=&dlat=${data.latitude}&dlon=${data.longitude}&dname=${data.address}&dev=0&t=0`,
                'ios地图': `http://maps.apple.com/?ll=${data.latitude},${data.longitude}&q=${data.address}&dirflg=d`
            }
        } else {
            urlObj = {
                ...urlObj,
                '百度地图': `baidumap://map/direction?&origin=name:我的位置|latlng:${coords.latitude},${coords.longitude}&destination=name:${data.address}|latlng:${data.latitude},${data.longitude}&coord_type=bd09ll&mode=driving&src=andr.baidu.openAPIdemo`,
                '高德地图': `amapuri://route/plan/?sid=&slat=${coords.latitude}&slon=${coords.longitude}&sname=我的位置&did=&dlat=${data.latitude}&dlon=${data.longitude}&dname=${data.address}&dev=0&t=0`
            }
        }
        let url = urlObj[name];
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                ToastUtil.toast('请先下载' + name, 'center');
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    return (
        <Provider>
            <Modal
                popup
                visible={true}
                maskClosable
                animationType="slide-up"
                onClose={() => setMapFlag(false)}
            >
                <View>
                    {
                        mapList.map((item, index) => {
                            return (
                                <TouchableOpacity key={item + index} style={styles.MapText1} onPress={() => openMap(item)}>
                                    <Text style={styles.mapText}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Button type="primary" onPress={() => setMapFlag(false)}>取消</Button>
            </Modal>
        </Provider>
    )
}
const styles = StyleSheet.create({
    MapText1: {
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1
    },
    mapText: {
        height: 60,
        lineHeight: 60,
        textAlign: 'center',
    }
})
export default JumpMap