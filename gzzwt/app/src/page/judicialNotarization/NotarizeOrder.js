/**
 * @description 申办管理
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {
  Button,
  List,
  Checkbox,
  Flex,
  WhiteSpace,
  Modal,
  ListView,
  Tabs,
  WingBlank,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

const Item = List.Item;

/**
 * 每一条列表样式
 * @param {Object} item 数据
 * @param {Function} handleSelect 触发选择方法
 */
const ListItem = ({item, handleSelect, props}) => {
  return (
    <WingBlank>
      <Item
        style={styles.item}
        styles={{Line: {borderBottomWidth: 0}}}
        onPress={
          item.tagStatus === 0 && item.bidStatus === 3
            ? () => {
                NavigationUtil.navigate(props, 'OnlineBidMaterial', {
                  applyId: item.id,
                });
              }
            : false
        }>
        <View style={styles.titleView}>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item style={styles.label}>
              <Text style={styles.subTitle}>申办号</Text>
            </Flex.Item>
            <Flex.Item style={styles.value}>
              <Text style={styles.subValue}>{item.bidCode}</Text>
            </Flex.Item>
            {item.bidStatus !== 2 && (
              <Flex.Item style={styles.checkBox}>
                <Checkbox
                  onChange={event => {
                    handleSelect(item.id);
                  }}></Checkbox>
              </Flex.Item>
            )}
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item style={styles.label}>
              <Text style={styles.subTitle}>申办时间</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subTitle}>申办用途</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subTitle}>申办人</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subTitle}>申办费用</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subTitle}>
                {item.tagStatus === 0 ? '' : '支付'}状态
              </Text>
            </Flex.Item>
            <Flex.Item style={styles.value}>
              <Text style={styles.subValue}>{item.bidTime}</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subValue}>{item.foreignJusticeName}</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subValue}>{item.bider}</Text>
              <WhiteSpace size="lg" />
              <Text style={styles.subValue}>{item.total}</Text>
              <WhiteSpace size="lg" />
              {item.tagStatus === 0 ? (
                <Text style={{color: '#F12F2F'}}>待提交材料</Text>
              ) : (
                <TouchableOpacity onPress={() => console.log('跳到支付')}>
                  <Text
                    style={[
                      styles.subValue,
                      {color: item.payStatus === 2 ? '#52C41A' : '#F12F2F'},
                    ]}>
                    {item.payStatus === 2 ? `已支付` : '未支付'}
                    <Text style={{color: '#CCCCCC'}}>
                      {item.bidStatus === 3 && item.payStatus === 1
                        ? '（点击支付）'
                        : ''}
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </Flex.Item>
          </Flex>
        </View>
      </Item>
    </WingBlank>
  );
};

/**
 * 分页列表
 * @param {React Element} children 子元素
 * @param {Function} getData 获取数据方法
 * @param {Function} handleSelect 触发选择方法
 * @param {Function} selectBox 选择方法
 * @param {Function} setListView 用来接收列表元素
 */

const ScrollViewer = ({
  children,
  getData,
  handleSelect,
  selectBox,
  setListView,
  showData,
  props,
}) => {
  return (
    <>
      <ListView
        ref={ref => setListView(ref)}
        onFetch={getData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={(item, index) => {
          return (
            <>
              {index === 0 && <WhiteSpace size="lg" />}
              <ListItem
                props={props}
                style={{zIndex: 0}}
                item={item}
                handleSelect={handleSelect}
                showData={showData}
              />
              <WhiteSpace size="lg" />
            </>
          );
        }}
        numColumns={1}
      />
      <WhiteSpace size="sm" style={{backgroundColor: '#F0F0F0'}} />
      {selectBox.length !== 0 && children}
    </>
  );
};

export default function NotarizeOrder(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="申办管理"
      hide={false}
    />
  );
  const [selectBox, setSelectBox] = useState({
    1: [],
    2: [],
    3: [],
  }); // 多选框选中的值
  const [tabIndex, setTabIndex] = useState(1); // tab索引值
  const [listView, setListView] = useState([]); // 用来接收列表元素
  const tabs = [
    {
      title: '申办成功',
      index: 1,
    },
    {
      title: '申办中',
      index: 3,
    },
    {
      title: '申办失败',
      index: 2,
    },
  ];

  /**
   * 触发选择
   * @param {String} value
   */
  function handleSelect(value) {
    let selectArr = selectBox[tabIndex].concat();
    selectArr.splice(selectBox[tabIndex].indexOf(value), 1);

    selectBox[tabIndex].indexOf(value) === -1
      ? setSelectBox({
          ...selectBox,
          [tabIndex]: [...selectBox[tabIndex], value],
        })
      : setSelectBox({
          ...selectBox,
          [tabIndex]: [...selectArr],
        });
  }
  // 触发取消
  function handleCancel() {
    Modal.alert(
      '',
      <Text style={styles.alertContent}>
        确定要{{1: '删除', 3: '取消'}[tabIndex]}吗?
      </Text>,
      [
        {
          text: '返回',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {text: '确定', onPress: cancelOrder},
      ],
    );
  }
  // 取消预约
  function cancelOrder() {
    HttpUtil.post(tabIndex === 3 ? API.UPDATEAPPLYS : API.DELAPPLYS, {
      // TODO
      ids: selectBox[tabIndex].join(','),
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        ToastUtil.toast(`${{1: '删除', 3: '取消'}[tabIndex]}成功`, 'center');
        listView.refresh();
        setSelectBox({
          ...selectBox,
          [tabIndex]: [],
        });
      } else {
        abortFetch();
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }
  // tab变化时
  function handleTabChange(tab) {
    setTabIndex(tab.index);
  }
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.post(API.GETJUSTICEAPPLY, {
      bidStatus: tabIndex,
      page: page,
      size: 20,
    })
      .then(data => {
        data = data.data;
        if (data.code === 0) {
          startFetch(data.data, 20);
        } else {
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      })
      .catch(err => {
        abortFetch();
      });
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <Tabs
          tabs={tabs}
          initialPage="1"
          onChange={handleTabChange}
          onTabClick={handleTabChange}
          swipeable={false}
          usePaged={false}
          prerenderingSiblingsNumber={false}
          tabBarActiveTextColor="#2F74ED"
          tabBarUnderlineStyle={{width: 20, marginLeft: 50}}>
          <ScrollViewer
            props={props}
            getData={getData}
            selectBox={selectBox[tabIndex]}
            handleSelect={handleSelect}
            setListView={setListView}>
            <View style={styles.btnBox}>
              <Button type="warning" onPress={handleCancel}>
                {{1: '删除', 3: '取消申办'}[tabIndex]}
              </Button>
            </View>
          </ScrollViewer>
        </Tabs>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    paddingTop: 10,
  },
  list: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    marginLeft: 0,
    borderRadius: 4,
  },
  titleView: {
    paddingLeft: 15,
    marginBottom: 12,
    display: 'flex',
    flex: 1,
  },
  mainTitle: {
    fontSize: 18,
  },
  subTitle: {
    color: '#999999',
  },
  btnBox: {
    padding: 15,
    backgroundColor: '#fff',
  },
  checkBox: {
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    width: 10,
  },
  alertContent: {
    fontSize: 18,
    padding: 30,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 2.5,
    justifyContent: 'center',
  },
});
