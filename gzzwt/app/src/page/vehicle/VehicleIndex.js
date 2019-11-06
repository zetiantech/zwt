/**
 * @description 机动车业务
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
                        <TouchableOpacity key={index} style={styles.listView} onPress={item.handler}                                    >
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
        { 
          name: '新车上牌预约',
          icon:require('src/res/images/ic_tiaozhuan.png'),
          handler: () => {
            NavigationUtil.navigate(props,'NewVehicleMake')
        }
        },
        { 
            name: '机动车转移登记预约',
            icon:require('src/res/images/ic_tiaozhuan.png'),
            handler: () => {
                NavigationUtil.navigate(props,'TransferTheBooking')
          }
        },
        { 
            name: '补换领机动车合格标志',
            icon:require('src/res/images/ic_tiaozhuan.png'),
          handler: () => {
            NavigationUtil.navigate(props,'CarInformationEx')
        }
        },
        { 
            name: '补换领机动车号牌', 
            icon:require('src/res/images/ic_tiaozhuan.png'),
          handler: () => {
            NavigationUtil.navigate(props,'CarInformations')

            },
        },
        { 
            name: '委托发动机检验车辆',
            icon:require('src/res/images/ic_tiaozhuan.png'),
            handler: () => {
                NavigationUtil.navigate(props,'EntrustCheckoutCarMessage')
            },
        },
        { 
            name: '换领机动车登记证书',
            icon:require('src/res/images/ic_tiaozhuan.png'),
            handler: () => {
                NavigationUtil.navigate(props,'ExchangeCarRegister')
            },
        },
]
    return (  
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar 
                    title='机动车业务'
                    statusBar={{backgroundColor: '#FFFFFF'}} 
                    hide={false} 
                    popEnabled={true}  
                    navigator={props.navigation}/>
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