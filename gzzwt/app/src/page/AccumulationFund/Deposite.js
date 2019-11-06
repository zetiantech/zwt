/**
 * @description 公积金缴存信息
 * @author 择天团队 
*/
import React, { Component, useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet ,TouchableOpacity,Image
} from 'react-native';

import ToastUtil from 'src/util/ToastUtil'
import NavigationBar from 'src/common/NavigationBar' 
import {API} from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';


const AccountBalance = ({data, props}) => {
      return (
        <View style={styles.hearCard} >
              <View style={styles.balacewarp}>
                  <View style={styles.balaceView}>
                      <Text style={styles.textColor}>账户余额</Text>
                      <Text  style={styles.balacetext}>￥{data.amountTotal||'0.00'}</Text>
                  </View>  
                  <View style={styles.balaceborder}></View>
                  <View style={styles.balaceView}>
                      <Text  style={styles.textColor}>月缴余额</Text>
                      <Text style={styles.balacenum}>￥{data.monthAmount||'0.00'}</Text>
                  </View>
              </View>
              <View >
                  <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={()=>{
                      NavigationUtil.navigate(props, 'DepositeDetail', { typeId:1 })
                    }}                                 
                  style={styles.balacedetailwarp}>
                      <Text  style={styles.balacedetailText}>查看缴存明细</Text>
                      <Image style={styles.balaceImg} source={require('src/res/images/ic_tiaozhuan2x.png')}></Image>
                  </TouchableOpacity>                 
              </View>
        </View>
      )
}

const AccountCard = ({data}) =>{
      return (
        <View style={styles.depositewarp} >
            <View style={styles.deponsiView}>
              <Text style={styles.textColor}>缴存基数</Text>
              <Text style={styles.textFontSize}>￥{data.baseAmount||'0.00'}</Text>
            </View>
            <View style={styles.deponsiView}>
              <Text style={styles.textColor}>单位缴存</Text>
              <View style={{alignItems:'center'}}>
                  <Text style={styles.textFontSize}>￥{(data.amountTotal-(data.monthAmount*data.ratio))||'0.00'}</Text>
                  <Text style={styles.textColor1}>缴存比例{data.ratio}%</Text>
              </View>                  
            </View>
            <View style={styles.deponsiView}>
              <Text style={styles.textColor}>个人缴存</Text>        
              <View style={styles.deponsText}>
                  <Text style={styles.textFontSize}>￥{(data.monthAmount*data.ratio)||'0.00'}</Text>
                  <Text style={styles.textColor1}>缴存比例{data.ratio}%</Text>
              </View>
            </View>  
        </View>
      )
}

const AccountUserName = ({data, labelName}) => {
   return (
      <View style={styles.footerwarp} >
          {
             Object.keys(labelName).map((key)=>(
                <View style={styles.footerView}>
                  <Text style={styles.textColor}>{labelName[key]||''}</Text>
                  <Text style={styles.textFontSize}>{data[key]||'-'}</Text>
                </View>
             ))
          }
      </View>
   )
}

export default function Deposite(props){

    const [data, setData] = useState({})
    const [infoData, setInfoData] = useState({
      name: '-',
      account: '-',
      companyName: '-',
      idCard: '-',
      statusName: '-',
      offlineSignedName: '-'
    })

    useEffect(() => {
      getAccount()
    }, [])

    const labelName = {
      name: '姓名',
      account: '公积金账号',
      companyName: '单位名称',
      idCard: '个人编号',
      statusName: '个人账户类型',
      offlineSignedName: '缴存类型'
    }

    function getAccount(){
       HttpUtil.get(API.AccountGetOne, {
         id: 1
       }).then(responseJson=>{
          const { code, data, msg } = responseJson.data
          if(code == 0){
             setData(data)
             setInfoData({...infoData, ...data})
          }else{
             ToastUtil.toast(msg)
          }
       })
    }

    return (
      <View style={styles.container}>
          <NavigationBar 
            title='缴存信息' 
            hide={false} 
            popEnabled={true} 
            navigator={props.navigation}
            statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
          />
          <ScrollView>
              <AccountBalance data={data}  props={props}/>
              <AccountCard data={data} />
              <AccountUserName  data={infoData} labelName={labelName}/>
          </ScrollView>
      </View>
      
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    hearCard:{
      margin: 15,
      marginBottom: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      // elevation:1,
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: '#f0f0f0'
    },
    balacewarp:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30
    },
    balacetext:{
      fontSize: 24,
      marginTop: 5
    },
    balacenum:{
      fontSize: 24,
      marginTop: 5
    },
    balaceborder:{
      height: 50,
      borderWidth: 0.5,
      opacity: 0.1
    },
    balacedetailwarp:{
      flexDirection:'row',
      justifyContent:'center',
    },
    balaceView:{
      alignItems:'flex-end'
    },
    balacedetailText:{
      paddingBottom:30,
      color:'#2F74ED',
    },
    balaceImg:{
      height: 18,
      width: 18,
      tintColor: '#999'
    },
    depositewarp:{
      margin: 15,
      backgroundColor: '#fff',
      borderRadius: 5,
      // elevation: 1,
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: '#f0f0f0',
    },
    deponsiView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginVertical: 20
    },
    deponsText:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerwarp:{
      margin: 15,
      marginTop: 0,
      paddingVertical: 20,
      backgroundColor:'#fff',
      borderRadius: 5,
      // elevation: 1.5,
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: '#f0f0f0',
    },
    footerView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginVertical: 5,
    },
    textColor: {
      color:'#999'
    },
    textColor1: {
      color:'#666'
    },
    textFontSize: {
      fontSize:16
    }
    
 
});

