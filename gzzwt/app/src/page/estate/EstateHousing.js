/**
 * @description 不动产-存量房源信息查询
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

export default function EstateHousing (props) {
    const [data, setData] = useState({
        sourceNumber: '',
        communityName: ''
    });
    const [showData, setShowData] = useState({
        sourceNumber: {
            label: '盘源编号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入盘源编号',
                }
            ],
        },
        communityName: {
            label: '小区名称',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入小区名称',
                }
            ],
        },
    })
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    sourceNumber: data.sourceNumber,
                    communityName: data.communityName,
                };
                HttpUtil.post(API.HouseStockQuery, params).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'EstateHousingResults', {
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
                title='存量房源信息查询'
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