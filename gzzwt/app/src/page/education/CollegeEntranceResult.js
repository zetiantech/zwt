/**
 * @description 高考查询结果
 * @author caroline
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import {
    List,
    Picker,
    Provider,
    WhiteSpace
} from '@ant-design/react-native';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from '../../common/NavigationBar'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
/**
 * 准考生简介
 * @param {*} data 具体信息 
 */
function CardInfo ({ data }) {
    return (
        <View style={styles.cardWrap}>
            <View
                style={styles.flexBox}
            >
                <View style={styles.flexItem}>
                    <View
                        style={styles.flexContent} >
                        <Text style={styles.middleFont}>{data.name}</Text>
                        <Text style={styles.normalFont}>考生号：{data.examineeNumber}</Text>
                        <Text style={styles.normalFont}>准考证号：{data.ticketNumber}</Text>
                    </View>
                </View>
                <View style={styles.flexBg} >
                    <Image
                        style={{ width: 100, height: 100, alignContent: "center" }}
                        source={require('src/res/images/pic_badge.png')}
                    />
                </View>
            </View>
            <View style={styles.flexBox}>
                <View
                    style={styles.flexBottom}>
                    <Text style={styles.bigFont}>{data.totalScore && data.totalScore + '分' || ' '}</Text>
                </View>
                <View style={styles.flexBottom2} >
                    <Text style={styles.bigFont}>{data.rank && data.rank + '名' || ' '}</Text>
                </View>
            </View>
        </View >
    )
}
/**
 * 类型切换
 */
function SelectItem ({ data, selectVal, changeType }) {
    const [val, setVal] = useState();
    useEffect(() => {
        setVal(selectVal)
    }, [])
    return (
        <List styles={{ Body: { borderTopWidth: 0 }, BodyBottomLine: { borderBottomWidth: 0 } }} textAlign="left">
            <View >
                <Picker
                    cols={1}
                    title='请选择'
                    itemStyle={{ padding: 10, }}
                    indicatorStyle={{ color: 'red' }}
                    data={data}
                    value={val}
                    textAlign="left"
                    onChange={(selectValue) => { setVal(selectValue); changeType(selectValue) }}
                    onOk={(selectValue) => { setVal(selectValue); changeType(selectValue) }}
                    multipleLine={true}
                >
                    <List.Item arrow="horizontal" last={true}>
                    </List.Item>
                </Picker>
            </View>
        </List>
    )
}
/**
 * 列表
 */
function ListWrap ({ data, type }) {
    let listData = [];
    if (type[0] === 2) {//考试安排
        let list = [];
        data.map(item => {
            list.push({
                name: item.schoolName,
                score: item.building + item.room + item.seatNumber,
            })
            listData = list;
        })
    } else {
        listData = data;
    }
    return (
        <View >
            <List style={{ overflow: 'hidden' }} styles={{ Line: { borderBottomWidth: 0 } }}>
                {
                    listData && listData.map((d, index) => {
                        return (
                            <List.Item
                                key={index}
                                extra={
                                    <Text style={styles.listItemText}>{d.score || ''}</Text>
                                }
                            >
                                <Text style={styles.listItemText}>{d.name || ''}</Text>
                            </List.Item>
                        )
                    })
                }
            </List>
        </View>
    )
}
export default function CollegeEntranceResult (props) {
    const [type, setType] = useState();//查询内容
    const [selectData, setSelectData] = useState();
    const [info, setInfo] = useState({
        examineeNumber: '',
        ticketNumber: '',
        name: '',
        queryId: '',
        totalScore: '',
        rank: '',
    });//卡片信息
    const [list, setList] = useState();
    useEffect(() => {
        HttpUtil.get(API.GetQueryType, {//下拉
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                const selectData = data.data.map((item) => ({
                    value: item.id,
                    label: item.name + `(${item.status === 1 ? '已开通' : '未开通'})`,
                    status: item.status
                }))
                setSelectData(selectData);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
        setInfo({ ...info, ...props.navigation.getParam('info', {}) })
        setList(props.navigation.getParam('info', {}).list)
        setType([props.navigation.getParam('info', {}).queryId])//当前选项
    }, [])
    /**
     * 切换成绩类型
     * @param {*} val 
     */
    function changeType (val) {

        HttpUtil.get(API.GetExamineeInfo, {//详情
            examineeNumber: props.navigation.getParam('info', {}).examineeNumber,
            queryId: val[0],
            passwd: props.navigation.getParam('info', {}).passwd
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                setType(val)//当前选项
                let infoData = data.data;
                //设置基本信息
                setInfo({ ...info, ...infoData })
                setList(infoData.list)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
                setList([])
            }
        });
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation} popEnabled={true} />
                <WhiteSpace size="lg" />
                <ScrollView>
                    {info && <CardInfo data={info} selectVal={type} changeType={changeType} selectData={selectData} />}
                    <WhiteSpace size="lg" />
                    <View style={styles.selectWarp}>
                        {type && <SelectItem data={selectData} selectVal={type} changeType={changeType} />}
                    </View>
                    <ScrollView style={styles.listWrap}>
                        {(list && list.length) ? <ListWrap data={list} type={type} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
                    </ScrollView>
                </ScrollView>
            </View>
        </Provider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    normalFont: {
        color: '#fff',
        lineHeight: 24
    },
    middleFont: {
        fontSize: 20,
        color: '#fff',
        lineHeight: 32,
    },
    bigFont: {
        fontSize: 24,
        color: '#fff',
    },
    cardWrap: {
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#4C85EC',
        borderRadius: 12,
        height: 175,
    },
    flexBox: {
        flexDirection: 'row',
    },
    flexItem: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    flexContent: {
        height: 110,
        // marginTop: 20,
        paddingTop: 20

    },
    flexBg: {
        flex: 1,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    flexBottom: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexBottom2: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#fff'
    },
    selectWarp: {
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
    },
    listWrap: {
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 20,
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
    noData: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: (GlobalStyles.window_height - 400),
        display: 'flex',
    },
    noDataText: {
        fontSize: 16,
        color: '#999'
    }
});