/**
 * @description 预约场地
 * @author 择天团队
 * 
 * **/

import React, { Component } from 'react'
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,Image,TouchableOpacity
 } from 'react-native'
 import {
    Button,
   
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'
import WeChatPays from '../../../component/WeChatPay/WeChatPays'
import {API} from '../../../api/Api'
import HttpUtil from '../../../util/HttpUtil'
import ToastUtil from 'src/util/ToastUtil'; // 轻提示



//头部场地信息
class VenueDetalls extends Component { 
    constructor(props){
        super(props)
        this.state = {
        }
    }
    _renderView () {
        const data = this.props.state.categoryMap
        const  infoView = data.map((item,index)=> {
            return (
                <Text style={{color:'#999'}}>{item.name}</Text>
            )
        }); 
        return infoView 
    }
    render() {
        const data = this.props.state
        return (
            <View >
                <View>
                <View style={{backgroundColor:'#fff',marginTop:15,marginBottom:15}} >
                    <View style={{marginHorizontal: 15,paddingVertical:20}}>           
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text>{data.name}</Text>        
                                    <View style={{flexDirection:'row',marginTop:10}}>
                                            { this._renderView () }
                                        <Text style={{color:'#999',marginLeft:10}}>{data.date}</Text>
                                        <Text style={{color:'#999',marginLeft:10}}>{data.week}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> 
            </View>       
            </View>
        )
    }
}



//状态栏
class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
        <View>
            <View style={{marginTop:5,flexDirection:'row',padding:20, backgroundColor:'#fff',borderBottomWidth:0.5,borderColor:'#E5E5E5'}}>
                <View style={{width:27,height:14,marginTop:2,backgroundColor:'#E6E6E6'}}></View>
                <Text style={{marginLeft:10}}>已订</Text>
                <View style={{width:27,height:14,marginTop:2,marginLeft:10,backgroundColor:'#2F74ED',alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../../res/images/common/dagou.png')}></Image>
                </View>
                <Text style={{marginLeft:10}}>选中</Text>
                <View style={{width:27,height:14,marginLeft:10,marginTop:2,  backgroundColor:'#E4EEFF',
        borderColor:'#2F74ED',}}></View>
                <Text style={{marginLeft:10}}>可订</Text>               
            </View>                                
        </View>       
        )
    }
    
}

