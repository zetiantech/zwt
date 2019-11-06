/**
 * @description 个人指标申请-申请须知
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

import { 
    Button,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil'


const AgreementContent = ({title, listData}) => {
    return (
        <View style={styles.mainBox}>
            <View style={styles.title}>
                <Text style={styles.titleItem}>《承诺书》</Text>   
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.contentItem}>       本人申请广州市中小客车增量指标,并已认真阅读《广州市中小客车总量调控管理办法》,
                    本人承诺按照以下规定使用取得的增量指标 :        
                    </Text>         
                </View>
                <View >
                    <Text style={styles.contentItem}>       一、节能车是指工业和信息化部《道路机动车辆生产企业及产品公告》中产品综合工况燃料消耗
                    量与国家标准《乘用车燃料消耗量限值》(GB19578)中对应限值相比小于65%的混合动力中小客车,具体由车辆生产企业提出申请,经市交通
                    行政主管部门会同市发展改革,公安机关交通管理等部门联合会商确认 。
                    </Text>           
                </View>
                <View>
                    <Text style={styles.contentItem}>       二、逾期未使用摇号增量指标,在指标失效之日起2年内不得再次申请增量指标,通过
                    竞价方式取得的普通车增量指标, 不受钱款使用范围限制 。
                    </Text>  

                </View>                   
            </View>
        </View>
    )
}

export default function ApplicationAgreement(props){

    const [title, setTitle] = useState("申请须知")
    const [listData, setListData] = useState([])

    useEffect(() => {
       
    }, [])

    function onApplyHandler(){
        NavigationUtil.navigate(props, 'personIndexApply')
    }

    return (
        <ScrollView style={styles.container}>
            <NavigationBar 
                title='个人指标申请'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                popEnabled={true}
                navigator={props.navigation}
                hide={false}/>
            <WhiteSpace size="lg" />
            <AgreementContent />
            <Button style={styles.btnBox} type="primary" onPress={onApplyHandler} >开始申请</Button>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    mainBox: {
        backgroundColor: '#ffffff'
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    title: {
        marginTop: 7,
        // paddingVertical: 20
    },
    titleItem: {
        textAlign: 'center',
        fontSize: 18
    },
    contentItem: {
        marginBottom: 5,
        fontSize: 16,
        lineHeight: 28,
        color: '#000'
    },
    text1:{
        marginBottom:10
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

