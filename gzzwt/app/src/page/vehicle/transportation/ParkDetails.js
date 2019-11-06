/**
 * @description 药店位置
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Provider,
    Button
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
// import AMAPComponent from 'src/component/AMAPComponent'//头部导航
import JumpMap from 'src/component/JumpMapComponent'//跳转第三方地图
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import { MapView } from 'react-native-amap3d'


/**
 * 医院地址
 */
function Address({ data, onSubmitLogin }) {
    return (
        <View style={styles.infoBox}>
            <View style={styles.infoTop}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.distance}>{data.distance}km</Text>
                <Text style={styles.address}>{data.address || '-'}</Text>
            </View>
            <View style={styles.btnWrap}>
                <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>到这去</Button>
            </View>
        </View>
    )
}
/**
 * 地图组件
 * @param {*} param0 
 */
function MapContainer({ data }) {
    let coordinate = {
        latitude: Number(data.location.split(',')[1]),
        longitude: Number(data.location.split(',')[0]),
    }
    return (
        <MapView style={styles.map}
            locationEnabled={true}
            coordinate={coordinate}
        >
            <MapView.Marker
                draggable={true}
                title={data.name}
                coordinate={coordinate}
            />
        </MapView>
    )
}


export default function ParkDetails(props) {
    const [coords, setCoords] = useState({
        latitude: 23.10623,
        longitude: 113.323656,
    }); // 定位坐标
    const [MapFlag, setMapFlag] = useState(false);
    const data = props.navigation.getParam('info', {});//参数,医院经纬度
    const address = {
        address: data.name,
        latitude: Number(data.location.split(',')[1]),
        longitude: Number(data.location.split(',')[0])
    }
    useEffect(() => {
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
     * 点击位置导航
     * @param {*} params 
     */
    function onSubmitLogin() {
        setMapFlag(true)
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='停车场位置' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <View style={styles.mapWrap}>
                    <MapContainer data={data} />
                    <Address data={data} onSubmitLogin={onSubmitLogin} />
                    {MapFlag && <JumpMap setMapFlag={setMapFlag} data={address} />}
                </View>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    mapWrap: {
        flex: 1,
        position: 'relative'
    },
    map: {
        flex: 1
    },
    infoBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    infoTop: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    },
    name: {
        color: '#333333',
        fontSize: 16,
        marginBottom: 5
    },
    distance: {
        color: '#333333',
        marginBottom: 5
    },
    address: {
        color: '#999999'
    },
    btnWrap: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    btnBox: {
        borderRadius: 50,
        height: 50,
        backgroundColor: '#2F74ED'
    }
})