/**
 * @description 护士执业查询结果
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

export default function HygieneResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        unitName: {
            label: '单位名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        certificateCode: {
            label: '许可证编号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        legalName: {
            label: '法人代表',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        address: {
            label: '单位地址',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        scope: {
            label: '许可范围',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                align: 'top',
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        startTime: {
            label: '有效期限',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        signUnit: {
            label: '发证机关',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
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
    listItem: {
        borderBottomWidth: 0
    },
    valueStyle: {
        color: '#333333',
        fontSize: 16,
        flex: 2,
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