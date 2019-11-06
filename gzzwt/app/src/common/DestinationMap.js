/**
 * @description 在地图上显示目的地位置,可点击按钮跳转到第三方导航
 * @author heweifeng
 * @example
 * NavigationUtil.navigate(props, 'DestinationMap', {
 *     info: {
 *      title: '页面头部标题',
 *      coords: {
 *          longitude: 120.22,
 *          latitude: 22.22,
 *          name: '目的地名称',
 *          address: '目的地地址'
 *      }
 * }});
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Provider, Button} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'; //头部导航
import GeolocationUtil from 'src/util/GeolocationUtil'; //定位

import {MapView} from 'react-native-amap3d';
import JumpMap from 'src/component/JumpMapComponent.js';

/**
 * 显示地址说明
 */
function Address({data, onSubmitLogin}) {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoTop}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.address}>{data.address}</Text>
      </View>
      <View style={styles.btnWrap}>
        <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>
          到这去
        </Button>
      </View>
    </View>
  );
}
/**
 * 地图组件
 * @param {*} param0
 */
function MapContainer({coords, unitPosition}) {
  return (
    <MapView
      style={styles.map}
      coordinate={unitPosition}
      locationEnabled={true}
      locationInterval={10000}
      distanceFilter={10}>
      <MapView.Marker
        draggable={false}
        title={unitPosition.name}
        coordinate={unitPosition}
      />
    </MapView>
  );
}

export default function DestinationMap(props) {
  const params = props.navigation.getParam('info', {});
  const unitPosition = {
    ...params.coords,
  };
  const [MapFlag, setMapFlag] = useState(false); //
  const [coords, setCoords] = useState({
    latitude: 23.10623,
    longitude: 113.323656,
  }); // 定位坐标
  useEffect(() => {
    GeolocationUtil.getCurrentPosition()
      .then(coords => {
        setCoords(coords);
      })
      .catch(error => {
        if (error.code === 12) {
          ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
        }
      });
  }, []);
  /**
   * 点击位置导航
   * @param {*} params
   */
  function onSubmitLogin(params) {
    setMapFlag(true);
  }

  return (
    <Provider>
      <View style={styles.container}>
        <NavigationBar
          navigator={props.navigation}
          popEnabled={true}
          title={params.title}
          hide={false}
        />
        <View style={styles.mapWrap}>
          <MapContainer coords={coords} unitPosition={unitPosition} />
          <Address data={unitPosition} onSubmitLogin={onSubmitLogin} />
          {MapFlag && <JumpMap setMapFlag={setMapFlag} data={unitPosition} />}
        </View>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  mapWrap: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
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
    borderBottomWidth: 1,
  },
  name: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
  },
  distance: {
    color: '#333333',
    marginBottom: 5,
  },
  address: {
    color: '#999999',
  },
  btnWrap: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnBox: {
    borderRadius: 50,
    height: 50,
    backgroundColor: '#2F74ED',
  },
});
