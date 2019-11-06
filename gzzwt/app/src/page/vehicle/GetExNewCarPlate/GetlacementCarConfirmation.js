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
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'
import GlobalStyles from '../../../res/styles/GlobalStyles'
/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ data, labelName,applyingText,busText }) {
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

const  Imgurl = ({formDatas})=> {
    return (
        <View style={{backgroundColor:'#fff',marginTop:10}}>
            <View style={{paddingVertical:15,marginLeft:15}}>
                <Text style={{color:'#333333',marginBottom:10}} >交强险凭证照片</Text>
                <Image  style={styles.imgUri} resizeMode='stretch' source={{uri:formDatas.imgData}} ></Image>
            </View>
        </View>
    )
}



//缴纳费用
const PayFee = ({}) =>{
    return (
        <View>
            <View style={{marginLeft:10,marginVertical:10}}>
                <Text style={{color:'#999',}}>缴纳费用</Text>
            </View>
            <View>
                <List styles={{ Line: { borderBottomWidth: 0 } }}>
                    <List.Item multipleLine   extra={ <Text style={styles.listItemLabel}>35元</Text>} >
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
    const formDatas = props.navigation.getParam('formDatas')//车辆详情数据
    const checked = props.navigation.getParam('checked')//网点地址id
    const applyingText = props.navigation.getParam('applyingText')//申请原因文本
    const busText = props.navigation.getParam('busText')//业务类型文本
    const ressData = props.navigation.getParam('ressData')//地址
    const applyingID = props.navigation.getParam('applyingID')//申请原因ID
    const bustyID = props.navigation.getParam('bustyID')//业务类型ID(补领原因)
    const threeID = props.navigation.getParam('threeID')//邮寄ID


    
    const [info,setinfoData] = useState()

    const labelName = {
        carNo: '所有人' ,
        carType: '号牌号码',
        name: '车辆类型',
        status: '业务类型',
        carNumber: '机动车证书编号',
        date: '补领原因',   
        dateTime: '检验有效期',   
    };
    useEffect(() => {
        setinfoData({
            carNo:formDatas.belongName,
            carType:formDatas.plateNumber,
            name:formDatas.modelKindName,
            status:busText,
            carNumber:formDatas.idCode,
            date:applyingText,
            dateTime:formDatas.validDate
        })
     
    }, [])

    function onSubmitLogin() {
        console.log(threeID,11)
        console.log(bustyID,11)
        console.log(formDatas.id)
        console.log(ressData,'ressData')
        console.log(formDatas.imgData,'formDatas.uri')
        HttpUtil.post(API.VechicleApplyAddRptCertMarkApply,{
            takeWayId:threeID, //邮寄方式ID
            rptReasonId:applyingID, //补领原因
            // busTypeId:bustyID, //换证ID
            postAddress:ressData.address, //地址
            branchId:1 ,//车管所ID
            insurancePhotoUrl:formDatas.uri,
            vehicleId:formDatas.id
        })  
        .then(responseJson=>{   
            console.log(responseJson,'添加补换领机动车合格标志')
            const { code, data, msg } = responseJson.data    
            if(code === 0){ 
                NavigationUtil.navigate(props, 'ExResult',{formDatas:formDatas,busText:busText,data:data});
            }   
            }).catch(error=>{
            console.log(error,'error')
    });
        // NavigationUtil.navigate(props, 'ExResult',);
    }
    return (
        <Provider>
            <ScrollView style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                {info && <ListWrap data={info} labelName={labelName} busText={busText} applyingText={applyingText} />}
                    <PickUp ressData={ressData}/>
                    <Imgurl formDatas={formDatas} />
                    
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
    imgUri:{
        width:(GlobalStyles.window_width)/2,
        height:(GlobalStyles.window_width)/3.2,
    }
})