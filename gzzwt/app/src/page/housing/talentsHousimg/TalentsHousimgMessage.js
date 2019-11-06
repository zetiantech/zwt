/**
 * @description 住房保障-高层次人才-住房情况
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
import { ScrollView } from 'react-native-gesture-handler';


export default function TalentsHousimg(props) {

    const formData = props.navigation.getParam("formData")

    const [Data, setData] = useState(); //住房情况
    const [houseType, setHouseType] = useState(); //房屋类型 

    const data = [{
        value: 1,
        label: '享受购房优惠政策情况'
    }, {
        value: 2,
        label:'购买商品住宅情况'
    },
    {
        value: 3,
        label:'租贸住房情况'
    }];

    useEffect(() => {
        setData(data)
        getSelectValue(6)
    }, [])

    function getSelectValue (kindId) {
        HttpUtil.get(API.KEYVALUE_SELECTLIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code==0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                if(kindId==6){
                    setHouseType(list)
                }
            }
        })
    }

    const [belongHouseType, setBelongHouseType] = useState([1])
    const belongHouseData = {
        belongHouseType: {
            label: '住房情况',
            type: 'Picker',
            data:Data   
        },
    }
    const [params, setParams] = useState({
        houseTypeId: [],
        houseTypeIdName: '',
        houseInsidSize: '',
        butie: '',
        chabutie:'',
        butieTotalAmount:'',
        houseMonthDiscount:'',
        butieStartTime:'' 
    })
    const labelData = {
        houseTypeId: {
            label: '房屋类型',
            height: 50,
            type: 'Picker',
            data: houseType
        },
        houseInsidSize: {
            label: '房屋享受优惠政策购买的住房套内建筑面积',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        butie: {
            label: '是否领取住房面积货币补贴',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        chabutie: {
            label: '领取住房面积差额货币补贴',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        butieTotalAmount: {
            label: '购房贴息总额',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                placeholder:'请输入',
                labelNumber:10
            }
        },
        houseMonthDiscount: {
            label: '月购房补贴',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入',
            }
        },
        butieStartTime: {
            label: '补贴发放起始时间',
            type:'InputItem',
            attr: {
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
  
    }
    /**
     * 购买商品住宅情况
     *  2
     */
    const [params1, setParams1] = useState({
        buyHouseDate: '',
        buyPrice: '',
        buyContractCode:'',
        noticeCertCode:'',
        houseCertCode:'',
        subsidyAmount:'',
        shouldSendSubsidyAmount:'',
        receivedSubsidyAmount: '',
        realRentSubsidyAmount:'', 
    })
    const labelData1 = {   
        buyHouseDate: {
            label: '购房时间',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        buyPrice: {
            label: '购买价格',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        buyContractCode: {
            label: '购买合同编号',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        noticeCertCode: {
            label: '预告登记证明书编号',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
                labelNumber:10
            }
        },       
        houseCertCode: {
            label: '房屋产权证',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入',
            }
        },
        subsidyAmount: {
            label: '购房补贴总金额',
            type:'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
        shouldSendSubsidyAmount: {
            label: '应发购房补贴总金额',
            type:'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
        receivedSubsidyAmount: {
            label: '已领取购房贴息租房补贴的金额',
            type:'InputItem',
            height:50,
            attr: {
                type: 'number',
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
        realRentSubsidyAmount: {
            label: '实发购房补贴的总金额',
            type:'InputItem',
            height:50,
            attr: {
                type: 'number',
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
    }
    /**
     * 租贸住房情况
     *  3
     */
    const [params2, setParams2] = useState({
        rentDate: '',
        rentPrice: '',
        rentContractCode:'',
        houseSubsidyStandard:'',
        realRentSubsidyAmount:'',
        subsidyDate:''
    })
    const labelData2 = {   
        rentDate: {
            label: '租房时间',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        rentPrice: {
            label: '租金(元/月)',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        rentContractCode: {
            label: '租贸合同备案',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        },
        houseSubsidyStandard: {
            label: '住房补贴标准',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                placeholder:'请输入',
                labelNumber:10
            }
        },       
        realRentSubsidyAmount: {
            label: '实发租房补贴',
            type: 'InputItem',
            attr: {
                type: 'number',
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入',
            }
        },
        subsidyDate: {
            label: '补贴发放起始时间',
            type:'InputItem',
            attr: {
                textAlign: "right",  
                labelNumber:10,
                placeholder:'请输入',
            }        
        },
    }
     
    const [type, setType] = useState(1)
    useEffect(() => {
        const type = belongHouseType.belongHouseType && belongHouseType.belongHouseType[0]
        if(type == 1){
            setParams({
                buyHouseDate: '',
                buyPrice: '',
                buyContractCode:'',
                noticeCertCode:'',
                houseCertCode:'',
                subsidyAmount:'',
                shouldSendSubsidyAmount:'',
                receivedSubsidyAmount: '',
                realRentSubsidyAmount:'', 
            })
        }else if(type == 2){
            setParams1({
                buyHouseDate: '',
                buyPrice: '',
                buyContractCode:'',
                noticeCertCode:'',
                houseCertCode:'',
                subsidyAmount:'',
                shouldSendSubsidyAmount:'',
                receivedSubsidyAmount: '',
                realRentSubsidyAmount:'', 
            })
        }else if(type == 3){
            setParams2({
                rentDate: '',
                rentPrice: '',
                rentContractCode:'',
                houseSubsidyStandard:'',
                realRentSubsidyAmount:'',
                subsidyDate:''
            })
        }
        setType(type||1)
    }, [belongHouseType])


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
        if(params.houseTypeId && params.houseTypeId.length){
            setParams({...params, houseTypeIdName: getLabelValue(houseType, params.houseTypeId.join(""))})
        }
     }, [params.houseTypeId])

    function onSubmitLogin() {
        let forms = {}
        if(type && type == 1){
            forms = {...formData, ...params, belongHouseType: belongHouseType.belongHouseType.join("")}
        }
        if(type && type == 2){
            forms = {...formData, ...params1, belongHouseType: belongHouseType.belongHouseType.join("")}
        }
        if(type && type == 3){
            forms = {...formData, ...params2, belongHouseType: belongHouseType.belongHouseType.join("")}
        }
        NavigationUtil.navigate(props, 'TalentsHousimgComfirm', {formData: forms});
    }

   return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='个人住房基本信息' 
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'drak-content'}}
                    hide={false}  
                    popEnabled={true}  
                    navigator={props.navigation}/>
                <ScrollView>
                    <List style={styles.inputWrap}>
                        <Form data={belongHouseType} showData={belongHouseData} setData={setBelongHouseType} popEnabled = {true}  navigator ={props.navigation} />
                    </List>
                    { type== 1 &&
                        <List >
                            <Form data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                        </List>
                    }
                    { type == 2 &&
                        <List >
                            <Form data={params1} showData={labelData1} setData={setParams1} popEnabled = {true}  navigator ={props.navigation} />
                        </List>
                    }
                    { type == 3 &&
                        <List >
                            <Form data={params2} showData={labelData2} setData={setParams2} popEnabled = {true}  navigator ={props.navigation} />
                        </List>
                    }                      
                    <View style={styles.btnWrap}>
                        <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>下一步</Button>
                    </View>
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
    inputWrap: {
        marginTop:15
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