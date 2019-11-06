/**
 * @description 生育零报处理详情信息
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    Provider
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import GlobalStyles from 'src/res/styles/GlobalStyles'
/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ data, labelData }) {
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                <Form data={data} showData={labelData} />
            </ScrollView>
        </View>
    )
}
export default function BearZeroDetails(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const [data, setData] = useState();
    const labelData = {
        pcNumber: {
            label: '个人电脑号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                textAlign: 'left',
                last: true
            }
        },
        name: {
            label: '姓名',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        phone: {
            label: '手机号码',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        declare: {
            label: '申报理由',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        levelId: {
            label: '医院级别',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        total: {
            label: '医疗总费用',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        toucher: {
            label: '联系人',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        touchNumber: {
            label: '联系电话',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        handleUnit: {
            label: '参保的设保经办机构',//----
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                multipleLine: true,
                borderBottom: false,
            }
        },
        payWay: {
            label: '支付方式',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        }
    };
    useEffect(() => {
        HttpUtil.post(API.GETBEARZERO, {
            ...infoData
        }).then((data) => {
            data = data.data;
            console.log(data, 'data')
            if (data.code === 0) {
                setData({
                    ...data.data,
                    total: String(data.data.total),
                    levelId: { 3: '三级甲等医院', 4: '二级甲等医院', 5: '一级甲等医院' }[data.data.levelId],
                    payWay: { 1: '现金', 2: '支票', 3: '银行划账' }[data.data.payWay]
                })
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }, [])
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='生育零报详情' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                {data ? <ListWrap data={data} labelData={labelData} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        marginTop: 15,
        backgroundColor: '#fff'
    },
    listItem: {
        borderBottomWidth: 0
    },
    valueStyle: {
        color: '#333333',
        fontSize: 16,
        flex: 2.5,
        textAlign: 'left'
    },
    labelStyle: {
        color: '#999999',
        fontSize: 16
    },
    noData: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: (GlobalStyles.window_height - 60),
        display: 'flex',
    },
    noDataText: {
        fontSize: 16,
        color: '#999'
    }
})