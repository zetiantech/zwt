/**
 * @description 社会管理退休人员信息
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {List, Provider, WhiteSpace} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form from 'src/component/FormComponent'; // 表单

const Item = List.Item;

const ListItem = ({item}) => {
  const showData = {
    name: {
      label: '姓名',
      type: 'text',
      inheritAll: true, // 其他项是否继承当前的所有属性
      height: 50, // 自定义高度
      labelStyle: styles.label,
      valueStyle: styles.value,
      attr: {
        align: 'top',
        borderBottom: false, //不显示下边框线, 设置了multipleLine时用
        multipleLine: true, // 多行
      },
    },
    idCard: '身份证号',
    age: '年龄',
    retireDate: '退休时间',
    everyReceiveMoney: '每月退休金额',
    alreadyReceiveMoney: '已领退休金额',
  };
  return <Form showData={showData} data={item} />;
};

export default function SearchRetiredInfo(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="社会管理退休人员信息查询结果"
      hide={false}
      statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
    />
  );
  const params = props.navigation.getParam('params', ''); // 获取参数
  const [data, setData] = useState({});

  useEffect(() => {
    HttpUtil.post(API.GETSOCIALRETIRER, {
      ...params,
    })
      .then(data => {
        data = data.data;
        if (data.code === 0) {
          setData(data.data);
        } else {
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      })
      .catch(err => {
        ToastUtil.toast('获取数据失败', 'center');
      });
  }, []);
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace size="lg" />
        <ListItem item={data} />
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
});
