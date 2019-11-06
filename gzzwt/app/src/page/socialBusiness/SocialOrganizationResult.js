/**
 * @description 社会组织查询
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


export default function SocialOrganizationResult(props) {
    const infoData = props.navigation.getParam('info', { plateNumber: '555' });//参数,医院经纬度
    const labelData = {
        name: {
            label: '社会组织名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                textAlign: 'left',
                last: true
            }
        },
        registerType: {
            label: '登记类型',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        socialCode: {
            label: '统一社会信用代码',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        administration: {
            label: '登记管理机关',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        deputyName: {
            label: '法定代表人姓名',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        sponsor: {
            label: '业务主管单位',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        organizationType: {
            label: '社会组织类型',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        status: {
            label: '状态',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        identification: {
            label: '社会组织标识',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        area: {
            label: '行政区域',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        },
        registerDate: {
            label: '成立登记日期',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 7,
                last: true
            }
        }
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