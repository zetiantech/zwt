/**
 * @description 注册读书证
 * @author heweifeng
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';

import { Button, WhiteSpace, Provider } from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';
import Form, { validate } from 'src/component/FormComponent';

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from 'src/util/NavigationUtil'; // 导航库

export default function RegisterReadCard (props) {
    const navigationBar = (
        <NavigationBar
            navigator={props.navigation}
            popEnabled={true}
            title="注册读书证"
            hide={false}
        />
    );
    const [data, setData] = useState({});

    const [showData, setShowData] = useState({
        cardCode: '读书证号',
        idCard: '身份证号码',
        name: '姓名',
        phone: '手机',
        libraryId: {
            label: '开户馆名称',
            type: 'Picker',
            validator: [
                {
                    rule: 'require',
                    tip: '请选择开户馆',
                },
            ],
            data: [
                {
                    value: 1,
                    label: '广州图书馆',
                },
                {
                    value: 2,
                    label: '广州市萝岗区图书馆',
                },
            ],
            attr: {
                title: '请选择',
            },
        },
        passwd: {
            label: '密码',
            type: 'InputItem',
            validator: [
                {
                    rule: 'require',
                    tip: '请输入密码',
                },
                {
                    rule: 'min=6',
                    tip: '请输入6位数的密码',
                },
            ],
            attr: {
                type: 'password',
                placeholder: '请设置6位数密码',
                maxLength: 6,
                textAlign: 'right',
            },
        },
    });

    useEffect(() => {
        HttpUtil.get(API.GETREGISTERUSERBOOKINFO, {}).then(data => {
            data = data.data;
            if (data.code === 0) {
                setData(data.data);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
        HttpUtil.get(API.GETLIBRARY, {}).then(data => {
            data = data.data;
            if (data.code === 0) {
                const libraryData = data.data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));
                setShowData({
                    ...showData,
                    libraryId: {
                        label: '开户馆名称',
                        type: 'Picker',
                        data: libraryData,
                        attr: {
                            title: '请选择',
                        },
                    },
                });
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
        return () => {
            DeviceEventEmitter.emit('fromBookBack');
        };
    }, []);
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.ADDBOOKUSER, {
                    cardCode: data.cardCode,
                    idCard: data.idCard,
                    name: data.name,
                    phone: data.phone,
                    libraryId: data.libraryId[0],
                    passwd: data.passwd,
                }).then(data => {
                    data = data.data;
                    if (data.code === 0) {
                        ToastUtil.toast('注册成功', 'center', 'short', () =>
                            NavigationUtil.goBack(props),
                        );
                    } else {
                        ToastUtil.toast('注册失败', 'center');
                    }
                });
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }
    return (
        <Provider>
            <View style={styles.container}>
                {navigationBar}
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData}
                />
                <WhiteSpace size="xl" />
                <Button style={styles.submitBtn} type="primary" onPress={handleSubmit}>
                    确定
        </Button>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
    },
    subDesc: {
        color: '#999999',
        fontSize: 14,
        textAlign: 'center',
    },
});
