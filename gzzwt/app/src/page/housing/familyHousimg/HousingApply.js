/**
 * @description 住房保障-户籍家庭公租房申请-共同申请人
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
    Button,
    Toast,
} from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';


export default function HousingApply(props) {
    const rentApplyId = props.navigation.getParam("id")
    const name = props.navigation.getParam("name")||""
    
    const [type, setType] = useState(0);
    const [applyData, setApplyData] = useState([])

    function getSelectValue (kindId) {
        HttpUtil.get(API.KEYVALUE_SELECTLIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                if(kindId==3){
                    setApplyData(list)
                }
            }
        })
    }

    useEffect(() => {
        getSelectValue(3)
    }, [])
    
    const [params, setParams] = useState({
        name: name,
        relationId: [],
        idCard: '',
        workUnit: '',
        monthIncoming:'',
        rentApplyId: rentApplyId
    })

    const labelData = {
        name: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:5
            }       
        },
        relationId: {
            label: '与申请人关系',
            height: 50,
            type: 'Picker',
            data: applyData,
        },
        idCard: {
            label: '身份证号码',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                type:'number'
            }
        },
        workUnit: {
            label: '工作单位',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        monthIncoming: {
            label: '月收入',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                type:'number'
            }
        },     
    }

    const [par, setPar] = useState({
        name: '',
        relationId: [],
        idCard: '',
        workUnit: '',
        monthIncoming:'',
        rentApplyId: rentApplyId
    })
    const laData = {
        name: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                value: '王德发',
                labelNumber:5
            }       
        },
        relationId: {
            label: '与申请人关系',
            height: 50,
            type: 'Picker',
            data: applyData,
        },
        idCard: {
            label: '身份证号码',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        workUnit: {
            label: '工作单位',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        monthIncoming: {
            label: '月收入',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },     
    }

    function addTogether(param){
        HttpUtil.post(API.REANTAPPLY_ADDTOGETHER, param)
        .then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                NavigationUtil.navigate(props, 'HousingFamily', {id: rentApplyId, togetherId: data.id });
            }else{
                ToastUtil.toast(msg)
            }
        })
    }

    function validForm(){
        if (validator.isEmpty(params.name)) {
            ToastUtil.toast("姓名不能为空");
            return false;
		}else if (!params.relationId.length){
            ToastUtil.toast("与申请人关系不能为空");
            return false;
        }else if (validator.isEmpty(params.idCard)){
            ToastUtil.toast("身份证号码不能为空");
            return false;
        }else if (validator.isEmpty(params.workUnit)){
            ToastUtil.toast("工作单位不能为空");
            return false;
        }else if (validator.isEmpty(params.monthIncoming)){
            ToastUtil.toast("月收入不能为空");
            return false;
        }
        return true
    }

    function onSubmitLogin() {
        let  data = {...params, relationId: params.relationId.join("")}
        if(!validForm()){
            return;
        }
        addTogether(data)
    }

    function onShowView(){
        setType(1)
    }
    function onDelete (){
        setType(0)
    }
    
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='公租房申请' hide={false}  popEnabled = {true}  navigator ={props.navigation}/>
                <List style={styles.inputWrap}>
                    <Form data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                </List>
                {/* <TouchableOpacity style={{flexDirection:'row-reverse',marginTop:10}}  onPress={onShowView} >
                    <Text style={{color:'#2F74ED',marginRight:10}}>共同申请人</Text>
                </TouchableOpacity> */}
                {    type == 1 &&
                    <View>
                        <List style={styles.inputWrap}>
                            <Form data={par} showData={laData} setData={setPar} popEnabled = {true}  navigator ={props.navigation} />
                        </List>
                        <TouchableOpacity style={{flexDirection:'row-reverse',marginTop:10}}  onPress={onDelete} >
                            <Text style={{color:'red',marginRight:10}}>删除</Text>
                        </TouchableOpacity>
                    </View>
                }
                
                             
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