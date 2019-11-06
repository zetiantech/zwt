/**
 * @description 社保缴费明细
 * @author 择天团队 
*/
import React, { useState, useEffect  } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet ,TouchableOpacity,Image
} from 'react-native';
      
import { 
    Button,
    InputItem,
    List,
    Card,
    Tabs
    
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import {API} from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import NavigationUtil from 'src/util/NavigationUtil'
import GlobalStyles from 'src/res/styles/GlobalStyles'

//Tab
const TabsComponent = ({tabs, onTabsChange}) => {
    return (
        <Tabs
          initialPage={0}
          tabs={tabs}
          swipeable={true}
          useOnPan={true}
          onTabClick={(tab, index) => onTabsChange(tab,index+1) }
          renderTabBar={tabProps => (
            <View
                style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#FFFFFF'
                }}
             >
             { tabProps.tabs.map((tab, i) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={tab.key || i}
                        style={{
                            paddingVertical: 12,
                        }}
                        onPress={() => {
                            const { goToTab, onTabClick } = tabProps;
                            onTabClick && onTabClick(tabs[i], i);
                            goToTab && goToTab(i);
                        }}
                    >
                        <Text
                        style={{
                            color: tabProps.activeTab === i ? '#2F74ED' : undefined
                        }}
                        >
                        {tab.name}
                        </Text>
                        {
                            tabProps.activeTab === i && <Text style={styles.bottomLine}></Text>
                        }
                    </TouchableOpacity>
                ))}
            </View>
          )}
        >
        </Tabs>
    )
}


const Listwrap = ({listView,props,parms,userScoDetail}) => {
    return(
        <View>
            <View>      
                <View style={styles.headCard} >
                {userScoDetail &&
                    <View>
                        <View style={styles.balacewarp}>
                        <View style={styles.balaceView}>
                            <Text style={styles.textColor}>账户余额</Text>
                            <Text style={styles.balacetext}>￥{userScoDetail.endowmentTotal||0}</Text>
                        </View>  
                        <View style={styles.balaceborder}></View>
                        <View style={styles.balaceView}>
                            <Text  style={styles.textColor}>缴纳月数</Text>
                            <Text style={styles.balacenum}>{userScoDetail.ewMonthCount ||0}</Text>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.headextract} onPress={()=> NavigationUtil.navigate(props,'Socialdetial',{parms:parms})}>
                            <Text  style={styles.herdrecord||""}>查看提取记录</Text>
                            <Image style={{height:18,width:18}} ></Image>
                        </TouchableOpacity>                 
                    </View>
                </View>

                
                }
                    
                    
                </View>
            </View> 
            <View>
            {listView&&listView.map((item,i)=> (
                <View>
                <View style={styles.annual}>
                    <Text>{item.payTime}</Text>  
                    <Text style={{color:'#999'}} >合计缴纳￥{item.baseAmount}元</Text>
                </View>
                <View style={styles.annualCard}>
                    <View style={styles.annual}>
                        <Text>个人缴费</Text>
                        <Text>{item.personAmount}元</Text>
                    </View>
                    <View style={styles.annual}>
                        <Text>广州美年科技</Text>
                        <Text>{item.baseAmount}元</Text>
                    </View>
                </View>          
            </View> 
            ))  
                }
            </View>
        </View>
    )
}

export default function Deposite (props) {
    const  tabs = [
        { typeId:1,name:'养老'},
        { typeId:2,name:'医疗'},
        { typeId:3,name:'工伤'},
        { typeId:4,name:'失业'},
        { typeId:5,name:'生育'},
    ]
    const [listView,setListView] = useState()
    const [userScoDetail,setuserScoDetail] = useState()
    const [parms,setParms] = useState({
            typeId:1,
            accountId:456329571753,
            year:2019
    })
    
    function onTabsChange (tab,index) {
        console.log(tab,4444444)
        setParms({
            ...parms,
            typeId:tab.typeId
        })    
    }

    function Socialdetias() {
        HttpUtil.get(API.AccountGetOne, 
            {
                id:1,
                ...parms
            }
        ).then((data) => {
            data = data.data;
            if(data.code === 0) {
                setuserScoDetail(data.data)
                // parseData(data.data)
            }else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });  
    }
    useEffect(() => {
        RecordList()
        Socialdetias()

    }, [parms])
    console.log(parms,55555)
    function RecordList() {  
            HttpUtil.get(API.RecordList,             
                {...parms}    
            ).then(responseJson => {  
                const { code, data, msg } = responseJson.data    
                if(code == 0){ 
                    setListView(data)                                       
                }      
            }).catch(error => {
                console.log(error,'error')
            });
    }
            return (
            <View style={styles.container}>
                <NavigationBar
                    navigator={props.navigation}
                    popEnabled={true}
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    title='社保缴费明细'
                    hide={false}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                /> 
                <ScrollView style={{marginBottom:10}}>
                <TabsComponent onTabsChange={onTabsChange} tabs={tabs}/>
                <Listwrap listView={listView} props={props} parms={parms} userScoDetail={userScoDetail}/>
                </ScrollView>
            </View>
        );
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        marginBottom:10
    },
    WorksContentBox: {
    
    },
    headCard:{
        marginHorizontal:10,
        marginTop:20,
        marginBottom: 0,  
        backgroundColor:'#fff',
        borderRadius:5,
        shadowOffset: {width: 0, height: 5}, 
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd', 
    },
    herdcardWarp:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        // alignItems:'center',
        padding:30,
        paddingHorizontal:15
    },
    herdtextwarp:{
        // alignItems:'center'
    },
    herdMoney:{
        fontSize:24,
        marginTop:5,
    },
    headextract:{
        flexDirection:'row',
        justifyContent:'center'
    },
    herdrecord:{
        paddingBottom:30,
        color:'#2F74ED'
    },
    annual:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingVertical:15,
    },
    annualCard:{
        marginHorizontal: 15,
        backgroundColor:'#fff',
        borderRadius:7
    },
    balacewarp:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:25
      },
      balacetext:{
        fontSize: 20,
        marginTop: 5
      },
      balaceView:{
        alignItems:'center',
        width:(GlobalStyles.window_width)/2.5
      },
      textColor: {
        color:'#999'
      },
      balacenum:{
        fontSize: 20,
        marginTop: 5
      }, 
      balaceborder:{
      height: 50,
      borderWidth: 0.5,
      opacity: 0.1
    },
    bottomLine: {
        position: 'absolute',
        width: 20,
        height: 1,
        bottom: 0,
        left: '90%',
        marginLeft: -20,
        backgroundColor: '#2F74ED'
    },
      
      
});

