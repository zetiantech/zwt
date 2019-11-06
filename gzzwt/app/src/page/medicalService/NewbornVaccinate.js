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
    Platform,ScrollView
} from 'react-native';

import {
    Provider,
    Icon,
    Picker,
    InputItem,
    ListView,Tabs,WhiteSpace
} from '@ant-design/react-native';

// import AsyncStorageUtil from '../../util/AsyncStorageUtil'
import HttpUtil from '../../util/HttpUtil' //接口请求
import NavigationBar from '../../common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import { API } from 'src/api/Api'

/**
 * tab切换列表
 * @param {*} tabs 切换数据
 * @param {*} onTabsChange 切换回调
 */
const TabsComponent = ({tabs, onTabsChange}) => {
    return (
        <Tabs
          initialPage={0}
          tabs={tabs}
          swipeable={true}
          useOnPan={true}
          onTabClick={(tab, index) => onTabsChange(tab,index+1) }
          renderTabBar={tabProps => (
            <View
                style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#FFFFFF',
                }}
             >
             { tabProps.tabs.map((tab, i) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={tab.key || i}
                        style={{
                            paddingVertical: 12,
                        }}
                        onPress={() => {
                            const { goToTab, onTabClick } = tabProps;
                            onTabClick && onTabClick(tabs[i], i);
                            goToTab && goToTab(i);
                        }}
                    >
                        <Text
                        style={{
                            color: tabProps.activeTab === i ? '#2F74ED' : undefined
                        }}
                        >
                        {tab.name}
                        </Text>
                        {
                            tabProps.activeTab === i && <Text style={styles.bottomLine}></Text>
                        }
                    </TouchableOpacity>
                ))}
            </View>
          )}
        >
        </Tabs>
    )
}
/**
 * 列表
 */
function ListWrap({ data, props }) {
    return (
        <View style={styles.listBg}>
     
        <View style={styles.listwarp}>
            <View style={styles.listView} >
                <Text style={styles.vaccinName}>麻风疫苗</Text>
                <Text style={styles.vaccinSpan}>一类(免费)</Text>
            </View>
            <View style={styles.listView}>
                <View style={{flexDirection:'row'}}>
                    <Text>第1剂 / </Text>
                    <Text style={{color:'#999999'}}>共3剂</Text>
                </View>          
                <View style={styles.backView}>
                    <Text style={{color:'#fff',padding:2}}>未接种</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.touchClick}>
                <Text style={styles.touchText} >去预约</Text>
                <Image style={styles.tiaozhuan} source={require('../../res/images/ic_tiaozhuan.png')}/>
            </TouchableOpacity>
        </View>
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

    const [params, setParams] = useState();
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const timer = useRef(null); // 防抖flag
    const [coords, setCoords] = useState({//定位
        latitude: 23.10623,
        longitude: 113.323656,
    }); 
    const [tabs,settabs] = useState([
        {ageTypeId:1,name:'1月龄'},
        {ageTypeId:2,name:'2月龄'},
        {ageTypeId:3,name:'3月龄'},
        {ageTypeId:4,name:'4月龄'},
        {ageTypeId:5,name:'5月龄'},
    ])

    //场馆分类
    function onTabsChange (tab,index) {
        setParams({
            ...params,
            ageTypeId:tab.ageTypeId
        })    
    }




    useEffect(() => {
        
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
        HttpUtil.post(API.VaccineList, {
            ...params,
            page: page,
            size: 10
        }).then((data) => {
            // console.log(data,66666666)
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

    console.log(params,'params数据')
    return (
        <Provider>
            <View style={styles.container}>
                <ScrollView>             
                <NavigationBar title='新生儿预约接种' hide={false} navigator={props.navigation}
                    popEnabled={true} /> 
                 <TabsComponent tabs={tabs}  onTabsChange={onTabsChange} />
                 <WhiteSpace size="lg" />
                <ScrollViewer getData={getData} setListView={setListView} props={props} />
                </ScrollView>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    bottomLine: {
        position: 'absolute',
        width: 20,
        height: 2,
        bottom: 0,
        left: '90%',
        marginLeft: -20,
        backgroundColor: '#2F74ED',
        borderRadius:5
    },
    listBg:{
        backgroundColor:'#fff'
    },
    listwarp:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        borderBottomWidth:0.5,
        marginLeft:15,
        borderColor:'#E5E5E5'
    },
    listView:{
        alignItems:'center'
    },
    vaccinName:{
        color:'#333333'
        ,fontSize:16,
        fontWeight:'bold',
        marginBottom:5
    },
    vaccinSpan:{
        color:'#999999',
        fontSize:13
    },
    backView:{
        backgroundColor:'#FFC263',
        borderRadius:3,
        marginTop:5
    },
    touchClick:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
    },
    touchText:{
        color:"#2F74ED"
    },
    tiaozhuan:{
        tintColor:'#CCCCCC'
    }
});

