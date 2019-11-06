/**
 * @description 执业律师查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

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
    code: '法律执业资格证书编号',
    sex: {
      label: '性别',
      type: 'text',
      labelStyle: styles.label,
      valueTemplate: item => (
        <Text style={styles.value}>{{0: '男', 1: '女'}[item]}</Text>
      ),
      attr: {
        align: 'top',
        borderBottom: false, //不显示下边框线, 设置了multipleLine时用
        multipleLine: true, // 多行
      },
    },
    nation: '民族',
    education: '学历（最高）',
    politicalOutlook: '政治面貌',
    professional: '执业机构',
    lawyerCardNumber: '律师执业证号',
    status: '律师状态',
  };
  return <Form showData={showData} data={item} />;
};

export default function PracticingLawyerResult(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="执业律师查询结果"
      hide={false}
    />
  );
  const params = props.navigation.getParam('params', ''); // 获取参数
  const [data, setData] = useState({});

  useEffect(() => {
    HttpUtil.post(API.GETPRACTICINGLAWYER, {
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
