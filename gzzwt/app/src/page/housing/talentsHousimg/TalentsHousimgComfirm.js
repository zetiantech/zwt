/**
 * @description 住房保障-户籍家庭公租房-信息确认
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    Provider,
    List,
    Button,
    Modal,
    WhiteSpace
} from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';

/**
 * 页面组件
 */
function ListWrap({ data, labelName }) {
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                <List styles={{ Line: { borderWidth: 0 } }} >
                    {
                        Object.keys(data).map((key) => {
                            return (
                                <List.Item style={styles.listItem} extra={
                                    <Text style={styles.listItemLabel}>{data[key]}</Text>
                                }
                                    styles={{ Line: { borderBottomWidth: 0 } }}
                                    align='top'
                                    multipleLine
                                >
                                    <Text style={styles.listItemText}>{labelName[key]}</Text>
                                </List.Item>
                                
                            )
                        })
                    }
                </List>           
            </ScrollView>          
        </View>
    )
}

const PickUp = ({ data, labelName}) =>{
    return (
        <View>
            <View style={{marginLeft:10,marginVertical:10}}>
                <Text style={{color:'#999',}}>个人住房基本信息</Text>
            </View>
                <View>
                    <List styles={{ Line: { borderWidth: 0 } }} >
                        {
                            Object.keys(data).map((key) => {
                                return (
                                    <List.Item style={styles.listItem} extra={
                                        <Text style={styles.listItemLabel}>{data[key]}</Text>
                                    }
                                        styles={{ Line: { borderBottomWidth: 0 } }}
                                        align='top'
                                        multipleLine
                                    >
                                        <Text style={styles.listItemText}>{labelName[key]}</Text>
                                    </List.Item>
                                    
                                )
                            })
                        }
                    </List> 
            </View>
        </View>
    )
}




export default function VehicleResult(props) {
    const formData = props.navigation.getParam("formData")

    const [infoData, setInfoData] = useState();
    const [Data, setData] = useState();

    const labelName = {
        name: '姓名' ,
        country: '国籍',
        idCard: '身份证号或护照号码',
        duty: '工作单位职务',
        getDate: '高层次人才认证日期',
        certTypeIdName: '人才证书类型',
        talentTypeName: '人才类型',
        enjoyFloorSizeId: '应享受建筑面积标注',
        spouseName: '配偶姓名',
        spouseIdCard: '身份证号或护照号码',
        spouseCountry:  '配偶国籍',
        unitTypeId:  '本单位性质',
    };
    const laName = {
        belongHouseType: '住房情况' ,
        houseTypeIdName: '房屋类型',
        houseInsidSize: '房屋享受优惠政策购买的住房套内建筑面积',
        butie: '是否领取住房面积货币补贴',
        chabutie: '领取住房面积差额货币',
        houseStandSize: '原职务住房分配面积标准',
        butieTotalAmount: '购房贴息总额',
        houseMonthDiscount: '月购房贴息',
        butieStartTime: '补贴发放起始时间',
  
    };
    const belongHouseTypeData = {
        1: '享受购房优惠政策情况',
        2: '购买商品住宅情况',
        3: '租贸住房情况'
    }
    useEffect(() => {
        setInfoData({
            name: formData.name,
            country: formData.country,
            idCard: formData.idCard,
            duty: formData.duty,
            getDate: formData.getDate,
            certTypeIdName: formData.certTypeIdName,
            talentTypeName: formData.talentTypeName,
            enjoyFloorSizeId: formData.enjoyFloorSizeId.join(""),
            spouseName: formData.spouseName,
            spouseIdCard: formData.spouseIdCard,
            spouseCountry:  formData.spouseCountry,
            unitTypeId:  formData.unitTypeId.join(""),
        })
        setData({
            belongHouseType: belongHouseTypeData[formData.belongHouseType||1],
            houseTypeIdName: formData.houseTypeIdName,
            houseInsidSize: formData.houseInsidSize,
            butie: formData.butie,
            chabutie: formData.chabutie,
            houseStandSize: formData.houseStandSize,
            butieTotalAmount: formData.butieTotalAmount,
            houseMonthDiscount: formData.houseMonthDiscount,
            butieStartTime: formData.butieStartTime,
        })

    }, [formData])

    const onSubmitData = () =>{
        const form = {
            ...formData, 
            houseTypeId: formData.houseTypeId.join(""),
            unitTypeId:  formData.unitTypeId.join(""),
            enjoyFloorSizeId: formData.enjoyFloorSizeId.join(""),
            certTypeId: formData.certTypeId.join(""),
            talentTypeId: formData.talentTypeId.join(""),
            gender: formData.gender.join(""),
        }
        HttpUtil.post(API.TALENTSUBSIDY_ADD, form)
            .then(responseJson => {
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    NavigationUtil.navigate(props, 'ResultPage',{type: 2});
                }else{
                    ToastUtil.toast(msg)
                }
            })
    }
    
    function onSubmitHandler() {
        Modal.alert('', '确认要提交吗？', [
            {
                text: '取消'
            },
            { text: '确认', onPress: () => {
                onSubmitData()
            }},
        ]);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='信息确认' 
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'drak-content'}}
                    hide={false} 
                    popEnabled={true}  
                    navigator={props.navigation}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <WhiteSpace size="lg" />
                    {infoData && <ListWrap data={infoData} labelName={labelName} />}
                    {infoData && <PickUp data={Data} labelName={laName} />}
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitHandler}>提交</Button>
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
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItem: {
        borderBottomWidth: 0
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        // paddingTop: 10,
        // paddingBottom: 10,
        color: '#999999'
    },
    listItemText2: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
        // paddingBottom: 10,
        color: '#999999'
    },
    listItemLabel: {
        color: '#333333',
        fontSize: 16,
        flex: 2
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30,
    }
})