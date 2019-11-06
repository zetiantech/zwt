/**
 * @description 工伤零报处理详情信息
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
export default function InjuryZeroDetails(props) {
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
        idCard: {
            label: '身份证号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        injuryNumber: {
            label: '工伤认定书编号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        injuryDate: {
            label: '工伤日期',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        unitName: {
            label: '单位名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        unitSocialNo: {
            label: '单位社保号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        treatStartDate: {
            label: '医疗期起',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        treatEndDate: {
            label: '医疗期止',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        payTarget: {
            label: '支付对象',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        bankNo: {
            label: '银行账号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        openName: {
            label: '开户名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        bank: {
            label: '开户银行',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                labelNumber: 5,
                last: true
            }
        },
        giveKind: {
            label: '报销类别',
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
        serviceSecondOrgan: {
            label: '选择办理业务的二级业务机构',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
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
        },
        maimLevel: {
            label: '伤残程度',
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
        HttpUtil.post(API.GETINJURYZERO, {
            ...infoData
        }).then((data) => {
            data = data.data;
            console.log(data, 'data')
            if (data.code === 0) {
                setData({
                    ...data.data,
                    payTarget: { 1: '单位', 2: '个人' }[data.data.payTarget],
                    giveKind: { 1: '门诊', 2: '住院', 3: '康复治疗' }[data.data.giveKind],
                    payWay: { 1: '现金', 2: '支票', 3: '银行划账' }[data.data.payWay],
                    maimLevel: { 0: '未达伤残等级', 1: '代表伤残一级', 2: '代表伤残二级', 3: '代表伤残三级以及类推到伤残十级' }[data.data.maimLevel],
                })
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }, [])
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='工伤零报详情' hide={false} navigator={props.navigation}
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