/**
 * @description 住房保障-户籍家庭公租房申请
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
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
import { ScrollView } from 'react-native-gesture-handler';

const dataSource = require('@bang88/china-city-data');

export default function Housing(props) {
    /**
     * @param type 1-户籍家庭公租房申请 2-来穗人员公租房申请 3-新就业无房职工公租房申请
    */
    const type = props.navigation.getParam("type") || 1
    const [Data, setData] = useState(); //区域
    const [sexData, setSexData] = useState([]); //性别
    const [workData, setworkData] = useState(); //工作现状
    const [maritalData, setMaritalData] = useState(); //工作现状

    const [title, setTitle] = useState("户籍家庭公租房申请")

    useEffect(() => {
        const titles = ['', '户籍家庭公租房申请', '来穗人员公租房申请', '新就业无房职工公租房申请'][type]
        setTitle(titles)
    }, [type])

    function getSelectValue (kindId) {
        HttpUtil.get(API.KEYVALUE_SELECTLIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                if(kindId==1){
                    setworkData(list)
                }
                if(kindId==2){
                    setMaritalData(list)
                }
            }
        })
    }

    function getCommitteeList() {
        HttpUtil.get(API.COMMITTEE_SELECTLIST, {
            areaId: params.areaId[2]
        })
        .then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                let list = data && data.map((item, i)=>({label: item.name, value: item.id}))
                setData(list)
            }
        })
    }

    useEffect(() => {
        getSelectValue(1)
        getSelectValue(2)
    }, [])

    useEffect(() => {
        setSexData([
            {label: '男', value: '男'},
            {label: '女', value: '女'}
        ])
    }, [])

    const [params, setParams] = useState({
        areaId: ['44', '4401', '440103'],
        committeeId: [],
        typeId: type,
        name: '',
        gender: [],
        idCard:'',
        workUnit:'',
        workAddress:'',
        workTypeId: [],
        maritalTypeId: [],
        phone:'',
        registArea:'',
        perPersonIncoming:'',
        yearIncoming:'',
        nowHouseSize: '',
        perPersonSize: '',
        applyHouseAddress: '',
        applyHosuseType: ''
    })
    
    const labelData = {
        areaId: {
            label: '区域',
            type: 'Picker',
            cols: 3,
            data: dataSource
        },
        committeeId: {
            label: '社区居委会',
            height: 50,
            type: 'Picker',
            data:Data,
        },
        name: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:5,
                placeholder:'请输入',
            }
        },
        gender: {
            label: '性别',
            type: 'Picker',
            data: sexData
        },
        idCard: {
            label: '身份证号码',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
                type:'number'

            }
        },
        workUnit: {
            label: '工作单位',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
                labelNumber:10
            }
        },
        workAddress: {
            label: '工作地址',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        workTypeId: {
            label: '工作现状',
            type: 'Picker',
            data: workData
        },
        maritalTypeId: {
            label: '婚姻状况',
            type: 'Picker',
            data: maritalData,
        },
        phone: {
            label: '联系电话',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                last: true, // 不显示下边框线
                placeholder:'请输入',
                type:'number'
            }
        },
        registArea: {
            label: '户籍所在地',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                last: true, // 不显示下边框线
                placeholder:'请输入',
                labelNumber:6
            }
        },
        yearIncoming: {
            label: '家庭年收入',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                last: true, // 不显示下边框线
                placeholder:'请输入',
                labelNumber:6,
                type:'number'

            }
        },
        perPersonIncoming: {
            label: '人均年收入',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                last: true, // 不显示下边框线
                placeholder:'请输入',
                labelNumber:6,
                type:'number'

            }
        }
    }

    function validForm(){
        if (!params.areaId.length) {
            ToastUtil.toast("区域不能为空");
            return false;
		}else if (!params.committeeId.length){
            ToastUtil.toast("社区居委会不能为空");
            return false;
        }else if (validator.isEmpty(params.name)){
            ToastUtil.toast("姓名不能为空");
            return false;
        }else if (!params.gender.length){
            ToastUtil.toast("性别不能为空");
            return false;
        }else if (validator.isEmpty(params.idCard)){
            ToastUtil.toast("身份证号不能为空");
            return false;
        }else if (validator.isEmpty(params.workUnit)){
            ToastUtil.toast("工作单位不能为空");
            return false;
        }else if (validator.isEmpty(params.workAddress)){
            ToastUtil.toast("工作地址不能为空");
            return false;
        }else if (!params.workTypeId.length){
            ToastUtil.toast("工作现状不能为空");
            return false;
        }else if (!params.maritalTypeId.length){
            ToastUtil.toast("婚姻状况不能为空");
            return false;
        }else if (!validator.isMobilePhone(params.phone)){
            ToastUtil.toast("请输入正确格式的手机号码");
            return false;
        }else if (validator.isEmpty(params.registArea)){
            ToastUtil.toast("户籍所在地不能为空");
            return false;
        }else if (validator.isEmpty(params.yearIncoming)){
            ToastUtil.toast("家庭年收入不能为空");
            return false;
        }else if (validator.isEmpty(params.perPersonIncoming)){
            ToastUtil.toast("人均年收入不能为空");
            return false;
        }
        return true
    }



    useEffect(() => {
        getCommitteeList()
    }, [params])


    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        if(!validForm()){
            return
        }
        const param = {
            ...params, 
            areaId: params.areaId[2], 
            committeeId: params.committeeId.join(""),
            gender: params.gender.join(""),
            workTypeId: params.workTypeId.join(""),
            maritalTypeId: params.maritalTypeId.join("")
        }
        HttpUtil.post(API.RENTAPPLY_ADD, param)
        .then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code == 0){
                NavigationUtil.navigate(props, 'HousingApply', {id: data.id,name:params.name});
            }
        })
        
    }

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar title={title} hide={false}  popEnabled = {true}  navigator ={props.navigation}/>
                <List style={styles.inputWrap}>
                    <Form data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                </List>
                             
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>下一步</Button>
                </View>
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
        backgroundColor: '#2F74ED',
        marginVertical:20
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    }
})