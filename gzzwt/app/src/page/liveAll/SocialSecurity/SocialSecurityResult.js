/**
 * @description 预约信息确认
 * @author Jonne
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,Image
} from 'react-native';
import {
    List,
    Button,
    Modal,
    Provider,
} from '@ant-design/react-native';

import NavigationUtil from  'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';
import GlobalStyles from 'src/res/styles/GlobalStyles'


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

export default function SocialSecurityResult(props) {

    const form = props.navigation.getParam("form")||""
    const parmsImg = props.navigation.getParam("parmsImg")||""

    const [infoData, setInfoData] = useState({
        name: '',
        cardNumber: '',
        startTime: '',
        endTime: '',
        phone: '',
        address: '',
        issuing: '',
        bank: '',
        area: '',
        work: ''
    });

    const showData = {
        name: '申领人',
        cardNumber: '证件号码',
        startTime: '证件有效开始期',
        endTime: '证件有效截止期',
        phone: '手机号码',
        address: '住址',
        issuing: '',
        bank: '金融银行',
        area: '地区',
        work: '受理网点'
    };
    
    useEffect(() => {
        // setInfoData(form) 
    }, [])

    const onSocialSecuritySuccess = () => {
        Modal.alert('信息确认', '确认要提交？', [
            {
                text: '取消'
            },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'ResultPage', {type: 6})
            }},
        ]);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation}
                    popEnabled={true}
                    title='预约信息确认' 
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    hide={false} />
                <ScrollView >
                    {infoData && <ListWrap data={infoData} showData={showData} />}
                    <View style={{backgroundColor:'#fff',marginTop:10}}>
                        <View style={{paddingVertical:15,marginLeft:15}}>
                            <Text style={{color:'#333333',marginBottom:10}} >社保卡制作相片</Text>
                            <Image  style={styles.imgUri} resizeMode='stretch' source={{uri:parmsImg.img1}} ></Image>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff',marginTop:10}}>
                        <View style={{paddingVertical:15,marginLeft:15,}}>
                            <Text style={{color:'#333333',marginBottom:10}} >身份证照</Text>
                            <View style={{flexDirection:'row'}}>
                                <Image  style={styles.imgUri} resizeMode='stretch' source={{uri:parmsImg.img2}} ></Image>
                                <Image  style={styles.imgUri} resizeMode='stretch' source={{uri:parmsImg.img3}} ></Image>
                            </View>             
                        </View>
                    </View>
                    <Button  type="primary" style={styles.btnBox} onPress={onSocialSecuritySuccess}>确认</Button>
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
    ListWrap: {
        marginTop: 15,
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
        flex: 2.0,
        fontSize: 15,
        paddingTop: 5,
        color: '#333333',
        paddingBottom: 6,
    },
    btn:{
        marginHorizontal: 20,
        marginVertical: 30
    },
    btnBox: {
        marginHorizontal: 15,
        marginVertical: 30
    },
    btnText: {
        color: '#FFFFFF',
        borderWidth: 0
    },
    imgUri:{
        width:(GlobalStyles.window_width)/3.5,
        height:(GlobalStyles.window_width)/4,
        marginRight:10
    }
})