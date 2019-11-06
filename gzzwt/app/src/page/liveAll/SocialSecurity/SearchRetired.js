/**
 * @description 社会管理退休人员信息查询
 * @author heweifeng
 */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {
  WingBlank,
  WhiteSpace,
  Button,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form, {validate} from 'src/component/FormComponent'; // 表单

export default function SearchRetired(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="社会管理退休人员信息查询"
      hide={false}
      statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
    />
  );
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({
    name: {
      label: '姓名',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请输入姓名',
        },
      ],
      height: 50,
      attr: {
        textAlign: 'right',
        placeholder: '请输入姓名',
      },
    },
    idCard: {
      label: '身份证号',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请输入身份证号',
        },
        {
          rule: 'idcard',
          tip: '请输入正确的身份证号',
        },
      ],
      height: 50,
      attr: {
        textAlign: 'right',
        placeholder: '请输入身份证号',
      },
    },
  });
  function handleNext() {
    validate({showData, data, setShowData})
      .then(() => {
        NavigationUtil.navigate(props, 'SearchRetiredInfo', {
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
