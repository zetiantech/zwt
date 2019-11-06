/**
 * @description 我的预约
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, DeviceEventEmitter} from 'react-native';

import {
  Button,
  List,
  Checkbox,
  Flex,
  WhiteSpace,
  Modal,
  ListView,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import commonJudge from './CommonyJudge';
import dayjs from 'dayjs';

const Item = List.Item;

/**
 * 每一条列表样式
 * @param {Object} item 数据
 * @param {Function} handleSelect 触发选择方法
 */
const ListItem = ({item, handleSelect}) => {
  return (
    <Item
      style={styles.item}
      thumb={
        <>
          <Image
            resizeMode="contain"
            source={{
              uri:
                item.thumbnailUrl ||
                'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
            }}
            style={styles.image}
          />
        </>
      }>
      <View style={styles.titleView}>
        <Flex>
          <Flex.Item style={styles.titleBox}>
            <Text style={styles.mainTitle}>{item.name}</Text>
          </Flex.Item>
          <Flex.Item style={styles.checkBox}>
            <Checkbox
              onChange={event => {
                handleSelect(item.id);
              }}></Checkbox>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={styles.detailBox}>
            <Text style={[styles.subTitle, styles.firstSubTitle]}>
              著者: {item.author}
            </Text>
            <Text style={styles.subTitle}>图书馆: {item.libraryName}</Text>
            <Text style={styles.subTitle}>
              取消时间: {dayjs(item.cancelApplyTime).format('YYYY-MM-DD')}
            </Text>
          </Flex.Item>
          <Flex.Item>
            <View style={styles.timeBox}>
              <Text style={styles.subFont}>预约时间</Text>
              <Text style={styles.subFont}>
                {dayjs(item.applyTime).format('YYYY-MM-DD')}
              </Text>
            </View>
          </Flex.Item>
        </Flex>
      </View>
    </Item>
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
              <ListItem item={item} handleSelect={handleSelect} />
              <WhiteSpace size="sm" />
            </>
          );
        }}
        numColumns={1}
      />
      {selectBox.length !== 0 && children}
    </>
  );
};

export default function Booking(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="我的预约"
      hide={false}
    />
  );
  const [selectBox, setSelectBox] = useState([]); // 多选框选中的值
  const [listView, setListView] = useState([]); // 用来接收列表元素
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    decide();
    // 监听从注册/绑定页面返回当前页, 重新刷新页面
    const subscription = DeviceEventEmitter.addListener('fromBookBack', () => {
      decide();
    });
    return () => {
      subscription.remove();
    };
  }, []);
  // 判断有没有权限
  function decide() {
    setHasPermission(false);
    commonJudge(props).then(({hasPermission}) => {
      setHasPermission(hasPermission);
    });
  }
  /**
   * 触发选择
   * @param {String} value
   */
  function handleSelect(value) {
    let selectArr = selectBox.concat();
    selectArr.splice(selectBox.indexOf(value), 1);
    selectBox.indexOf(value) === -1
      ? setSelectBox([...selectBox, value])
      : setSelectBox(selectArr);
  }
  // 触发取消
  function handleCancel() {
    Modal.alert('', <Text style={styles.alertContent}>确定要取消吗?</Text>, [
      {
        text: '返回',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {text: '确定', onPress: cancelBooking},
    ]);
  }
  // 取消预约
  function cancelBooking() {
    HttpUtil.post(API.UPDATECANCELAPPLYBOOK, {
      applyIds: selectBox.join(','),
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        ToastUtil.toast('取消成功', 'center');
        listView.refresh();
        setSelectBox([]);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.get(API.GETAPPLYBOOKLIST, {
      cardId: 1,
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
      .catch(() => {
        abortFetch();
      });
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        {hasPermission && (
          <ScrollViewer
            getData={getData}
            selectBox={selectBox}
            handleSelect={handleSelect}
            setListView={setListView}>
            <View style={styles.btnBox}>
              <Button type="warning" onPress={handleCancel}>
                取消预约
              </Button>
            </View>
          </ScrollViewer>
        )}
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
    width: GlobalStyles.window_width,
    marginLeft: 0,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
    marginTop: 12,
  },
  titleView: {
    paddingLeft: 15,
    marginBottom: 12,
    marginTop: 12,
    display: 'flex',
    flex: 1,
  },
  mainTitle: {
    fontSize: 18,
  },
  subTitle: {
    color: '#999999',
    marginTop: 5,
    width: GlobalStyles.window_width - 200,
  },
  firstSubTitle: {
    marginTop: 15,
  },
  subFont: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: '#666',
    width: 80,
  },
  btnBox: {
    padding: 15,
    backgroundColor: '#fff',
  },
  titleBox: {
    flex: 5,
  },
  checkBox: {
    alignItems: 'flex-end',
    width: 10,
  },
  timeBox: {
    width: 100,
    alignSelf: 'flex-end',
  },
  alertContent: {
    fontSize: 18,
    padding: 30,
  },
});
