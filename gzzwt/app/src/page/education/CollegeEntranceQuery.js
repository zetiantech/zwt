/**
 * @description 高考查询
 * @author caroline
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



export default function CollegeEntranceQuery (props) {
    const [data, setData] = useState({
        examineeNumber: '',
        queryId: '',
        passwd: ''
    });
    const [selectData, setSelectData] = useState([
        {
            value: 1,
            label: '成绩查询',
        },
        {
            value: 2,
            label: '座位查询',
        }
    ])
    const [showData, setShowData] = useState({
        // queryId: {
        //     label: '查询内容',
        //     type: 'Picker',
        //     data: selectData,
        //     attr: {
        //         title: '请选择'
        //     },
        //     validator: [
        //         {
        //             rule: 'require',
        //             tip: '请选择查询内容',
        //         }
        //     ],
        // },
        examineeNumber: {
            label: '考生号',
            type: 'InputItem',
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入考生号',
                }
            ],
        },
        passwd: {
            label: '密码',
            type: 'InputItem',
            last: true,
            attr: {
                type: 'password',
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入密码',
                }
            ],
        },
    })
    const [showBotton, setShowBotton] = useState(true);// todo false
    useEffect(() => {
        console.log('---')
        HttpUtil.get(API.GetQueryType, {
        }).then((data) => {
            console.log(data, '******')
            data = data.data;
            if (data.code === 0) {
                let selectData = data.data.map((item) => ({
                    value: item.id,
                    label: item.name + `(${item.status === 1 ? '已开通' : '未开通'})`,
                    status: item.status
                }))
                setShowData({
                    queryId: {
                        label: '查询内容',
                        type: 'Picker',
                        data: selectData,
                        attr: {
                            title: '请选择'
                        },
                        validator: [
                            {
                                rule: 'require',
                                tip: '请选择查询内容',
                            }
                        ],
                    },
                    ...showData

                })
                setShowBotton(true)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });

    }, [])
    // 触发操作
    function handleSubmit () {
        if (!showBotton) return;
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    examineeNumber: data.examineeNumber,
                    queryId: data.queryId[0] || '',
                    passwd: data.passwd
                };
                HttpUtil.get(API.GetExamineeInfo, params).then((data) => {
                    data = data.data;
                    if (data.code === 0 && data.data !== null) {
                        let infoData = data.data;
                        infoData.passwd = params.passwd;
                       // NavigationUtil.navigate(props, 'SeniorEntranceQueryResult', {
                          NavigationUtil.navigate(props, 'CollegeEntranceResult', {
                            info: infoData
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
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='高考查询'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                {showData && <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData} />}
                <WhiteSpace size="xl" />
                <Button
                    style={styles.submitBtn}
                    type={"primary"}
                    disabled={!showBotton}
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