/**
 * @description 申请协议
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
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
                <Text style={styles.titleItem}>{title}</Text>   
            </View>
            <View style={styles.content}>
                {
                    listData && listData.map((item, i)=>(
                        <Text style={styles.contentItem}>{item.id}.{item.title}</Text>
                    ))
                }
                
            </View>
        </View>
    )
}

export default function ApplicationAgreement(props){

    const [title, setTitle] = useState("广州市户籍人员出入境申请协议")
    const [listData, setListData] = useState([])

    useEffect(() => {
        setListData([
            {id: 1, title: '申请人须如实填写个人资料并确认所填信息准确有效，如有不实，将无法办理业务'},
            {id: 2, title: '申请人须如实填写个人资料并确认所填信息准确有效，如有不实，将无法办理业务'},
            {id: 3, title: '申请人须如实填写个人资料并确认所填信息准确有效，如有不实，将无法办理业务'},
            {id: 4, title: '申请人须如实填写个人资料并确认所填信息准确有效，如有不实，将无法办理业务'},
            {id: 5, title: '申请人须如实填写个人资料并确认所填信息准确有效，如有不实，将无法办理业务'}
        ])
    }, [])

    function onApplyHandler(){
        NavigationUtil.navigate(props, 'BaseInfo')
    }

    return (
        <View style={styles.container}>
            <NavigationBar 
                title='申请协议'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                popEnabled={true}
                navigator={props.navigation}
                hide={false}/>
            <WhiteSpace size="lg" />
            <AgreementContent title={title} listData={listData}/>
            <Button style={styles.btnBox} type="primary" onPress={onApplyHandler} >开始申请</Button>
        </View>
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
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    title: {
        marginTop: 10,
        paddingVertical: 20
    },
    titleItem: {
        textAlign: 'center',
        fontSize: 18
    },
    contentItem: {
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 28,
        color: '#333'
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

