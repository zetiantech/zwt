/**
 * @description 公证处查询
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Flex,
  List,
  ListView,
  WhiteSpace,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';
import GlobalStyles from 'src/res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'; // 轻提示

const Item = List.Item;

/**
 * 搜索框
 * @param {Function} handleSearch 触发搜索
 */
const SearchBox = ({handleSearch}) => {
  const [keyword, setKeyword] = useState('');
  return (
    <Flex style={styles.searchBox}>
      <Flex.Item style={styles.searchInput}>
        <TextInput
          style={styles.searchInput}
          autoFocus={false}
          underlineColorAndroid="white"
          placeholder="请输入关键字"
          placeholderTextColor="#999"
          clearTextOnFocus={true}
          clearButtonMode="while-editing"
          onChangeText={setKeyword}
          onSubmitEditing={({nativeEvent}) =>
            handleSearch(nativeEvent.text)
          }></TextInput>
      </Flex.Item>
      <Flex.Item>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handleSearch(keyword)}>
          <Image
            style={styles.searchIcon}
            source={require('src/res/images/ic_searc.png')}
          />
        </TouchableOpacity>
      </Flex.Item>
    </Flex>
  );
};
/**
 * 列表项
 * @param {*} item 列表项数据
 */
const ListItem = ({item, props}) => {
  return (
    <Item
      style={styles.item}
      styles={{Line: {borderBottomWidth: 0}}}
      arrow="horizontal"
      onPress={() =>
        NavigationUtil.navigate(props, 'DestinationMap', {
          info: {
            title: '公证处查询',
            coords: item,
          },
        })
      }>
      <View style={styles.titleView}>
        <Flex>
          <Flex.Item style={styles.titleBox}>
            <Text style={styles.mainTitle}>
              {item.name}
              <Text></Text>
            </Text>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={styles.detailBox}>
            <Text style={[styles.subTitle, styles.firstSubTitle]}>
              统一社会信用代码：
              <Text style={styles.strongTitle}>{item.code}</Text>
            </Text>
            <Text style={styles.subTitle}>
              负责人：
              <Text style={styles.strongTitle}>{item.contactName}</Text>
            </Text>
            <Text style={styles.subTitle}>
              联系电话：
              <Text style={styles.strongTitle}>{item.phone}</Text>
            </Text>
            <Text style={styles.subTitle}>
              地址：
              <Text style={styles.strongTitle}>{item.address}</Text>
            </Text>
          </Flex.Item>
        </Flex>
      </View>
    </Item>
  );
};

/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */
const ScrollViewer = ({getData, setListView, props}) => {
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
              <ListItem item={item} props={props} />
              <WhiteSpace size="md" />
            </>
          );
        }}
        numColumns={1}
      />
      <WhiteSpace size="sm" style={{backgroundColor: '#F0F0F0'}} />
    </>
  );
};

export default function Notaries(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="公证处查询"
      hide={false}
    />
  );
  const [first, setFirst] = useState(true); // 是否第一次加载
  const [keyword, setKeyword] = useState(''); // 搜索关键字
  const [coords, setCoords] = useState({
    latitude: 23.10623,
    longitude: 113.323656,
  }); // 定位坐标
  const [listView, setListView] = useState([]); // 用来接收列表元素

  useEffect(() => {
    GeolocationUtil.getCurrentPosition()
      .then(coords => {
        setCoords(coords);
      })
      .catch(error => {
        if (error.code === 12) {
          ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
        }
      });
  }, []);

  useEffect(() => {
    if (!first && listView.ulv && keyword) {
      listView.ulv.scrollToOffset({x: 0, y: 0, animated: true});
      listView.refresh();
    }
  }, [keyword]);
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.post(API.GETUNIT, {
      keyword,
      latitude: coords.latitude,
      longitude: coords.longitude,
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
      .catch(error => {
        abortFetch();
      });
  }
  /**
   * 触发搜索
   * @param {String} keyword 关键字
   */
  function handleSearch(keyword) {
    if (keyword) {
      setKeyword(keyword);
      setFirst(false);
    } else {
      ToastUtil.toast('请输入关键字', 'center');
    }
  }
  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace size="xl" />
        <SearchBox handleSearch={handleSearch} />
        <WhiteSpace size="xl" />
        {!first && (
          <ScrollViewer
            getData={getData}
            setListView={setListView}
            props={props}
          />
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
  searchBox: {
    width: GlobalStyles.window_width - 30,
    alignSelf: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    flex: 6,
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  searchBtn: {
    backgroundColor: '#2F74ED',
    width: 50,
    height: 50,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  searchIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
    marginTop: 0,
    paddingTop: 0,
    resizeMode: 'cover',
  },
  item: {
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#999999',
    marginTop: 10,
  },
  strongTitle: {
    color: '#333',
  },
});
