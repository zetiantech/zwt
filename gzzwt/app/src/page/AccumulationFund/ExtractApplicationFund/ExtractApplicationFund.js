/**
 * @description 公积金提取申请
 * @author 择天团队
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    Modal,
    WhiteSpace
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import {API} from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import ResultPage from '../../ResultPage'
 import ToastUtil from 'src/util/ToastUtil'
 import Form from 'src/component/FormComponent'
 import NavigationUtil from 'src/util/NavigationUtil'
import { validate } from '@babel/types';

const dataSource = require('@bang88/china-city-data');

const ExtractApplicationFund = ({data1, setData1, showData1, data2, setData2, showData2, onNextPage}) => {  
    return (
        <View>
            <WhiteSpace size="lg" />
            <Form data={data1} showData={showData1} setData={setData1} />
            <Form header="转入账户信息" data={data2} showData={showData2} setData={setData2} />
            <Button type="primary" style={styles.btnBox} onPress={onNextPage}>下一步</Button>
        </View>
    )
}

const ExtractApplicationFund2 = ({data, setData, showData, onSumbitSave}) =>{
    return (
        <View>
            <WhiteSpace size="lg" />
            <Form data={data} showData={showData} setData={setData} />
            <Text style={styles.textTip}>可提金额测算结果仅供参考，提取金额以实际到账金额为准</Text>
            <Button type="primary" style={styles.btnBox} onPress={onSumbitSave}>确定提取</Button>
        </View>
    )
}

export default function PersonalStayReport(props){

      const [userName, setUserName] = useState('')
      const [accountId, setAccountId] = useState('')
      const [idCard, setIdCard] = useState('')

      useEffect(() => {
        getUserInfo()
      }, [])

      const getUserInfo = () => {
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                console.log(responseJson,5555555555)

                const { code, data, msg } = responseJson.data
                if(code === 0){
                    setIdCard(data.idCard)
                }else{
                    NavigationUtil.navigate(props, "Login")
                }
            }).catch(error=>{
                LogUtil.debug(error)
            });
    }
    
      const getFundAccount = () => {
          HttpUtil.get(API.FUND_ACCOUNT_LIST, {
            idCard: idCard
          }).then(responseJson=>{
                  const { code, data, msg } = responseJson.data
                  if(code === 0){
                    setUserName(data[0].name)
                    setAccountId(data[0].account)
                    setParams2({...params2, payee: data[0].name})
                  }else{
                    NavigationUtil.navigate(props, "Login")
                  }
              }).catch(error=>{
                  LogUtil.debug(error)
              });
      }


      useEffect(() => {
        if(idCard && idCard!=""){
            getFundAccount()
        } 
      }, [idCard])

    const [page, setPage] = useState(0)
    const [paperworkSource, setPaperworkSource] = useState([])
    const [bankSource, setBankSource] = useState([])

    const [params1, setParams1] = useState({
        drawReasonId: [], //提取原因
        city: ['44', '4401', '440103'],//省市区 
        address: '', //住房地址  
    })

    const [params2, setParams2] = useState({
        payee: '',//收款人
        bankType: [], //开户行  
        cardId: "", //收款账户
    })

    const [params3, setParams3] = useState({
        amount: 0, // 最大可提取金额
    })

    const showData1 = {
        drawReasonId:{
            label: '提取原因',
            type: 'Picker',
            data: paperworkSource,
            attr: {
                title: '提取原因',
            }
        },
        city:{
            label: '省市区',
            type: 'Picker',
            data: dataSource,
            cols: 3,
            attr: {
                title: '省市区',
            }
        },
        address: {
            label: '住房地址',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
    }
    const showData2 = {
        payee:{
            label: '收款人',
            height: 50,
            type: 'InputItem',
            attr: {
                value: userName||"",
                textAlign: "right",
                labelNumber: 7,
                // placeholder: '请输入',
            }
        },
        bankType:{
            label: '开户行',
            type: 'Picker',
            data: bankSource,
            attr: {
                title: '开户行',
            }
        },
        cardId: {
            label: '收款账户',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                type: 'number',
                placeholder: '请输入',
            }
        },
    }

    const showData3 = {
        amount:{
            label: '最大可提取金额',
            height: 50,
            type: 'InputItem',
            attr: {
                value: params3.amount,
                type: 'number',
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        }
    }

    //提取原因   
    function onlineDrawdrawTypeList() {    
        HttpUtil.get(API.onlineDrawdrawTypeList, { 
            name: userName,
            handleType: 1             
        }).then(responseJson => { 
            const { code, data, msg } = responseJson.data    
            if(code === 0){ 
                const list = data && data.map(item=>({label: item.name, value: item.id}))
                setPaperworkSource(list)                                                             
            }     
        }).catch(error => console.log(error,'error'));
    }

    //开户行
    function bankTypeList(){
        HttpUtil.get(API.BankTypeList,{ 
            areaId: params1.city[2] || '',
            name: userName           
        }).then(responseJson => {  
            const { code, data, msg } = responseJson.data 
            if(code === 0) {
                let list = data && data.map(item=>({label: item.name, value: item.id}))
                setBankSource(list)
            }                                                                                 
        }).catch(error => console.log(error,'开户行下拉框'));
    }

    useEffect(() => {
        onlineDrawdrawTypeList()
    }, [userName])

    useEffect(() => {
        bankTypeList()
    }, [params1, userName])


    function onSumbitSave() { 
       const { city, bankType, drawReasonId, address, payee, cardId, amount} = {...params1, ...params2, ...params3}
       const shengId = city[0] + '0000'
       const shiId = city[1] + '00'
       const quId = city[2]
       const data = {
            drawReasonId: drawReasonId.join(""),
            accountId: accountId,
            shengId: shengId,
            shiId: shiId,
            quId: quId,
            address: address,
            payee: payee,
            bankType: bankType.join(""),
            cardId: cardId,
            amount: amount
       }

       if(validator.isEmpty(amount)){
           ToastUtil.toast("请输入可提取金额")
           return;
       }
       Modal.alert('提示', '首次提取公积金需至线下网点签约，暂不可在线申请提取', [              
            { text: '知道了', onPress: () => 
                addApply(data)
            },
       ]);  
   }

   function addApply(options) {
        HttpUtil.post(API.OnlineDrawAddApply, options)
            .then(responseJson => {    
            const { code, data, msg } = responseJson.data 
                if(code == 0) {
                    ToastUtil.toast(msg, 'center', 'short', ()=>{
                        NavigationUtil.navigate(props, "ResultPage", {type: 3})
                    })
                }else{
                    ToastUtil.toast(msg)
                }                                                                               
            }).catch(error => console.log('添加公积金预约----', error));
   }

   function onNextPage() {
       const { drawReasonId, city, address, payee, bankType, cardId } = {...params1, ...params2}
       if(!drawReasonId.length){
         ToastUtil.toast("提取原因不能为空")
         return;
       }else if(!city.length){
        ToastUtil.toast("省市区不能为空")
        return;
      }else if(validator.isEmpty(address)){
        ToastUtil.toast("住房地址不能为空")
        return;
      }else if(validator.isEmpty(payee)){
        ToastUtil.toast("收款人不能为空")
        return;
      }else if(!bankType.length){
        ToastUtil.toast("开户行不能为空")
        return;
      }else if(validator.isEmpty(cardId)){
        ToastUtil.toast("收款账户不能为空")
        return;
      }
      setPage(1)
   }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    title='提取申请'
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    hide={false}
                    popEnabled = {true}
                    navigator ={props.navigation}/> 
                <ScrollView>
                   { page == 0 &&  <ExtractApplicationFund 
                        data1={params1} 
                        setData1={setParams1} 
                        showData1={showData1} 
                        data2={params2} 
                        setData2={setParams2} 
                        showData2={showData2}
                        onNextPage={onNextPage}
                    />}
                    {
                        page == 1 && <ExtractApplicationFund2 
                            data={params3}
                            setData={setParams3} 
                            showData={showData3} 
                            onSumbitSave={onSumbitSave}
                        />
                    }
                </ScrollView>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30,
    },
    textTip: {
        padding: 15,
        color: '#999'
    }
});

