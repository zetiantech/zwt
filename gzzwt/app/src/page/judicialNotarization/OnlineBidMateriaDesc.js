/**
 * @description 公证申办材料说明
 * @author heweifeng
 */
import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Flex,
  List,
  Stepper,
  WhiteSpace,
  WingBlank,
  Button,
  Provider,
} from '@ant-design/react-native';

import {IconFill, IconOutline} from '@ant-design/icons-react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import JSBridge from 'src/bridge/JSBridge.js';

export default function OnlineBidMateriaDesc(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="材料说明"
      hide={false}
    />
  );
  const item = props.navigation.getParam('item', ''); // 获取参数
  function handleDownload(item) {
    const bridge = new JSBridge(props);
    bridge.download(item.link, item.name);
  }
  return (
    <View style={styles.container}>
      {navigationBar}
      <ScrollView showsVerticalScrollIndicator={false}>
        <WhiteSpace size="lg" />
        <View style={styles.descBox}>
          <Text style={styles.title}>{item.name}的材料要求</Text>
          {item.describe &&
            item.describe.split('；').map((item, index) => {
              return (
                item !== '' && (
                  <Text style={styles.desc} key={index}>
                    {item}
                  </Text>
                )
              );
            })}
          <WhiteSpace size="lg" />
          {item.list && item.list.length && (
            <>
              <Text style={styles.title}>下载附件</Text>
              {item.list.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleDownload(item)}>
                    <Text style={styles.links}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  descBox: {
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 30,
    height: 30,
    marginVertical: 5,
  },
  desc: {
    color: '#333',
    marginVertical: 5,
  },
  links: {
    color: '#2F74ED',
    paddingVertical: 5,
    marginVertical: 5,
  },
});
