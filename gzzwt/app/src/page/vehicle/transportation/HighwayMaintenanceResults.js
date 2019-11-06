/**
 * @description 占道施工查询结果
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
    Provider,
    List
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import GlobalStyles from 'src/res/styles/GlobalStyles'
/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ data, labelData }) {
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                {
                    data.map((item, index) => {
                        return (
                            <View style={styles.formBox} key={index}>
                                <Form style={{ borderRadius: 10, overflow: 'hidden' }} key={index} data={{ ...item, presenceTime: `${item.startDate}至${item.endDate}` }} showData={labelData} />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}


export default function HighwayMaintenanceResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        roadName: {
            label: '路段名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        presenceTime: {
            label: '占道时间',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        unitName: {
            label: '施工单位',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        reason: {
            label: '占道原因',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        }
    };
    useEffect(() => {
    }, [])
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                {infoData.length ? <ListWrap data={infoData} labelData={labelData} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    formBox: {
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        overflow: 'hidden'
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