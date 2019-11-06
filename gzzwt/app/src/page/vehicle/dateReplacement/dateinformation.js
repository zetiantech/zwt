/**
 * @description 有效期换满证信息确认
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import {
    Provider,
    List,Button
} from '@ant-design/react-native';
import HttpUtil from 'src/util/HttpUtil' //接口请求
import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'
const Brief = List.Item.Brief;
/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ data, labelName }) {
    return (
        <View>
            <View style={{marginLeft:10,marginVertical:10}}>
                <Text style={{color:'#999',}}>车辆信息</Text>
            </View>
            <View style={styles.ListWrap}>
                <ScrollView>
                    <List styles={{ Line: { borderWidth: 0 } }} >
                        {
                            Object.keys(data).map((key) => {
                                return (
                                    <List.Item style={styles.listItem} extra={
                                        <Text style={styles.listItemLabel}>{data[key]}</Text>
                                    }
                                        styles={{ Line: { borderBottomWidth: 0 } }}
                                        align='top'
                                        multipleLine
                                    >
                                        <Text style={styles.listItemText}>{labelName[key]}</Text>
                                    </List.Item>
                                    
                                )
                            })
                        }
                    </List>           
                </ScrollView>          
            </View>
        </View>
    )
}

const PayFee = ({}) =>{
    return (
        <View>
            <View style={{marginLeft:10,marginVertical:10}}>
                <Text style={{color:'#999',}}>缴纳费用</Text>
            </View>
            <View>
                <List styles={{ Line: { borderBottomWidth: 0 } }}>
                    <List.Item multipleLine extra={ <Text style={styles.listItemLabel}>10元</Text>} >
                        <Text  style={styles.listItemText2}>工本费</Text>
                    </List.Item  >
                    <List.Item multipleLine extra={ <Text style={styles.listItemLabel}>35元</Text>} >
                        <Text  style={styles.listItemText2}>邮寄费</Text>
                    </List.Item  >              
                </List>
            </View>
        </View>
    )
}


//地址
const PickUp = ({ressData}) =>{
    return (
        <View>
            {  ressData&& ressData.map((item,i)=> (
                 <View>           
                 <View style={{marginLeft:10,marginVertical:10}}>
                     <Text style={{color:'#999',}}>行驶证取件信息</Text>
                 </View>
                 <View>
                     <List styles={{ Line: { borderBottomWidth: 0 } }}>
                         <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>{item.name}</Text>} >
                             <Text  style={styles.listItemText2}>收件人姓名</Text>
                         </List.Item  >
                         <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>{item.iphon}</Text>} >
                             <Text  style={styles.listItemText2}>手机号码</Text>
                         </List.Item  >
                         <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>{item.address}</Text>} >
                             <Text  style={styles.listItemText2}>收货人地址</Text>
                         </List.Item  >
                     </List>
                 </View>
             </View> 

            ))
           
             }
        </View>
    )
}


export default function dateinformation(props) {
    const params = props.navigation.getParam('params')//驾照详情数据
    const checked = props.navigation.getParam('checked')//网点地址id
    const applyingText = props.navigation.getParam('applyingText')//申请原因
    const busText = props.navigation.getParam('busText')//业务类型
    const ressData = props.navigation.getParam('ressData')//地址
    const applyingID = props.navigation.getParam('applyingID')//申请原因ID
    const bustyID = props.navigation.getParam('bustyID')//业务类型ID(补领原因)
    const threeID = props.navigation.getParam('threeID')//邮寄ID

    const [formData,setformData] = useState () //车辆详情

    const [infoData, setInfoData] = useState();
    const labelName = {
        carNo: '所有人' ,
        carType: '号牌号码',
        name: '车辆类型',
        status: '业务类型',
        carNumber: '机动车证书编号',
        date: '补领原因',   
    };
    useEffect(() => {
        //车辆详情
        HttpUtil.get(API.VehicleApplyGetOne,{id:1})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data    
                if(code === 0){   
                    console.log(data)
                    setformData(data)
                    setInfoData({
                        carNo: params.name ,
                        carType: data.plateNumber,
                        name: data.modelKindName,
                        status: busText,
                        carNumber: data.idCode,
                        date: applyingText,
                    })                    
                }   
                }).catch(error=>{
                console.log(error,'error')
        });
    }, [])
    function onSubmitLogin() {
        HttpUtil.post(API.DrivingLicenseAddApply,{
            takeWayId: threeID, //邮寄ID
            rptReasonId: applyingID, //补领原因
            busTypeId: bustyID, //换证ID
            dlId: formData.id,   
            postAddress: ressData.address, //地址
            branchId: 1         
        })  
        .then(responseJson=>{   
            console.log(responseJson,'有效期换证')
            const { code, data, msg } = responseJson.data    
            if(code === 0){ 
                const fromDatas = {...formData, busText: busText, ...data}
                NavigationUtil.navigate(props, 'dateResult',{ formData: fromDatas});
            }   
            }).catch(error=>{
            console.log(error,'error')
    });
        NavigationUtil.navigate(props, 'dateResult',);
    }
    return (
        <Provider>
            <NavigationBar title='信息确认' 
                hide={false} 
                statusBar={{barStyle: 'dark-content'}}
                popEnabled={true}
                navigator={props.navigation}
            />
            <ScrollView style={styles.container}>
                { infoData && <ListWrap data={infoData} labelName={labelName} />}
                    <PickUp ressData={ressData} />
                    <PayFee/>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>提交</Button>
            </ScrollView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItem: {
        borderBottomWidth: 0
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        // paddingTop: 10,
        // paddingBottom: 10,
        color: '#999999'
    },
    listItemText2: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
        // paddingBottom: 10,
        color: '#999999'
    },
    listItemLabel: {
        color: '#333333',
        fontSize: 16,
        flex: 2.5
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20,
    }
})