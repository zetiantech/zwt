/**
 * @description 驾驶证业务
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,TouchableOpacity
} from 'react-native';
import {
    Provider,
    List,WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from 'src/util/NavigationUtil'

/**
 * 页面组件
 * 
 */
function ListWrap({ data }) {
    return (
        <View >
            <WhiteSpace size='sm'></WhiteSpace>                     
            {
                data && data.map((item, index) => {
                    return (
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            key={index} 
                            style={styles.listView} 
                            onPress={item.handler}
                        >
                            <Text >{item.name}</Text>
                            <Image style={styles.arrows} source={item.icon} ></Image>
                        </TouchableOpacity>
                    )
                })               
            }              
        </View>
    )
}

export default function OccupyConstructionResults(props) {
    const data = [
        // 驾驶证业务 
        { 
            name: '补换领机车行驶证',
            icon:require('src/res/images/ic_tiaozhuan.png'),
            handler: () => {
            NavigationUtil.navigate(props,'RenewDrivingPermits')
            },
        },
        { 
            name: '有效期换满证',
            icon:require('src/res/images/ic_tiaozhuan.png'),
            handler: () => {
            NavigationUtil.navigate(props,'dateReplacement')
            },
        },
]
   
    return (  
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar 
                    title='驾驶证业务' 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    hide={false} 
                    popEnabled = {true}  
                    navigator ={props.navigation}/>
                {data && <ListWrap data={data} />}
            </ScrollView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    listView:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        backgroundColor:'#fff',
        borderBottomWidth:0.3,
        borderColor:'#E5E5E5', 
    },
    arrows:{
        tintColor:'#CCCCCC',
    }
  
})