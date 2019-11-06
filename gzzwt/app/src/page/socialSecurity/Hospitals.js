/**
 * @description 定点医院
 * @author cy 
*/
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

import {
    Provider,
    Icon,
    Picker,
    InputItem,
    ListView,
} from '@ant-design/react-native';

// import AsyncStorageUtil from '../../util/AsyncStorageUtil'
import HttpUtil from '../../util/HttpUtil' //接口请求
import NavigationBar from '../../common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import { API } from 'src/api/Api'

/**
 * 搜索
 * @param {*} param0 
 */
function SearchInput({ changeKeyword }) {
    const [keyword, setKeyword] = useState();
    return (
        <View style={styles.searchInputBox}>
            <Image style={styles.searchIcon} onPress={() => (keyword)} source={require('src/res/images/ic_searc.png')} />
            <InputItem
                clear
                value={keyword}
                style={styles.InputItem}
                onChange={value => {
                    setKeyword(value)
                    changeKeyword(value);
                }}
                last
                placeholder="搜索医院"
            />
        </View>
    )
}
/**
 * 下拉筛选
 */
function TitleFilter({ areaData, levelData, areaId, setAreaId, levelId, setLevelId, changeHospitals }) {
    return (
        <View style={styles.filterBox}>
            <View style={[styles.filterItem, styles.filterItem1]}>
                <Picker
                    placeholder="请选择"
                    cols={1}
                    data={areaData}
                    value={areaId}
                    onChange={(val) => { setAreaId(val); changeHospitals(val, 1) }}
                >
                    <TouchableOpacity>
                        <Text style={styles.filterText}>
                            {
                                areaData.filter((d) => (d.value === areaId[0]))[0] ?
                                    areaData.filter((d) => (d.value === areaId[0]))[0].label :
                                    areaData[0].label
                            }
                            <Image
                                resizeMode="contain"
                                style={{ width: 15, height: 8 }}
                                source={
                                    require('src/res/images/ic_tiaozhuan_down.png')
                                }
                            />
                        </Text>
                    </TouchableOpacity>
                </Picker>
            </View>
            <View style={[styles.filterItem]}>
                <Picker
                    cols={1}
                    data={levelData}
                    value={levelId}
                    onChange={(val) => { setLevelId(val); changeHospitals(val, 2) }}
                >
                    {/* <Text>级别</Text> */}
                    <TouchableOpacity>
                        <Text style={styles.filterText}>
                            {
                                levelData.filter((d) => (d.value === levelId[0]))[0] ?
                                    levelData.filter((d) => (d.value === levelId[0]))[0].label :
                                    levelData[0].label
                            }
                            <Image
                                resizeMode="contain"
                                style={{ width: 15, height: 8 }}
                                source={
                                    require('src/res/images/ic_tiaozhuan_down.png')
                                }
                            />
                        </Text>
                    </TouchableOpacity>
                </Picker>
            </View>
        </View>
    )
}
/**
 * 列表
 */
