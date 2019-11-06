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
    const [imgData,setimgData] = useState()//获取上传接口图片
    const [Data,setData] = useState()//用户信息 
    const [type,setType] = useState(0)//

    let formDatas = {...Data,imgData}

    function onChange () {

    }
 
   function onButtonClick (){
       console.log(imgData,'imgDataimgData')
       if (imgData==""||imgData==undefined) {
        ToastUtil.toast('请上传照片','center')
        return
        }
    NavigationUtil.navigate(props,'CarInformationExTwo',{formDatas:formDatas})
}
    //阅读须知
    function onclick () {
        setType(!type)
    }  
    async function onUpload () {
        const options = {
            imageCount: 1,          // 最大选择图片数目，默认6
            isCamera: true,         // 是否允许用户在内部拍照，默认true
            isCrop: false,          // 是否允许裁剪，默认false
            isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
            showCropCircle: false,  // 是否显示圆形裁剪区域，默认false
            showCropFrame: true,    // 是否显示裁剪区域，默认true
            showCropGrid: false     // 是否隐藏裁剪区域网格，默认false
        };   
        SYImagePicker.showImagePicker(options,
            async (err, selectedPhotos) => {
                if (err) {
                    return;
                }      
                const bridge = new JSBridge(props);
                const data = await bridge.selectedPhotos();
                bridge.upload(API.UPLOADFILE, {
                    uri: data[0].uri,
                    })
                    .then(imgUrlResult => {
                    if (imgUrlResult.code === 0) {
                        console.log(imgUrlResult,1111111)
                        setimgData(imgUrlResult.data)

                    } else {
                        ToastUtil.toast('上传失败', 'center');
                        console.log(imgUrlResult);
                    }
                    })
                    .catch(err => console.log(err));                          
            }
        ) 
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
    console.log(imgData,11111111)
        return (  
        <View style={styles.container}>
            <NavigationBar title='车辆基本信息' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>
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
                { imgData == undefined &&
                <View style={{marginTop:15}} >                                  
                    <Text style={styles.title}>请上传以下证件照片</Text>    
                    <TouchableOpacity style={styles.upImg} onPress={()=>onUpload()} >
                        <Image style={{width:35,height:35}} source={require('../../../res/images/btn_picload.png')}></Image>
                        <Text>交强险凭证照片</Text>    
                    </TouchableOpacity>               
                </View>
                }
                {imgData &&               
                    <View>  
                        <Text style={styles.title}>请上传以下证件照片</Text>    
                        <TouchableOpacity style={styles.upImgs} onPress={()=>onUpload()}>
                            <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData}}></Image>
                        </TouchableOpacity>
                    </View>
                                
                }    
                <View style={{marginLeft:15,marginTop:15}}>                  
                    <Checkbox style={{color: type == 0 ? '#979797': '#2F74ED',marginLeft:15,}} onChange={onclick} >
                    <Text style={{color:'#2F74ED',marginLeft:10}}>阅读须知</Text>
                    </Checkbox>
                    <List style={styles.buttonStyles}>
                        <Button type="primary" onPress={onButtonClick}>下一步</Button>
                    </List>  
                </View>    
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

