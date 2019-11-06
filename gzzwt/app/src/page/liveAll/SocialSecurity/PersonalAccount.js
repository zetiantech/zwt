/**
 * @description 个人失业登记信息查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

import {
  List,
  WingBlank,
  WhiteSpace,
  Button,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form, {validate} from 'src/component/FormComponent'; // 表单

export default function PersonalAccount(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="个人账户划拨金查询"
      hide={false}
      statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
    />
  );
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({
    startDate: {
      label: '开始日期',
      type: 'DatePicker',
      validator: [
        {
          rule: 'require',
          tip: '请选择开始日期',
        },
      ],
      height: 50,
      attr: {
        defaultDate: new Date(),
        minDate: new Date(2010, 1, 1),
        maxDate: new Date(),
      },
    },
    endDate: {
      label: '结束日期',
      type: 'DatePicker',
      height: 50,
      validator: [
        {
          rule: 'require',
          tip: '请选择结束日期',
        },
      ],
      attr: {
        defaultDate: new Date(),
        minDate: new Date(2010, 1, 1),
        maxDate: new Date(),
      },
    },
  });
  function handleNext() {
    validate({showData, data, setShowData})
      .then(() => {
        NavigationUtil.navigate(props, 'PersonalAccountResult', {
          params: {
            ...data,
          },
        });
      })
      .catch(err => {
        ToastUtil.error(err);
      });
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace size="lg" />
        <Form
          showData={showData}
          data={data}
          setData={setData}
          setShowData={setShowData}
        />
        <WingBlank>
          <WhiteSpace size="xl" />
          <Button type="primary" onPress={() => handleNext()}>
            查询
          </Button>
          <WhiteSpace />
        </WingBlank>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});
