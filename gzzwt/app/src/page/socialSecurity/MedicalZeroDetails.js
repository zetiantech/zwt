/**
 * @description 医疗零报处理详情信息
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
export default function MedicalZeroDetails(props) {
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
        hospitalName: {
            label: '就医医院名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        province: {
            label: '就医地所属省、自治区',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        levelCity: {
            label: '就医地所属地级市',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        serviceType: {
            label: '业务类型',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        startDate: {
            label: '就诊日期起',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        endDate: {
            label: '就诊日期止',
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
            label: '总费用',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        cause: {
            label: '报销原因',
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
            label: '联系号码',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        serviceSecondOrgan: {
            label: '办理业务的二级机构',
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
        HttpUtil.post(API.GETMEDICALZERO, {
            ...infoData
        }).then((data) => {
            data = data.data;
            console.log(data, 'data0')
            if (data.code === 0) {
                setData({
                    ...data.data,
                    total: String(data.data.total),
                    serviceType: { 1: '住院', 2: '门诊', 3: '门慢', 4: '门特' }[data.data.serviceType],
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
                <NavigationBar title='医疗零报详情' hide={false} navigator={props.navigation}
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