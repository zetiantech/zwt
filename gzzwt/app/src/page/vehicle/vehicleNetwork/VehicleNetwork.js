/**
 * @description 车辆网办进度查询
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Provider,
    List,
    Button,
    WhiteSpace,
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form, { validate } from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil' //接口请求
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
export default function VehicleNetwork(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        flowNumber: ''//201910172048133
    })
    const [showData, setShowData] = useState({
        startDate: {
            label: '受理开始日期',
            type: 'DatePicker',
            height: 50,
            attr: {
                defaultDate: new Date(),
                minDate: new Date(2015, 7, 6),
                maxDate: new Date(2026, 11, 3)
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择受理开始日期',
                }
            ],
        },
        endDate: {
            label: '受理结束日期',
            type: 'DatePicker',
            height: 50,
            attr: {
                defaultDate: new Date(),
                minDate: new Date(2015, 7, 6),
                maxDate: new Date(2026, 11, 3)
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择受理结束日期',
                }
            ],
        },
        flowNumber: {
            label: '业务流水号',
            height: 50,
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 5,
                last: true
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入业务流水号',
                }
            ],
        }
    })
    /**
     * 查询
     * @param {*} data 
     */
    function onSubmitLogin() {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.ProgressQuery, {
                    ...data,
                    startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(data.endDate).format('YYYY-MM-DD')
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'VehicleNetworkDetails', { info: data ? data.data : null });
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
                <NavigationBar title='车辆网办进度查询' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <List style={styles.inputWrap}>
                    <Form data={data} showData={showData} setData={setData} setShowData={setShowData} />
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