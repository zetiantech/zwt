/**
 * @description 驾驶人违法查询结果
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
    Provider
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import GlobalStyles from 'src/res/styles/GlobalStyles'
/**
     * 查询结果
     * @param {*} params 
     */
function ListWrap({ data, props }) {
    return (
        <View style={styles.listWrap}>
            {
                data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => NavigationUtil.navigate(props, 'DriverDetails', { info: { ...item, score: `-${item.score}`, statusText: { 1: '未处理', 2: '已处理' }[item.status] } })}>
                            <View style={styles.listItem} key={index}>
                                <View style={styles.itemTop}>
                                    <View style={styles.itemTopLeft}>
                                        <Text style={styles.title}>{item.desc}</Text>
                                        <Text style={styles.address}>{item.address}</Text>
                                    </View>
                                    <View style={styles.itemTopRight}>
                                        <Text style={[styles.brekStatus, item.status == 1 ? styles.brekStatus1 : styles.brekStatus2]}>{{ 1: '未处理', 2: '已处理' }[item.status]}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemBottom}>
                                    <Text style={styles.breakDate}>{item.fineTime}</Text>
                                    <View style={styles.brekNumBox}>
                                        <Text style={[styles.numBox, styles.numBox1]}>记分<Text style={styles.num}>-{item.score}</Text></Text>
                                        <Text style={styles.numBox}>罚款<Text style={styles.num}>{item.amount}元</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
export default function DriversBreakResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <ScrollView>
                    {infoData.length ? <ListWrap data={infoData} props={props} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
                </ScrollView>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    listItem: {
        backgroundColor: '#fff',
        marginTop: 15,
        height: 130,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    itemBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    title: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5
    },
    address: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 20
    },
    breakDate: {
        fontSize: 12,
        color: '#999999'
    },
    brekStatus: {
        color: '#fff',
        width: 54,
        textAlign: 'center',
        height: 24,
        lineHeight: 24,
        borderRadius: 4,
        fontSize: 12,
        marginBottom: 20
    },
    brekStatus1: {
        backgroundColor: '#FFC263'
    },
    brekStatus2: {
        backgroundColor: '#52C41A'
    },
    itemRight: {
        alignItems: 'flex-end',
    },
    brekNumBox: {
        flexDirection: 'row',
        color: '#f00',
        fontSize: 14
    },
    numBox: {
        color: '#999',
        fontSize: 14
    },
    numBox1: {
        marginRight: 10
    },
    num: {
        color: '#FF5454'
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