/**
 * @description 自愿账户汇缴-公积金业务
 * @author ct
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
    Provider,Toast,Modal,DatePicker
 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import dayjs from 'dayjs' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import { CurentTime, cureentTimeToDay, cureentTime } from 'src/util/DateUtil'




 /*** 
 * 公交金-自愿账户汇缴
 * name-姓名, papersType-证件类型, papersNumber-证件号码,depositeAccount-公积金账号, 
 * depositeCarnumber-缴存基数  perageRatio-缴存比例   monthFunds-月缴余额 lastTime-上次缴存年月,
 * paymentName-付款名称,  paymentBank-付款银行, paymentAccount-付款账号, 
*/
export default function TransferTheBooking  (props) {
    const [formData,setFormData] = useState({
        name: '',              
        papersType:'',
        papersNumber:'',
        depositeAccount:'',
        depositeCarnumber:'',
        perageRatio: '',
        monthFunds:'',
        lastTime:'',
        paymentName:'',
        paymentBank:'',
        paymentAccount:"",
        depositeCause:'',
        entrustMoney:''
    })
    const [monthsSum,setmonthsSum] = useState() //月缴余额
    const [depositeCause,setdepositeCause] = useState([
        {value:'1',label:'卡号遗失'},
        {value:'2',label:'未满年龄'}
    ]
   
    ) //补缴原因
    /**
     * 计算缴存金额
     * 缴存基数*缴存比例=月缴余额
     */
    function depositeMoney(){
        if (formData.depositeCarnumber!=""&&formData.perageRatio!="") {
        let monthFunds = JSON.stringify(Math.abs(formData.depositeCarnumber*formData.perageRatio))||""
        setmonthsSum(monthFunds)
        }    
    }
    useEffect(() => {
        depositeMoney()
    }, [formData,monthsSum])


    useEffect (()=>{
        //获取汇缴用户信息
        HttpUtil.get('http://192.168.10.58:8830/fund/accountRemit/echoBaseInfo',          
            {accessToken:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2Iiwic3ViIjoie1wiY3JlYXRlVGltZVwiOjE1NzI4NTI5MDIwMDAsXCJnZW5kZXJcIjowLFwiaWRcIjo2LFwiaXNBY3RpdmVcIjoxLFwiaXNDZXJ0aWZ5XCI6MCxcImlzRmluZ2VycHJpbnRcIjowLFwibmFtZVwiOlwi5pa55a-SXCIsXCJwYXNzd29yZFwiOlwiRE8yb01pNWRsWkZNb2RxdnpzM2xwTUlmbWM3RlIyeVplNWh4YXloSXZxQT1cIixcInBob25lXCI6XCIxMzA4ODg3MDczMVwiLFwicGhvdG9VcmxcIjpcImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MDgxODI5ODMzMyZkaT1jNzZlMzkzYTUyODkxZjlhYTQ2OWY1NjUzNzI2NGI4ZSZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZpbWczLmR1aXRhbmcuY29tJTJGdXBsb2FkcyUyRmJsb2clMkYyMDE2MDElMkYyNSUyRjIwMTYwMTI1MTk1NDM4X1Z4ZXloLnRodW1iLjcwMF8wLmpwZWdcIixcInVwZGF0ZVRpbWVcIjoxNTcyODUyOTAyMDAwfSIsImlzcyI6InpldGlhbl96d3QiLCJpYXQiOjE1NzI4NTMyMDN9.e2blxMrBr_dh7NrFvppBlNIPbDtSNyAa7-2poy3g530'} 
        ).then(responseJson=>{       
            const { code, data, msg } = responseJson.data   
            if(code === 0){
                console.log(data,55555)
                setFormData({
                    ...formData, 
                    name: data.name,
                    papersType:data.idType,
                    papersNumber:data.idCard,               
                    depositeAccount:data.account,               
                })

            }  
            }).catch(error=>{  
                console.log(error,'error')
        }); 
    },[])

    //提交
    function onClickbtn () {
        if (formData.name==''||formData.name==undefined) {
            ToastUtil.toast('获取个人数据失败')   
            return  
        }
        if (formData.papersType==''||formData.papersType==undefined) {
            ToastUtil.toast('获取证件类型失败')   
            return  
        }
        if (formData.papersNumber==''||formData.papersNumber==undefined) {
            ToastUtil.toast('获取证件号码失败')   
            return  
        }
        if (formData.depositeAccount==''||formData.depositeAccount==undefined) {
            ToastUtil.toast('获取公积金账号失败')   
            return  
        }
        if (formData.depositeCarnumber==''||formData.depositeCarnumber==undefined) {
            ToastUtil.toast('请输入缴存基数')   
            return  
        }
        if (formData.perageRatio==''||formData.perageRatio==undefined) {
            ToastUtil.toast('请输入缴存比例')   
            return  
        }
        if (formData.depositeCarnumber==''||formData.depositeCarnumber==undefined) {
            ToastUtil.toast('请输入缴存基数')   
            return  
        }
        if (formData.lastTime==''||formData.lastTime==undefined) {
            ToastUtil.toast('请选择上次缴存年月')   
            return  
        }
        if (formData.paymentName==''||formData.paymentName==undefined) {
            ToastUtil.toast('请输入付款名称')   
            return  
        }
        if (formData.paymentBank==''||formData.paymentBank==undefined) {
            ToastUtil.toast('请输入付款银行')   
            return  
        }
        if (formData.paymentAccount==''||formData.paymentAccount==undefined) {
            ToastUtil.toast('请输入付款账号')   
            return  
        }
        //获取汇缴用户信息
        HttpUtil.post('http://192.168.10.58:8830/fund/accountPayFees/add',          
            {accessToken:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2Iiwic3ViIjoie1wiY3JlYXRlVGltZVwiOjE1NzI4NTI5MDIwMDAsXCJnZW5kZXJcIjowLFwiaWRcIjo2LFwiaXNBY3RpdmVcIjoxLFwiaXNDZXJ0aWZ5XCI6MCxcImlzRmluZ2VycHJpbnRcIjowLFwibmFtZVwiOlwi5pa55a-SXCIsXCJwYXNzd29yZFwiOlwiRE8yb01pNWRsWkZNb2RxdnpzM2xwTUlmbWM3RlIyeVplNWh4YXloSXZxQT1cIixcInBob25lXCI6XCIxMzA4ODg3MDczMVwiLFwicGhvdG9VcmxcIjpcImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MDgxODI5ODMzMyZkaT1jNzZlMzkzYTUyODkxZjlhYTQ2OWY1NjUzNzI2NGI4ZSZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZpbWczLmR1aXRhbmcuY29tJTJGdXBsb2FkcyUyRmJsb2clMkYyMDE2MDElMkYyNSUyRjIwMTYwMTI1MTk1NDM4X1Z4ZXloLnRodW1iLjcwMF8wLmpwZWdcIixcInVwZGF0ZVRpbWVcIjoxNTcyODUyOTAyMDAwfSIsImlzcyI6InpldGlhbl96d3QiLCJpYXQiOjE1NzI4NTMyMDN9.e2blxMrBr_dh7NrFvppBlNIPbDtSNyAa7-2poy3g530',
                name:formData.name,
                idType:1,
                idCard:formData.papersNumber,
                account:formData.depositeAccount,
                depositeBaseAmount:formData.depositeCarnumber,
                depositeRatio:formData.perageRatio,
                monthDepositeAmount:monthsSum||"",
                lastDepositeTime: dayjs(formData.lastTime).format('YYYY-MM-DD hh:mm:ss'),
                paymentName:formData.paymentName,
                paymentBank:formData.paymentBank,
                paymentAccount:formData.paymentAccount,
                depositeCause:formData.depositeCause.join('')||"",
                entrustMoney:formData.entrustMoney,           
                }     
            ).then(responseJson=>{       
                console.log(responseJson,88888888888)
                const { code, data, msg } = responseJson.data   
                if(code === 0){   
                    NavigationUtil.navigate(props, 'ResultPage', { type: 2 })
                }  
                }).catch(error=>{  
                    console.log(error,'error')
        });              
    }
    // console.log(formData,6666666666)  
        return (
            <View style={styles.container}>
                <NavigationBar 
                    title= '自愿账户汇缴' 
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    hide={false} 
                    popEnabled={true}  
                    navigator ={props.navigation}/>
                <Provider>
                <ScrollView
                    style={{ flex: 1, }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    
                    <Text style={styles.listTitle} >基本信息</Text>
                   
                    <List>       
                        <InputItem
                            type="text"
                            value={formData.name}
                            onChange={(val)=>setFormData({...formData, name: val})}
                            labelNumber={8}
                            textAlign='right'
                        >
                            姓名
                        </InputItem>                      
                        <InputItem
                            type="text"
                            value={formData.papersType}
                            onChange={(val)=>setFormData({...formData, papersType: val})}
                            labelNumber={8}
                            textAlign='right'
                        >
                            证件类型
                        </InputItem>
                        <InputItem
                            type="number"
                            value={formData.papersNumber}
                            onChange={(val)=>setFormData({...formData, papersNumber: val})}
                            textAlign='right'
                        >
                            证件号码
                        </InputItem>
                        <InputItem
                            labelNumber={8}
                            type="text"
                            value={formData.depositeAccount}
                            onChange={(val)=>setFormData({...formData, depositeAccount: val})}
                            textAlign='right'
                        >
                            公积金账号
                        </InputItem>
                        <InputItem
                            type="number"
                            value={formData.depositeCarnumber}
                            onChange={(val)=>setFormData({...formData, depositeCarnumber: val})}
                            textAlign='right'
                            placeholder='请输入金额'
                        >
                            缴存基数
                        </InputItem>
                        <InputItem
                            type="number"
                            value={formData.perageRatio}
                            onChange={(val)=>setFormData({...formData, perageRatio: val})}
                            textAlign='right'
                            placeholder='请输入0.5-1.2之间的值'
                        >
                            缴存比例
                        </InputItem>
                        <InputItem
                            labelNumber={8}
                            type="number"
                            value={monthsSum}
                            textAlign='right'
                            editable={false}//不可编辑
                        >
                            月缴余额(元)
                        </InputItem>
                        <DatePicker
                            value={formData.lastTime}
                            mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2010, 7, 6)}
                            maxDate={new Date}
                            onChange={(val)=>setFormData({...formData, lastTime: val})}
                            format="YYYY-MM-DD"
                            >
                            <List.Item arrow="horizontal">上次缴存年月</List.Item>
                        </DatePicker>                  
                    </List>

                    <Text style={styles.listTitle} >托收信息</Text>
                    <List>       
                        <InputItem
                            type="text"
                            value={formData.paymentName}
                            onChange={(val)=>setFormData({...formData, paymentName: val})}
                            labelNumber={8}
                            textAlign='right'
                        >
                            付款名称
                        </InputItem>                      
                        <InputItem
                            type="text"
                            value={formData.paymentBank}
                            onChange={(val)=>setFormData({...formData, paymentBank: val})}
                            labelNumber={8}
                            textAlign='right'
                        >
                            付款银行
                        </InputItem>
                        <InputItem
                            type="bankCard"
                            value={formData.paymentAccount}
                            onChange={(val)=>setFormData({...formData, paymentAccount: val})}
                            textAlign='right'
                        >
                            付款账号
                        </InputItem>                 
                    </List>              
        
                <View>                    
                        <Text style={styles.listTitle} >补缴信息</Text>
                    <List> 
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={depositeCause}
                            value={formData.depositeCause}
                            onChange={(val)=>setFormData({...formData, depositeCause: val})}
                        >
                            <List.Item arrow="horizontal">补缴原因</List.Item>
                        </Picker>                                                 
                        <InputItem
                            labelNumber={8}
                            type="number"
                            value={formData.entrustMoney}
                            onChange={(val)=>setFormData({...formData, entrustMoney: val})}
                            textAlign='right'
                        >
                            补缴委托金额
                        </InputItem>                
                    </List>
                </View> 

                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={()=> onClickbtn()} >提交</Button>
                    </List>              
                </ScrollView>
            </Provider>
            </View>
        )
}
const styles = StyleSheet.create({
    input: {
        width:200,
        fontSize:16,
        marginRight: 100,
    },
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
    msgTip: {
        color: '#999'
    },
    text1:{
        color: '#999',
        lineHeight:25

    },
    text2:{
        color: '#999',
        lineHeight:25

    },
    containertext:{
        textAlign:'center',
        marginLeft:20,
        marginRight:10,
        
    },
    listTitle:{
        paddingVertical:8,
        marginLeft:10,
         color:'#999'
    }
});

