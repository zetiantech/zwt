/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { 
    List,
    Provider,
    WhiteSpace,
    Tabs,
    ListView
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'

import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';


/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */
const ScrollViewer = ({
    getData,
    setListView,
    props,
    onClickList
  }) => {
    return (
        <>
            <WhiteSpace size="lg" />
            <ListView
            ref={ref => setListView(ref)}
            onFetch={getData}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={(item, index) => {
                return (
                    <MarriageItem item={item} props={props} onClickList={onClickList}/>
                );
            }}
            numColumns={1}
            />
        </>
    );
  };

const MarriageItem = ({item, onClickList}) => {
    return (
        <List>
            <List.Item 
                key={`${item.id}`}        
                arrow="horizontal"
                onPress={()=>onClickList(item.id)}
            >
                <Text style={styles.itemTitle}>{item.name}</Text>
                <View style={styles.itemCont}>
                    <Image source={require('src/res/images/common/icon_phone.png')} style={styles.img} />
                    <Text style={styles.itemText}>{item.phone}</Text>
                </View>
                <View style={styles.itemCont}>
                    <Image source={require('src/res/images/common/icon_address.png')} style={styles.img} />
                    <Text style={styles.itemText}>{item.address}</Text>    
                </View>
            </List.Item>
        </List>
    );
}


export default function MarriageOutlets(props){
    const formData = props.navigation.getParam("formData")

    const [areaId, setAreaId] = useState()
    const [form, setForm] = useState(formData)

    const [listView, setListView] = useState([]);

    const [tabs, setTabs] = useState([
        { title: '全市', index: '' },
        { title: '越秀区', index: '440103' },
        { title: '海珠区', index: '4401' },
        { title: '天河区', index: '4401' },
        { title: '荔湾区', index: '4401' },
        { title: '黄埔区', index: '4401' },
        { title: '广州区', index: '4401' },
    ])

     /**
     * 获取数据
     * @param {Number} page 页码
     * @param {Function} startFetch 设置数据
     * @param {Function} abortFetch 获取数据出错时回调
     */
    function getRegistryList(page=1, startFetch, abortFetch){
        HttpUtil.get(API.REGISTRY_LIST, {
            areaId: areaId || '',
            page: page,
            size: 10
        }).then((responseJson)=>{
            const { code, data, msg} = responseJson.data
            if(code == 0){
                startFetch && startFetch(data||[], 10)
            }else{
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch(error => {
            abortFetch && abortFetch();
        });
    }

    const onTabsChange = (tab) => {
        setAreaId(tab.index)
    }

    const onClickList = (id) => {
        setForm({...form, registryId: id})
        NavigationUtil.navigate(props, 'OutletsTime', {form: form, registryId: id})
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    navigator={props.navigation} 
                    popEnabled={true} 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    title='选择办理网点'
                    hide={false}/>
                <Tabs
                    tabs={tabs}
                    initialPage={1}
                    onChange={onTabsChange}
                    onTabClick={onTabsChange}
                    swipeable={false}
                    usePaged={false}
                    prerenderingSiblingsNumber={false}
                    tabBarActiveTextColor="#2F74ED"
                    tabBarUnderlineStyle={{width: 20, marginLeft: 25}}>
                        <ScrollViewer
                            props={props}
                            getData={getRegistryList}
                            onClickList={onClickList}
                            setListView={setListView}>
                        </ScrollViewer>
                </Tabs>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    itemCont: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },
    img: {
        width: 18,
        height: 18,
    },
    itemTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        color: '#333'
    },
    itemText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333'
    }
});

