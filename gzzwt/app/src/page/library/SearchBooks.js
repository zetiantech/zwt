/**
 * @description 书目检索
 * @author heweifeng
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import {Flex, WhiteSpace, Grid, Provider} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import commonJudge from './CommonyJudge';

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
          placeholder="搜索"
          placeholderTextColor="#999"
          clearTextOnFocus={true}
          clearButtonMode="while-editing"
          onChangeText={setKeyword}
          onSubmitEditing={({nativeEvent}) =>
            handleSearch(nativeEvent.text)
          }></TextInput>
      </Flex.Item>
      <Flex.Item onPress={() => handleSearch(keyword)}>
        <View style={styles.searchBtn}>
          <Image
            style={styles.searchIcon}
            source={require('src/res/images/ic_searc.png')}
          />
        </View>
      </Flex.Item>
    </Flex>
  );
};
/**
 * 筛选项
 * @param {Array} filterData 筛选项数据
 * @param {Number} searchType 默认选择项
 * @param {Function} setSearchType 设置选择项
 */
const Filter = ({filterData, searchType, setSearchType}) => {
  return (
    <Grid
      data={filterData}
      columnNum={5}
      hasLine={false}
      renderItem={(el, index) => {
        return (
          <Text
            style={[
              styles.filterText,
              searchType === el.id ? styles.activeFilter : '',
            ]}>
            {el.text}
          </Text>
        );
      }}
      itemStyle={{height: 50}}
      onPress={item => {
        setSearchType(item.id);
      }}
    />
  );
};

export default function SearchBooks(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="书目检索"
      hide={false}
    />
  );
  const [searchType, setSearchType] = useState(0); // 筛选类型参数
  const [filterData, setFilterData] = useState([]); // 筛选类型数据
  useEffect(() => {
    decide();
  }, []);
  // 判断有没有权限
  function decide() {
    commonJudge(props).then(({hasPermission, id}) => {
      getBookListSearchType();
    });
  }
  // 获取搜索类型
  function getBookListSearchType() {
    HttpUtil.get(API.GETBOOKLISTSEARCHTYPE, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        const filter = data.data.map(item => ({
          id: item.id,
          text: item.name,
        }));
        setSearchType(filter[0] ? filter[0].id : '');
        setFilterData(filter);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }
  /**
   * 触发搜索
   * @param {String} keyword 关键字
   */
  function handleSearch(keyword) {
    if (keyword) {
      NavigationUtil.navigate(props, 'SearchBooksResult', {
        data: {
          categoryId: searchType,
          keyword,
          filterData,
        },
      });
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
        <Text style={styles.filterTitle}>搜索类型</Text>
        <WhiteSpace size="md" />
        <Filter
          searchType={searchType}
          setSearchType={setSearchType}
          filterData={filterData}
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
  filterTitle: {
    textAlign: 'center',
    color: '#999999',
  },
  filterText: {
    textAlign: 'center',
    height: 30,
    fontSize: 14,
  },
  activeFilter: {
    color: '#2F74ED',
  },
});