//场馆列表
class ListText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTypePop:false,
            BpploingList:[],
            amount:0, //金额
            categoryId:'',                
            name:"",
            phone:"" ,   //手机号
            startTime:"",
            endTime:'',
            status:'',
            userId:'',
            venueItemId:'',
            orderNo:'',
        }
    }
    componentDidMount(){
        this.BookingSpaceList ()

        this._BookingSpaceView ()
    }
    onselectframe (item) {  
        let _this = this
            _this.setState ({
                amount:item.price||"",
                categoryId:item.categoryId||"",
                venueItemId: item.id||"",
                itemid: item.itemId||"",        
                startTime: item.startTime||"",
                endTime:item.endTime||"",
                venueId:item.venueId||"",
            
            })          
    }

    onselectPitch (item) {
        let selectView = <></>
        if(item.personNumber == 0){
            selectView = <View style={{width:50,height:24,backgroundColor:'#F5F5F5',borderRadius:5}}></View>
        }else { 
            if(item.id=== this.state.venueItemId){
                selectView =  <View  style={styles.noselectframe} >
                     <Image style={{width:25,height:25,tintColor:'#fff'}} source={require('../../../res/images/common/dagou1.png')} ></Image>
                </View>
            }else {
                selectView = <TouchableOpacity style={styles.selectframe}  onPress={()=> this.onselectframe(item)} ></TouchableOpacity>
            }
        }
    return selectView
}
    _BookingSpaceItemView (list) {
        const itemView = list.map((item, i)=>{
            const time = item.startTime.split(" ")[1].split(":").splice(0,2).join(":")
            return (
                <View style={{marginTop:10,justifyContent:'center'}}>
                    {this.onselectPitch(item)}
                </View>    
                )
        });
        return itemView
    }
    _BookingSpaceView () {
        const bookingList = this.state.BpploingList
        const bookView = bookingList.map((item,i)=> {
            return (
                <View >
                    <Text>{item.name||""}</Text>
                    {this._BookingSpaceItemView(item.validList||"")}
                </View>
            );
        })
        return bookView
    }
    //场馆场地选择
    BookingSpaceList() {
        let _this=this
        HttpUtil.post(API.VenueValidItemList, {     
            categoryId:_this.props.propState.categoryId,
            date:_this.props.propState.date,
            venueId:_this.props.propState.venueId  
        }).then(responseJson => {
            const { code, data, msg } = responseJson.data || []
            if(code == 0){
                _this.setState({
                    BpploingList:data,
                    name:this.props.propState.name||"",      //场馆名
                    phone:this.props.propState.phone||""      //场馆名
                    }         
                )                                            
            }      
        }).catch(error => {
            console.log(error,'error')
        });
    }
    //添加场馆订单
    VenueApplyAdd() {
        let _this=this
        const prams = {
            amount:_this.state.amount, //金额
            categoryId:_this.state.categoryId,       
            name:_this.state.name,
            phone:_this.state.phone ,   //手机号
            startTime:_this.state.startTime,
            endTime:_this.state.endTime,   
            venueItemId:_this.state.venueItemId
        }
        HttpUtil.post(API.VenueApplyAdd,      
            prams
        ).then(responseJson => {   
            const { code, data, msg } = responseJson.data
            if(code == 0){
                _this.setState({
                    orderNo:data.orderNo   
                    }         
                )                                            
            }else{
                ToastUtil.toast(msg||'预定失败', 'center');
            }
        }).catch(error => {
            console.log(msg,'error')
        });
    }
    //支付
    _openTypeDialog () {
        this.VenueApplyAdd()  
        this.setState({showTypePop: !this.state.showTypePop})
    }
    // propState
    render() {
        return (
        <View>
            <View style={{marginTop:15,backgroundColor:'#fff',}}>
                    <View style={{flexDirection: 'row',justifyContent:'space-between', marginTop:25,marginHorizontal:10}}>
                        <View style={{justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{paddingVertical:2}}></Text>
                            <Text style={styles.textTime}>7:00</Text>
                            <Text  style={styles.textTime}>8:00</Text>
                            <Text   style={styles.textTime}>9:00</Text>
                            <Text  style={styles.textTime}>10:00</Text>
                            <Text  style={styles.textTime}>11:00</Text>
                            <Text  style={styles.textTime}>12:00</Text>
                        </View>                   
                        { this._BookingSpaceView ()}                      
                    </View>
                    <View>
                        <Button style={{marginTop:100}} type="primary"  onPress={()=> this._openTypeDialog()}>确认选定￥{this.state.amount}</Button>
                        <WeChatPays  show={this.state.showTypePop} state={this.state}closeModal={(show) => {
                                this.setState({
                                    showTypePop: show
                                })
                        }}/>
                    </View>                   
            </View>                                 
        </View> 
          
        )
    }
    
}

export default class BookingSpace extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoryId: this.props.navigation.state.params.categoryId||"",
            date:this.props.navigation.state.params.date||"",
            venueId:this.props.navigation.state.params.venueId||"",
            categoryMap:this.props.navigation.state.params.categoryMap||"",
            name:this.props.navigation.state.params.name||"",
            week:this.props.navigation.state.params.week||"",    
            phone:this.props.navigation.state.params.phone||"",            
        }       
    } 
   render() {  
            const navigationBar = <NavigationBar
            title='预约场地'
            hide={false}
            popEnabled = {true}
            navigator ={this.props.navigation}
            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
            />;
            const venueDetalls = <VenueDetalls state={this.state}/>   
            const statusBar = <StatusBar/>   
            const listText = <ListText  propState={this.state}/>   
       return (
           <View style={styles.container} >
               <ScrollView showsVerticalScrollIndicator={false}>
                    { navigationBar }
                    {venueDetalls}
                    { statusBar }
                    { listText }
                </ScrollView>     
           </View>
       );
   }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f0f0'
    },
    selectframe:{
        width:50,
        height:24,
        borderWidth:1,
        backgroundColor:'#E4EEFF',
        borderColor:'#2F74ED',
        borderRadius:5,
        marginTop:0.5   ,
        

    },
    noselectframe:{
        
        width:50,
        height:24,
        borderWidth:1,
        backgroundColor:'#2F74ED',
        borderColor:'#2F74ED',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:0.5    ,


    },
    textTime:{
        marginVertical:8
    }
   
});