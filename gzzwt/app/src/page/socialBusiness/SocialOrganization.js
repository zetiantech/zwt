/**
 * @description 社会组织查询
 * @author cy
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import {
    Button,
    Provider,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from '../../common/NavigationBar'
import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转



export default function SocialOrganization(props) {
    const [data, setData] = useState({
        name: '',
        socialCode: ''
    });
    const [showData, setShowData] = useState({
        name: {
            label: '社会组织名称',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 6
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入社会组织名称',
                }
            ],
        },
        socialCode: {
            label: '社会信用代码',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 6
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入车辆号牌',
                }
            ],
        },
    })


    useEffect(() => {
    }, [])
    // 触发操作
    function handleSubmit() {
        if (!data.name && !data.socialCode) {
            ToastUtil.error('请完善信息');
            return
        }
        // validate({ data, showData, setShowData })
        //     .then(() => {
        HttpUtil.post(API.GETSOCIALORGANIZE, data).then((data) => {
            data = data.data;
            if (data.code === 0 && data.data !== null) {
                let infoData = data.data;
                NavigationUtil.navigate(props, 'SocialOrganizationResult', {
                    info: {
                        ...infoData,
                        organizationType: { 1: '全部', 2: '社会团体', 3: '民办非企业单位', 4: '基金会', 5: '外国商会' }[infoData.organizationType],
                        status: { 1: '全部', 2: '正常', 3: '注销', 4: '撤消' }[infoData.status],
                        identification: { 1: '志愿者协会', 2: '行业协会' }[infoData.identification],
                        registerDate: `${infoData.startTime}至${infoData.endTime}`
                    }
                })

            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
        // })
        // .catch(error => {
        //     ToastUtil.error(error);
        // });

    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='社会组织查询'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData} />
                <WhiteSpace size="xl" />
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    查询
                </Button>
            </View>
        </Provider>
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