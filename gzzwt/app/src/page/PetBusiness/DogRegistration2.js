/**
 * @description 犬只信息填写
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







export default function DogProgressQuery(props) {
    const [data, setData] = useState({
        dogName: '',
        weight:"",
        dogHeight: '',
        dogcolor:'',
        dogSex:'',
        dogKind:'',
        dogBirthDate:"",
        purpose:"",
        subordinatePolice:"",
        immuneCard:"",
        immuneTime:"",
        immuneOrg:"",
        dogImage:"",
    });
    const [sexData, setSexData] = useState([
        {label: '雌', value: '1'},
        {label: '雄', value: '2'}
    ]); //性别

    const [imgData,setimgData] = useState()//获取上传犬只图片

    const [showData, setShowData] = useState({
        dogName: {
            label: '犬名',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入犬名',
                textAlign: "right",
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入犬名',
            //     }
            // ],
        },
        weight: {
            label: '体重(kg)',
            type: 'InputItem',
            text:"number",
            attr: {
                placeholder: '请输入体重',
                textAlign: "right",
            },
            // validator: [
            //     {
            //         rule: 'number',
            //         tip: '请输入体重(体重只能为纯数字)',
            //     }
            // ],
        },
        dogHeight: {
            label: '肩高(cm)',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入肩高',
                textAlign: "right",
            },
            // validator: [
            //     {
            //         rule: 'number',
            //         tip: '请输入肩高(肩高只能为纯数字)',
            //     }
            // ],
        },
        dogcolor: {
            label: '毛色',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入犬只毛色',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入犬只毛色',
            //     }
            // ],
        },
        dogSex: {
            label: '犬只性别',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择犬只性别',
            //     }
            // ],
        },
        dogKind: {
            label: '犬种',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择犬种',
            //     }
            // ],
        },
        dogBirthDate: {
            label: '出生日期',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择出生日期',
            //     }
            // ],
        },
        purpose: {
            label: '饲养用途',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择饲养用途',
            //     }
            // ],
        },
        subordinatePolice: {
            label: '所属派出所',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择所属派出所',
            //     }
            // ],
        },
        immuneCard: {
            label: '免疫证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入免疫证号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入免疫证号',
            //     }
            // ],
        },
        immuneTime: {
            label: '免疫有效期',
            type: 'DatePicker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择免疫有效期',
            //     }
            // ],
        },
        immuneOrg: {
            label: '免疫机构',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入免疫机构',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入免疫机构',
            //     }
            // ],
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
                NavigationUtil.navigate(props, 'DogRegistration3', {info: data});

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
                ToastUtil.error(error);
            });

    }
     //上传
     function onClickUpload () {
        onUpload()
    }
    async function onUpload (index) {
        const bridge = new JSBridge(props);
        const data = await bridge.selectedPhotos();
        bridge.upload(API.UPLOADFILE, {
            uri: data[0].uri,
            })
            .then(imgUrlResult => {
            if (imgUrlResult.code === 0) {
                setimgData(imgUrlResult.data)
                
            } else {
                ToastUtil.toast('上传失败', 'center'); 
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
                    title='犬只信息填写'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData} />
                <WhiteSpace size="xl" />
                <View>
                    <Text style={styles.title}>请上传以下照片</Text>          
                        { imgData == undefined ?
                        <View >                                  
                            <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload()} >
                                <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                                <Text>犬只照片(犬侧面全身照片)</Text>    
                            </TouchableOpacity>               
                        </View>:
                        <View>  
                            <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload()}>
                                <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData}}></Image>
                            </TouchableOpacity>
                        </View> 
                        }
                </View>
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    下一步
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
        marginTop:30,
        marginBottom:30
    },
    upImg:{
        backgroundColor:'#fff',
        marginHorizontal:50,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:60,
        borderRadius:10,
        marginTop:20,
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
    title:{
        marginLeft:20,
        color:'#999'
    },
    imgwh:{
        width:'100%',
        height:'100%',
        borderRadius:10,
    },
}); 