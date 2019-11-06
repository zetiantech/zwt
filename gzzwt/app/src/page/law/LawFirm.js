/**
 * @description 律师事务所查询
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

export default function LawFirm(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="律师事务所查询"
      hide={false}
    />
  );
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({
    institutionName: {
      label: '机构名称',
      type: 'InputItem',
      validator: [
        {
          rule: 'require',
          tip: '请输入机构名称',
        },
      ],
      height: 50,
      attr: {
        textAlign: 'right',
        placeholder: '请输入机构名称',
      },
    },
    institutionAddress: {
      label: '机构地址',
      type: 'InputItem',
      height: 50,
      attr: {
        textAlign: 'right',
        placeholder: '请输入机构地址（选填）',
      },
    },
  });
  function handleNext() {
    validate({showData, data, setShowData})
      .then(() => {
        NavigationUtil.navigate(props, 'LawFirmResult', {
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
