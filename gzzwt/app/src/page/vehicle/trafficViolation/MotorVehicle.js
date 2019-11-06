/**
 * @description 驾驶人违法查询
 * @author cy
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
    Button,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form, { validate } from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil' //接口请求
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
export default function MotorVehicle(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        plateKindId: '',
        plateNumber: '',//粤SDE888
        engineNo: '',//1402
        vin: ''//130011
    })
    const [showData, setShowData] = useState({
        plateKindId: {
            label: '号牌种类',
            type: 'Picker',
            height: 50,
            data: [],
            validator: [
                {
                    rule: 'require',
                    tip: '请选择号牌种类',
                }
            ],
        },
        plateNumber: {
            label: '车牌号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder: '请输入车牌号码',
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入车牌号码',
                }
            ],
        },
        engineNo: {
            label: '发动机号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder: '请输入发动机后四位',
                maxLength: 4
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入发动机后四位',
                }
            ],
        },
        vin: {
            label: '车架号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder: '请输入车架号六位',
                maxLength: 6,
                last: true
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入车架号六位',
                }
            ],
        }
    })
    useEffect(() => {
        HttpUtil.post(API.GetPlateKindBox, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let selectList = [];
                for (const v of data.data) {
                    selectList.push({
                        label: v.name,
                        value: v.id
                    })
                }
                let obj = showData;
                obj.plateKindId = {
                    label: '号牌种类',
                    type: 'Picker',
                    height: 50,
                    data: selectList,
                    validator: [
                        {
                            rule: 'require',
                            tip: '请选择号牌种类',
                        }
                    ],
                }
                setShowData(obj);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }, [])
    /**
     * 查询
     * @param {*} data 
     */
    function onSubmitLogin() {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.VehicleIlleagalQuery, {
                    ...data,
                    plateKindId: data.plateKindId.join(','),// 3
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        setToastFlag(false);
                        NavigationUtil.navigate(props, 'MotorVehicleResults', { info: data.data ? data.data : null });
                    } else {
                        setToastFlag(true);
                        ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    }
                })
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='机动车违法查询' 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true}
                />
                <WhiteSpace size="lg" />
                <List style={styles.inputWrap}>
                    {<Form data={data} showData={showData} setShowData={setShowData} setData={setData} />}
                </List>
                <WhiteSpace size="xl" />
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>查询</Button>
                </View>
                {toastFlag && <Text style={styles.toastText}>未查询到相关信息</Text>}
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
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