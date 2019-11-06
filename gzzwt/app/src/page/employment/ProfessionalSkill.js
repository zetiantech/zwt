/**
 * @description 专业技术资格查询
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
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

export default function ProfessionalSkill (props) {
    const [data, setData] = useState({
        name: '',
        idCard: '',
        certCode: ''
    });
    const [showData, setShowData] = useState({
        name: {
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
        certCode: {
            label: '证书号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入证书号',
                }
            ],
        },
    })
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    name: data.name,
                    idCard: data.idCard,
                    certCode: data.certCode
                };
                HttpUtil.get(API.GetPtCertRecordInfo, params).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'ProfessionalSkillResults', {
                            info: data.data
                        })
                    } else {
                        ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    }
                });
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }
    return (
        <View style={styles.container}>
            <NavigationBar
                popEnabled={true}
                title='专业技术资格查询'
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
                查询
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