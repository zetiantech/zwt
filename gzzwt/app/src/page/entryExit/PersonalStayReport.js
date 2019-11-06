/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';

import { 
    Button,
    Provider,
    Modal
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import LogUtil from 'src/util/LogUtil'
 import NavigationUtil from 'src/util/NavigationUtil';

const dataSource = require('@bang88/china-city-data');


const sexSource = [
    { label: '女', value: '女' },
    { label: '男', value: '男' }
]


export default function PersonalStayReport(props){

    const [params, setParams] = useState({
        cardType: '',
        cardId: '',
        date: '',
        country: '',

        enSex: '',
        enName: '',
        sex: '',
        brithdy:'',

        incomeDate: '',
        phone: '',  
        address: '',
        police: ''
    })

    const labelData1 = {
        cardType: {
            label: '证件类型',
            type: 'Picker',
            data: []
        },
        cardId: {
            label: '证件号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
        date: {
            label: '证件有效期至',
            type: 'DatePicker'
        },
        country: {
            label: '国家(地区)',
            type: 'Picker',
            data: []
        }
    }

    const labelData2 = {
        enSex: {
            label: '英文姓',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
        enName: {
            label: '英文名',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
        sex: {
            label: '性别',
            type: 'Picker',
            data: sexSource
        },
        brithdy: {
            label: '出生日期',
            type: 'DatePicker'
        },
    }

    const labelData3 = {
        incomeDate: {
            label: '入住日期',
            type: 'DatePicker'
        },
        phone: {
            label: '联系电话',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
        address: {
            label: '住宿地址',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
        police: {
            label: '住所所属派出所',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',

            }
        },
    }

    
    function onSubmitLogin() {
        Modal.alert('', '确认要提交吗', [
            { text: '返回', color: '#999' },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'EntryExitService')
            }},
        ]);
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='个人住宿申报' 
                    hide={false} 
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    popEnabled={true}  
                    navigator={props.navigation}/>
                <ScrollView>
                    <Form header="证件信息" data={params} showData={labelData1} setData={setParams} />
                    <Form header="个人资料" data={params} showData={labelData2} setData={setParams} />
                    <Form header="入住信息" data={params} showData={labelData3} setData={setParams} />
                    <Button type="primary" style={styles.btnBox} onPress={onSubmitLogin}>下一步</Button>
                </ScrollView>
            </View>
        </Provider>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    btnBox: {
        marginVertical: 50,
        marginHorizontal: 20,
    }
});

