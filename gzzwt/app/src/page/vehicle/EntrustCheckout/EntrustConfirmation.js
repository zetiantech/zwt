/**
 * @description 委托核发动机合格标志信息确认
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
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
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
                <Text style={{color:'#999',}}>房屋状态</Text>
            </View>
            <View>
                <List styles={{ Line: { borderBottomWidth: 0 } }}>
                    <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>10元</Text>} >
                        <Text  style={styles.listItemText2}>工本费</Text>
                    </List.Item  >
                    <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>35元</Text>} >
                        <Text  style={styles.listItemText2}>邮寄费</Text>
                    </List.Item  >              
                </List>
            </View>
        </View>
    )
}


//地址
const PickUp = ({addRessIdData}) =>{
    return (
        <View>
            {  addRessIdData&& addRessIdData.ressData.map((item,i)=> (
                 <View>           
                 <View style={{marginLeft:10,marginVertical:10}}>
                     <Text style={{color:'#999',}}>合格标志取件信息</Text>
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
    const formImgData = props.navigation.getParam('formImgData')||''//
    const parmsID = props.navigation.getParam('parmsID')||''//
    const parmsText = props.navigation.getParam('parmsText')|| ''//
    const addRessIdData = props.navigation.getParam('addRessIdData')|| ''//



    const [formData,setformData] = useState () //车辆详情

    const [infoData, setInfoData] = useState();
    const labelName = {
        carNo: '所有人' ,
        carType: '号牌号码',
        name: '车辆类型',
        status: '业务类型',
        carNumber: '机动车证书编号',
        date: '补领原因',   
        dataTime: '检验有效期',   
    };
    
    // console.log(formImgData,111111111)
    // console.log(parmsID,222222222)
    // console.log(parmsText,33333333)
    // console.log(addRessIdData,4444444)
    useEffect(() => {
        //车辆详情
        HttpUtil.get(API.VehicleApplyGetOne,{id:1})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data    
                if(code === 0){   
                    // console.log(data)
                    setformData(data)
                    setInfoData({
                        carNo: formImgData.belongName , //所有人
                        carType: data.plateNumber,      //号牌号码
                        name: data.modelKindName,       //车辆类型
                        status: parmsText.busText,      //业务类型
                        carNumber: data.idCode,         //机动车证书编号
                        date: parmsText.applyingText,   //补领原因
                        dataTime: data.validDate,       //检验有效期
                    })                    
                }   
                }).catch(error=>{
                console.log(error,'error')
        });
    }, [])
    
    function onSubmitLogin() {
    // console.log(parmsID.threeID)
    // console.log(addRessIdData.ressData[0].address)
    // console.log(parmsID.applyingID)
    // console.log(formImgData.img4)
    // console.log(formImgData.img3)
    // console.log(formImgData.img2)
    // console.log(formImgData.img1)
        HttpUtil.post(API.VechicleApplyaddEiCertMarkApply,{
            takeWayId:parmsID.threeID, //邮寄ID
            branchId:1,         
            postAddress:addRessIdData.ressData[0].address, //地址
            rptReasonId:parmsID.applyingID, //补领原因
            vehicleId:1,
            entrustCertMarkPhotoUrl:formImgData.img4,     //4
            safeCertPhotoUrl:formImgData.img3,     //3
            taxProvePhotoUrl:formImgData.img2,            //2
            insurancePhotoUrl:formImgData.img1,           //1
        })  
        .then(responseJson=>{   
            console.log(responseJson,'委托核弹发动机')
            const { code, data, msg } = responseJson.data    
            if(code === 0){ 
                NavigationUtil.navigate(props, 'EntrustResult',{formImgData:formImgData,parmsText:parmsText,data:data});
            }   
            }).catch(error=>{
            console.log(error,'error')
    });
    }
    return (
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                {infoData && <ListWrap data={infoData} labelName={labelName} />}
                    <PickUp addRessIdData={addRessIdData}/>
                    <PayFee/>
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>提交</Button>
                </View>
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
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
})