/**
 * @description 我的公积金卡
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
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

import GlobalStyles from 'src/res/styles/GlobalStyles'

 

const FundList = ({infoData}) => {
    console.log(infoData)
    return (
        <View>
                {
                    infoData && infoData.map((item, i)=>(
                        <TouchableOpacity key={i} activeOpacity={0.9} style={{marginHorizontal:15,borderBottomWidth:0.4,borderBottomColor:'#E5E5E5'}} onPress={item.handler}  >
                            <View style={styles.listWarp}>
                                <Text style={{color:'#333',}}>{item.title}</Text>
                                <Image style={{tintColor:'#E5E5E5',}} source={item.bg}></Image>
                            </View>       
                        </TouchableOpacity>
                    ))
                }                           
        </View>
    )

 }


const FuncCard = ({Data}) => {
    console.log(Data)
    return (
        <View>
                {
                    Data && Data.map((item, i)=>(
                        <TouchableOpacity key={i} style={{opacity: 1,marginTop:5}} >
                            <View style={styles.licenseBody}>
                                <ImageBackground 
                                    resizeMode='stretch' 
                                    style={styles.imageBg} 
                                    source={item.bg}>
                                    <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#fff',opacity:0.7}}>{item.title}</Text>
                                    </View>
                                    <View style={{marginTop:20,marginLeft:40,flexDirection:'row'}}>
                                                                                                            
                                        <View>
                                            <Text style={styles.licenseTitle}>{item.name}</Text>
                                            <Text style={styles.licenseText}>{item.company}</Text>
                                        </View>                                  
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:20,marginLeft:40,}}>                                                                        
                                            <View >
                                                <Text style={styles.licenseText1}>{item.card}</Text>
                                                <Text style={styles.licenseText}>{item.number}</Text>
                                            </View>
                                            <View style={{marginLeft:50}}>
                                                <Text style={styles.licenseText1}>{item.state}</Text>
                                                <Text style={styles.licenseText}>{item.condition}</Text>
                                            </View>
                                        </View> 
                                </ImageBackground>                                                                      
                            </View>
                        </TouchableOpacity>
                    ))
                }                           
        </View>
    )

 }

    





export default function MyGoldCard(props) {
    const [Data, settData] = useState([
        { 
            id: 1,
            bg: require('../../res/images/home/card_bg_1.png'),
            title:'广州市住房公积金管理中心',
            company: '广东美年科技有限公司',
            name: '李三',
            card:'卡号',
            state:'状态',
            condition:'正常',
            number: '306************5666'
        },
    ]);
    const [infoData, setInfoData] = useState([
        { 
            id: 1,
            title: '公积金查询',
            bg: require('../../res/images/ic_tiaozhuan.png'),  
            handler: ()=>{ NavigationUtil.navigate(props, 'Deposite')},               
        },
       
    ]);
    useEffect(() => {
        
        
    }, [])
  
    function MyGoldCard(params) {
        NavigationUtil.navigate(props, 'DriversResults');
        Toast.info('未查询到相关信息', 4);
        setToastFlag(true);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='我的公积金卡' 
                    hide={false} 
                    popEnabled={true}  
                    navigator={props.navigation} 
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                />
                <FuncCard Data={Data} settData={settData}/>
                <View style={{marginTop:60,borderWidth:0.5,borderRadius:5,marginHorizontal:20,borderColor:'#E5E5E5'}}>
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
        height: 160,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff"
    },
    imageBg: {
        height: 220,
        width: (GlobalStyles.window_width-5),
    },
    imgBox: {
        width: 40,
        height: 40,
        margin: 15,
    },
    licenseTitle: {
        fontSize: 16,
        paddingBottom: 5,
        color: '#fff',
    },
    licenseText: {
        paddingVertical: 5,
        color:'#fff',
        opacity:0.8
    },
    licenseText1:{
        paddingVertical: 5,
        color:'#fff',
        opacity:0.7
        
    },
    listWarp:{
        flexDirection:'row',
        backgroundColor:'#fff',
        // marginHorizontal: 10,
        paddingVertical:20,
        justifyContent:'space-between'
    }
   
})