/**
 * @description 占道施工
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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

export default function OccupyConstruction(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        roadName: ''
    })
    const [showData, setShowData] = useState({
        startDate: {
            label: '开始日期',
            type: 'DatePicker',
            height: 50,
            attr: {
                defaultDate: new Date(),
                minDate: new Date(2015, 7, 6),
                maxDate: new Date(2026, 11, 3)
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择开始日期',
                }
            ],
        },
        endDate: {
            label: '结束日期',
            type: 'DatePicker',
            height: 50,
            attr: {
                defaultDate: new Date(),
                minDate: new Date(2015, 7, 6),
                maxDate: new Date(2026, 11, 3)
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择结束日期',
                }
            ],
        },
        roadName: {
            label: '路名',
            height: 50,
            type: 'Picker',
            data: [],
            validator: [
                {
                    rule: 'require',
                    tip: '请选择路名',
                }
            ],
        }
    })
    useEffect(() => {
        getRoadData();
    }, [])
    function getRoadData() {
        HttpUtil.post(API.GetRoadBox, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let roadData = [];
                for (const v of data.data) {
                    roadData.push({
                        value: v.name,
                        label: v.name
                    })
                }
                setShowData({
                    ...showData,
                    roadName: {
                        label: '路名',
                        height: 50,
                        type: 'Picker',
                        data: roadData,
                        validator: [
                            {
                                rule: 'require',
                                tip: '请选择路名',
                            }
                        ],
                    }
                })
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })

    }
    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.ConstructQuery, {
                    ...data,
                    startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
                    roadName: data.roadName.join(',')
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        setToastFlag(false);
                        NavigationUtil.navigate(props, 'OccupyConstructionResults', {
                            info: data.data || null
                        });
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
                <NavigationBar title='占道施工查询' hide={false} navigator={props.navigation}
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
    listDateText: {
        paddingTop: 5,
        paddingBottom: 5
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