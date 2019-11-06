/**
 * @description 住房保障-高层次人才住房保障申请
 * @author ct
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

export default function TalentsHousimg(props) {
    const [certType, setCertType] = useState(); //人才证书类型
    const [talentType, setTalentType] = useState(); //人才证书类型
    const [enjoyFloorSize, setEnjoyFloorSize] = useState(); //应享受建筑面积标
    const [unitType, setUnitType] = useState(); //应享受建筑面积标
    const [sexData, setsexData] = useState([]); 

    let talentTypeNameData= {};

    useEffect(() => {
        setsexData([
            {label: '男', value: '男'},
            {label: '女', value: '女'}
        ])
    }, [])

    const [params, setParams] = useState({
        name: '',
        country: '',
        gender: [],
        idCard: '',
        duty:'',
        getDate:'',
        certTypeId:[],
        certTypeIdName: '',
        talentTypeId: [],
        talentTypeName: '',
        enjoyFloorSizeId: [],
        spouseName: '',
        spouseIdCard:'',
        spouseCountry:'',
        unitTypeId:[],
    })

    function validForm(){
        if (validator.isEmpty(params.name)) {
            ToastUtil.toast("姓名不能为空");
            return false;
		}else if (validator.isEmpty(params.country)){
            ToastUtil.toast("国籍不能为空");
            return false;
        }else if (!params.gender.length){
            ToastUtil.toast("性别不能为空");
            return false;
        }else if (validator.isEmpty(params.idCard)){
            ToastUtil.toast("证件号码不能为空");
            return false;
        }else if (validator.isEmpty(params.duty)){
            ToastUtil.toast("职位不能为空");
            return false;
        }else if (!params.certTypeId.length){
            ToastUtil.toast("人才证书类型不能为空");
            return false;
        }else if (!params.talentTypeId.length){
            ToastUtil.toast("人才类型不能为空");
            return false;
        }else if (!params.enjoyFloorSizeId.length){
            ToastUtil.toast("建筑面积标准不能为空");
            return false;
        }else if (validator.isEmpty(params.spouseName)){
            ToastUtil.toast("配偶姓名不能为空");
            return false;
        }else if (validator.isEmpty(params.spouseIdCard)){
            ToastUtil.toast("配偶证件不能为空");
            return false;
        }else if (validator.isEmpty(params.spouseCountry)){
            ToastUtil.toast("配偶国籍不能为空");
            return false;
        }else if (!params.unitTypeId.length){
            ToastUtil.toast("单位性质不能为空");
            return false;
        }
        return true
    }

    function getSelectValue (kindId) {
        HttpUtil.get(API.KEYVALUE_SELECTLIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                if(kindId==4){
                    setCertType(list)
                }
                if(kindId==5){
                    setTalentType(list)
                    Object.keys(data).map((item, i)=>{
                        talentTypeNameData[item] = data[item]
                    })
                }
                if(kindId==7){
                    setUnitType(list)
                }
                if(kindId==8){
                    setEnjoyFloorSize(list)
                }
            }
        })
    }

    useEffect(() => {
        getSelectValue(4)
        getSelectValue(5)
        getSelectValue(7)
        getSelectValue(8)
    }, [])

    function getLabelValue(list, id){
        let label = ''
        list && list.map(item=> {
            if(item.value == id){
                label = item.label
            }
        })
        return label
    }

    useEffect(() => {
        if(params.certTypeId && params.certTypeId.length){
            setParams({...params, certTypeIdName: getLabelValue(certType, params.certTypeId.join(""))})
        }
     }, [params.certTypeId])

     useEffect(() => {
        if(params.talentTypeId && params.talentTypeId.length){
            setParams({...params, talentTypeName: getLabelValue(talentType, params.talentTypeId.join(""))})
        }
     }, [params.talentTypeId])

    const labelData = {
        name: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        country: {
            label: '国籍',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }
        },
        gender: {
            label: '性别',
            type: 'Picker',
            data: sexData
        },
        idCard: {
            label: '身份证或护照号码',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        duty: {
            label: '工作单位职务',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入'
            }
        },
        getDate: {
            label: '高层次人才认定日期',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
                labelNumber:10,
            }
        },
        certTypeId: {
            label: '人才证书类型', 
            type: 'Picker',
            data: certType
        },
        talentTypeId: {
            label: '人才类型',
            type: 'Picker',
            data: talentType
        },
        enjoyFloorSizeId: {
            label: '应享受建筑面积标准(㎡)',
            type: 'Picker',
            data: enjoyFloorSize
        },
        spouseName: {
            label: '配偶姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }         
        },
        spouseIdCard: {
            label: '配偶身份证或护照号码',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        spouseCountry:  {
            label: '配偶国籍',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }
        },
        unitTypeId: {
            label: '本单位性质',
            type: 'Picker',
            data: unitType
        }
        
    }
    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        if(!validForm()){
            return;
        }
        NavigationUtil.navigate(props, 'TalentsHousimgMessage', {formData: params});
    }

    return (
        <Provider>
            <NavigationBar 
                title='人才住房保障申请'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                hide={false} 
                popEnabled={true}  
                navigator={props.navigation}/>
            <ScrollView style={styles.container}>
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
        marginVertical:20,
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