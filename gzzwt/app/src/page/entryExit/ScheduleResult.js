/**
 * @description 办证进度查询结果
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Provider,
    Flex,
    WhiteSpace
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import GlobalStyles from 'src/res/styles/GlobalStyles'

const ListWrap = ({labelData, data}) => {
    return (
        <View style={styles.infoBox}>
            <View style={styles.titleBox} >
                <Text style={styles.titleText}>往来港澳通行证办理</Text>
                <Text style={styles.statusText}>{data['status']}</Text>
            </View>
            {
                Object.keys(labelData).map((key)=>(
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                            <Text style={styles.infoLabel}>{labelData[key]}</Text>
                        </Flex.Item>
                        <Flex.Item>
                            <Text style={styles.infoContent}>{data[key]||'-'}</Text>
                        </Flex.Item>
                    </Flex>
                ))
            }
        </View>
    )
}

export default function ScheduleResult(props) {
    let infoData = props.navigation.getParam('info', {});


    infoData = {
        id: '1881865421',
        idCard: '4403847275248987',
        startTime: '2019-10-20',
        hallId: '广州办事厅',
        status: '正在受理'
    }

    const labelData = {
        id: '办件流水号',
        idCard: '身份证号',
        startTime: '受理日期',
        hallId: '受理机构'
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='查询结果' 
                    hide={false}
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size='lg' />
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
    titleBox: { 
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600'
    },
    infoBox: {
        padding: 15,
        backgroundColor: '#ffffff'
    },
    infoBoxItem: {
        paddingTop: 10,
        paddingBottom: 10
    },
    infoLabel: {
       color: '#999999'
    },
    infoContent: {
        color: '#333333'
    },
    statusText: {
        color: '#2F74ED'
    }
})