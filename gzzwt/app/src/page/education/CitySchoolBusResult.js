/**
 * @description 市校车查询结果
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


export default function CitySchoolBusResult(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        plateNumber: {
            label: '车辆号牌',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        modelKindName: {
            label: '校车种类',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        belongName: {
            label: '学校名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        status: {
            label: '办学性质',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        engineNo: {
            label: '校(园)长法定代表人',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        address: {
            label: '学校地址',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        mobile: {
            label: '联系电话',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        people: {
            label: '核载人数',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        name: {
            label: '校车所有人名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        buyDate: {
            label: '购置时间',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
        registerDate: {
            label: '登记状态',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 10,
                last: true
            }
        },
    };
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