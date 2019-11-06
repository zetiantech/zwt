/**
 * @description 借阅查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  DeviceEventEmitter,
} from 'react-native';

import {List, WhiteSpace, ListView, Provider} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';
import GlobalStyles from 'src/res/styles/GlobalStyles';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from 'src/util/NavigationUtil'; // 导航库

import commonJudge from './CommonyJudge';

const Item = List.Item;

const SlideInView = props => {
  const [slideAnim] = useState(new Animated.Value(0)); // 透明度初始值设为0

  useEffect(() => {
    Animated.spring(
      // 随时间变化而执行动画
      slideAnim, // 动画中的变量值
      {
        toValue: 153, // 透明度最终变为1，即完全不透明
        duration: 1000, // 让动画持续一段时间
      },
    ).start();
  }, []);
  return (
    <Animated.View // 使用专门的可动画化的View组件
      style={{
        ...props.style,
        height: slideAnim, // 将透明度绑定到动画变量值
      }}>
      {props.children}
    </Animated.View>
  );
};

/**
 * 每一条列表样式
 * @param {Object} item 数据
 * @param {Number} index 数据索引
 * @param {Number} showIndex 显示的详情标记
 * @param {Function} setShowIndex 设置显示详情
 */
const ListItem = ({item, index, showIndex, setShowIndex}) => {
  return (
    <View>
      <Item
        style={styles.item}
        onPress={() =>
          index === showIndex ? setShowIndex('') : setShowIndex(index)
        }
        styles={{Line: {borderBottomWidth: 0}}}
        extra={
          <Text
            style={{
              fontSize: 16,
              color: {3: '#2F74ED', 2: '#F11F1F', 1: '#1CBA36', 0: '#FFAD45'}[
                item.status
              ],
            }}>
            {{3: '已续借', 2: '已逾期', 1: '已归还', 0: '租借中'}[item.status]}
          </Text>
        }
        thumb={
          <Image
            resizeMode="contain"
            source={{
              uri:
                item.thumbnailUrl ||
                'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
            }}
            style={styles.image}
          />
        }>
        <View style={styles.titleView}>
          <Text style={styles.mainTitle}>{item.name}</Text>
          <Text style={styles.subTitle}>著者: {item.author}</Text>
        </View>
      </Item>
      {index === showIndex && (
        <SlideInView style={styles.bookDetail}>
          <View>
            <Text>
              <Text style={styles.detailLabel}>著者: </Text>
              <Text style={styles.detailText}>{item.author}</Text>
            </Text>
            <Text style={styles.detailContent}>
              <Text style={styles.detailLabel}>索书号: </Text>
              <Text style={styles.detailText}>{item.callNumber}</Text>
            </Text>
            <Text style={styles.detailContent}>
              <Text style={styles.detailLabel}>借出时间: </Text>
              <Text style={styles.detailText}>{item.borrowTime}</Text>
            </Text>
            <Text style={styles.detailContent}>
              <Text style={styles.detailLabel}>应还时间: </Text>
              <Text style={styles.detailText}>{item.returnTime || '-'}</Text>
            </Text>
          </View>
        </SlideInView>
      )}
    </View>
  );
};
/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 */
const ScrollViewer = ({getData}) => {
  const [showIndex, setShowIndex] = useState();
  return (
    <ListView
      onFetch={getData}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={(item, index) => {
        return (
          <>
            {index === 0 && <WhiteSpace size="lg" />}
            <ListItem
              item={item}
              index={index}
              showIndex={showIndex}
              setShowIndex={setShowIndex}
            />
            <WhiteSpace size="sm" />
          </>
        );
      }}
      numColumns={1}
    />
  );
};

export default function MyBorrow(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="借阅查询"
      hide={false}
    />
  );
  const [hasPermission, setHasPermission] = useState(false);
  const [cardId, setCardId] = useState('');
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
    commonJudge(props).then(({hasPermission, id}) => {
      setCardId(id);
      setHasPermission(hasPermission);
    });
  }
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.get(API.GETBORROWINFO, {
      cardId,
      page: page,
      size: 10,
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        startFetch(data.data.list, 10);
      } else {
        abortFetch();
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }

  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        {hasPermission && <ScrollViewer getData={getData} />}
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
    width: 60,
    height: 60,
  },
  titleView: {
    paddingLeft: 15,
    marginBottom: 12,
    marginTop: 12,
  },
  mainTitle: {
    fontSize: 18,
  },
  subTitle: {
    color: '#999999',
    marginTop: 15,
  },
  bookDetail: {
    width: GlobalStyles.window_width - 30,
    alignSelf: 'center',
    backgroundColor: '#E5E5E5',
    padding: 15,
    overflow: 'hidden',
  },
  detailContent: {
    marginTop: 15,
  },
  detailLabel: {
    color: '#737373',
    width: 100,
  },
  detailText: {
    color: '#737373',
  },
});
