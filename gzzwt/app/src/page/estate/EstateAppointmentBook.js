/**
 * @description 不动产预约登记-预约选择
 * @author caroline
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Button,
    Provider,
    WhiteSpace,
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';
import Form, { validate } from 'src/component/FormComponent'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from 'src/util/NavigationUtil'; //页面跳转

export default function EstateAppointmentBook (props) {
    const [data, setData] = useState({
        departmentId: '',
        departmentName: '',
        notedate: '',
        slotId: '',
    });
    const [infoData, setInfoData] = useState({
        username: '',
        idCard: '',
        mobile: '',
    });
    const [showBotton, setShowBotton] = useState(false);
    const [constData, setConstData] = useState({
        departmentId: {
            label: '登记所',
            type: 'Picker',
            data: [],
            attr: {
                title: '请选择',
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择登记所',
                }
            ],
        },
        departmentName: {
            label: '所在地址',
            type: 'text',
            labelStyle: styles.labels,
            valueStyle: styles.texts,
            attr: {
                align: 'top',
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        notedate: {
            label: '日期',
            type: 'Picker',
            last: true, // 不显示下边框线
            data: [],
            attr: {
                title: '请选择',
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择日期',
                }
            ],
        },
        slotId: {
            label: '时间段',
            type: 'Picker',
            data: [],
            attr: {
                title: '时段(可约/总数)',
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请选择时间段',
                }
            ],
        },
    });
    const [showData, setShowData] = useState();
    const [selectList, setSelectList] = useState([]);
    const [slotList, setSlotList] = useState([]);
    useEffect(() => {
        setInfoData({ ...infoData, ...props.navigation.getParam('info', {}) });
        HttpUtil.post(API.GetRegistryBox, {}).then(data => {
            data = data.data;
            if (data.code === 0) {
                const selectData = data.data.map(item => ({
                    value: item.id,
                    label: item.name,
                    address: item.address,
                }));
                setSelectList(selectData);
                let obj = {
                    departmentId: {
                        label: '登记所',
                        type: 'Picker',
                        data: selectData,
                        attr: {
                            title: '请选择',
                        },
                        validator: [
                            {
                                rule: 'require',
                                tip: '请选择登记所',
                            }
                        ],
                    },
                };
                setShowData({ ...obj });
                setConstData({ ...constData, ...obj })
                setShowBotton(true)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
    }, []);

    function changeData (value, type) {
        //改变登记所，对应日期选项调整
        if (type === 'departmentId') {
            let address = ''; //地址选定
            selectList.map(item => {
                if (item.value === value[0]) {
                    address = item.address;
                }
            });
            setData({
                ...data,
                departmentName: address,
                notedate: '',
            });
            let params = {
                departmentId: value[0],//日期选项请求
            };
            HttpUtil.post(API.ImmovableGetDateBox, params).then(data => {
                data = data.data;
                if (data.code === 0) {
                    let selectData = data.data.map(item => ({
                        value: item.id,
                        label: item.name,
                    }));
                    if (!showData.notedate) {
                        let obj = {
                            ...showData,
                            departmentName: constData.departmentName,
                            notedate: {
                                label: '日期',
                                type: 'Picker',
                                data: selectData,
                                attr: {
                                    title: '请选择',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择日期',
                                    }
                                ],
                            },
                        };
                        setShowData({ ...obj });
                        setConstData({
                            ...constData,
                            notedate: {
                                label: '日期',
                                type: 'Picker',
                                data: selectData,
                                attr: {
                                    title: '请选择',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择日期',
                                    }
                                ],
                            },
                        })
                    } else {
                        setShowData({
                            ...showData,
                            notedate: {
                                label: '日期',
                                type: 'Picker',
                                data: selectData,
                                attr: {
                                    title: '请选择',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择日期',
                                    }
                                ],
                            },
                        })
                        setConstData({
                            ...constData,
                            notedate: {
                                label: '日期',
                                type: 'Picker',
                                data: selectData,
                                attr: {
                                    title: '请选择',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择日期',
                                    }
                                ],
                            },
                        })
                    }
                    setShowBotton(true)
                } else {
                    ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    setShowBotton(false)
                }
            });
        } else if (type === 'notedate') {
            //选择日期 - 选择时段
            setData({
                ...data,
                departmentId: data.departmentId,
                departmentName: data.departmentName,
                slotId: '',
            });
            HttpUtil.post(API.ImmovableGetSlotBox, {
                departmentId: data.departmentId[0],
                notedateId: value[0],
            }).then(data => {
                data = data.data;
                if (data.code === 0) {
                    let slotData = data.data.map(item => ({
                        value: item.slotId,
                        label: item.timeSlot + `(${item.orderNum + '/' + item.totalNum})`,
                        timeSlot: item.timeSlot,
                    }));
                    setSlotList(slotData);
                    if (!showData.slotId) {
                        let obj = {
                            departmentId: constData.departmentId,
                            departmentName: constData.departmentName,
                            notedate: constData.notedate,
                            slotId: {
                                label: '时间段',
                                type: 'Picker',
                                data: slotData,
                                attr: {
                                    title: '时段(可约/总数)',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择时间段',
                                    }
                                ],
                            },
                        };
                        setShowData({ ...obj });
                        setConstData({
                            ...constData,
                            slotId: {
                                label: '时间段',
                                type: 'Picker',
                                data: slotData,
                                attr: {
                                    title: '时段(可约/总数)',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择时间段',
                                    }
                                ],
                            },
                        })
                    } else {
                        setShowData({
                            ...showData,
                            slotId: {
                                label: '时间段',
                                type: 'Picker',
                                data: slotData,
                                attr: {
                                    title: '时段(可约/总数)',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择时间段',
                                    }
                                ],
                            }
                        });
                        setConstData({
                            ...constData,
                            slotId: {
                                label: '时间段',
                                type: 'Picker',
                                data: selectData,
                                attr: {
                                    title: '时段(可约/总数)',
                                },
                                validator: [
                                    {
                                        rule: 'require',
                                        tip: '请选择时间段',
                                    }
                                ],
                            },
                        })
                    }
                    setShowBotton(true)
                } else {
                    ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    setShowBotton(false)

                }
            });
        }
    }
    useEffect(() => {//监听登记所调整
        data.departmentId && changeData(data.departmentId, 'departmentId')
    }, [data.departmentId]);
    useEffect(() => {//监听日期调整
        data.notedate && changeData(data.notedate, 'notedate')
    }, [data.notedate]);
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let timeSlot = '';
                if (data.slotId && data.slotId.length) {
                    //时段选择完成后
                    slotList.map(item => {
                        if (item.value === data.slotId[0]) {
                            timeSlot = item.timeSlot;
                        }
                    });
                    let params = {
                        username: infoData.username,
                        mobile: infoData.mobile,
                        idCard: infoData.idCard,
                        departmentId: data.departmentId[0],
                        notedate: data.notedate[0],
                        timeSlot: timeSlot,
                        slotId: data.slotId[0],
                    };
                    HttpUtil.post(API.ImmovableRegisterAppointment, params).then(data => {
                        data = data.data;
                        if (data.code === 0) {
                            NavigationUtil.navigate(props, 'EstateAppointmentSuccess', {
                                info: data.data,
                            });
                        } else {
                            ToastUtil.toast(data.msg || '获取数据失败', 'center');
                        }
                    });
                }
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }
    function verify () {
        if (!data.departmentId) {
            ToastUtil.toast('请选择登记所', 'center');
            return false;
        }
        if (!data.notedate) {
            ToastUtil.toast('请选择日期', 'center');
            return false;
        }
        if (!data.slotId) {
            ToastUtil.toast('请选择时段', 'center');
            return false;
        }
        return true;
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    title="不动产预约登记"
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true}
                />
                <WhiteSpace size="lg" />
                {showData && <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData}
                />}
                <WhiteSpace size="xl" />
                <Button style={styles.submitBtn} type="primary" disabled={!showBotton} onPress={handleSubmit}>
                    提交
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
    extraStyle: {
        fontSize: 16,
        color: '#333333',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'right',
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    labels: {
        textAlign: 'right'
    },
    texts: {
        textAlign: 'right',
        fontSize: 17,
        color: '#868686',
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
    },
});
