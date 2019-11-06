/**
 * @description 住房保障-户籍家庭公租房申请-家庭房屋情况
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,TouchableOpacity
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast,Checkbox
} from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';


export default function HousingFamily(props) {
    const rentApplyId = props.navigation.getParam("id")
    const togetherId = props.navigation.getParam("togetherId")

    const [params, setParams] = useState({
        id: rentApplyId,
        nowHouseSize: '',
        perPersonSize: '',
        applyHouseAddress: '',
        applyHosuseType: ''
    })
    const labelData = {
        nowHouseSize: {
            label: '现住房面积',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:5,
                placeholder:'请输入',
                type:'number'
            }       
        },
        perPersonSize: {
            label: '人均住房面积',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
                type:'number'
            }
        },
        applyHouseAddress: {
            label: '申请房屋位置',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        applyHosuseType: {
            label: '申请户型',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        }
    }

    function validForm(){
        if (validator.isEmpty(params.nowHouseSize)) {
            ToastUtil.toast("现住房面积不能为空");
            return false;
		}else if (validator.isEmpty(params.perPersonSize)){
            ToastUtil.toast("人均住房面积不能为空");
            return false;
        }else if (validator.isEmpty(params.applyHouseAddress)){
            ToastUtil.toast("申请房屋位置不能为空");
            return false;
        }else if (validator.isEmpty(params.applyHosuseType)){
            ToastUtil.toast("申请户型不能为空");
            return false;
        }
        return true
    }

    function onSubmitLogin() {
        if(!validForm()){
            return
        }
        HttpUtil.post(API.RENTAPPLY_SAVE, params)
        .then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code == 0){
                NavigationUtil.navigate(props, 'HousimgConfirm', {id: rentApplyId, togetherId: togetherId,info:{...params}});
            }else{
                ToastUtil.toast(msg)
            }
        })
    }
    
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='家庭房屋情况' hide={false}  popEnabled = {true}  navigator ={props.navigation}/>
                <List style={styles.inputWrap}>
                    <Form data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                </List>                                            
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>下一步</Button>
                </View>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    inputWrap: {
        marginTop: 15
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20
    },
    inputBox: {
        height: 50
    },
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        height: 48,
        backgroundColor: '#2F74ED'
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    }
})