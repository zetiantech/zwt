/**
 * @description 驾驶证状态查询结果
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

export default function DriversResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        name: {
            label: '姓名',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6
            }
        },
        allowDrvingTypeName: {
            label: '准驾车型',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        idCard: {
            label: '证件号码',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
                last: true, // 不显示下边框线
            }
        },
        statusText: {
            label: '状态',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: infoData ? (infoData.status == 1 ? styles.blueValue : styles.valueStyle) : styles.valueStyle,
            // valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6
            }
        },
        engineNo: {
            label: '发动机号码',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6
            }
        },
        validDate: {
            label: '有效期',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
            }
        },
        firstGetDate: {
            label: '初次领证日期',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
                wrap: true
            }
        },
        archivesCode: {
            label: '档案编号',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        address: {
            label: '地址',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
                align: 'top',
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
        flex: 2,
        textAlign: 'right'
    },
    blueValue: {
        color: '#2F74ED',
        fontSize: 16,
        flex: 2,
        textAlign: 'right'
    },
    redValue: {
        color: 'red'
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