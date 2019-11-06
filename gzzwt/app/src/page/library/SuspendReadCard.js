/**
 * @description 读书证挂失
 * @author heweifeng
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  Button,
  List,
  WhiteSpace,
  InputItem,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Form = ({cardCode, setCardCode, passwd, setPasswd}) => {
  return (
    <List>
      <InputItem
        clear
        textAlign="right"
        value={cardCode}
        onChange={setCardCode}
        placeholder="请输入读书证号">
        <Text style={styles.label}>读书证号</Text>
      </InputItem>
      <InputItem
        clear
        textAlign="right"
        type="password"
        value={passwd}
        onChange={setPasswd}
        placeholder="请输入密码">
        <Text style={styles.label}>密码</Text>
      </InputItem>
    </List>
  );
};

export default function SuspendReadCard(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="读书证挂失"
      hide={false}
    />
  );
  const [cardCode, setCardCode] = useState(''); // 读书证号
  const [passwd, setPasswd] = useState(''); // 密码

  // 触发挂失操作
  function handleSuspend() {
    if (cardCode === '') {
      ToastUtil.error('请输入读书证号');
    } else if (passwd === '') {
      ToastUtil.error('请输入密码');
    } else {
      HttpUtil.post(API.UPDATELOSSREADCARD, {
        cardCode,
        passwd,
      }).then(data => {
        data = data.data;
        if (data.code === 0) {
          setCardCode('');
          setPasswd('');
          NavigationUtil.navigate(props, 'SuspendReadCardSuccess');
        } else {
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      });
    }
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace size="xl" />
        <Form
          cardCode={cardCode}
          setCardCode={setCardCode}
          passwd={passwd}
          setPasswd={setPasswd}
        />
        <WhiteSpace size="xl" />
        <Button style={styles.submitBtn} type="primary" onPress={handleSuspend}>
          挂失
        </Button>
        <WhiteSpace size="md" />
        <Text style={styles.subDesc}>
          注：挂失后须到图书馆才可办理解挂手续，请慎重操作
        </Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  submitBtn: {
    width: GlobalStyles.window_width - 30,
    alignSelf: 'center',
  },
  subDesc: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
  },
});
