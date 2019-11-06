/**
 * @description 消费明细
 * @author 
*/
import React, { useState, useEffect  } from 'react';
import {
    View,
    Text,
    StyleSheet,ScrollView
} from 'react-native';

import { 
    Button,
    List,
    WhiteSpace,
    Provider,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Item = List.Item;


const Card = ({data}) => {
    return (
        <View>
            {
               data && Object.keys(data).map(key=>(
                    <View >
                        <View style={styles.annual}>
                            <Text>{data[key].date}</Text>    
                            <Text style={{color:"#999"}} >共消费￥{data[key].account}</Text>
                        </View>
                        {
                            data[key].list && data[key].list.map((item, index)=>(
                                <View style={
                                        data[key].list.length == 1 ? styles.annualCard4 : (data[key].list.length > 1 &&
                                        index == 0) ? styles.annualCard2 : 
                                        index==(data[key].list.length-1) ? styles.annualCard3 : styles.annualCard }>
                                    <View style={styles.annual} >
                                        <View>
                                            <Text style={{marginBottom:5}}>{item.hospitalName}</Text>
                                            <Text style={styles.text}>{item.payTime}</Text>
                                        </View> 
                                        <Text>￥{item.cashPay}</Text>                     
                                    </View>     
                                </View>
                            ))
                        }
                                                                    
                    </View> 
               ))
         
                
            }
        </View>
    )
}
export default function Socialdetial(props) {
    let parms  = props.navigation.getParam('parms')

    const navigationBar = <NavigationBar
        navigator={props.navigation}
        popEnabled={true}
        title='提取明细'
        hide={false}
        statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
        />    
    const [data,setData] = useState() 
    //
    useEffect(() => {          
        handleBind()
    }, [])//消费记录
    
    function handleBind() {
        HttpUtil.get(API.ConsumeList, 
            {...parms}
        ).then((data) => {
            data = data.data;
            if(data.code === 0) {
                // console.log(data,33333)
                parseData(data.data)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });  
    }

    function parseData(arr) {
        var new_arr = {}, newArr =[];
        for (var i = 0, len = arr.length; i < len; i++) {
            var Month_index = arr[i].payTime.lastIndexOf('-');
            var payTime = arr[i].payTime.substr(0, Month_index);
            if (!new_arr[payTime]) {
                new_arr[payTime] = {};
                newArr = []
                newArr.push(arr[i])
                new_arr[payTime].date = payTime.replace('-', '年')+ '月'
                new_arr[payTime].account = 1000
                new_arr[payTime].list = newArr
            } else {
                newArr.push(arr[i])
                new_arr[payTime].list = newArr
            }

        }
        console.log(new_arr, 111121122121)
        setData(new_arr)
    }   
    return (
        <ScrollView>
            <View style={styles.container}>  
                { navigationBar }
                <Card data={data}  />  
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    annual:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingVertical:15,
        alignItems:'center',
    },
    annualCard:{
        marginHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderBottomWidth:0.3,
        borderBottomColor:'#F0F0F0'
    },
    annualCard2:{
        marginHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomWidth:0.3,
        borderBottomColor:'#F0F0F0'
    },
    annualCard3:{
        marginHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        // borderBottomWidth:1


    },
    annualCard4:{
        marginHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderRadius: 8,
        // borderBottomWidth:1

        
    },
    text:{
        color:'#999',
    }
});