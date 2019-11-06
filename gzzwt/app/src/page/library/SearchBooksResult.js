/**
 * @description 书目检索结果
 * @author heweifeng
 */
import React, { Fragment, useState, useEffect } from 'react';
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
import GlobalStyles from '../../res/styles/GlobalStyles';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
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
                            handleSearch(id[0], keyword);
                        }}>
                        <TouchableOpacity style={styles.filterBox}>
                            <Text style={styles.searchText}>
                                {filterData.filter(item => item.value === filterId[0])[0]
                                    ? filterData.filter(item => item.value === filterId[0])[0]
                                        .label
                                    : filterData[0].label}
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
                    onSubmitEditing={({ nativeEvent }) =>
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
const ListItem = ({ item }) => {
    return (
        <>
            <Item
                style={styles.item}
                thumb={
                    <>
                        <Image
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
                    </Flex>
                    <Flex>
                        <Flex.Item style={styles.detailBox}>
                            <Text style={[styles.subTitle, styles.firstSubTitle]}>
                                著者: {item.author}
                            </Text>
                            <Text style={styles.subTitle}>定价：{item.price}</Text>
                            <Text style={[styles.subTitle, styles.strongFont]}>
                                索书号：{item.callNumber}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </View>
            </Item>
            <WhiteSpace size="sm" style={{ backgroundColor: '#F0F0F0' }} />
        </>
    );
};
/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setListView }) => {
    return (
        <>
            <ListView
                refreshable={false}
                ref={ref => setListView(ref)}
                onFetch={getData}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={(item, index) => {
                    return <ListItem item={item} />;
                }}
                numColumns={1}
            />
            <WhiteSpace size="sm" style={{ backgroundColor: '#F0F0F0' }} />
        </>
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
    const defaultParams = props.navigation.getParam('data', {});
    const [categoryId, setCategoryId] = useState(defaultParams.categoryId || '');
    const [keyword, setKeyword] = useState(defaultParams.keyword || '');
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const filterData = defaultParams.filterData.map(item => ({
        value: item.id,
        label: item.text,
    }));

    useEffect(() => {
        if (listView.ulv && keyword) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
    }, [categoryId, keyword]);
    /**
     * 获取数据
     * @param {Number} page 页码
     * @param {Function} startFetch 设置数据
     * @param {Function} abortFetch 获取数据出错时回调
     */
    function getData(page = 1, startFetch, abortFetch) {
        HttpUtil.get(API.GETSEARCHBOOKLIST, {
            categoryId,
            keyword,
            page: page,
            size: 20,
        }).then(data => {
            data = data.data;
            if (data.code === 0) {
                startFetch(data.data.list, 20);
            } else {
                abortFetch();
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
    }
    /**
     * 触发搜索
     * @param {String} keyword 关键字
     */
    function handleSearch(categoryId, keyword) {
        if (keyword) {
            setCategoryId(categoryId);
            setKeyword(keyword);
        } else {
            ToastUtil.toast('请输入关键字', 'center');
        }
    }
    return (
        <Provider>
            <View style={styles.container}>
                {navigationBar}
                <SearchBox
                    defaultFilterId={[defaultParams.categoryId]}
                    defaultKeyword={defaultParams.keyword}
                    filterData={filterData}
                    handleSearch={handleSearch}
                />
                <WhiteSpace size="md" />
                <Text style={styles.searchTitle}>搜索结果</Text>
                <WhiteSpace size="xs" />
                <ScrollViewer getData={getData} setListView={setListView} />
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
        lineHeight: 36,
        paddingVertical: 0,
    },
    filterBtn: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchText: {
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        height: 50,
        lineHeight: 50,
    },
    icon: {
        width: 20,
        height: 10,
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
    item: {
        width: GlobalStyles.window_width,
        marginLeft: 0,
    },
    image: {
        width: 90,
        height: 90,
        marginBottom: 12,
        marginTop: 12,
    },
    titleView: {
        paddingLeft: 15,
        marginBottom: 12,
        marginTop: 12,
        display: 'flex',
    },
    mainTitle: {
        fontSize: 18,
    },
    subTitle: {
        color: '#999999',
        marginTop: 5,
        lineHeight: 20,
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
    strongFont: {
        color: '#333',
    },
});
