/**
 * @description 首页-全部服务
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   ScrollView,
   TextInput,
   Image,
   TouchableOpacity,
   Platform,
} from 'react-native'

import { 
    Provider, WhiteSpace
} from '@ant-design/react-native'

import GlobalStyles from 'src/res/styles/GlobalStyles'
import HttpUtil from '../../util/HttpUtil' //接口请求
import NavigationBar from '../../common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import { API } from 'src/api/Api'


//左侧边栏
const LeftNav = ({currentIndex, listData, clickToScroll}) => {
    return (
        <ScrollView>
            <View style={styles.LeftNavBox}>
                {
                    listData && listData.map((item, i)=>(
                        <TouchableOpacity 
                            key={`${item.id}-${i}`}
                            style={
                                currentIndex == item.id ? styles.LeftNavItemActive : styles.LeftNavItem
                            }
                            activeOpacity={0.6}
                            onPress={()=>clickToScroll(item, i)}
                        >
                            <Text style={
                                currentIndex == item.id ? styles.LeftNavTextActive : styles.LeftNavText
                            }>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}
//右侧边栏
const RigthView = ({props,rigthlistData}) => {
    return (
        <ScrollView style={styles.contentListBox}>
            {rigthlistData&&rigthlistData.map((item,i)=> (
                <TouchableOpacity style={styles.RightContentBox}
                onPress={() => { NavigationUtil.navigate(props, 'SubscribeRegist2',{listData:item})}}
                >
                    <Text style={styles.rightText}>{item.name}</Text>
                </TouchableOpacity>
                ))
            }        
        </ScrollView>
    )
}


export default function SubscribeRegist1(props){
    
    const parms = props.navigation.getParam('data')||""

    const [currentIndex, setCurrentIndex] = useState(1)


    const [scrollViews, setScrollViews] = useState(null)
    const [layout, setLayout] = useState([])
    const [listData, setListData] = useState([])//左侧栏
    const [rigthlistData, setrigthlistData] = useState([])//右侧栏
    const [leftId,setleftId] = useState()//左侧ID

    // useEffect(() => {
    //     setListData([  ])
    // }, [])
    useEffect(()=> {
        hospList()
    },[])
    //左侧点击
    function onLeftClick () {
        
        
    }
    function hospList (index) {
        //左侧栏数据
        HttpUtil.get(API.HospitalDepartmentList,{
            hospitalId:parms.id,
        }).then((data) => {          
            data = data.data;
            if (!data.data.length) {
                ToastUtil.toast('此医院暂无数据', 'center');
                return
            }
            if (data.code === 0) {    
                setListData(data.data)
            } else {
            }
        })
    }
    //右侧栏数据
    const clickToScroll = (item, index) => {
        HttpUtil.get(API.HospitalDepartmentList, {  
            hospitalId:parms.id,
            parentId:item.id,
        }).then((data) => {  
            data = data.data;
            if (data.code === 0) { 
                console.log(data,44444)
                setrigthlistData(data.data)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
        setleftId(item.id)
        setCurrentIndex(item.id)
        // 其中layouot.y就是距离现在的高度位置
        const lay = index > 1 ? layout[index+1] : layout[index] 
        if(scrollViews){
            scrollViews.scrollTo({ x: 0, y: lay.y, animated: true});
        }
      }
    //   console.log(parms,5555555555)       

    return (
        <Provider>
            <View style={styles.container} >
                <NavigationBar title='选择科室' hide={false} navigator={props.navigation}
                    popEnabled={true}  statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
                <View style={styles.contentBody}>
                    <LeftNav props={props} currentIndex={currentIndex} listData={listData}  clickToScroll={clickToScroll}/>
                    <RigthView  listData={listData} props={props} rigthlistData={rigthlistData}/>
                </View>         
            </View>
        </Provider>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    contentBody: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
    },
    LeftNavBox: {
        width: 100,
        height: GlobalStyles.window_height-30,
        backgroundColor: "#F0F0F0"
    },
    LeftNavItem:{
        alignItems: 'center',
        paddingVertical: 15
    },
    LeftNavText: {
        fontSize: 14,
        color: '#333'
    },
    LeftNavTextActive: {
        fontSize: 14,
        color: '#2F74ED' 
    },
    LeftNavItemActive:{
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        // borderLeftWidth: 2,
        borderLeftColor: '#2F74ED'
    },
    contentListBox: {
        width: GlobalStyles.window_width-100,
        height: GlobalStyles.window_height-30,
    },
    RightContentBox: {
        paddingVertical: 15,
        // backgroundColor:'red',
        paddingHorizontal: 15,
        // alignItems:'center',
        justifyContent:'center'
    },
    titleStyles: {
        fontSize: 16,
    },
    rightText:{
        color:'#333'
    }
   
})