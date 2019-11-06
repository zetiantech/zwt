/**
 * @description 选择申请业务类型
 * @author 择天团队 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { 
    Button
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil';


const BusinessType = ({props})=>{
    return (
        <View style={styles.ganAOEndorsement}>
             <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={()=>{
                    NavigationUtil.navigate(props, 'ApplyBaseInfo')
                }}>
                <View style={styles.buttonBox}>
                    <Text style={styles.buttonText1}>外国人个人申请</Text>
                    <Text style={styles.buttonText2}>Individual Application</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{
                    NavigationUtil.navigate(props, 'PersonalStayReport')
                }}>
                <View style={styles.buttonBox}>
                    <Text style={styles.buttonText1}>个人住宿申报</Text>
                    <Text style={styles.buttonText2}>Individual Accommoda Registration</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default function ApplyBusinessType(props) {
    return (
        <View style={styles.container}>
            <NavigationBar 
                title='选择申请业务类型' 
                hide={false} 
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                popEnabled = {true} 
                navigator ={props.navigation}/>
            <BusinessType props={props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ganAOEndorsement: {
        padding: 15
    },
    buttonBox: {
        borderRadius: 6,
        backgroundColor: '#ffffff',
        paddingTop: 30,
        paddingBottom: 30,
        textAlign:'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {h: 10, w: 10},
        shadowRadius: 2,
        shadowOpacity: 0.5,
    },
    buttonText1: {
        padding: 5,
        fontSize: 18,
        color: '#333'
    },
    buttonText2: {
        padding: 5,
        fontSize: 16,
        color: '#999'
    }
});

