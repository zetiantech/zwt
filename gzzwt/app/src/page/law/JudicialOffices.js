/**
 * @description 司法所查询
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
  List,
  Flex,
  WhiteSpace,
  ListView,
  Picker,
  Provider,
  Icon,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Item = List.Item;

const SearchBox = ({
  defaultFilterId = [''],
  defaultKeyword = '',
  filterData,
  handleSearch,
}) => {
  const [filterId, setFilterId] = useState(defaultFilterId);
  const [keyword, setKeyword] = useState(defaultKeyword);
  return (
    <Flex style={styles.searchBox}>
      <Flex.Item style={styles.filterBtn}>
        <View>
          <Picker
            data={filterData}
            cols={1}
            value={filterId}
            onChange={id => {
              setFilterId(id);
              keyword && handleSearch(id[0], keyword);
            }}>
            <TouchableOpacity style={styles.filterBox}>
              <Text style={styles.searchText}>
                {filterData.filter(item => item.value === filterId[0])[0]
                  ? filterData.filter(item => item.value === filterId[0])[0]
                      .label
                  : filterData[0] && filterData[0].label}
              </Text>
              <Icon style={styles.icon} name="down" size="xxs" />
            </TouchableOpacity>
          </Picker>
        </View>
      </Flex.Item>
      <Flex.Item style={styles.searchInputBox}>
        <TextInput
          style={styles.searchInput}
          autoFocus={false}
          placeholder="搜索"
          placeholderTextColor="#999"
          clearTextOnFocus={true}
          clearButtonMode="while-editing"
          defaultValue={keyword}
          onChangeText={setKeyword}
          onBlur={() => handleSearch(filterId[0], keyword)}
          onSubmitEditing={({nativeEvent}) =>
            handleSearch(filterId[0], nativeEvent.text)
          }></TextInput>
      </Flex.Item>
    </Flex>
  );
};

/**
 * 每一条列表样式
 * @param {Object} item 数据
 */
const ListItem = ({item, props}) => {
  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={styles.cardwarp}
        onPress={() => {
          NavigationUtil.navigate(props, 'DestinationMap', {
            info: {
              title: '司法所查询',
              coords: item,
            },
          });
        }}>
        <View style={{margin: 20}}>
          <Text style={styles.titleCard}>{item.name}</Text>
          <View style={styles.textCard}>
            <Image
              style={{marginRight: 10, width: 18, height: 18}}
              source={require('src/res/images/common/icon_phone.png')}></Image>
            <Text>{item.phone}</Text>
          </View>
          <View style={styles.textCard}>
            <Image
              style={{marginRight: 10, width: 18, height: 18}}
              source={require('src/res/images/common/icon_address.png')}></Image>
            <Text>{item.address}</Text>
          </View>
          <View style={styles.textCard}>
            <Image
              style={{marginRight: 10, width: 18, height: 18}}
              source={require('src/res/images/common/icon_time.png')}></Image>
            <Text>
              {item.startTime}-{item.endTime}({item.workWeek})
            </Text>
          </View>
        </View>
        <Image
          style={styles.skip}
          source={require('src/res/images/ic_tiaozhuan.png')}></Image>
      </TouchableOpacity>
    </View>
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
          return <ListItem item={item} props={props} />;
        }}
        numColumns={1}
      />
      <WhiteSpace size="sm" style={{backgroundColor: '#F0F0F0'}} />
    </>
  );
};

export default function JudicialOffices(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="司法所查询"
      hide={false}
    />
  );
  const [first, setFirst] = useState(true);
  const [areaId, setAreaId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [listView, setListView] = useState([]); // 用来接收列表元素
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    HttpUtil.get(API.QueryProvince, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        data = data.data.map(item => ({
          value: item.id,
          label: item.cityName,
        }));
        data.unshift({
          value: '',
          label: '全市',
        });
        setFilterData(data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }, []);

  useEffect(() => {
    if (listView.ulv && keyword) {
      listView.ulv.scrollToOffset({x: 0, y: 0, animated: true});
      listView.refresh();
    }
  }, [areaId, keyword]);
  /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
  function getData(page = 1, startFetch, abortFetch) {
    HttpUtil.post(API.GETJUDICIALOFFICE, {
      areaId,
      name: keyword,
      page: page,
      size: 20,
    })
      .then(data => {
        data = data.data;
        if (data.code === 0) {
          startFetch(data.data.list, 20);
        } else {
          abortFetch();
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      })
      .catch(err => {
        abortFetch();
        ToastUtil.toast('网络请求出错', 'center');
      });
  }
  /**
   * 触发搜索
   * @param {String} keyword 关键字
   */
  function handleSearch(areaId, keyword) {
    if (keyword) {
      setAreaId(areaId);
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
        <SearchBox filterData={filterData} handleSearch={handleSearch} />
        <WhiteSpace size="md" />
        {!first && (
          <>
            <Text style={styles.searchTitle}>搜索结果</Text>
            <WhiteSpace size="xs" />
            <ScrollViewer
              getData={getData}
              setListView={setListView}
              props={props}
            />
          </>
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
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  searchInputBox: {
    flex: 4,
    paddingRight: 20,
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    borderRadius: 20,
    flex: 2,
    paddingLeft: 10,
    height: 36,
    lineHeight: 26,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    textAlignVertical: 'center',
    height: 50,
    lineHeight: 50,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
  },
  searchTitle: {
    paddingLeft: 20,
    color: '#999999',
    fontSize: 14,
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

  cardwarp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  titleCard: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textCard: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  skip: {
    marginRight: 20,
    tintColor: '#e5e5e5',
  },
});
