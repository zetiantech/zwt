'use strict';

import React from 'react';
import {Alertm, Platform} from 'react-native';

import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions';
import LogUtil from './LogUtil';

/**
 * @description 申请系统权限工具类
 * @time 2019/10/05
 **/

export default class PermissionUtil {
  /**
   * 检查权限
   * @param successCallback //成功回调
   * @param permission 权限 数组
   * @param failCallback  //失败回调
   */
  static checkPermission(
    successCallback,
    permission,
    failCallback = undefined,
  ) {
    let self = this;
    let flag = true;
    let per = [];
    if (permission.length <= 0) {
      return;
    }
    const permissionTable = {
      android: {
        photo: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        camera: PERMISSIONS.ANDROID.CAMERA,
        location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        microphone: PERMISSIONS.ANDROID.RECORD_AUDIO,
        contacts: PERMISSIONS.ANDROID.READ_CONTACTS,
      },
      ios: {
        photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
      },
    };
    const checkPermission = permission.map(item => {
      if (permissionTable[Platform.OS][item])
        // return Permissions.check(permissionTable[item]);
        return permissionTable[Platform.OS][item];
    });
    self.requestPermission(successCallback, failCallback, checkPermission, 0);

    // Promise.all(checkPermission).then(status => {
    //   //直接修改设置 检测不到授权结果
    //   LogUtil.debug('permission-status', status);
    //   Object.keys(status).map((k, v) => {
    //     if (status[k] != RESULTS.GRANTED) {
    //     } else {
    //       per.push(permission[k]);
    //       flag = false;
    //     }
    //   });
    //   if (flag) {
    //     successCallback();
    //   } else {
    //     if (per.length > 0) {
    //       self.requestPermission(successCallback, failCallback, per, 0);
    //     }
    //   }
    // });
  }

  /**
   * @description 请求权限
   * @param successCallback
   * @param failCallback
   * @param per 权限数组
   * @param i 权限数组所以
   */
  static requestPermission(successCallback, failCallback, per, i) {
    let self = this;
    if (i < per.length) {
      Permissions.request(per[i])
        .then(res => {
          LogUtil.debug('请求权限结果:', res);
          if (res != RESULTS.GRANTED) {
            //如果没有授权
            /*如果有失败回调则执行回调，没有则弹窗提示权限*/
            if (failCallback) {
              failCallback();
              return;
            }
            switch (per[i]) {
              case 'camera':
                Alert.alert('无法使用!', '请授予应用使用相机权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
              case 'photo':
                Alert.alert('无法访问!', '请授予应用访问存储sd卡权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
              case 'location':
                Alert.alert('无法访问!', '请授予应用访问位置信息权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
              case 'microphone':
                Alert.alert('无法访问!', '请授予应用录音权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
              case 'contacts':
                Alert.alert('无法访问!', '请授予应用获取联系人权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
              default:
                Alert.alert('无法访问!', '请授予应用权限', [
                  {text: '取消', style: 'cancel'},
                  {text: '设置权限', onPress: Permissions.openSettings},
                ]);
                break;
            }
          } else {
            //自增同步继续执行请求下一个权限
            self.requestPermission(successCallback, failCallback, per, ++i);
          }
        })
        .catch(e => LogUtil.debug(e));
    } else {
      successCallback();
    }
  }
}
