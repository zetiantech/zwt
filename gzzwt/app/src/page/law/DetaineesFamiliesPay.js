/**
 * @description 在押人员家属顾送款预存服务
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
    Toast,Checkbox
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
        title="申请须知"
        animationType="slide-up"
        onClose={onClose}
        visible={visible.visible}
        transparent={false}
        popup={true}
        // closable
        footer={12123}
        >
          <View style={{ paddingVertical: 50, marginHorizontal: 10, }}>
                <Text style={{ textAlign:'center',fontSize:20,marginBottom:30}}>申请须知</Text>
                <View style={{marginVertical: 5,}}>
                    <Text style={{ lineHeight: 22,fontSize:16 }}>一、被监管人员家属网上寄送钱款服务是广东公安监管部门为被监管人员近亲属提供的网上便民服务,
                        只限于公安监管场所,即看守所、拘留所和强制隔离戒毒所
                    </Text>
                </View>        
                <View style={{marginVertical: 5,}}>
                    <Text style={{ lineHeight: 22,fontSize:16 }}>二、被监管人员近亲属每次顾送款总额不得超过500元人民币,在监所内的顾送款余额不得超过2000元人民币</Text>
                </View>
                <View style={{marginVertical: 5,}}>
                    <Text style={{ fontSize:16,lineHeight: 22,}}>三、绑定失败原因可能有</Text>
                    <Text style={{ }}>          1、绑定信息填写有误</Text>
                    <Text style={{ }}>          2、绑定对象没有关押在该监管场所</Text>
                    <Text style={{ }}>          3、绑定对象不符合顾送条件</Text>
                </View>          
            </View>        
            <Button type="primary" style={{marginBottom:50,marginHorizontal: 20,}} onPress={onClose}>
                我知道了
            </Button>
        </Modal>
    )
}



export default function DogProgressQuery(props) {
    const [data, setData] = useState({ //家属
        name: '',
        idCard: '',
        nation:"",
        phone:'',
    });
    const [data1, setData1] = useState({//被监管人
        pipeName: '',
        pipeIdCard: '',
        pipeNation:"",
        certificateType:'',
        bothRelation:"",

    });
    const [showData, setShowData] = useState({
        name: {
            label: '姓名',
            type: 'InputItem',
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
            attr: {
                placeholder: '请输入身份证号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'idcard',
            //         tip: '请输入身份证号',
            //     }
            // ],
        },
        nation: {
            label: '所属国际',
            type: 'InputItem',
            attr: {
                placeholder: '请输入所属国际',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入所属国际',
            //     }
            // ],
        },
        phone: {
            label: '手机号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入手机号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'phone',
            //         tip: '请输入手机号',
            //     }
            // ],
        },
    })
    const [showData1, setShowData1] = useState({
        pipeName: {
            label: '姓名',
            type: 'InputItem',
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
            attr: {
                placeholder: '请输入身份证号',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'idcard',
            //         tip: '请输入正确身份证号',
            //     }
            // ],
        },
        pipeNation: {
            label: '所属国际',
            type: 'InputItem',
            attr: {
                placeholder: '请输入所属国际',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入所属国际,
            //     }
            // ],
        },  
        certificateType: {
            label: '证件类型',
            type: 'Picker',
            data:[],
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择证件类型',
            //     }
            // ],
        },
        bothRelation: {
            label: '双方关系',
            type: 'InputItem',
            attr: {
                placeholder: '请输入双方关系',
                textAlign: "right",
                labelNumber: 7
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入双方关系',
            //     }
            // ],
        },
    })
    const [visible,setvisible] = useState({//Modal
        visible:false
    }) 
    const [type,setType] = useState()//
    //Modal
    function onClose () {
        setvisible({visible:!visible})

    }
    //阅读须知
    function onclick () {
        setType(!type)
        if (!type) {
            setvisible({visible:true})      
        }
    }
    useEffect(() => {

    }, [])
    // 触发操作
    function handleSubmit() { 
        validate({ data, showData, setShowData })
            .then(() => {
                if (type) {
                    console.log('跳转')
                    NavigationUtil.navigate(props, 'ResultPage', {
                       type:2
                    }) 
                } else {  
                    ToastUtil.error('请阅读须知')
                }           
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
                    title='申请绑定'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                
                <Text style={{margin: 10,color:"#999"}}>请输入顾送人员信息</Text>
                <Form data={data} setData={setData} showData={showData} setShowData={setShowData} />

                <Text style={{margin: 10,color:"#999"}}>请输入顾送对象信息</Text>
                <Form data={data1} setData={setData1} showData={showData1} setShowData={setShowData1} />

                <WhiteSpace size="xl" />
                <Checkbox style={{color: type == 0 ? '#979797': '#2F74ED',marginLeft:15}} onChange={onclick} >
                    <Text style={{color:'#2F74ED',marginLeft:10}}>阅读须知</Text>
                </Checkbox>

                <ModalView onClose={onClose} visible={visible}/>

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
        marginTop:15
    },
}); 