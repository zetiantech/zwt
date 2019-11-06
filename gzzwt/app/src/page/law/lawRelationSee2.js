/**
 * @description 被监管对象家属会见预约-家属探访预约
 * @author ct
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
    Text,

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





export default function DogProgressQuery(props) {
    const [data, setData] = useState({ //家属
        name: '',
        idCard: '',
        contactCity:"",
        dwellCity:'',
    });
    const [data1, setData1] = useState({//被监管人
        pipeName: '',
        pipeIdCard: '',
        pipeRelation:"",
        pipeSeePersonNumber:'',
    });
    const [showData, setShowData] = useState({
        name: {
            label: '姓名',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入姓名',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入姓名',
            //     }
            // ],
        },
        idCard: {
            label: '身份证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入身份证号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入身份证号',
            //     }
            // ],
        },
        contactCity: {
            label: '联系地址',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入联系地址',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入联系地址',
            //     }
            // ],
        },
     
        dwellCity: {
            label: '现住地址',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入现住地址',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入现住地址',
            //     }
            // ],
        },
    })
    const [showData1, setShowData1] = useState({
        pipeName: {
            label: '姓名',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入姓名',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入姓名',
            //     }
            // ],
        },
        pipeIdCard: {
            label: '身份证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入身份证号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入身份证号',
            //     }
            // ],
        },
        pipeRelation: {
            label: '关系',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入联系地址',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入双方关系,
            //     }
            // ],
        },
     
        pipeSeePersonNumber: {
            label: '会见人数',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'number',
            //         tip: '请输入会见人数(必须为数字)',
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
                NavigationUtil.navigate(props, 'lawRelationSee3', {
                info: {...data,...data1}
                })  
            })
            .catch(error => {
                ToastUtil.error(error);
            });

    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='家属探访预约'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                
                <Text style={{margin: 10,color:"#999"}}>请输入家属信息</Text>
                <Form data={data} setData={setData} showData={showData} setShowData={setShowData} />

                <Text style={{margin: 10,color:"#999"}}>请输入被监管人信息</Text>
                <Form data={data1} setData={setData1} showData={showData1} setShowData={setShowData1} />

                <WhiteSpace size="xl" />
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    下一步
                </Button>
            </View>
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
    },
}); 