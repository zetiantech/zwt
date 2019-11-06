/**
 * @description 我的社保卡
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native';
import {
    Provider,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转HttpUtil
import HttpUtil from "src/util/HttpUtil";//页面跳转HttpUtil
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import dayjs from 'dayjs'
import GlobalStyles from 'src/res/styles/GlobalStyles'

 
  
const FundList = ({infoData}) => {
    return (
        <View style={styles.navBox}>
            {
                infoData && infoData.map((item, i)=>(
                    <TouchableOpacity activeOpacity={0.9} key={i} style={{marginHorizontal:10,borderBottomWidth:0.4,borderBottomColor:'#E5E5E5'}}  onPress={item.handler}>
                        <View style={styles.listWarp}>
                            <Text style={{color:'#333'}}>{item.title}</Text>
                            <Image style={{tintColor:'#E5E5E5'}} source={item.bg}></Image>
                        </View>       
                    </TouchableOpacity>
                ))
            }                           
        </View>
    )
 }
const FuncCard = ({data}) => {
    return (
        <View>
            <WhiteSpace size="lg" />
            <TouchableOpacity activeOpacity={0.8} onPress={data.handler} >
                <View style={styles.licenseBody}>
                    <ImageBackground 
                        resizeMode='stretch' 
                        style={styles.imageBg} 
                        source={require('src/res/images/home/card_bg_4.png')}>
                        <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:13,opacity:0.7}}>广州市公安局</Text>
                        </View>
                        <View style={styles.contentBox}>                                  
                            <View style={styles.namebox}>
                                <Image source={require('src/res/images/home/icon_zz_4.png')} style={styles.imgBox} />
                                <View style={styles.nameContent}>
                                    <Text style={styles.licenseTitle}>{data.name}</Text>
                                    <Text style={styles.licenseText}>有效期限 {data.firstGetDate||'-'} 至 {data.validDate||'-'}</Text>
                                </View>
                            </View>
                            <View style={styles.cardBody}>                                                                        
                                <View style={styles.cardItem}>
                                    <Text style={styles.licenseText1}>驾驶证号</Text>
                                    <Text style={styles.licenseText}>{data.dlCode}</Text>
                                </View>
                                <View style={styles.cardItem}>
                                    <Text style={styles.licenseText1}>类型</Text>
                                    <Text style={styles.licenseText}>{data.allowDrvingTypeName}</Text>
                                </View>
                            </View>    
                        </View>
                    </ImageBackground>                                                                      
                </View>
            </TouchableOpacity>                          
        </View>
    )
 }

const JiFen = ({data})=>{
    return (
        <View style={styles.contentBody}>
            <View style={styles.contentItem}>
                <Text style={styles.titleLabel}>记分</Text>
                <Text style={[styles.titleText, {color: '#F12F2F'}]}>{data.totalDeductScore||0}</Text>
            </View>
            <View style={styles.contentItem1}></View>
            <View style={styles.contentItem}>
                <Text style={styles.titleLabel}>状态</Text>
                <Text style={[styles.titleText, {fontWeight: '600'}]}>{data.status==1?'正常':'异常'}</Text>
            </View>
        </View>
    )
}

export default function DrivingCard(props) {

    const [idCard, setIdCard] = useState()

    const [data, setData] = useState(
        { 
            id: 1,
            company: '-',
            name: '-',
            condition: '-',
            number: '-'
        }
    );
     
    const getUserInfo = () => {
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    setIdCard(data.idCard)
                }else{
                    ToastUtil.toast(msg)
                }
            }).catch(error=>{});
    }

    const [infoData, setInfoData] = useState([
        { 
            id: 1,
            title: '违章查询',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'MotorVehicle')},        
        },
        { 
            id: 2,
            title: '交通违法',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'DriverDetails')},        
        },
        { 
            id: 3,
            title: '机动车业务',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'VehicleIndex')},        
        },
        { 
            id: 4,
            title: '驾驶证业务',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'drivingLicenceIndex')},        
        },
        { 
            id: 5,
            title: '交通出行',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')},        
        }
    ]);
    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getVehicleDriving()
    }, [idCard])

    const getVehicleDriving = () => {
        if(!idCard || idCard==""){
            return;
        }
        HttpUtil.get(API.VehicleDrivingLicenseGetOne, {
            idCard: idCard
         }
        ).then((responseJson) => {  
            const { code, data, msg} = responseJson.data
            if(code === 0 && data != null) {
                const firstGetDate = dayjs(data.firstGetDate).format('YYYY-MM-DD')
                const validDate = dayjs(data.validDate).format('YYYY-MM-DD')
                const dlCode = strLen(data.dlCode);
                setData({...data, dlCode: dlCode, firstGetDate: firstGetDate, validDate: validDate })
            } else {
                ToastUtil.toast(msg || '获取数据失败', 'center');
            }
        });  
    }

    // 处理证件号中的省略部分
    function strLen (str) {
        let arr = str.split("")
        if(arr.length && arr !=null){
            for(let i = 3, l = (arr.length-3); i < l; i++){
                arr[i] = '*'
            }
        }
        return arr.join("")
    }
  
    function MyGoldCard(params) {
        NavigationUtil.navigate(props, 'DriversResults');
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                     title='我的驾驶证'
                     statusBar={{backgroundColor: '#FFFFFF'}}
                     hide={false} 
                     popEnabled = {true}  
                     navigator ={props.navigation} />
                <ScrollView>
                    <FuncCard data={data}/>
                    <JiFen data={data} />
                    <FundList infoData={infoData} setInfoData={setInfoData}  />
                </ScrollView>
                <WhiteSpace  size="lg"/>
                <WhiteSpace  size="lg"/>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    licenseBody: {
        height: 210,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff"
    },
    imageBg: {
        height: 210,
        width: (GlobalStyles.window_width-15)
    },
    imgBox: {
        width: 46,
        height: 46,
        marginLeft: 10,
    },
    licenseTitle: {
        fontSize: 16,
        paddingBottom: 2,
        color: '#fff'
    },
    licenseText: {
        paddingVertical: 2,
        color:'#fff',
        opacity: 0.8,
    },
    licenseText1:{
        paddingVertical: 5,
        color:'#FFFFFF',
        opacity: 0.6
    },
    listWarp:{
        flexDirection:'row',
        backgroundColor:'#fff',
        marginHorizontal: 10,
        paddingVertical: 20,
        justifyContent:'space-between'
    },
    contentBox: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cardBody: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection:'row'
    },
    cardItem: {
        flex: 1,
    },
    nameContent: {
        paddingHorizontal: 15,
    },
    namebox: {
        flexDirection: 'row'
    },
    navBox: {
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: 15,
        borderColor: '#E5E5E5'
    },
    contentBody: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentItem: {
        flex: 1,
        alignItems: 'center'
    },
    contentItem1: {
        height: 30,
        width: 1,
        backgroundColor: '#E5E5E5'
    },
    titleLabel: {
        paddingVertical: 5,
        fontSize: 14,
    },
    titleText: {
        fontSize: 16,
        paddingVertical: 5
    }
})