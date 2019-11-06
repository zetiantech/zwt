/**
 * @description 居住证申领
 * @author ct
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image

} from 'react-native';

import {
    Button,
    Provider,
    WhiteSpace,
    Modal,
    Toast
} from '@ant-design/react-native';
import NavigationBar from '../../common/NavigationBar'
import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

import JSBridge from 'src/bridge/JSBridge.js';





const DogImage = ({})=>{
    return(
        <View style={{flexDirection: 'row'}}> 

            <View style={{alignItems: 'center' }}>
                <View style={styles.upImgs} >
                    <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                </View> 
                <Text style={{marginTop:5}}>身份证 人像面</Text>
            </View>   
            <View style={{alignItems: 'center' }}>
                <View style={styles.upImgs} >
                    <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                </View> 
                <Text style={{marginTop:5}}>身份证 国微面</Text>
            </View>                                
                     
        </View>
    )
}

export default function DogProgressQuery(props) {

    let infoData = props.navigation.getParam('info')
    console.log(infoData,5555555)
 
    const [data, setData] = useState({
        name: '-',
        idCard:"-",
        dwellCity:'-',
        applyTerm:'-',
        photNumber:'-',
        idCardProve:'-',   
    });
    const [sexData, setSexData] = useState([
        {label: '身份证', value: '1'},
        {label: '户口本', value: '2'}
    ]); //性别

    const [imgData,setimgData] = useState()//获取上传接口图片1
    const [imgData2,setimgData2] = useState()//获取上传接口图片2

    const [showData, setShowData] = useState({
        name: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7
            },
        },
        idCard: {
            label: '身份证号',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
            },   
        },
        dwellCity: {
            label: '居住登记地址',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
            },   
        },
        applyTerm: {
            label: '申领条件',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
            },   
        },
        photNumber: {
            label: '照片流水号',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
            },   
        },
        idCardProve: {
            label: '身份证明',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
            },   
        },
    
    })
    
    useEffect(() => {
       
    }, [])

    // 触发操作
    function handleSubmit() { 
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    idCard: data.idCard
                };
                NavigationUtil.navigate(props, 'ResultPage', {type:2}  );

                // HttpUtil.get(API.GetExamineeInfo, params).then((data) => {
                //     data = data.data;
                //     if (data.code === 0 && data.data !== null) {
                //         let infoData = data.data;
                //         NavigationUtil.navigate(props, 'DogProgressQueryResult', {
                //             info: infoData
                //         })

                //     } else {
                //         ToastUtil.toast(data.msg || '获取数据失败', 'center');
                //     }
                // });
            })
            .catch(error => {
                ToastUtil.error(error,);
            });

    }
     //上传
     function onClickUpload (index) {
         console.log(index,45444)
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
            } else {
                ToastUtil.error('上传失败'); 
                console.log(imgUrlResult);
            }
            })
            .catch(err => console.log(err));
}
    return (
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='居住证申领'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData} />
                <View>
                    <Text style={styles.title}>相关证件材料</Text>          
                </View>
                <DogImage/>
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    提交
                </Button>
            </ScrollView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    upImg:{
        backgroundColor: '#fff',
        marginHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        borderRadius: 10,
        marginTop: 10,
    },
    upImgs:{
        backgroundColor: '#fff',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: (GlobalStyles.window_width)/3,
        height: (GlobalStyles.window_width)/3.5,
        
    },
    title:{
        marginLeft: 20,
        color: '#999',
        marginTop:10
    },
    imgwh:{
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
}); 