/**
 * @description 判断是否已有读书证
 * @author heweifeng
 */
import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Modal} from '@ant-design/react-native';

import NavigationUtil from 'src/util/NavigationUtil'; // 导航库
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

export function hasReadCard(props) {
  Modal.alert(
    '',
    <Text style={styles.alertContent}>您已有读书证,是否绑定</Text>,
    [
      {
        text: '取消',
        onPress: () => NavigationUtil.goBack(props),
        style: 'cancel',
      },
      {
        text: '马上绑定',
        onPress: () => NavigationUtil.navigate(props, 'BindReadCard'),
      },
    ],
  );
}

export function noHasReadCard(props) {
  Modal.alert('', <Text style={styles.alertContent}>您还未注册读书证</Text>, [
    {
      text: '取消',
      onPress: () => NavigationUtil.goBack(props),
      style: 'cancel',
    },
    {
      text: '创建新账号',
      onPress: () => NavigationUtil.navigate(props, 'RegisterReadCard'),
    },
  ]);
}
export default function commonJudge(props) {
  return new Promise((resolve, reject) => {
    HttpUtil.get(API.GETUSERBOOKINFO, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        if (data.data) {
          if (!data.data.userId) {
            hasReadCard(props);
            resolve({hasPermission: false});
          } else {
            resolve({hasPermission: true, id: data.data.id});
          }
        } else {
          noHasReadCard(props);
          resolve({hasPermission: false});
        }
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  });
}

const styles = StyleSheet.create({
  alertContent: {
    fontSize: 18,
    padding: 30,
    color: '#333',
  },
});
