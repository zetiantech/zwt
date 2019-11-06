/**
 * @description 不动产预约登记
 * @author caroline
*/
/**
 * @description 不动产-预售证信息查询
 * @author caroline
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';

import {
    Button,
    WhiteSpace
} from '@ant-design/react-native';
import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import NavigationBar from '../../common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

export default function EstateAppointment (props) {
    const [data, setData] = useState({
        username: '',
        mobile: '',
        idCard: '',
    });
    const [showData, setShowData] = useState({
        username: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入姓名',
                }
            ],
        },
        mobile: {
            label: '手机号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入手机号',
                },
                {
                    rule: 'phone',
                    tip: '请输入正确手机号',
                }
            ],
        },
        idCard: {
            label: '身份证',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入身份证',
                },
                {
                    rule: 'idcard',
                    tip: '请输入正确身份证',
                }
            ],
        },
    })
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    username: data.username,
                    mobile: data.mobile,
                    idCard: data.idCard,
                };
                NavigationUtil.navigate(props, 'EstateAppointmentBook', {
                    info: params
                })
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <NavigationBar
                popEnabled={true}
                title='不动产预约登记'
                hide={false}
                navigator={props.navigation}
                popEnabled={true} />
            <WhiteSpace size="lg" />
            <Form
                data={data}
                setData={setData}
                showData={showData}
                setShowData={setShowData}
            />
            <WhiteSpace size="xl" />
            <Button
                style={styles.submitBtn}
                type="primary"
                onPress={handleSubmit}
            >
                下一步
                </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
    },
});