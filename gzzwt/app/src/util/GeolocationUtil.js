import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation'; // 定位

export default class GeolocationUtil {
  static getCurrentPosition() {
    return new Promise(async (resolve, reject) => {
      if (Platform.OS == 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
      }
      await init({
        ios: '772839d1ed2d5a2ceec04c4c71d74787',
        android: '26f88ef3ec592828be65d29fdea1af5b',
      });
      Geolocation.getCurrentPosition(
        ({coords, location}) => {
          resolve({...coords, city: location.city});
        },
        error => {
          console.log(error);
          reject(error);
        },
      );
    });
  }
}
