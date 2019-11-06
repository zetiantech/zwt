/**
 * @description 专业技术资格查询结果
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
import NavigationBar from '../../common/NavigationBar'//头部导航
import GlobalStyles from 'src/res/styles/GlobalStyles'

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
export default function ProfessionalSkillResults (props) {
    const [infoData, setInfoData] = useState();
    const showData = {
        name: '姓名',
        certName: '证书名称',
        signUnit: '发证单位',
        certCode: '证书编号',
        signDate: '发证日期',
    };
    useEffect(() => {
        let info = props.navigation.getParam('info', {});
        if (info !== null) setInfoData({ ...infoData, ...info })
    }, [])
    return (
        <View style={styles.container}>
            <NavigationBar title='专业技术资格查询结果' hide={false} navigator={props.navigation} popEnabled={true} />
            <ScrollView >
                <WhiteSpace size="lg" />
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