function ListWrap({ data, props }) {
    return (
        <TouchableOpacity
            onPress={() => { NavigationUtil.navigate(props, 'HospitalsAddress', { info: { ...data } }) }}
        >
            <View style={styles.itemWrap}
            >
                <View style={styles.listItem}>
                    <View style={styles.itemLeft}>
                        <View style={styles.hospitalsName}>
                            <Text>{data.name}</Text>
                            <Text style={styles.levels}>{data.level}</Text>
                        </View>
                        <View style={styles.hospitalsInfo}>
                            <Image style={styles.itemIcon} source={require('src/res/images/common/icon_phone.png')} />
                            <Text>{data.phone}</Text>
                        </View>
                        <View style={styles.hospitalsInfo}>
                            <Image style={styles.itemIcon} source={require('src/res/images/common/icon_address.png')} />
                            <Text>{data.address}</Text>
                        </View>
                    </View>
                    <Icon name='right' size="16" />
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
                    <ListWrap data={item} props={props} />
                )
            }}
            numColumns={1}
        />
    )
}
export default function Hospitals(props) {
    const [keyword, setKeyword] = useState();
    const [areaData, setAreaData] = useState([{
        label: '全市',
        value: ''
    }]);///全市
    const [levelData, setLevelData] = useState([{
        label: '级别',
        value: ''
    }]);//级别
    const [areaId, setAreaId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [params, setParams] = useState({ name: keyword, areaId, levelId });
    const [first, setFirst] = useState(true); // 搜索关键字
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const timer = useRef(null); // 防抖flag
    const [coords, setCoords] = useState({
        latitude: 23.10623,
        longitude: 113.323656,
    }); //定位
    useEffect(() => {
        //获取全市的行政区域
        HttpUtil.get(API.QueryProvince, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [{
                    value: '',
                    label: '全市'
                }];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.cityName
                    })
                }
                setAreaData(arr)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch((err) => {
            console.log(err)
        })
        //获取级别
        HttpUtil.post(API.GetHospitalGrades, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [{
                    value: '',
                    label: '级别'
                }];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.name
                    })
                }
                setLevelData(arr)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
        //获取位置信息
        GeolocationUtil.getCurrentPosition().then((coords) => {
            setCoords(coords);
        }).catch((error) => {
            if (error.code === 12) {
                ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
            }
        });
    }, [])
    useEffect(() => {
        if (listView.ulv) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
    }, [params])

    /**
    * 获取列表数据
    * @param {*} page 页码
    * @param {*} startFetch 设置数据
    * @param {*} abortFetch 获取数据出错
    */
    function getData(page = 1, startFetch, abortFetch) {
        // timer.current && clearTimeout(timer.current);
        // timer.current = setTimeout(() => {
        HttpUtil.post(API.GetHospitalList, {
            ...params,
            latitude: coords.latitude,
            longitude: coords.longitude,
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
        // }, 10);
    }

    /**
     * 切换城市医院
     * @param {*} val 
     * @param {*} type  1行政区域,2等级切换
     */
    function changeHospitals(val, type) {
        let obj = {};
        obj[{
            1: 'areaId',
            2: 'levelId',
        }[type]] = val[0] || '';
        setParams({ ...params, ...obj })
    }
    /**
     * keyword值更改
     * @param {*} params 
     */
    function changeKeyword(keyword) {
        setKeyword(keyword)
        setParams({ ...params, name: keyword });
        setFirst(false);
        !keyword && ToastUtil.toast('请输入关键字', 'center');
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='定点医院' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <View style={styles.SearchBar}>
                    <SearchInput value={keyword} changeKeyword={changeKeyword} />
                </View>
                {areaData && levelData && <TitleFilter areaId={areaId} levelId={levelId} setAreaId={setAreaId} setLevelId={setLevelId} areaData={areaData} levelData={levelData} changeHospitals={changeHospitals} />}
                <ScrollViewer getData={getData} setListView={setListView} props={props} />
            </View>
        </Provider>
    );
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
        tintColor: '#333333'
    },
    InputItem: {
        marginLeft: 15,
    },
    filterBox: {
        backgroundColor: '#fff',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    filterItem1: {
        borderRightColor: '#E5E5E5',
        borderRightWidth: 1
    },
    filterItem: {
        flex: 1,
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        alignSelf: 'center',
    },
    itemWrap: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15
    },
    listItem: {
        // height: 127,
        paddingTop: 15,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    },
    itemLeft: {
        flex: 1
    },
    hospitalsName: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    levels: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: '#06C9AE',
        color: '#fff',
        marginLeft: 13,
        fontSize: 12,
        borderRadius: 4
    },
    hospitalsInfo: {
        color: '#333333',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    itemIcon: {
        marginRight: 10,
        marginTop: 2,
        width: 12,
        height: 13
    }
});

