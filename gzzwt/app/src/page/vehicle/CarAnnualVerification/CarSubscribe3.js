/**
 * @description 基本信息
 * @author 择天团队 
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
    Modal,
 } from '@ant-design/react-native';

import NavigationUtil from 'src/util/NavigationUtil'
import Communications from 'react-native-communications';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from 'src/common/NavigationBar'

import GlobalStyles from 'src/res/styles/GlobalStyles'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import { CurentTime, cureentTimeToDay, cureentTime } from 'src/util/DateUtil'


/**
 * @description 预约时间
 *  检测点
 * */
 const MarriageAddress = ({dataList}) => {
     return (
        <List>
            <List.Item
                styles={{Line: {borderBottomWidth: 0}}}
                style={{padding: 10}}
                extra={
                    <View style={styles.phoneBox}>
                        <TouchableOpacity
                            onPress={()=>{
                                    // 拨打电话
                                Communications.phonecall(data.phone, false);
                            }}
                        >
                            <Image  
                                source={require('src/res/images/common/icon_phone_1.png')} 
                                style={{width: 28, height: 28}}
                            />
                        </TouchableOpacity>
                    </View>
                }
            >
                <Text style={styles.itemTitle}>{dataList.name}</Text>
                <View style={styles.itemCont}>
                    <Image source={require('src/res/images/common/icon_address.png')} style={styles.img} />
                    <Text style={styles.itemText}>{dataList.address}</Text>
                </View>
            </List.Item>
        </List>
     );
 }

 //工作时间Text
