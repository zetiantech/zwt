/**
 * @description 办证进度查询 
 * @author jonne
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
import NavigationBar from 'src/common/NavigationBar'
import Form, { validate } from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import ToastUtil from 'src/util/ToastUtil'

export default function ScheduleQuery(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        certificateCode: ''
    })
    const [showData, setShowData] = useState({
        cardId: {
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "center",
                placeholder: '请输入受理编号或身份证号',
                labelNumber: 5
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入受理编号或身份证号',
                }
            ],
        }
    })
    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.GetSanitaryCertificate, {
                    ...data,
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'ScheduleResult', { info: data.data || null });
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
                    title='办证进度查询' 
                    hide={false}
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    navigator={props.navigation}
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
        paddingTop: 10,
        paddingBottom: 10
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