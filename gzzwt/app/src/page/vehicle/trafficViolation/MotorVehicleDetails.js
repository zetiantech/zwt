/**
 * @description 机动车违法详情
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Provider
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import GlobalStyles from 'src/res/styles/GlobalStyles'
function ListWrap({ data, labelData }) {
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                <Form data={data} showData={labelData} />
            </ScrollView>
        </View>
    )
}

export default function MotorVehicleDetails(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度

    const labelData = {
        statusText: {
            label: '罚款状态',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        plateNumber: {
            label: '违法车辆',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        fineTime: {
            label: '违法时间',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        address: {
            label: '违法地址',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                align: 'top',
                multipleLine: true,
            }
        },
        amount: {
            label: '罚款金额',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        score: {
            label: '违法记分',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        desc: {
            label: '违法行为',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                align: 'top',
                multipleLine: true,
                wrap: true
            }
        },
        handleOrgan: {
            label: '处理机关',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                align: 'top',
                multipleLine: true,
                wrap: true,
            }
        }
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                {infoData ? <ListWrap data={infoData} labelData={labelData} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
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
    valueStyle: {
        color: '#333333',
        fontSize: 16,
        flex: 2
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