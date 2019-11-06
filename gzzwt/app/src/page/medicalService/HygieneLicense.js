/**
 * @description 卫生许可证查询 
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

export default function HygieneLicense(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        certificateCode: '',//244234523687872
        unitName: ''//广州味品源食品有限公司
    })
    const [showData, setShowData] = useState({
        certificateCode: {
            label: '许可证编号',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入',
                labelNumber: 5
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入许可证编号',
                }
            ],
        },
        unitName: {
            label: '单位名称',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入',
                labelNumber: 5
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入单位名称',
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
                        NavigationUtil.navigate(props, 'HygieneResults', { info: data.data || null });
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
                <NavigationBar title='卫生许可证查询' hide={false} navigator={props.navigation}
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