// const MarriageWorkTime = ({}) => {
//     const bottomColor = `rgba(134, 106, 255, ${1})`
//     const maskColor = `rgba(47, 116, 237, ${1})`
//     return (
//         <View style={styles.worksTimeBox}>
//             <View style={styles.workTimeTitle}>
//                 <LinearGradient 
//                     colors={[maskColor, bottomColor]} 
//                     start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} 
//                     locations={[0, 0.75]} 
//                     style={styles.linearGradient}>
//                 </LinearGradient>
//                 <Text style={styles.workTimeTitleText}>
//                     工作时间
//                 </Text>
//             </View>
//             <View style={styles.workTimeContent}>
//                 <Text>111</Text>
//             </View>
//         </View>
//     )
//  }


 
const TimeComponent = ({timeData, onShowTime}) => {
    return (
        <View>
            <View style={styles.timeBox}>
                <View style={styles.timeItem}></View>
                {       
                    timeData.map((item, index)=>(
                        <View style={styles.timeItem}>
                            <Text style={styles.week}>{item.week}</Text>
                            <Text style={styles.dateTime}>{item.date}</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.timeBox}>
                <View style={styles.timeItem}>
                    <Text style={styles.ampm}>上午</Text>
                </View>
                <TimeItem list={timeData} type={1}  onPress={onShowTime}/>
            </View>
            <View style={styles.timeBox}>
                <View style={styles.timeItem}>
                    <Text style={styles.ampm}>下午</Text>
                </View>
                <TimeItem list={timeData} type={2} onPress={onShowTime}/>
            </View>
        </View>
    );
}

//
const TimeItem = ({list, type, onPress}) => {
    const timeItemView =  list.map((item, index)=>{
        let view = <></>
       
        if(type==1) {
            view = item.am.length ?
                <View style={[styles.timeItem, styles.btnBg]}>
                    <TouchableOpacity
                        onPress={()=> onPress(item, 1)}
                    > 
                        <Text style={styles.btnText}>点击</Text>
                        <Text style={styles.btnText}>预约</Text>
                    </TouchableOpacity>
                </View> : <View style={styles.timeItem}></View>
        }else{
            view = item.pm.length ? 
            <View style={[styles.timeItem, styles.btnBg]}>
                <TouchableOpacity
                        onPress={()=> onPress(item, 2)}
                    > 
                    <Text style={styles.btnText}>点击</Text>
                    <Text style={styles.btnText}>预约</Text>
                </TouchableOpacity>
            </View> : <View style={styles.timeItem}></View>
        }
        return view
    })
    return timeItemView
}


//弹出框
const ModalComponent = ({visible, type, timeDetail, onSelectTime, onClose}) => {
    const ampm = timeDetail.am && timeDetail.am.length ? '上午':'下午'
    const timeList = type == 1 ? timeDetail.am : timeDetail.pm
    return (
        <Modal
            transparent={false}
            visible={visible}
            popup={true}
            maskClosable={true}
            closable={true}
            animationType="slide-up"
            onClose={onClose}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.optArea}>
                        <View style={styles.modalTitle}>
                            <Image source={require('src/res/images/common/date_icon.png')} style={styles.titleIcon} />
                            <Text style={styles.titleText}>{timeDetail.date} {timeDetail.week}{ampm}</Text>
                        </View>
                        <ModelItem timeList={timeList}  onPress={onSelectTime}/>
                    </View>
                </View>
            </Modal>
    )
}

//弹出框内容
const ModelItem = ({timeList, onPress}) => {
    return (
        <View style={styles.modalContent}>
            {
                timeList && timeList.map((item, index)=>(
                    <TouchableOpacity
                        onPress={onPress(item, index)}
                    >
                        <View style={styles.modalItem}>
                                <Text style={styles.date}>{item.startTimes}-{item.endTimes}</Text>
                                <Text style={styles.number}>可约号源: <Text style={styles.numberText}>{item.validNum}</Text></Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


export default function CarSubscribe3(props) {
    const formData = props.navigation.getParam("formData")//列表数据
    const bustypetwo = props.navigation.getParam("bustypetwo")//车辆类型文本 
    const carData = props.navigation.getParam("carData")//车辆详情
    const dataList = props.navigation.getParam("data")//车辆受理点信息
    const [form, setForm] = useState(formData)

    console.log(bustypetwo,'bustypetwo')



    const [timeData, setTimeData] = useState([])
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [type, setType] = useState(1)
    const [timeDetail, setTimeDetail] = useState({
        am: [],
        pm: [],
        date: '',  
        week: ''
    })
    useEffect(() => {
        const startDate = CurentTime(new Date())
        const endDate = cureentTimeToDay(new Date(), 'add', 7)
        setStartTime(startDate)
        setEndTime(endDate)
        getValidApplyList(1, startTime, endTime)
    }, [])

    //获取获取办理时间,可预约列表数据
    function getValidApplyList(id, startTime, endTime) {
        HttpUtil.get('http://192.168.10.14:8870/registry/getValidApplyList', { 
            registryId: id,
            startTime: startTime,
            endTime: endTime
        })
        .then(responseJson => {
            console.log(responseJson,77777777)  
            const { code, data, msg } = responseJson.data
            if (code == 0) {  
                parseTime(data);
            } 
        });
    }
    
    function initWeek() {
        const arr = []
        for(var i =0; i<7;i++) {
            arr.push(cureentTime(i).toDateWeek(1))
        }
        // console.log(arr,333333333)
        return arr;
    }


    function getItemData(date, data) {
        let arr = []
        data.forEach((item, i) =>{
            const time = item.startTime.split(" ")[0].split("-")
            const startHms = item.startTime.split(" ")[1].split(":")
            const endHms = item.endTime.split(" ")[1].split(":")
            const currTime = time[1] + '-' + time[2]
            const startTimes = startHms[0]+':'+startHms[1]
            const endTimes = endHms[0]+':'+endHms[1]
            item.startTimes = startTimes
            item.endTimes = endTimes
            item.yymmdd = time.join("-")
            if(date == currTime){
                arr.push(item);
            }
        })
        return arr;
    }

    function timeHandle(data) {
        const weekArr = initWeek()
        let arr = []
        weekArr.forEach((week, k)=>{
           const itemData = getItemData(week.date, data)
           week.data = itemData
           arr.push(week);
        })
        return arr; 
    }

    function amPmGroup(nList){
        let newsItem = []
        nList.forEach((item, index) => {
            let items = {
                yymmdd: item.yymmdd,
                date: item.date,
                week: item.week
            }
            let list = item.data;
            let am = [], pm = []
            list.forEach((it, i)=>{
                it.week = item.week
                if(it.amPm == 1){
                    am.push(it)
                }else{
                    pm.push(it)
                }  
            })
            items.am = am
            items.pm = pm
            newsItem.push(items);
        })
        return newsItem;
    }

    function parseTime(data) {
        let arr = timeHandle(data)
        let newsItem = amPmGroup(arr)
        setTimeData(newsItem)
    }

    const [visible, setVisible] = useState(false)

    const onClose = () => {
        setVisible(false)
    };

    const onShowTime = (item, type) => {
        setVisible(true)
        setTimeDetail(item)
        setType(type)
    }

    function onSelectTime(item, index) {
        console.log(item,index,55555)
        if(!visible){
            let forms = {...form, ...item}  
            console.log(forms,9999999999)
            console.log(carData,777777)
            NavigationUtil.navigate(props, 'CarSubscribe4', {forms: forms,bustypetwo:bustypetwo,carData:carData,dataList:dataList})
        }
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    navigator={props.navigation}
                    popEnabled={true}
                    title='选择时段'
                    hide={false}
                />
                <ScrollView>
                    <WhiteSpace size="lg" />  
                    <MarriageAddress dataList={dataList} />
                    <WhiteSpace size="lg" />
                    <TimeComponent timeData={timeData} onShowTime={onShowTime}/>
                    <WhiteSpace size="lg" />
                    {/* <MarriageWorkTime  /> */}
                    <ModalComponent visible={visible} type={type} timeDetail={timeDetail} onSelectTime={onSelectTime} onClose={onClose}/>
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
    },
    phoneBox: {
        width: 80, 
        paddingLeft: 20, 
        alignItems: 'center', 
        borderLeftColor: '#e4e4e4', 
        borderLeftWidth: 1
    },
    worksTimeBox: {
        marginTop: 15,
        backgroundColor: '#FFFFFF'
    },
    workTimeTitle: {
        padding: 12,
        fontSize: 16,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    },
    workTimeTitleText: {
        paddingLeft: 10,
        fontSize: 16,
        color: '#333'
    },
    linearGradient: {
        position: 'absolute',
        zIndex: -1,
        height: 14,
        left: 12,
        top: 17,
        width: 4,
        borderRadius: 2
    },
    workTimeContent: {
        padding: 20,
        color: '#333'
    },
    timeBox: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    timeItem: {
        width: (GlobalStyles.window_width/8),
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        borderRightColor: '#f0f0f0',
        borderRightWidth: 1,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    week: {
        fontSize: 14,
        color: '#333'
    },
    dateTime: {
        fontSize: 12,
        color: '#666',
        marginTop:5
      
    }, 
    ampm: {
        marginTop: 8,
        fontSize: 16,
        color: '#666'
    },
    btnText: {
        color: '#2F74ED'
    },
    btnBg: {
        backgroundColor: '#F4F5FF'
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: GlobalStyles.window_width,
        height: 340,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    optArea: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        marginBottom: 12,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleIcon: {
        width: 22,
        height: 22
    },
    titleText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666'
    },
    modalContent: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
       
    },
    modalItem: {
        width: (GlobalStyles.window_width)/3,
        backgroundColor: '#F5F5F5',
        marginVertical: 5,
        marginRight: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    date: {
        paddingVertical: 3,
        color: '#333',
        fontSize: 14,
    },
    numberText: {
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#2F74ED'
    },
    number: {
        color: '#666',
        fontSize: 12,
    }
});

