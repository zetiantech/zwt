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
    WhiteSpace,
    Modal
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';
const Brief = List.Item.Brief;

/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ title, data, labelName }) {
    return (
        <View>
            <View style={{marginLeft:10,marginVertical:10}}>
                <Text style={{color:'#999',}}>{title}</Text>
            </View>
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
        </View>
    )
}
export default function HousimgConfirm(props) {
    const rentApplyId = props.navigation.getParam("id") || 5
    const togetherId = props.navigation.getParam("togetherId") || 1
    const info = props.navigation.getParam("info")||{}

    console.log(info,4444444444)
    const [infoData, setInfoData] = useState();
    const [infoData1, setInfoData1] = useState();
    const [infoData2, setInfoData2] = useState();

    const labelName = {
        name: '姓名' ,
        idCard: '身份证号',
        workUnit: '工作单位',
        maritalTypeId: '婚姻状况',
        phone: '联系电话',
        registArea: '户籍所在地',
        yearIncoming: '家庭年收入',
        perPersonIncoming: '人均年收入',
    };
    const labelName1 = {
        name: '姓名' ,
        relationId: '与申请人关系',
        idCard: '身份证号码',
        workUnit: '工作单位',
        monthIncoming: '月收入'
    };
    const labelName2 = {
        nowHouseSize: '现住房面积' ,
        perPersonSize: '人均住房面积',
        applyHouseAddress: '申请房屋位置',
        applyHosuseType: '申请户型'
    };

    function getRentApplyList () {
        HttpUtil.get(API.RENTAPPLY_GET_ONE, {
            id: rentApplyId || 5
        }).then(responseJson=>{
            const {code, data, msg} = responseJson.data
            console.log(data,55555555)
            if(code == 0){
                setInfoData({
                    name: data.name,
                    idCard: data.idCard,
                    workUnit: data.workUnit,
                    maritalTypeId: data.maritalTypeId,
                    phone: data.phone,
                    registArea: data.registArea,
                    yearIncoming: data.yearIncoming,
                    perPersonIncoming: data.perPersonIncoming,
                })
                setInfoData2({
                    nowHouseSize: data.nowHouseSize,
                    perPersonSize: data.perPersonSize,
                    applyHouseAddress: data.applyHouseAddress,
                    applyHosuseType: data.applyHosuseType||info.applyHosuseType,
                })
            }
        })
    }

    function getRentApplySelect() {
        HttpUtil.get(API.RENTAPPLY_SELECT, {
            id: togetherId || 1
        }).then(responseJson=>{
            const {code, data, msg} = responseJson.data
            if(code == 0){
                setInfoData1({
                    name: data.name,
                    relationId: data.relationId,
                    idCard: data.idCard,
                    workUnit: data.workUnit,
                    monthIncoming: data.monthIncoming,
                })
                console.log(data, 2222222222222);
            }
        })
    }

    useEffect(() => {
        getRentApplyList()
        getRentApplySelect()
    }, [])


    function onSubmitLogin() {
        Modal.alert('', '确认要提交吗？', [
            {
                text: '取消'
            },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'ResultPage',{type:2});
            }},
        ]);
       
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <ScrollView showsVerticalScrollIndicator={false}	>
                    {infoData && <ListWrap title="申请人" data={infoData} labelName={labelName} />}
                    {infoData1 && <ListWrap title="共同申请人" data={infoData1} labelName={labelName1} />}
                    {infoData2 && <ListWrap title="房屋状况" data={infoData2} labelName={labelName2} />}
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>提交</Button>
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
        flex: 2.5
    },
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20
    }
})