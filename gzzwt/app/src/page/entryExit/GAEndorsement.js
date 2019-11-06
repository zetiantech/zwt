/**
 * @description 港澳再次签注
 * @author 择天团队 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { 
    Button
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil';

const GAEndorsementContent = ({props, type, setType}) =>{
    return (
        <View style={styles.ganAOEndorsement}>
            <Button 
                style={styles.ganAoButton} 
                onPress={()=> setType(1)}>
                广东省户籍居民签注
            </Button>
            {
                 type== 1 && <View style={{flexDirection: 'row'}}>
                    <Button 
                        style={[styles.ganAoButton, styles.buttonText]}
                        onPress={()=> NavigationUtil.navigate(props, 'EntryExitPassInfo', {type: 1})}
                    >
                        <Text style={[styles.ganAoButtonText, styles.textStyles]}>线上办理</Text>
                    </Button>
                    <Button style={[styles.ganAoButton, styles.buttonText]}>
                        <Text style={[styles.ganAoButtonText, styles.textStyles]}>线下自助机办理</Text>
                    </Button>
                </View>
            }
            <Button style={styles.ganAoButton} disabled>非广东省户籍居民签注</Button>
        </View>
    )
}

export default function GAEndorsement(props){
    // 广东户籍居民签注 1-线上办理和线下自助机办理
    const [type, setType] = useState(0)
    return (
        <View style={styles.container}>
            <NavigationBar title='港澳再次签注'
            hide={false} 
            popEnabled={true}
            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
            navigator={props.navigation}/>
            <GAEndorsementContent props={props} type={type} setType={setType}/>
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
    ganAoButton: {
        marginBottom: 15,
        height: 110,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        borderWidth: 0
    },
    buttonText: {
        height: 80, 
        flex: 1, 
        marginRight: 5
    },
    textStyles: {
        fontSize: 14, 
        color: '#2F74ED'
    }
});

