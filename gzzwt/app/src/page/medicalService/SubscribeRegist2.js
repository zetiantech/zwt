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
    Provider, WhiteSpace,ListView
} from '@ant-design/react-native'

import GlobalStyles from 'src/res/styles/GlobalStyles'
import HttpUtil from '../../util/HttpUtil' //接口请求
import NavigationBar from '../../common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GeolocationUtil from 'src/util/GeolocationUtil'//定位
import { API } from 'src/api/Api'
import { CurentTime, cureentTimeToDay, cureentTime } from 'src/util/DateUtil'



const  DataTime = ({currentIndex,datatime,onClickIndex}) =>{
    return (
    <ScrollView >
        <View style={styles.timewrap}>
            <TouchableOpacity style={styles.timeView} onPress={()=>onClickIndex(0)} >        
                <Text style={currentIndex==0 ? styles.timeText : styles.timeText2}>全部</Text>        
                <Text style={currentIndex==0  ? styles.timeText : styles.timeText2}>日期</Text>                                
            </TouchableOpacity>
            {datatime&&datatime.map((item,index)=>(
            <TouchableOpacity style={styles.timeView} onPress={()=>onClickIndex(index+1)}activeOpacity={0.6} >        
                <Text style={currentIndex ==index+1 ? styles.timeText : styles.timeText2}>{item.date}</Text>        
                <Text style={currentIndex ==index+1 ? styles.timeText : styles.timeText2}>{item.week}</Text>                                
            </TouchableOpacity>
            ))          
        } 
        </View>        
    </ScrollView>
    )  
}  
//医生列表   
const DoctorList = ({listDoct,props}) => {
    console.log(listDoct,1111111)  
    return (    
        <View style={{backgroundColor:'#fff'}}>  
            {listDoct && 
                <TouchableOpacity style={styles.touchClick}  onPress={() => { NavigationUtil.navigate(props, 'SubscribeRegist3',{doctId:listDoct.id})}}
                >
                <View style={styles.imgView}>
                    <Image style={styles.doctImg} source={{uri:listDoct.headPhotoUrl}} ></Image>
                </View>
                <View>
                    <View style={styles.titleView}>
                        <Text style={{marginRight:20,fontSize:16}} >{listDoct.name}</Text>
                        <Text style={{color:'#999'}} >{listDoct.levelName}</Text>
                            {listDoct.hospitalId!==0 ?
                                <View style={styles.have}>
                                    <Text style={styles.haveText}>有号</Text>
                                </View>:
                                <View style={styles.not}>
                                   <Text style={styles.notText2}>无号</Text>
                                </View>
                            }                                                                            
                    </View>
                    <View style={styles.doctView}>
                        <Text style={styles.text1} >擅     长</Text>
                        <Text >{listDoct.goodsAtDesc}</Text>
                    </View>
                    <View style={styles.doctView}>
                        <Text style={styles.text1} >可约号源</Text>
                        <Text style={{color:'#2F74ED'}} >{listDoct.hospitalId}</Text>
                    </View>
                </View>              
            </TouchableOpacity>      
            }          
        </View>
    )
}
/**
 * 页面下拉刷新及上拉加载
 * @param {*} getData 获取数据方法
 * @param {*} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setlistDoct, props }) => {
    return (
        <ListView
            // refreshable={false}
            ref={(ref) => setlistDoct(ref)}
            onFetch={getData}
            keyExtractor={(item, index) =>
                `${item.id}`
            }
            renderItem={(item, index) => {
                return (
                    <DoctorList listDoct={item} props={props} />
                )
            }}
            numColumns={1}
        />
    )
}


export default function AllServer(props){
    const listData = props.navigation.getParam('listData')||""//上级数据
    const [currentIndex, setCurrentIndex] = useState(0)//单选id
    const [datatime, setdatatime] = useState()//获取时间列表
    const [listDoct,setlistDoct] = useState([])//接收列表元素
    const [params, setParams] = useState();
    const [listDoctView, setlistDoctView] = useState();

    console.log(listData,5555555555)

    //time  
    function initWeek() {
        const arr = []
        for(var i =0; i<5;i++) {
            arr.push(cureentTime(i).toDateWeek(1))
        }
        setdatatime(arr)
    }
    function onClickIndex (index){
        setCurrentIndex(index)
        setParams({desc:index})
    }
    console.log(params,'params数据')
    /**
    * 获取列表数据
    * @param {*} page 页码
    * @param {*} startFetch 设置数据   
    * @param {*} abortFetch 获取数据出错
    */
   function getData(page = 1, startFetch, abortFetch) {
       // timer.current && clearTimeout(timer.current); 
       // timer.current = setTimeout(() => {
       HttpUtil.get(API.DoctorList, {  
           ...params,
           hospitalId:10,
           departmentId:1,
           // latitude: coords.latitude,
           // longitude: coords.longitude, 
           page: page,
           size: 10, 
       }).then((data) => {  
           data = data.data;
           if (data.code === 0) {  
               setlistDoctView(data.data.list || [])
               startFetch(data.data.list || [], 10);
           } else {
               abortFetch();
               ToastUtil.toast(data.msg || '获取数据失败', 'center');
           }
       })
       // }, 10);
   }
   useEffect(() => {
    initWeek()
    if (listDoct.ulv) {
        listDoct.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
        listDoct.refresh();
    }
}, [params])

console.log(listDoctView,44444444)

    return (
        <Provider>
            <View style={styles.container} >
                <NavigationBar title='选择医生' hide={false} navigator={props.navigation}
                    popEnabled={true}  statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
                <View style={styles.contentBody}>
                    <DataTime datatime={datatime} currentIndex={currentIndex} onClickIndex={onClickIndex}/>
                </View> 
                <WhiteSpace size="lg" />
                <ScrollViewer getData={getData} setlistDoct={setlistDoct}props={props}/> 
            </View>
        </Provider>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    timeView:{
        backgroundColor:'#fff',
        width:(GlobalStyles.window_width)/6,
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center'
    },
    touchClick:{
        flexDirection:'row',alignItems:'center'
    },
    timewrap:{
        backgroundColor:'#fff',
        flexDirection:'row',
        
    },
    titleView:{
        flexDirection:'row',
        marginBottom:7,
        alignItems:'center',
        justifyContent:'space-between'
    },
    timeText:{
        color:'#2F74ED'
    },
    timeText2:{
        color:'#333'
    },
    doctView:{
        flexDirection:'row',
        // lineHeight:10
    },
    imgView:{
        paddingVertical:10,marginLeft:10,marginRight:10
    },
    doctImg:{
        width:80,
        height:80,
    },
    text:{
        marginRight:15
    },
    text1:{
        color:'#999',
        marginRight:20,
        paddingVertical:1
    },
    have:{
        backgroundColor:'#75E088',
        marginLeft:80
    },
    haveText:{
        fontSize:14,
        color:'#fff',
        paddingVertical:2,
        paddingHorizontal:5,
    },
    not:{
        backgroundColor:'#CCCCCC',
        marginLeft:80
    },
    notText2:{
        color:'#fff',
        paddingVertical:2,
        paddingHorizontal:5,
    }



})