/**
 * @description 不动产登记网上预约结果
 * @author caroline
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import {
    Result
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

export default function EstateAppointmentSuccess (props) {
    const navigationBar = <NavigationBar
        navigator={props.navigation}
        popEnabled={true}
        title=''
        hide={true} />;
    const [infoData, setInfoData] = useState({
        username: '',
        flowNumber: '',
        departmentName: '',
        address: ''
    })

    useEffect(() => {
        setInfoData({ ...infoData, ...props.navigation.getParam('info', {}) })
        console.log(props.navigation.getParam('otherParam', 'default value'))
    }, [])
    function handleBack () {
        NavigationUtil.navigate(props, 'EstateAppointment', {})
    }
    return (
        <View>
            {navigationBar}
            <Result
                style={styles.resultBox}
                styles={{
                    buttonWrap: { marginTop: 50 },
                }}
                img={
                    <Image source={require('src/res/images/common/success.png')} style={{ width: 60, height: 60 }} />
                }
                title={
                    <Text style={styles.title}>预约成功!</Text>
                }
                message={

                    <Text style={{ color: '#666666' }}>{infoData.username},您已成功预约了领取不动产权证书登记，预约流水号<Text style={{ color: '#000' }}>{infoData.flowNumber}</Text>请您带去身份证和必备材料,按时前往{infoData.departmentName}进行业务办理。登记所地址为：{infoData.address}。</Text>
                }
                buttonText="知道了"
                buttonType='primary'
                onButtonClick={handleBack}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    resultBox: {
        marginTop: 120
    },
    title: {
        fontSize: 20,
    }
});