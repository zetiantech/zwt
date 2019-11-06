/**
 * @description 补换领机动车合格标志1
 * @author 择天团队
*/
import React, { Component,useState,useEffect, useRef } from 'react'

import {
    View,
    Text,
    Image,
    StyleSheet,TouchableOpacity
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    Modal, 
    DatePicker,
    Checkbox
 } from '@ant-design/react-native';
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航  
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'
import GlobalStyles from '../../../res/styles/GlobalStyles'

import JSBridge from 'src/bridge/JSBridge.js';

import SYImagePicker from "react-native-syan-image-picker";
import PermissionUtil from "src/util/PermissionUtil";
import { ScrollView } from 'react-native-gesture-handler';

const dataSource = require('@bang88/china-city-data');



/*** 
 * 补换领机动车合格标志
 * belongName-用户名  modelTyPeId-车辆类型，plateNo-车辆号码,
 * validDate-有效期时间
 * 
*/
export default function CarInformationEx (props) {
    const [formData,setFormData] = useState({
        belongName: '',applyDate:'',
    })
    const [imgData,setimgData] = useState()//获取上传接口图片1
    const [imgData2,setimgData2] = useState()//获取上传接口图片2
    const [imgData3,setimgData3] = useState()//获取上传接口图片3
    const [imgData4,setimgData4] = useState()//获取上传接口图片4
    const [Data,setData] = useState()//用户信息 
    const [type,setType] = useState(0)//
    function onChange () {

    }
   function onButtonClick (){
        if (imgData==""||imgData==undefined) {
            ToastUtil.toast('请上传交强险照片','center')
            return
        }
        if (imgData2==""||imgData2==undefined) {
            ToastUtil.toast('请上传车船纳税或免税证明','center')
            return
        }
        if (imgData3==""||imgData3==undefined) {
            ToastUtil.toast('请上传机动车检验合格证明','center')
            return
        }
        if (imgData4==""||imgData4==undefined) {
            ToastUtil.toast('请上传核发动机检验合格标志委托书','center')
            return
        }

        let formImgData = {...Data,img1:imgData,img2:imgData2,img3:imgData3,img4:imgData4}
        console.log(formImgData,111111)
        NavigationUtil.navigate(props,'EntrustCheckoutCarMessageTwo',{formImgData:formImgData})
    }
    //阅读须知
    function onclick () {
        setType(!type)
    }
    //上传
    function onClickUpload (index) {
        onUpload(index)
    }

    async function onUpload (index) {
        const bridge = new JSBridge(props);
        const data = await bridge.selectedPhotos();
        bridge.upload(API.UPLOADFILE, {
            uri: data[0].uri,
            })
            .then(imgUrlResult => {
            if (imgUrlResult.code === 0) {
                if (index==1) {
                    setimgData(imgUrlResult.data)
                }
                if (index==2) {
                    setimgData2(imgUrlResult.data)
                }
                if (index==3) {
                    setimgData3(imgUrlResult.data)
                }
                if (index==4) {
                    setimgData4(imgUrlResult.data)
                }
            } else {
                ToastUtil.toast('上传失败', 'center');
                console.log(imgUrlResult);
            }
            })
            .catch(err => console.log(err));
}

    useEffect(() => {
        //车主信息
        HttpUtil.get(API.VehicleApplyGetOne, {id:1})  
        .then(responseJson=>{   
            // console.log(responseJson,888)  
            const { code, data, msg } = responseJson.data  
            if(code === 0){
                const a = data.validDate
                let  b = a.substr(0,10)
                data.dateTime = b
                setData({...data })
            }    
        }).catch(error=>{
            console.log(error,'error')
        });
    //车辆类型
    HttpUtil.get(API.KeyValueList, {kindId:1})  
    .then(responseJson=>{   
        const { code, data, msg } = responseJson.data  
        // console.log(data,'车辆类型')          
        if(code === 0){     
            let arr = [];   
            for (const v of data) {
                arr.push({ 
                    value: v.id,
                    label: v.name
                })  
            }
            setmodelTyPeId(arr) 
        }  
    }).catch(error=>{
        console.log(error,'error')
});
    
    },[])
        return (  
        <View style={styles.container}>
            <NavigationBar title='车辆基本信息' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>
            <ScrollView>
                {   Data && 
                    <List style={{marginTop: 15}}>
                    <InputItem
                        type="text"
                        labelNumber="8"
                        textAlign='right'
                        value={Data.belongName}
                        onChange={(val)=>setFormData({...formData, name: val})}
                        onOk={onChange}
                    >
                    所有人  
                    </InputItem>
                    <InputItem
                        type="phone"
                        labelNumber="8"
                        textAlign='right'
                        value={Data.modelKindName}
                        onChange={(val)=>setFormData({...formData, name: val})}
                        onOk={onChange}
                    >
                    号牌号码
                    </InputItem>
                    <InputItem
                        type="phone"
                        labelNumber="8"
                        textAlign='right'
                        value={Data.plateNumber}
                        onChange={(val)=>setFormData({...formData, name: val})}
                        onOk={onChange}
                    >
                    号牌号码
                    </InputItem>
                    <InputItem
                        textAlign='right'
                        labelNumber="8"
                        cols={3}
                        itemStyle={{padding: 10}}
                        value={Data.dateTime}
                        onChange={(val)=>setFormData({...formData, applyDate: val})}
                        onOk={onChange}
                        >
                        检验有效期止
                    </InputItem>
                </List>
                }
                <Text style={styles.title}>请上传以下证件照片</Text>

                { imgData == undefined ?
                <View >                                  
                    <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(1)} >
                        <Image style={{width:35,height:35}} source={require('../../../res/images/btn_picload.png')}></Image>
                        <Text>交强险凭证照片</Text>    
                    </TouchableOpacity>               
                </View>:
                <View>  
                    <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(1)}>
                        <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData}}></Image>
                    </TouchableOpacity>
                </View> 
                }
                { imgData2 == undefined ?
                <View >                                  
                    <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(2)} >
                        <Image style={{width:35,height:35}} source={require('../../../res/images/btn_picload.png')}></Image>
                        <Text>车船纳税或免税证明</Text>    
                    </TouchableOpacity>               
                </View>:
                <View>  
                    <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(2)}>
                        <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData2}}></Image>
                    </TouchableOpacity>
                </View> 
                }
                { imgData3 == undefined ?
                <View >                                  
                    <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(3)} >
                        <Image style={{width:35,height:35}} source={require('../../../res/images/btn_picload.png')}></Image>
                        <Text>机动车安全技术检验合格证明</Text>    
                    </TouchableOpacity>               
                </View>:
                <View>  
                    <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(3)}>
                        <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData3}}></Image>
                    </TouchableOpacity>
                </View> 
                }
                { imgData4 == undefined ?
                <View >                                  
                    <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(4)} >
                        <Image style={{width:35,height:35}} source={require('../../../res/images/btn_picload.png')}></Image>
                        <Text>核发检验合格标志委托书</Text>    
                    </TouchableOpacity>               
                </View>:
                <View>  
                    <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(4)}>
                        <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData4}}></Image>
                    </TouchableOpacity>
                </View> 
                }               
                <View style={{marginLeft:15,marginTop:15}}>                  
                    <Checkbox style={{color: type == 0 ? '#979797': '#2F74ED',marginLeft:15,}} onChange={onclick} >
                        <Text style={{color:'#2F74ED',marginLeft:10}}>阅读须知11</Text>
                    </Checkbox>
                    <List style={styles.buttonStyles}>
                        <Button type="primary" onPress={onButtonClick}>下一步</Button>
                    </List>  
                </View> 
            </ScrollView>       
        </Provider>
            
        </View>
        );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
    },
    courierContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,  
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    courierText: {
        color: '#999',
        fontSize: 14
    },
    courierText1: {
        color: '#333',
        fontSize: 16
    },
    upImg:{
        backgroundColor:'#fff',
        marginHorizontal:50,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:60,
        borderRadius:10,
        marginTop:20
    },
    upImgs:{
        backgroundColor:'#fff',
        marginHorizontal:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop:20,
        width:(GlobalStyles.window_width)/1.4,
        height:(GlobalStyles.window_width)/2,
    },
    imgwh:{
        width:'100%',
        height:'100%',
        borderRadius:10,


    },
    title:{
        marginLeft:20
        ,marginTop:10, 
        color:'#999'
    }
});

