/**
 * @description 信息确认
 * @author 择天团队 ct 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';
 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'




export default function CarCountersign (props) {
        const [Data,setData] = useState() 
        let time = new Date()

        let data = props.navigation.getParam('data')//用户数据
        let supformData = props.navigation.getParam('supformData')//上级页面数据
        let formData = props.navigation.getParam('formData')//上级页面数据
        let cityval = props.navigation.getParam('cityval')//上级页面数据-东莞市
        let targetAreaId = formData.targetAreaId.join('')
        let type  = supformData.type.join('')

        function onClickBtn () {    
            HttpUtil.post(API.VehicleApplyAddTransferApply, {
                vehicleId:data.id,
                busTypeId:type,
                targetAreaId:targetAreaId,
                status:formData.status
            })  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data   
                if(code === 0){
                    console.log(data,'提交申请')
                    NavigationUtil.navigate(props,'ApplicationResult',{formData:formData,cityval:cityval,data:data,time:time})
                }  
                }).catch(error=>{
                // console.log(error,'error')
            }); 

            }
    
            

        return (
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                { formData && cityval &&
                <View style={styles.container}>
                <View style={styles.warp}> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>所有人</Text>
                            <Text style={styles.name}>{formData.belongName}</Text>
                        </View>                   
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>号牌种类</Text>
                            <Text style={styles.name1}>{formData.modelKindName}</Text>
                        </View>                  
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>号牌号码</Text>
                            <Text style={styles.name1}>{formData.plateNumber}</Text>
                        </View>
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>转入地</Text>
                            <Text style={styles.name}>{cityval}</Text>
                        </View>
                    </View>                  
                </View> 
                <View>
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClickBtn} >下一步</Button>
                    </List>
                </View>
        
           </View>
        }           
            </View>
        );
 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        height:250,
        backgroundColor: '#f9f9f9',
        marginTop: 20,      
    },
    conname:{
        marginLeft:30,
        flexDirection:'row', 

    },
    list:{
        // flex:0,
        flexDirection:'row', 
    },
    title:{
        color:'#999',
        marginTop: 30,
    },
    name:{
        marginTop: 30,
        paddingLeft:100
    },
    name1:{
        marginTop: 30,
        paddingLeft:85
    }
});

