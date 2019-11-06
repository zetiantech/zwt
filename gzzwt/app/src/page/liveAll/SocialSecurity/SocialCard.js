/**
 * @description 我的社保卡
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,TouchableOpacity,ImageBackground,Image
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转HttpUtil
import HttpUtil from "src/util/HttpUtil";//页面跳转HttpUtil
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import GlobalStyles from 'src/res/styles/GlobalStyles'

 
  
const FundList = ({infoData}) => {
    return (
        <View state={{}}>
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
            <TouchableOpacity style={{opacity: 1,marginTop:5}} onPress={data.handler} >
                <View style={styles.licenseBody}>
                    <ImageBackground 
                        resizeMode='stretch' 
                        style={styles.imageBg} 
                        source={require('src/res/images/home/card_bg_1.png')}>
                        <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:13,opacity:0.7}}>广州市人力资源和社会保障厅</Text>
                        </View>
                        <View style={styles.contentBox}>                                  
                            <View style={styles.namebox}>
                                <Image source={require('src/res/images/home/icon_zz_1.png')} style={styles.imgBox} />
                                <View style={styles.nameContent}>
                                    <Text style={styles.licenseTitle}>{data.name}</Text>
                                    <Text style={styles.licenseText}>{data.company}</Text>
                                </View>
                            </View>
                            <View style={styles.cardBody}>                                                                        
                                <View style={styles.cardItem}>
                                    <Text style={styles.licenseText1}>卡号</Text>
                                    <Text style={styles.licenseText}>{data.number}</Text>
                                </View>
                                <View style={styles.cardItem}>
                                    <Text style={styles.licenseText1}>社保卡号</Text>
                                    <Text style={styles.licenseText}>{data.condition}</Text>
                                </View>
                            </View>    
                        </View>
                    </ImageBackground>                                                                      
                </View>
            </TouchableOpacity>                          
        </View>
    )

 }
export default function MotorVehicle(props) {

    const [idCard, setIdCard] = useState()

    const [data, setData] = useState(
        { 
            id: 1,
            company: '-',
            name: '-',
            card:'卡号',
            state:'社保卡号',
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
                }
            }).catch(error=>{});
    }

    const [infoData, setInfoData] = useState([
        { 
            id: 1,
            title: '社保卡基本信息',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'SocialSecurityInfo')},        
        },
        { 
            id: 2,
            title: '社保卡查询',
            bg: require('src/res/images/ic_tiaozhuan.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'SocialSecurity')},        
        }
    ]);
    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getSocials()
    }, [idCard])

    const getSocials = () => {
        if(!idCard || idCard==""){
            return;
        }
        HttpUtil.post(API.AccountGetSocials, 
            { idCard: idCard }
        ).then((responseJson) => {  
            const { code, data, msg} = responseJson.data
            if(code === 0 && data != null) {
                setData(data)
            } else {
                ToastUtil.toast(msg || '获取数据失败', 'center');
            }
        });  
    }
  
    function MyGoldCard(params) {
        NavigationUtil.navigate(props, 'DriversResults');
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                     title='我的社保卡'
                     statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                     hide={false} 
                     popEnabled = {true}  
                     navigator ={props.navigation} />
                <FuncCard data={data}/>
                <View style={styles.navBox}>
                    <FundList infoData={infoData} setInfoData={setInfoData}  />
                </View>
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
        height: 220,
        width: (GlobalStyles.window_width-5),
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
        opacity:0.7
    },
    licenseText1:{
        paddingVertical: 5,
        color:'#FFFFFF',
        opacity:0.6
        
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
    }
})