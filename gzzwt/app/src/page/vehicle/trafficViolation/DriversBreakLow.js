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
    Button,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form, { validate } from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil' //接口请求
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
export default function DriversBreakLow(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        drivingLicenseNo: '',//440103199003071953
        drivingArchivesNo: ''//201910172100
    })
    const [showData, setShowData] = useState({
        drivingLicenseNo: {
            label: '驾驶证号',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入驾驶证号',
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入驾驶证号',
                }
            ],
        },
        drivingArchivesNo: {
            label: '档案编号',
            height: 50,
            type: 'InputItem',
            attr: {
                maxLength: 12,
                textAlign: "right",
                placeholder: '请输入12位档案编号',
                last: true,
                maxLength: 12
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入档案编号',
                },
                {
                    rule: 'max',
                    tip: '请输入12位档案编号',
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
                HttpUtil.post(API.DriverIlleagalQuery, {
                    ...data,
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        setToastFlag(false);
                        NavigationUtil.navigate(props, 'DriversBreakResults', { info: data.data ? data.data : null });
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
                <NavigationBar title='驾驶人违法查询' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <View style={styles.inputWrap}>
                    <Form data={data} showData={showData} setData={setData} setShowData={setShowData} />
                </View>
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