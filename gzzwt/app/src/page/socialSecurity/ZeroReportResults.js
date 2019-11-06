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
    TouchableOpacity
} from 'react-native';
import {
    Provider,
    ListView,
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import GlobalStyles from 'src/res/styles/GlobalStyles'
/**
 * 页面组件
 * @param {*} param0 
 */
function RenderContent({ data, labelData, props, zeroReportTypeId }) {
    let payWay = {
        1: '现金',
        2: '支票',
        3: '银行划账'
    }[data.payWay],
        url = {
            1: 'MedicalZeroDetails',//医疗零报
            2: 'BearZeroDetails',//生育零报
            3: 'InjuryZeroDetails'//工伤零报
        }[zeroReportTypeId];
    return (
        <TouchableOpacity onPress={() => NavigationUtil.navigate(props, url, {
            info: { id: data.id }
        })}>
            <View style={styles.formBox}>
                <Form style={{ borderRadius: 10, overflow: 'hidden' }} data={{ ...data, payWay }} showData={labelData} />
            </View>
        </TouchableOpacity>
    )
}
/**
 * 页面下拉刷新及上拉加载
 * @param {*} getData 获取数据方法
 * @param {*} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setListView, labelData, props, zeroReportTypeId }) => {
    return (
        <ListView
            // refreshable={false}
            ref={(ref) => setListView(ref)}
            onFetch={getData}
            keyExtractor={(item, index) =>
                `${item.id}`
            }
            renderItem={(item, index) => {
                return (
                    <RenderContent data={item} labelData={labelData} props={props} zeroReportTypeId={zeroReportTypeId} />
                )
            }}
            numColumns={1}
        />
    )
}

export default function ZeroReportResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const [listView, setListView] = useState([]); // 用来接收列表元素
    let cause = {
        1: '报销原因',
        2: '申报理由',
        3: '工伤认定书编号'
    }[infoData.zeroReportTypeId]
    const labelData = {
        name: {
            label: '姓名',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                last: true, //不显示下边框线, 设置了multipleLine时用
                labelNumber: 7
            }
        },
        hospitalName: {
            label: '就医医院名称',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                last: true, //不显示下边框线, 设置了multipleLine时用
                labelNumber: 7
            }
        },
        cause: {
            label: cause,
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                last: true, //不显示下边框线, 设置了multipleLine时用
                labelNumber: 7
            }
        },
        payWay: {
            label: '支付方式',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                last: true, //不显示下边框线, 设置了multipleLine时用
                labelNumber: 7
            }
        }
    };
    useEffect(() => {

    }, [])
    /**
* 获取列表数据
* @param {*} page 页码
* @param {*} startFetch 设置数据
* @param {*} abortFetch 获取数据出错
*/
    function getData(page = 1, startFetch, abortFetch) {
        // timer.current && clearTimeout(timer.current);
        // timer.current = setTimeout(() => {
        HttpUtil.post(API.GETZEROREPORTLIST, {
            ...infoData,
            page: page,
            size: 10
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                startFetch(data.data.list || [], 10);
            } else {
                abortFetch();
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                {infoData ? (
                    <ScrollView styles={styles.ListWrap}>
                        <ScrollViewer props={props} getData={getData} labelData={labelData} zeroReportTypeId={infoData.zeroReportTypeId} setListView={setListView} />
                    </ScrollView>
                ) : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
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