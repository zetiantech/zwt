/**
 * @description 个人增量指标申请
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
        transparent={false}
        onClose={onClose}
        visible={visible.visible}
        popup={true}
        animationType="slide-up"
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
        applyName: '',
        applyType: '',
        sex:"",
        birthTime:'',
        cardType:'',
        cardNumber:'',
        applyDrivingType:'',
        drivingNumber:'',
        drivingFileNumber:'',
        allowVehicleModel:'',
        thisCard:'',
        myWhetherReg:'',
        email:'',
        contactCity:'',
        detailAddress:'',
        postcode:''
    });
    const [sexData, setSexData] = useState([
        {label: '合法稳定就业', value: '1'},
        {label: '居住期满', value: '2'}
    ]); //性别

    
    
    const [showData, setShowData] = useState({
        applyName: {
            label: '申请人姓名',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
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
        applyType: {
            label: '申请类型',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择申请类型',
            //     }
            // ],
        },
        sex: {
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
        birthTime: {
            label: '出生日期',
            type: 'DatePicker',
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择出生日期',
            //     }
            // ],
        },
        cardType: {
            label: '证件类型',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择证件类型',
            //     }
            // ],
        },
        cardNumber: {
            label: '证件号码',
            type: 'InputItem',
            attr: {
                placeholder: '请输入证件号码',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入证件号码',
            //     }
            // ],
        },
        applyDrivingType: {
            label: '申请驾照使用的证件类型',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择申请证件类型',
            //     }
            // ],
        },
        drivingNumber: {
            label: '机动车驾驶证号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入机动车驾驶证号',
                textAlign: "right",
                labelNumber: 8
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入机动车驾驶证号',
            //     }
            // ],
        },
        drivingFileNumber: {
            label: '机动车驾驶档案编号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入编号',
                textAlign: "right",
                labelNumber: 10
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入机动车驾驶档案编号',
            //     }
            // ],
        },
        allowVehicleModel: {
            label: '准驾车型',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择准驾车型',
            //     }
            // ],
        },
        thisCard: {
            label: '是否本地驾照',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择是否本地驾照',
            //     }
            // ],
        },
        myWhetherReg: {
            label: '本人名下是否有在登记中小客车',
            type: 'Picker',
            data: sexData,
            validator: [
                {
                    rule: 'require',
                    tip: '请选择 本人名下是否有在登记中小客车',
                }
            ],
        },
        email: {
            label: '电子邮箱',
            type: 'InputItem',
            attr: {
                placeholder: '请输入电子邮箱',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入电子邮箱',
            //     }
            // ],
        },
        contactCity: {
            label: '联系地址',
            type: 'Picker',
            data: sexData,
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请选择联系地址',
            //     }
            // ],
        },
        detailAddress: {
            label: '详细地址',
            type: 'InputItem',
            attr: {
                placeholder: '请输入详细地址',
                textAlign: "right",
                labelNumber: 6
            },
            // validator: [
            //     {
            //         rule: 'require',
            //         tip: '请输入详细地址',
            //     }
            // ],
        },
        postcode: {
            label: '邮编',
            type: 'InputItem',
            attr: {
                placeholder: '请输入邮编',
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
                    NavigationUtil.navigate(props, 'personIndexApply2', {info: data});
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
                    title='个人指标申请'
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
                {/* <ModalView onClose={onClose} visible={visible}/> */}
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
        marginBottom:30,
    },
}); 