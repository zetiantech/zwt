/**
 * @description 律师事务所查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  List,
  ListView,
  WhiteSpace,
  Flex,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

const Item = List.Item;

/**
 * 列表项
 * @param {*} item 列表项数据
 */
const ListItem = ({item, props}) => {
  return (
    <Item
      style={styles.item}
      styles={{Line: {borderBottomWidth: 0}}}
      arrow="horizontal"
      onPress={() =>
        NavigationUtil.navigate(props, 'DestinationMap', {
          info: {
            title: '律师事务所查询',
            coords: {
              name: item.institutionName,
              longitude: item.longitude,
              latitude: item.latitude,
              address: item.institutionAddress,
            },
          },
        })
      }>
      <View style={styles.titleView}>
        <Flex>
          <Flex.Item style={styles.titleBox}>
            <Text style={styles.mainTitle}>{item.institutionName}</Text>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={styles.detailBox}>
            <Text style={styles.subTitle}>
              联系电话：
              <Text style={styles.strongTitle}>{item.phone}</Text>
            </Text>
            <Text style={styles.subTitle}>
              地址：
              <Text style={styles.strongTitle}>{item.institutionAddress}</Text>
            </Text>
          </Flex.Item>
        </Flex>
      </View>
    </Item>
  );
};

/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */
const ScrollViewer = ({getData, setListView, props}) => {
  return (
    <>
      <ListView
        refreshable={false}
        ref={ref => setListView(ref)}
        onFetch={getData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={(item, index) => {
          return (
            <>
              <WhiteSpace size="lg" />
              <ListItem item={item} props={props} />
            </>
          );
        }}
        numColumns={1}
      />
      <WhiteSpace size="sm" style={{backgroundColor: '#F0F0F0'}} />
    </>
  );
};

export default function LawFirmResult(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="律师事务所查询结果"
      hide={false}
    />
  );
  const params = props.navigation.getParam('params', ''); // 获取参数
  const [listView, setListView] = useState([]); // 用来接收列表元素

  useEffect(() => {
    if (listView.ulv && params) {
      listView.ulv.scrollToOffset({x: 0, y: 0, animated: true});
      listView.refresh();
    }
  }, [params]);
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.post(API.GETLAWYEROFFICE, {
      ...params,
      page: page,
      size: 20,
    })
      .then(data => {
        data = data.data;
        if (data.code === 0) {
          startFetch(data.data.list, 20);
        } else {
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      })
      .catch(err => {
        ToastUtil.toast('获取数据失败', 'center');
        abortFetch();
      });
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <ScrollViewer
          getData={getData}
          setListView={setListView}
          props={props}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  label: {
    color: '#999999',
  },
  value: {
    color: '#333333',
    flex: 2,
    fontSize: 16,
  },
  item: {
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 10,
  },
  strongTitle: {
    color: '#333',
  },
});
