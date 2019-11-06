/**
 * @description 场地详情
 * @author 择天团队
 * 
 * **/

import React, { Component } from 'react'
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,TouchableHighlight,ImageBackground,Image,TextInput,TouchableOpacity,Dimensions
 } from 'react-native'
 import {
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    Flex
   
 } from '@ant-design/react-native';

import NavigationBar from '../../../common/NavigationBar'
import TabsComponent from '../../../component/TabsComponent'
import {API} from '../../../api/Api'
import HttpUtil from '../../../util/HttpUtil'


//场地信息
class VenueDetalls extends Component {
    constructor(props){
        super(props)
    }
    _renderScroll () {
        //获取屏幕宽高
        const { height, width } =  Dimensions.get('window');
        const { photosUrl } = this.props.detail
        const urlArr = photosUrl && photosUrl.split(",") || []
        let imgView = urlArr.map((item, i)=>{
            return (
                <Image style={{ width:width, height:200}} source={{uri: item}} ></Image>
            );
        })
        return imgView  
    }
    _renderText () {
        const { categoryName } = this.props.detail  
        const categoryNameArr = categoryName && categoryName.split(",") || []
        let textView = categoryNameArr.map((item,i) => {
            return (
                <Text style={{color:'#FFC263',borderColor:'#FFC263', borderWidth:0.5,padding:2.5, width:35,height:25,marginTop:5,marginRight:5,borderRadius:5}}>{item}</Text>
            )
        })
        return textView
    }    
    render() { 
        return (
            <View >  
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >                                    
                        {this._renderScroll()} 
                </ScrollView>
                <View style={{backgroundColor:'#fff', }} >
                    <View style={{marginHorizontal: 15,paddingVertical:20}}>           
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text>{this.props.detail.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        {this._renderText()}
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:15}}>
                                        <Image source={require('../../../res/images/weizhi.png')}></Image>
                                        <Text style={{color:'#999',marginLeft:10}}>{this.props.detail.address}</Text>
                                    </View>
                                </View>
                            </View> 
                            <View>
                                <Image style={{marginRight:20,width:20,height:20}} source={require('../../../res/images/iphone.png')}></Image>
                            </View>
                        </View>
                    </View>
                </View>   
            </View>
        )
    }
}
//Tab
class PersonalWorkContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            tabs: [], 
        }
    }
    componentDidMount(){
    }
    // 场馆分类列表
    onChange (){
        
    }

    render() {
        const tabs = this.props.detail.categoryMap
        return (
            <View style={styles.WorksContentBox}>
                
                <TabsComponent tabs={tabs} onPress={this.onChange.bind(this)}></TabsComponent> 
                {
                        this.state.currentIndex == 0 && <ListText  {...this.props} detail={this.props.detail} />
                }
                {/* {
                    this.state.currentIndex == 1 && <ProcessComponent />
                }
                {
                    this.state.currentIndex == 2 && <ApplyComponent />
                } */}
            </View>
        );
    }
}

//场地列表
class ListText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id"),
            data:[],
        }
    }
    componentDidMount(){
        this.venueCategoryList()
    }
    //预约场地，可预约列表
    //  HttpUtil(请求路径，参数)。then((响应结果)=>{ 渲染 })
    venueCategoryList() { 
        let date1 = new Date(),
        time1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate() + " " +(date1.toLocaleTimeString());//time1表示当前时间
        let date2 = new Date(date1);
        date2.setDate(date1.getDate() + 7)
        let time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()+ " " +(date1.toLocaleTimeString()); 
        const parms = {
            venueId:this.state.id,
            categoryId:1,
            startTime:time1, 
            endTime:time2,  
        }
        let _this=this
        HttpUtil.post(API.VenueValidICateGoryList, 
            parms   
        ).then(responseJson => {
            const { code, data, msg } = responseJson.data
            if(code == 0){
                console.log(data,'预定场馆信息')
                _this.setState({
                    data:data
                    }         
                )                                            
            }      
        }).catch(error => {
            console.log(error,'error')
        });
     }
    _renderView () {
        const detail = this.props.detail
        console.log(detail.categoryMap)
        const data = this.state.data
        const infoView = data.map((item,i)=> {
            return (     
                <TouchableOpacity  onPress={()=>{
                    this.props.navigation.navigate("BookingSpace",
                    {   categoryId:item.categoryId,
                        date:item.date,
                        venueId:item.venueId,
                        week:item.week,
                        categoryMap:detail.categoryMap,
                        name:detail.name,
                        phone:detail.phone,                                                             
                    })
                }}  style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15,borderBottomWidth:0.5,borderColor:'#999'}}>
                    <View style={{marginLeft:25}}>
                        <Text>{item.week}</Text>
                        <Text>{item.date}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginRight:25}}>
                        <Text>{item.count}</Text>
                        <Image style={{width:25,height:25}} source={require('../../../res/images/ic_tiaozhuan2x.png')}></Image>
                    </View>                
                </TouchableOpacity> 
            );
        })
        return infoView   
    }
    render() {
        return (
            <View>
                <ScrollView>           
                    { this._renderView()}           
                </ScrollView>
            </View>
          
        )
    }
    
}
export default class VenueDetails extends Component {
        constructor(props){
            super(props)
            this.state = {
                id: this.props.navigation.getParam("id")||"", 
                detailData: {}
            }              
        }
        componentWillMount(){
            let _this = this
            HttpUtil.get(API.VenueDetail,{
                id:this.state.id

            }).then(responseJson => {   
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    console.log(data,'场馆详情')
                   _this.setState({
                     detailData: data || {}
                   });                                          
                }      
            }).catch(error => {  
                console.log(error,'error')
            });

        }
        
        render() {
            const navigationBar = <NavigationBar
                title='场馆详情'
                hide={false}
                popEnabled = {true}
                navigator ={this.props.navigation}
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                />;
            const personalWorkContent = <PersonalWorkContent {...this.props} detail={this.state.detailData}/>   
            const venueDetalls = <VenueDetalls detail={this.state.detailData}/>   
       return (
           <View style={styles.container} >
               <ScrollView showsVerticalScrollIndicator={false}>
                    { navigationBar }
                    { venueDetalls }
                    { personalWorkContent }   
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
    searchInputBox: {
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:30,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15:20,
        borderWidth: 1,
        width:300,
        backgroundColor:'#fff'

    },
    searchIcon: {
        position: "absolute",
        top: 7,
        left: 12,
        width: 20,
        height: 20,
        tintColor:'#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:40,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 12,
        color: '#999',
    },
    WorksContentBox: {
        // flex:1,
        marginTop:15,
        backgroundColor: '#ffffff'
    },
    textTow:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#fff',
        // flex:1,
        height:50
      },
    click:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#F4F5FF',
        // flex:1,
        height:50,
    },
    textClick:{
        textAlign:'center',
        lineHeight:25,
        marginHorizontal:15,
        color:'#2F74ED'
    }

});