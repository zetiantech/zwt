/**
 * @description 民办小学招生信息查询
 * @author cy
*/
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Provider,
    ListView,
    Picker,
    InputItem,
    Icon
} from '@ant-design/react-native';
import { API } from 'src/api/Api'
import NavigationBar from '../../common/NavigationBar'//头部导航
import HttpUtil from '../../util/HttpUtil' //接口请求
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

function RenderContent({ data, props }) {
    let source = data ? require('src/res/images/work/affairs_bg_crj.png') : { uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' };
    return (
        <TouchableOpacity
            onPress={() => { NavigationUtil.navigate(props, 'PrivateSchoolsDetail', { info: { ...data, pageTitle: '民办小学招生信息查询' } }) }}
        >
            <View style={styles.itemWrap} key={data.id}>
                <View style={styles.listItem}>
                    <Image style={styles.itemLeft} source={source} />
                    <View style={styles.itemRight}>
                        <Text style={[styles.schoolName]}>广州天河实验小学</Text>
                        <View style={[styles.mobile, styles.itemText]}>
                            <Image style={styles.itemIcon} source={require('src/res/images/common/icon_phone.png')} />
                            <Text>12324354656</Text>
                        </View>
                        <View style={[styles.addredd, styles.itemText]}>
                            <Image style={styles.itemIcon} source={require('src/res/images/common/icon_address.png')} />
                            <Text style={{ flex: 2 }}>广州天河区龙华大道32号</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
/**
 * 页面下拉刷新及上拉加载
 * @param {*} getData 获取数据方法
 * @param {*} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setListView, props }) => {
    return (
        <ListView
            // refreshable={false}
            ref={(ref) => setListView(ref)}
            onFetch={getData}
            keyExtractor={(item, index) =>
                `${item.id}`
            }
            renderItem={(item, index) => {
                return (
                    <RenderContent data={item} props={props} />
                )
            }}
            numColumns={1}
        />
    )
}
/**
 * 搜索
 * @param {*} param0 
 */
function SearchInput({ changeKeyword, areaData }) {
    const [keyword, setKeyword] = useState();
    const [areaId, setAreaId] = useState(['']);
    return (
        <View style={styles.SearchBar}>
            <View style={styles.pickerBox}>
                <Picker
                    data={areaData}
                    cols={1}
                    value={areaId}
                    onChange={id => {
                        setAreaId(id);
                        changeKeyword(id[0], 1);
                    }}>
                    <TouchableOpacity style={styles.filterBox}>
                        <Text style={styles.filterText}>
                            {areaData.filter(item => item.value === areaId[0])[0]
                                ? areaData.filter(item => item.value === areaId[0])[0]
                                    .label
                                : areaData[0].label}
                        </Text>
                        <Icon style={styles.icon} name="down" size="xxs" />
                    </TouchableOpacity>
                </Picker>
            </View>
            <View style={styles.searchInputBox}>
                <Image style={styles.searchIcon} onPress={() => (keyword)} source={require('src/res/images/ic_searc.png')} />
                <InputItem
                    clear
                    value={keyword}
                    style={styles.InputItem}
                    onChange={value => {
                        setKeyword(value)
                        changeKeyword(value, 2);
                    }}
                    last
                    placeholder="请输入学校名称"
                />
            </View>
        </View>
    )
}

export default function PrivatePrimarySchools(props) {
    const [areaData, setAreaData] = useState([{
        value: '',
        label: '全市'
    }]);//行政区域数据
    const [areaId, setAreaId] = useState();//当前高亮
    const [first, setFirst] = useState(true); // 搜索关键字
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const [keyword, setKeyword] = useState();//关键字
    const timer = useRef(null); // 防抖flag
    useEffect(() => {
        HttpUtil.get(API.QueryProvince, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [{ id: '', label: '全市' }];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.cityName
                    })
                }
                setAreaData(arr);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }, [])
    useEffect(() => {
        if (listView.ulv) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
    }, [areaId, keyword])
    /**
   * 获取列表数据
   * @param {*} page 页码
   * @param {*} startFetch 设置数据
   * @param {*} abortFetch 获取数据出错
   */
    function getData(page = 1, startFetch, abortFetch) {
        // timer.current && clearTimeout(timer.current);
        // timer.current = setTimeout(() => {
        HttpUtil.post(API.Pharmacylist, {
            areaId,
            keyword,
            page: page,
            size: 10
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                startFetch(data.data.list || [], 10);
            } else {
                abortFetch();
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }
    /**
     * 搜索的关键字切换
     * @param {*} params 
     */
    function changeKeyword(val, type) {
        type == 1 && setAreaId(val);
        type == 2 && setKeyword(val);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='民办小学招生信息查询' hide={false} navigator={props.navigation}
                    popEnabled={true} />

                <View style={{ flex: 1 }}>
                    <SearchInput changeKeyword={changeKeyword} areaData={areaData} />
                    <ScrollView style={{ backgroundColor: '#fff' }}>
                        <ScrollViewer getData={getData} setListView={setListView} props={props} />
                    </ScrollView>
                </View>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    SearchBar: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    pickerBox: {
        width: 60,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    filterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    filterText: {
        textAlignVertical: 'center',
        height: 50,
        lineHeight: 50,
    },
    icon: {
        width: 20,
        height: 12,
        marginLeft: 2
    },
    searchInputBox: {
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15 : 20,
        borderWidth: 1,
        backgroundColor: '#F0F0F0',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        position: "absolute",
        top: 10,
        left: 12,
        width: 20,
        height: 20,
        tintColor: '#999999'
    },
    InputItem: {
        marginLeft: 15,
    },
    itemWrap: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingRight: 15,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        flexWrap: 'wrap',
    },
    itemLeft: {
        width: 130,
        height: 90,
        resizeMode: 'stretch',
        borderRadius: 15,
        marginRight: 15
    },
    itemRight: {
        flex: 1,
        flexWrap: 'wrap',
        display: 'flex',
        alignItems: 'flex-start',
        // justifyContent: 'center'
    },
    schoolName: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 15,
    },
    mobile: {
        marginBottom: 10
    },
    itemText: {
        color: '#333333',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginRight: 10,
        marginTop: 2,
        width: 12,
        height: 13
    }
})