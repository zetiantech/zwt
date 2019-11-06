/**
 * @description 有效期换满证-
 * @author  ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,ScrollView
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast,
    Checkbox,
    WhiteSpace
} from '@ant-design/react-native';
import Form from 'src/component/FormComponent'
import HttpUtil from 'src/util/HttpUtil' //接口请求
import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'

export default function dateReplacement(props) {
    const [selectData, setSelectData] = useState(); //状态
    //驾驶证详情
    function vehicGetOne () {  
        HttpUtil.get(API.VehicleDrivingLicenseGetOne, {id:1})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            console.log(data)
            let addnum = data.totalDeductScore + ''
            if(code === 0){  
                setParams({ 
                    name:data.name, 
                    fileNumber:data.archivesCode,
                    Driving:data.dlCode,
                    firstTime:data.firstGetDate,
                    clearingTime:data.validDate,
                    cutoffTime:data.zeroDate,
                    vehicleModel:data.allowDrvingTypeName,
                    nextimemedical:data.nextPeDate,
                    addUpNuber:addnum,
                })
            }  
            }).catch(error=>{
            console.log(error,'error')
        });  
    }
    useEffect(() => {
        setSelectData([{
            value: 1,
            label: '正常'
        }, {
            value: 2,
            label: '过期'
        }])
    }, [])
    useEffect(() => {
        vehicGetOne()
    }, [])
    const [params, setParams] = useState({
        name: '',
        fileNumber: '',
        state: '',
        Driving: '',
        firstTime:'',
        cutoffTime:'',
        clearingTime:'',
        vehicleModel:'',
        nextimemedical:'',
        addUpNuber:'',
    })
    const labelData = {
        name: {
            label: '姓名',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
            }
        },
        fileNumber: {
            label: '档案编号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
            }
        },
        state: {
            label: '状态',
            type: 'Picker',
            height: 50,
            data: selectData,
        },
        Driving: {
            label: '驾驶证号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        firstTime: {
            label: '初次领证日期',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        clearingTime: {
            label: '有效截止日期',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        cutoffTime: {
            label: '清分日期',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
            }
        },
        vehicleModel: {
            label: '准驾车型',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
            }
        },
        nextimemedical: {
            label: '下一次体检日期',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7
            }
        },
        addUpNuber: {
            label: '累计积分',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                last: true, // 不显示下边框线
            }
        },
        
    }
    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        if (selectData==""||selectData==undefined) {
            ToastUtil.toast('请选择业务类型','center')
            return
        }
        NavigationUtil.navigate(props, 'dateReplacement2',{params:params});
    }
    const [type, setType] = useState(0)
    function onclick () {
        setType(!type)
    }
    return (
        <Provider>
            <NavigationBar 
                title='基本信息'
                hide={false} 
                statusBar={{barStyle: 'dark-content'}}
                popEnabled = {true} 
                navigator ={props.navigation}
            />
            <ScrollView style={styles.container}>
                <WhiteSpace size="lg" />
                <Form  data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                <View style={{margin: 15}}>
                    <Checkbox style={{color: type == 0 ? '#979797': '#2F74ED'}} onChange={onclick} >
                        <Text style={styles.readText}>阅读须知</Text>
                    </Checkbox>
                </View>              
                <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>下一步</Button>
            </ScrollView>  
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
    btnBox: {
        marginTop: 10,
        marginVertical: 40,
        marginHorizontal: 20,
        backgroundColor: '#2F74ED'
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    },
    readText: {
        color: '#2F74ED',
        marginLeft: 5
    }
})