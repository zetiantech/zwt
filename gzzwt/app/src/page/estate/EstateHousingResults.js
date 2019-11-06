/**
 * @description 不动产-存量房源信息查询结果
 * @author caroline
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    List,
    WhiteSpace
} from '@ant-design/react-native';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from '../../common/NavigationBar'//头部导航

function ListWrap ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                {
                    Object.keys(showData).map((item, index) => {
                        return (
                            <List.Item
                                styles={{ Line: { borderBottomWidth: 0 } }}
                                arrow="empty"
                                align='top'
                                multipleLine
                                extra={
                                    <Text style={styles.listItemLabel}>{data[item] || '-'}</Text>
                                }>
                                <Text style={styles.listItemText}>{showData[item]}</Text>
                            </List.Item>
                        )
                    })
                }
            </List>
        </View>
    )
}
export default function EstateHousingResults (props) {
    const [infoData, setInfoData] = useState();
    const showData = {
        sourceName: '盘源名称',
        sourceAddress: '盘源地址',
        houseNum: '可售套数',
    };
    useEffect(() => {
        if (props.navigation.getParam('info', {}) !== null) setInfoData({ ...props.navigation.getParam('info', {}) })
    }, [])
    return (
        <View style={styles.container}>
            <NavigationBar title='存量房源信息查询结果' hide={false} navigator={props.navigation} popEnabled={true} />
            <WhiteSpace size="lg" />
            <ScrollView >
                {infoData ? <ListWrap data={infoData} showData={showData} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItemText: {
        color: '#999',
        fontSize: 16,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
    listItemLabel: {
        flex: 2.5,
        fontSize: 16,
        paddingTop: 5,
        color: '#333333',
        paddingBottom: 6,
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