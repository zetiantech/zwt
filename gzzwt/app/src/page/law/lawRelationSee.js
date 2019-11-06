/**
 * @description 被监管对象家属会见预约-预约须知
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
                <Text style={styles.titleItem}>申请须知</Text>   
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.contentItem}>一、以下被监管人员家属可以申请会见:</Text>
                    <Text style={styles.text1}>      1、 看守所判决已生效且执行通知书已送达的罪犯。</Text>
                    <Text style={styles.text1}>      2、 戒毒所,拘留所拘押人员。</Text>
                </View>
                <View >
                    <Text style={styles.contentItem}>二、申请人必须是被监管人员的近亲属,监护人。</Text>           
                </View>
                <View>
                    <Text style={styles.contentItem}>三、注意事项:</Text>  
                    <Text style={styles.text1}>      1、 申请预约会见的家属必须携带身份证、亲属关系证明到现场办理会见手续,否则不予会见。</Text>
                    <Text style={styles.text1}>      2、 家属姓名、身份证号、联系电话、现住址请在预约时如实填写,否则不予会见。</Text>
                    <Text style={styles.text1}>      3、 预约失败的原因可能有:预约信息填写有误;预约对象没有关押在该监管场所,预约对象不符合会见条件;
                        看守所预约时不是选择'夫、妻、父、母、子、女、同胞兄弟姐妹'关系的。
                    </Text>
                    <Text style={styles.text1}>      4、 因被监管人员外出就医等情况造成无法按预约时间安排会见的,待相关情形消除后由监所及时安排会见。</Text>
                    <Text style={styles.text1}>      5、 预约成功的家属必须于预约时间段起始时间提前15分钟到监所现场办理会见手续,否则取消本次预约。</Text>
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
        NavigationUtil.navigate(props, 'lawRelationSee2')
    }

    return (
        <ScrollView style={styles.container}>
            <NavigationBar 
                title='被监管对象家属会见预约'
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
        paddingHorizontal: 10
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
        color: '#333'
    },
    text1:{
        marginBottom:10
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

