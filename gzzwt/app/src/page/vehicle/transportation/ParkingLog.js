/**
 * @description 药店位置
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Provider,
    InputItem,
    ListView,
    ScrollView
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import HttpUtil from 'src/util/HttpUtil'
import { API } from 'src/api/Api'
import { MapView } from 'react-native-amap3d'
import Utils from 'src/util/Utils'


/**
 * 附近的停车场
 */
function Parking({ data, getData, setListView, props }) {
    return (
        <View style={styles.ParkingBox}>
            <Text style={styles.parkTitle}>共找到{data.count}个停车场</Text>
            <ScrollViewer getData={getData} setListView={setListView} props={props} />
        </View>
    )
}
/**
 * 每一个具体的停车场
 */
function ParkIngItem({ data, props }) {
    return (
        <TouchableOpacity onPress={() => NavigationUtil.navigate(props, 'ParkDetails', { info: data })}>
            <View style={styles.parkingWrap} >
                <View style={styles.parkItem}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.parkName}>{data.name}</Text>
                        <View style={styles.distanceBox}>
                            <Text style={styles.distance}>{data.distance}km</Text>
                        </View>
                        <View style={styles.parkAddressBox}>
                            <Text style={styles.parkAddress}>{data.address}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRight}>
                        <Image style={styles.roadImg} source={require('src/res/images/life/icon_life_11.png')} />
                        <Text>到这去</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
/**
 * 地图组件
 * @param {*} coords 当前中心点
 * @param {*} data 停车位数据
 */
function MapContainer({ coords, data }) {
    return (
        <MapView style={styles.map}
            locationEnabled={true}
            coordinate={coords}
        >
            {
                data && data.map((v, i) => {
                    return (
                        <MapView.Marker
                            draggable
                            key={v.id}
                            title={v.name}
                            coordinate={{
                                latitude: Number(v.location.split(',')[1]),
                                longitude: Number(v.location.split(',')[0]),
                            }}
                        />
                    )
                })
            }
        </MapView>
    )
}
/**
 * 搜索
 * @param {*} param0 
 */
function SearchInput({ handleSearch }) {
    const [keywords, setKeywords] = useState();
    return (
        <View style={styles.searchInputBox}>
            <InputItem
                clear
                value={keywords}
                style={styles.InputItem}
                onChange={value => {
                    setKeywords(value)
                    handleSearch(value);
                }}
                last
                placeholder="请输入停车地点"
            />
            <Text style={styles.searchText} onPress={() => handleSearch(keywords)}>搜索</Text>
        </View>
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
                `${item.name}-${index}`
            }
            renderItem={(item, index) => {
                return (
                    <ParkIngItem data={item} props={props} key={item.id} />
                )
            }}
            numColumns={1}
        />
    )
}
export default function ParkingLog(props) {
    const [keywords, setKeywords] = useState();
    const [listData, setListData] = useState();
    const [count, setCount] = useState();
    const [first, setFirst] = useState(true); // 搜索关键字
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const [coords, setCoords] = useState({
        latitude: 23.10623,
        longitude: 113.323656,
    }); // 定位坐标
    useEffect(() => {
        //获取当前位置
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
    }, [keywords]);
    /**
     * 获取列表数据
     * @param {*} page 页码
     * @param {*} startFetch 设置数据
     * @param {*} abortFetch 获取数据出错
     */
    function getData(page = 1, startFetch, abortFetch) {
        HttpUtil.get('https://restapi.amap.com/v3/place/text', {
            key: '58d162baf12124c76c1eadf7cf9add70',
            keywords: keywords || '停车场',
            types: '停车场',
            city: coords.city || '广州',
            children: 1,
            extensions: 'base',
            page: page,
            offset: 10
        }).then((data) => {
            data = data.data;
            if (data.info === 'OK') {
                let datas = [];
                for (const v of data.pois) {
                    datas.push({
                        ...v,
                        distance: Utils.getDistance({ lng: coords.longitude, lat: coords.latitude }, { lng: v.location.split(',')[0], lat: v.location.split(',')[1] })
                    })
                }
                datas.sort((a, b) => { return a.distance - b.distance })//升序  
                setCount(data.count)
                startFetch(datas, 10);
                setListData(datas)
            } else {
                abortFetch();
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch((err) => {
            console.log(err, '----err')
        })



    }
    /**
     * 搜索
     */
    function handleSearch(keywords) {
        setKeywords(keywords);
        if (keywords) {
            setFirst(false);
        } else {
            ToastUtil.toast('请输入关键字', 'center');
            setListData([])
        }
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='停车场' navigator={props.navigation}
                    popEnabled={true} hide={false} />
                <View style={styles.mapWrap}>
                    <MapContainer data={listData} coords={coords} />
                    <View style={styles.SearchBar}>
                        <SearchInput handleSearch={handleSearch} />
                    </View>
                    <View style={styles.ParkingBox}>
                        {count && <Text style={styles.parkTitle}>共找到{count}个停车场</Text>}
                        <ScrollViewer getData={getData} setListView={setListView} props={props} />
                    </View>
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
    mapWrap: {
        flex: 1,
        position: 'relative'
    },
    map: {
        flex: 1
    },

    SearchBar: {
        position: 'absolute',
        top: 0,
        flex: 1,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
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
        alignItems: 'center',
        paddingRight: 30
    },
    searchText: {
        position: "absolute",
        top: 10,
        right: 12,
        width: 30,
        height: 20,
        color: '#333333'
    },
    ParkingBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        height: '60%'
    },
    parkTitle: {
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        fontSize: 12,
        color: '#333333'
    },
    parkingWrap: {
        paddingLeft: 30,
        paddingRight: 30
    },
    parkItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        flexWrap: 'wrap'
    },
    parkName: {
        color: '#333333',
        fontSize: 16,
        marginBottom: 6
    },
    distanceBox: {
        fontSize: 12,
        marginBottom: 4
    },
    numBox: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10
    },
    num: {
        color: '#5A8EEF'
    },
    parkAddressBox: {
        flex: 1
    },
    parkAddress: {
        fontSize: 12,
        color: '#AFAFAF',
    },
    itemRight: {
        alignItems: 'center'
    },
    itemLeft: {
        flex: 1,
        marginRight: 5
    },
    roadImg: {
        width: 28,
        height: 28,
        marginBottom: 4
    }
})