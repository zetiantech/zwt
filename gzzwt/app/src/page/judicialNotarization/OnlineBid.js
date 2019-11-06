/**
 * @description 公证申办
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

import {
  Flex,
  List,
  ListView,
  WhiteSpace,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Item = List.Item;

export default function OnlineBid(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="公证申办"
      hide={false}
    />
  );
  const [list, setList] = useState([]);

  useEffect(() => {
    HttpUtil.get(API.GETFOREIGNJUSTICES, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        setList(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {navigationBar}
      <List renderHeader={'涉外公证用途'}>
        {list.map((item, index) => {
          return (
            <Item
              key={index}
              arrow="horizontal"
              onPress={() =>
                NavigationUtil.navigate(props, 'OnlineBidSubList', {
                  id: item.id,
                })
              }>
              {item.name}
            </Item>
          );
        })}
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});
