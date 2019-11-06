/**
 * @description 不动产档案查询结果
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
    List, Accordion, WhiteSpace
} from '@ant-design/react-native';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from '../../common/NavigationBar'//头部导航
/**
 * 列表数据
 * @param {*} data 数据 
 * @param {*} showData 显示的字段名 
 */
function ListWrap ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                {
                    Object.keys(showData).map((item, index) => {
                        return (
                            <List.Item
                                key={index}
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
/**
 * @param {*} data 数据
 * @param {*} data 显示的字段名
 * @param {*} activeSections 默认展开标记数组
 * @param {*} onChange 展开收起方法
 */
function AccordionList ({ data, showData, activeSections, onChange }) {
    return (
        <View style={{ padding: 10, paddingTop: 0 }}>
            <Accordion
                onChange={(val) => { onChange(val) }}
                activeSections={activeSections}
                style={{ Line: { borderBottomWidth: 0 }, borderBottomColor: 'red' }}
                styles={{ Line: { borderBottomWidth: 0 } }}
            >
                {data.map((item, index) => {
                    return (
                        <Accordion.Panel
                            header={"广州市不动产查档情况(第" + (index + 1) + "套)"}
                            key={index}
                            style={{ backgroundColor: '#fff', marginTop: 15, borderBottomColor: '#e5e5e5' }}
                        >
                            <ListWrap data={item} showData={showData} />
                        </Accordion.Panel>
                    )
                })}
            </Accordion>
        </View>
    )
}
export default function EstateBuildingResults (props) {
    const [list, setList] = useState([]);
    const [activeSections, setActiveSections] = useState([]);
    const showData = {
        belongName: '权利人',
        endDate: '查询截止日期',
        houseName: '房地产名称',
        houseCode: '不动产证号',
        houseKind: '房屋性质',
        areaSize: '面积大小',
        houseUse: '房屋用途',
        share: '份额',
        registerPrice: '登记价格',
        status: '状态',
        transferDate: '转让时间',
    };
    useEffect(() => {
        let info = props.navigation.getParam('info', {});
        console.log(info, '===', info.list, info.list.length)
        if (info !== null) {
            if (info.list && info.list.length) {
                setList(info.list)
                let arr = [];
                info.list.map((item, index) => {
                    arr.push(index);
                })
                setActiveSections(arr)//设置展开项
            }
        }

    }, [])
    /**
     * 手风琴开合重写【展开收起仅影响单个】
     * @param {*} active 
     */
    function onChange (active) {
        let arr = activeSections.concat();
        let flag = false;
        if (active.length == 1) { //加法的情况
            arr.some((i) => {
                if (i == active[0]) {
                    flag = true;
                }
            })
            if (flag) {//去掉
                if (activeSections.concat().length == 2) {
                    arr = active;
                } else {//减去后只剩下一个的情况
                    let arr2 = arr.filter((i) => {
                        return i !== active[0];
                    })
                    arr = arr2.concat();
                }
            } else {//增加
                arr.push(active[0]);
            }
            setActiveSections(arr)
        } else {
            setActiveSections(active)
        }
    }
    return (
        <View style={styles.container}>
            <NavigationBar title='不动产档案查询结果' hide={false} navigator={props.navigation} popEnabled={true} />
            <ScrollView >
                {(list && list.length) ? <AccordionList data={list} showData={showData} activeSections={activeSections} onChange={onChange} /> : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>}
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