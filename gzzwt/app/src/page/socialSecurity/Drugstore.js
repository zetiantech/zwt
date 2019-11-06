/**
 * @description 定点药店
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
    Tabs,
    Icon,
    ListView,
} from '@ant-design/react-native';
import { API } from 'src/api/Api'
import NavigationBar from 'src/common/NavigationBar'//头部导航
import HttpUtil from 'src/util/HttpUtil' //接口请求
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位

function RenderContent({ data, props }) {
    return (
        <TouchableOpacity
            onPress={() => { NavigationUtil.navigate(props, 'DrugstoreAddress', { info: data }) }}
        >
            <View style={styles.itemWrap} key={data.id}>
                <View style={styles.listItem}>
                    <View style={styles.itemLeft}>
                        <View style={styles.hospitalsName}>
                            <Text>{data.name}</Text>
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
                    <RenderContent data={item} props={props} />
                )
            }}
            numColumns={1}
        />
    )
}
/**
 * tab navs 
 * @param {*} data 头部的数据
 */
function TabsComponent({ tabData, tabChange, props, getData, setListView }) {
    return (
        <View style={{ flex: 1 }}>
            <Tabs
                tabs={tabData}
                initialPage={0}
                swipeable
                prerenderingSiblingsNumber={false}
                tabBarActiveTextColor="#2F74ED"
                // tabBarUnderlineStyle={{ width: 20, marginLeft: 20 }}
                onChange={tabChange}>
                <ScrollView style={{ backgroundColor: '#fff', marginTop: 10 }}>
                    <ScrollViewer getData={getData} setListView={setListView} props={props} />
                </ScrollView>
            </Tabs>
        </View>
    )
}
export default function Drugstore(props) {
    const [tabData, setTabData] = useState([{
        id: undefined,
        title: '全市'
    }]);//行政区域数据
    const [areaId, setAreaId] = useState();//当前高亮
    const [first, setFirst] = useState(true); // 搜索关键字
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const [coords, setCoords] = useState({
        latitude: 23.10623,
        longitude: 113.323656,
    }); //定位
    const timer = useRef(null); // 防抖flag
    useEffect(() => {
        HttpUtil.get(API.QueryProvince, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [{ id: undefined, title: '全市' }];
                for (const v of data.data) {
                    arr.push({
                        id: v.id,
                        title: v.cityName
                    })
                }
                setTabData(arr);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
        getLocation();
    }, [])
    async function getLocation() {
        //获取当前位置
        await GeolocationUtil.getCurrentPosition().then((coords) => {
            setCoords(coords);
        }).catch((error) => {
            if (error.code === 12) {
                ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
            }
        });
    }
    useEffect(() => {
        if (!first && listView.ulv) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
    }, [areaId])
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
    }

    /**
     * tab 数据切换
     * @param {*} params 
     */
    function tabChange(data) {
        setAreaId(data.id);
        setFirst(false);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    title='定点药店查询'
                    hide={false}
                    statusBar={{ backgroundColor: '#FFFFFF' }}
                    navigator={props.navigation}
                    popEnabled={true} />
                {tabData && <TabsComponent getData={getData} setListView={setListView} props={props} tabData={tabData} tabChange={tabChange} />}
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
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
})