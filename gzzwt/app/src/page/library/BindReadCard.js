/**
 * @description 读书证挂失
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';

import {Button, List, WhiteSpace, Provider} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from 'src/util/NavigationUtil'; // 导航库

const Item = List.Item;

const Form = ({showData, data}) => {
  return (
    <List>
      {Object.keys(showData).map((item, index) => {
        return (
          <Item key={index} extra={data[item] || '-'} arrow="empty">
            <Text style={styles.label}>{showData[item]}</Text>
          </Item>
        );
      })}
    </List>
  );
};

export default function BindReadCard(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="绑定读书证"
      hide={false}
    />
  );
  const [data, setData] = useState({
    id: '-',
    cardCode: '-',
    idCard: '-',
    name: '-',
    libraryName: '-',
  }); // 读书证号

  const showData = {
    cardCode: '读书证号',
    idCard: '身份证号码',
    name: '姓名',
    libraryName: '开户馆名称',
  };

  useEffect(() => {
    HttpUtil.get(API.GETUSERBOOKINFO, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        setData(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
    return () => {
      DeviceEventEmitter.emit('fromBookBack');
    };
  }, []);
  // 触发绑定操作
  function handleBind() {
    HttpUtil.post(API.UPDATEBINDREADCARD, {
      id: data.id,
      cardCode: data.cardCode,
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        ToastUtil.toast('绑定成功', 'center', 'short', () =>
          NavigationUtil.goBack(props),
        );
      } else {
        ToastUtil.toast('绑定失败', 'center');
      }
    });
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace size="xl" />
        <Form data={data} showData={showData} />
        <WhiteSpace size="xl" />
        <Button style={styles.submitBtn} type="primary" onPress={handleBind}>
          绑定账号
        </Button>
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
  label: {
    color: '#333333',
    fontSize: 16,
  },
});
