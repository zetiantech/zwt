/**
 * @description 新闻页面
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity
} from 'react-native'

import {
    Tabs,
    WhiteSpace,
    ListView,
    List,
 } from '@ant-design/react-native';

import dayjs from 'dayjs'
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil'



/**
 * 分页列表
 * @param {Function} getData 获取数据方法
 * @param {Function} setListView 用来接收列表元素
 */

const ScrollViewer = ({
    getData,
    setListView,
    props,
  }) => {
    return (
        <ListView
          ref={ref => setListView(ref)}
          onFetch={getData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={(item, index) => {
            return (
                <ListItemView item={item} props={props} />
            );
          }}
          numColumns={1}
        />
    );
  };

const ListItemView = ({item, props}) => {
    const showData = {
        id: '业务编号',
        registryName: '办理地点',
        dateTime: '预约时间',
        name: '预约人'
    }
    return (
        <>
            <WhiteSpace size="lg" />
            <View style={styles.ListWrap}>
                <List styles={{ borderTopWidth: 0 }}>
                    <List.Item
                        arrow="empty"
                        align='top'
                        multipleLine
                        onPress={()=>{
                            NavigationUtil.navigate(props, 'MyAppointmentDetail', {id: item.id})
                        }}
                        extra={
                            <Text style={[styles.listItemLabel1, { color: item.status==1?'#1CBA36': item.status==2 ? '#999999': '#666666' }]}>{['','预约中', '已取消', '已过期'][item.status]}</Text>
                        }>
                        <Text style={styles.listItemText1}>{item.title}</Text>
                    </List.Item>
                    {
                        Object.keys(showData).map((key) => {
                            return (
                                <List.Item
                                    styles={{ Line: { borderBottomWidth: 0 } }}
                                    arrow="empty"
                                    align='middle'
                                    multipleLine
                                    onPress={()=>{
                                        NavigationUtil.navigate(props, 'MyAppointmentDetail', {id: item.id})
                                    }}
                                    extra={
                                        <Text style={styles.listItemLabel}>{item[key] || '-'}</Text>
                                    }>
                                    <Text style={styles.listItemText}>{showData[key]}</Text>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </View>
        </>
    )
}

export default function MyAppointment(props){
    
    const [typeId, setTypeId] = useState('')
    const [navList, setNavList] = useState([
        { index: 1, title: '预约中' },
        { index: 2, title: '已取消' },
        { index: 3, title: '已过期' }
    ])

    const [listView, setListView] = useState([]); 

    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

   /**
   * 获取数据
   * @param {Number} page 页码
   * @param {Function} startFetch 设置数据
   * @param {Function} abortFetch 获取数据出错时回调
   */
   function getData(page=1, startFetch, abortFetch){
        HttpUtil.get("http://192.168.1.192:7300/mock/5da40183d88e2b0020908ff8/gzzwt/user/myAppointment/list", {
            typeId: typeId,
            page: page,
            size: 10
        }).then((responseJson)=>{
            const { code, data, msg} = responseJson.data
            
            if(code == 0){
                if(data){
                    let list = data.list
                    list = list.map((item, i)=>({
                        ...item,
                        dateTime: dayjs(item.startTime).format('YYYY-MM-DD') + ' ' + weeks[dayjs(item.startTime).format('d')] + ' ' + dayjs(item.startTime).format('hh:mm')+ '-' + dayjs(item.endTime).format('hh:mm')
                    }))
                    startFetch(list, 10)
                }
            }else{
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch(error => {
            abortFetch();
        });
    }

    const onTabsChange = (tab) => {
        setTypeId(tab.index)
    }

    return (
        <View style={styles.container} >
            <NavigationBar
                navigator={props.navigation}
                popEnabled={true}
                title='我的预约' 
                statusBar={{backgroundColor: '#FFFFFF'}}
                hide={false}
            />
            <Tabs
                tabs={navList}
                initialPage="1"
                onChange={onTabsChange}
                onTabClick={onTabsChange}
                swipeable={false}
                usePaged={false}
                prerenderingSiblingsNumber={false}
                tabBarActiveTextColor="#2F74ED"
                tabBarUnderlineStyle={{width: 20, marginLeft: 50}}>
                <ScrollViewer
                    props={props}
                    getData={getData}
                    setListView={setListView}>
                </ScrollViewer>
                <WhiteSpace size="lg" />
            </Tabs> 
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItemText: {
        color: '#999',
        fontSize: 15,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
    listItemLabel: {
        flex: 2.5,
        fontSize: 15,
        paddingTop: 5,
        color: '#999',
        paddingBottom: 6,
    },
    listItemLabel1: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 6,
    },
    listItemText1: {
        color: '#333',
        fontSize: 15,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
});