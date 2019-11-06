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
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

export default function EstateAdvance (props) {
    const [data, setData] = useState({
        preSaleNumber: '',
    });
    const [showData, setShowData] = useState({
        preSaleNumber: {
            label: '预售证',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入预售证',
                }
            ],
        },
    })
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    preSaleNumber: data.preSaleNumber,
                };
                HttpUtil.post(API.ImmovablePreSaleQuery, params).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'EstateAdvanceResults', {
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
                title='预售证信息查询'
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