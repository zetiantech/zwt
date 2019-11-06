/**
 * @description 社保关系转移情况查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {List, ListView, WhiteSpace, Provider} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import Form from 'src/component/FormComponent'; // 表单
import dayjs from 'dayjs'; // 日期格式化

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
    comanyName: '单位名称',
    cardNo: '卡号',
    changeType: '变更类型',
    operator: '经办人',
    agency: '经办机构',
    changeInformation: '变更信息',
    createTime: '经办日期',
    updateTime: '变更日期',
  };
  return <Form showData={showData} data={item} />;
};

/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */
const ScrollViewer = ({getData, setListView}) => {
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
              <ListItem item={item} />
            </>
          );
        }}
        numColumns={1}
      />
      <WhiteSpace size="sm" style={{backgroundColor: '#F0F0F0'}} />
    </>
  );
};

export default function PersonalAccountResult(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="社保关系转移查询结果"
      hide={false}
      statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
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
    HttpUtil.post(API.GETINSURANCETRANSFER, {
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
});
