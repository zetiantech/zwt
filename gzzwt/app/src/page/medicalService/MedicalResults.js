/**
 * @description 医师执业查询结果
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import {
    Provider,
    List
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'
import GlobalStyles from 'src/res/styles/GlobalStyles'
function ListWrap({ data, labelData }) {
    const profilePhoto = data.headPhotoUrl ? { uri: data.headPhotoUrl } : require('src/res/images/ic_my.png');
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                <View style={styles.photoWrap}>
                    <Image style={styles.profilePhoto} source={profilePhoto} />
                </View>
                <Form data={data} showData={labelData} />
            </ScrollView>
        </View>
    )
}


export default function NurseResults(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        name: {
            label: '姓名',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        gender: {
            label: '性别',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        practiceLevel: {
            label: '医师级别',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        practiceType: {
            label: '执业类型',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        certificateCode: {
            label: '执业证数编号',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        practiceAddress: {
            label: '执业地点',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                align: 'top',
                borderBottom: true
            }
        },
        practiceScope: {
            label: '执业范围',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
                borderBottom: true
            }
        },
        registerDate: {
            label: '注册时间',
            type: 'text',
            height: 50,
            labelStyle: styles.labelStyle,
            valueStyle: styles.valueStyle,
            attr: {
                multipleLine: true, // 多行
            }
        }
    }
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
    photoWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15
    },
    profilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    valueStyle: {
        color: '#333333',
        fontSize: 16,
        flex: 2,
        textAlign: 'right'
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