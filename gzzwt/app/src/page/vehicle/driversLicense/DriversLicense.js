/**
 * @description 驾驶证状态查询 
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
export default function DriversLicense(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        idCard: '',//440103199003071953
        archivesCode: ''//201910172105
    })
    const [showData, setShowData] = useState({
        idCard: {
            label: '身份证号码',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入',
                labelNumber: 5,
                maxLength: 18
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入身份证号码',
                }, {
                    rule: 'idcard',
                    tip: '请输入正确的身份证号'
                }
            ],
        },
        archivesCode: {
            label: '档案编号',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入',
                last: true
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入档案编号',
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
                HttpUtil.post(API.DrivingStatusQuery, {
                    ...data,
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        setToastFlag(false);
                        NavigationUtil.navigate(props, 'DriversResults', { info: data.data ? { ...data.data, statusText: '正常' } : null });
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
                <NavigationBar title='驾驶证状态查询' hide={false} navigator={props.navigation}
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