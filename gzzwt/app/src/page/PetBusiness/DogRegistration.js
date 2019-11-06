/**
 * @description 个人养犬信息填写
 * @author ct
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView

} from 'react-native';

import {
    Button,
    Provider,
    WhiteSpace,
    Modal,
    Toast,
} from '@ant-design/react-native';
import NavigationBar from '../../common/NavigationBar'
import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转



const ModalView = ({onClose,visible}) => {
    return (
        <Modal  
        title="温馨提示"
        transparent
        onClose={onClose}
        visible={visible.visible}
        popup={false}
        // closable
        // footer={12123}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ textAlign: 'center' }}>请确认是否具有</Text>
            <Text style={{ textAlign: 'center' }}>1,免疫证号</Text>
            <Text style={{ textAlign: 'center' }}>2,免疫有效时间</Text>
            <Text style={{ textAlign: 'center' }}>3,免疫机构名称</Text>
            <Text style={{ textAlign: 'center' }}>如果没有将无法通过审核!!</Text>
          </View>
          <Button type="primary" onPress={onClose}>
            我知道了
          </Button>
        </Modal>
    )
}


export default function DogProgressQuery(props) {
    const [data, setData] = useState({
        name: '',
        gender:"",
        idCard: '',
        phone:'',
        dwellCity:'',
        detAddress:'',
    });
    const [sexData, setSexData] = useState([
        {label: '男', value: '1'},
        {label: '女', value: '2'}
    ]); //性别

    
    
    const [showData, setShowData] = useState({
        name: {
            label: '养犬人姓名',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入养犬人姓名',
            //     }
            // ],
        },
        gender: {
            label: '性别',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择性别',
            //     }
            // ],
        },
        idCard: {
            label: '养犬人身份证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入养犬人身份证号',
            //     }
            // ],
        },
        phone: {
            label: '养犬人手机号码',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入养犬人手机号码',
            //     }
            // ],
        },
        dwellCity: {
            label: '居住地址',
            type: 'Picker',
            height: 50,
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择居住地址',
            //     }
            // ],
        },
        detAddress: {
            label: '详细地址',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入详细地址',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入详细地址',
            //     }
            // ],
        },
    })
    
    useEffect(() => {

    }, [])
    const [visible,setvisible] = useState({//Modal
        visible:false
    })
    //Modal
    function onClose () {
        setvisible({visible:!visible})
        // NavigationUtil.navigate(props, 'DogRegistration2', {info: data});

    }

    // 触发操作
    function handleSubmit() { 
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    idCard: data.idCard
                };
                setvisible({visible:true})      
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
    return (
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='养犬人信息填写'
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
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    下一步
                </Button>
                <ModalView onClose={onClose} visible={visible}/>
            </ScrollView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#F0F0F0'
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
    },
}); 