/**
 * @description 挂失结果
 * @author heweifeng
*/
import React, { useEffect } from 'react';
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

export default function SuspendReadCardSuccess (props) {
    const navigationBar = <NavigationBar
        navigator={props.navigation}
        popEnabled={true}
        title=''
        hide={false} />;
    function handleBack () {
        props.navigation.goBack();
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
                    <Text style={styles.title}>挂失成功!</Text>
                }
                message={
                    <Text style={{ color: '#666666' }}>请前往广州图书馆进行补办手续</Text>
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