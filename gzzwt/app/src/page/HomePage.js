/**
 * @description 首页页面
 * @author 择天团队
 * 
 * **/

import React, { Component } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   ScrollView,
   ImageBackground,
   Image,
   TextInput,
   TouchableOpacity,
   Platform,
   StatusBar
} from 'react-native'
import GlobalStyles from 'src/res/styles/GlobalStyles'

import { 
    Flex,
    List,
 } from '@ant-design/react-native';

import LinearGradient from 'react-native-linear-gradient';

import NavigationUtil from 'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'
import SwiperComponent from 'src/component/SwiperComponent';

import { Auth } from 'src/common/Auth' 


//搜索框
class SearchInput extends Component {
    render() {
        let inputView =
            <View style={styles.searchInputBox}>
                <Image style={styles.searchIcon} source={require('../res/images/ic_searc.png')} />
                <TextInput
                    ref="input"
                    style={styles.textInput}
                    autoFocus={false}
                    underlineColorAndroid="white"
                    placeholder="搜索业务"
                    placeholderTextColor="#999"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    onChangeText={(inputKey) => this.setState({inputKey})}
                ></TextInput>
            </View>;
        return (
            <View style={styles.searchInputBody}>
                {inputView}
            </View>
        );
    }
}
//
class BackgroundTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const img = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570785760177&di=5656e3a83581a92dbdb58ad38f7c6335&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190923%2Fc89866bc22c1402a98862e4b9ba4b44b.jpeg"]
        const searchInput = <SearchInput/>
        const swiperComponent = <SwiperComponent swiper={img} style={{height: 160}} />
        return (
         <View>
            <View>
                <View style={{flex:1,flexDirection:'row', justifyContent:'space-between',backgroundColor:'#2F74ED',paddingVertical:10,}}>
                    <View style={{marginTop:10,marginLeft:10, color:'#fff'}}>
                        <Text style={{color:'#fff'}}>广州</Text>   
                    </View>
                    <View style={{marginTop:10,marginRight: 5,flexDirection:'row'}}>
                        <Image style={{tintColor:'#fff',width:18,height:18,marginRight:4}} source={require('../res/images/taiyang.png')} ></Image>    
                        <Text style={{color:'#fff'}}>28°C</Text>
                    </View>
                    {searchInput}
                    <View style={{marginTop:8,marginRight:10}}>
                        <Image style={{tintColor:'#fff',width:22,height:22}} source={require('../res/images/lingdang.png')}></Image>
                    </View>
                </View>
            </View>
            <View>
                {swiperComponent}
            </View>
         </View>   
        )
    }
    
}
//Icon宫格
class IconBusiness extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const iconData = [
            { 
                id: '1',
                name: '社保查询',
                icon: require('../res/images/home/icon_shebao.png'),
                handler: (props)=>{
                    NavigationUtil.navigate(this.props, 'SocialSecurityindex')
                    // NavigationUtil.navigate(this.props, 'DetaineesFamiliesPay')
                }
            },
            { 
                id: '2',
                name: '公积金查询',
                icon: require('../res/images/home/icon_gongjijin.png'),
                handler: (props)=>{
                    NavigationUtil.navigate(this.props, 'AccumulationFundindex')
                }
            },
            { 
                id: '3',
                name: '医院挂号',
                icon: require('../res/images/home/icon_yiyuan.png'),
                handler: (props)=>{
                    NavigationUtil.navigate(this.props, 'SubscribeRegist')
                }
            },
            { 
                id: '4',
                name: '驾照换新',
                icon: require('../res/images/home/icon_jiazhao.png'),
                handler: (props)=>{
                    NavigationUtil.navigate(this.props,'drivingLicenceIndex')
                }
            },
            { 
                id: '5',
                name: '违章查询',
                icon: require('../res/images/home/icon_weizhang.png'),
                handler: ()=>{
                    NavigationUtil.navigate(this.props,'MotorVehicle')
                }
            },
            { 
                id: '6',
                name: '居住证',
                icon: require('../res/images/home/icon_jzz.png'),
                handler: ()=>{
                    // NavigationUtil.navigate(this.props, 'WorkPage')
                    console.log(1)
                }
            },
            { 
                id: '7',
                name: '结婚登记',
                icon: require('../res/images/home/icon_jh.png'),
                handler: ()=>{
                    NavigationUtil.navigate(this.props, 'MarriageAppointment', {type: 1})
                    // 是否登录
                    Auth.isLogin(this.props, ()=>{
                        // 是否解锁 true-解锁 false-未解锁
                        if(!global.lock){
                            // 是否实名认证
                            if(global.isRealName){
                                // 进入授权页面
                                NavigationUtil.navigate(this.props, 'MarriageAppointment', {type: 1})
                            }else{
                                NavigationUtil.navigate(this.props, 'Verified')
                            }
                        }else{
                            NavigationUtil.navigate(this.props, 'LockMode')
                        }
                    })
                }
            },
            { 
                id: '8',
                name: '全部',
                icon: require('../res/images/home/icon_all.png'),
                handler: ()=>{
                    NavigationUtil.navigate(this.props, 'AllServer')
                }
            }
        ]
        return (
            <View style={{marginVertical: 10}}>
                <View style={styles.iconBox}>
                    {
                        iconData.map((item, index)=>(
                            <TouchableOpacity key={index} style={styles.iconTouch} onPress={item.handler} >
                                <View style={styles.ImageView}>
                                    <Image source={item.icon} style={styles.iconSize}/>
                                </View>
                                <Text style={styles.textIcon}>{item.name}</Text>
                            </TouchableOpacity> 
                        ))
                    }
                </View>      
            </View>
        )
    }
}

/**
 * @description 公用标题公共组件
 * @author Jonne
 */
class TitleCommonComponent extends Component {
    constructor(props){
      super(props)
    }
    render(){
     const bottomColor = `rgba(134, 106, 255, ${1})`
     const maskColor = `rgba(47, 116, 237, ${1})`
      return (
         <List 
            styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}
          >
              <List.Item 
                styles={{Line: {borderBottomWidth: 0}}}
                arrow={this.props.iconHidden?'':'horizontal'}
                extra={
                    <>
                        {  !this.props.image && 
                            <TouchableOpacity style={styles.NavBox} onPress={this.props.onPress}>
                                <Text style={{fontSize: 13, color: '#cccccc'}}>{this.props.more}</Text>
                            </TouchableOpacity>
                        }
                        { this.props.image && 
                            <TouchableOpacity style={styles.NavBox} onPress={this.props.onPress}>
                                <Text style={{fontSize: 13, color: '#cccccc'}}>{this.props.more}</Text>
                                <Image source={this.props.image} style={styles.NavIcon} />
                            </TouchableOpacity>
                        }
                    </>
                }
              >
                <LinearGradient 
                  colors={[maskColor, bottomColor]} 
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} 
                  locations={[0, 0.75]} 
                  style={styles.linearGradient}>
                </LinearGradient>
                <Text style={{marginLeft: 8, fontSize: 16}}>{this.props.title}</Text>
              </List.Item>
          </List>
      );
    }
}

//便民服务
class PersonCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {          
        }
    }
    render() {
        return (
            <View>
               <Flex style={styles.serverBox}>
                    <Flex.Item style={styles.serverItem}>
                        <ImageBackground 
                            resizeMode='stretch'
                            source={require('../res/images/home/yuyue.png')} 
                            style={styles.ImageBackground}> 
                                <Text style={styles.serverItemText}>我要预约</Text>
                        </ImageBackground>
                    </Flex.Item>
                    <Flex.Item style={styles.serverItem}>
                        <ImageBackground 
                            resizeMode='stretch'
                            source={require('../res/images/home/fuwu.png')} 
                            style={styles.ImageBackground}> 
                                <Text style={styles.serverItemText}>我要查询</Text>
                        </ImageBackground>
                    </Flex.Item>
                    <Flex.Item style={styles.serverItem}>
                        <ImageBackground 
                            resizeMode='stretch'
                            source={require('../res/images/home/client.png')} 
                            style={styles.ImageBackground}> 
                                <Text style={styles.serverItemText}>我要咨询</Text>
                        </ImageBackground>
                    </Flex.Item>
                </Flex>      
            </View>
        )
    }
}

//我的证照
class MeLicense extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const licenseData = [
            { 
                id: 1,
                bg: require('../res/images/home/card_bg_1.png'),
                icon: require('../res/images/home/icon_zz_1.png'),
                title: '社会保障卡',
                content: '广东省人力资源和社会保障厅',
                number: '306************5666',
                handler: () => {
                    NavigationUtil.navigate(this.props, 'SocialSecurityindex')
                }
            },
            { 
                id: 2,
                bg: require('../res/images/home/card_bg_3.png'),
                icon: require('../res/images/home/icon_zz_2.png'),
                title: '电子身份证',
                content: '广东省公安厅交通管理员',
                number: '306************5666',
                handler: () => {
                    NavigationUtil.navigate(this.props, 'SocialSecurityindex')
                }
            },
            { 
                id: 3,
                bg: require('../res/images/home/card_bg_2.png'),
                icon: require('../res/images/home/icon_zz_3.png'),
                title: '公积金',
                content: '广州市住房公积金管理中心',
                number: '306************5666',
                handler: () => {
                    NavigationUtil.navigate(this.props, 'AccumulationFundindex')
                }
            }
        ]
        return (
            <View>
                <TitleCommonComponent title={'我的证照'} more={'查看全部'} onPress={()=>{
                    NavigationUtil.navigate(this.props, 'License')
                }} />
                <ScrollView style={styles.licenseBox} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                    {
                        licenseData && licenseData.map((item, i)=>(
                            <TouchableOpacity 
                                key={`${item.id}-${i}`} 
                                activeOpacity={0.9}
                                onPress={item.handler} 
                                style={{flex:1,marginTop:5}} >
                                <View style={styles.licenseBody}>
                                    <ImageBackground 
                                        resizeMode='stretch' 
                                        style={styles.imageBg} 
                                        source={item.bg}>
                                        <Image style={styles.imgBox} source={item.icon}></Image>
                                        <View style={{marginTop:20}}>
                                            <Text style={styles.licenseTitle}>{item.title}</Text>
                                            <Text style={styles.licenseText}>{item.content}</Text>
                                            <Text style={styles.licenseText}>{item.number}</Text>
                                        </View>
                                    </ImageBackground>                                                                      
                                </View>
                            </TouchableOpacity>
                        ))
                    }                      
                </ScrollView> 
            </View>
        )
    }
}


const IntelligentData = [
    {
        title: '社保',
        icon: require('../res/images/home/icon_shebao_1.png'),
        handler: (props)=>{ 
            NavigationUtil.navigate(props, 'SocialSecurityindex')
        },
        list: [
            { title: '社保卡', handler: (props)=>{NavigationUtil.navigate(props, 'SocialCard') } },
            { title: '社保查询', handler: (props)=>{
                Auth.isLogin(props, ()=>{
                    NavigationUtil.navigate(props, 'SocialSecurityindex')
                })
            }},
            { title: '定点医院/药店', handler: (props)=>{NavigationUtil.navigate(props, 'Hospitals') }},
            { title: '社保关系转移', handler: (props)=>{handler: ()=>{
                console.log(1)
            } } },
            { title: '社保经办机构', handler: (props)=>{NavigationUtil.navigate(props, 'SocialOrganization')  } }
        ]
    },
    {
        title: '车主服务',
        icon: require('../res/images/home/icon_car_1.png'),
        handler: (props)=>{ 
            NavigationUtil.navigate(props, 'VehicleMainIndex')
        },
        list: [
            { title: '电子驾车', handler: (props)=>{ NavigationUtil.navigate(props, 'DrivingCard')}},
            { title: '驾照换新', handler: (props)=>{ NavigationUtil.navigate(props,'drivingLicenceIndex')}},
            { title: '违章查询', handler: (props)=>{ NavigationUtil.navigate(props,'MotorVehicle')}},
            { title: '车辆业务', handler: (props)=>{ NavigationUtil.navigate(props, 'VehicleIndex')}},
            { title: '机动车年审', handler: (props)=>{ NavigationUtil.navigate(props, 'CarSubscribe')}},
            { title: '其他', handler: ()=>{handler: ()=>{
                console.log(1)
            } }}
        ]
    },
    {
        title: '公积金',
        icon: require('../res/images/home/icon_gjj_1.png'),
        handler: (props)=>{
            NavigationUtil.navigate(props, 'AccumulationFundindex')
        },
        list: [
            { title: '公积金卡', handler: (props)=>{ NavigationUtil.navigate(props, 'MyGoldCard')}},
            { title: '存缴明细', handler: (props)=>{ NavigationUtil.navigate(props, 'Deposite') }},
            { title: '公积金提取', handler: (props)=>{NavigationUtil.navigate(props, 'ExtractApplicationFund') }},
            { title: '公积金贷款', handler: (props)=>{ }},
            { title: '自愿账户', handler: (props)=>{ }}
        ]
    }
]

const IntelligentItem = ({props, listData}) =>{
    return (
        <View style={styles.IntelligentContainer}>
            {
                listData && listData.map((item, index)=>(
                    <View key={index}>
                        <List styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}} >
                            <List.Item 
                                styles={{Line: {borderBottomWidth: 0}}}
                                arrow={'horizontal'}
                                onPress={()=>item.handler(props)}
                            >
                                <View style={{flexDirection:'row'}}>
                                    <Image style={{width:26,height:26}} source={item.icon} />
                                    <Text style={{paddingVertical: 3, paddingHorizontal: 5, fontSize: 14}}>{item.title}</Text>
                                </View>
                            </List.Item>
                        </List>
                        <IntelligentItemContent props={props} list={item.list} last={(listData.length-1)==index} />
                    </View>
                ))
            }
        </View>
    );
}

const IntelligentItemContent = ({props, list, last}) => {
    return (
        <View style={last ? styles.IntelligentBox : styles.IntelligentBoxLine}>
            {
                list && list.map((item, i)=> (
                    <TouchableOpacity
                        key={i} 
                        style={styles.IntelligentItem}
                        onPress={()=>item.handler(props)}
                    >
                        <Text style={{color:'#999'}}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

//智能推荐
class IntelligentRecommend extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                 <TitleCommonComponent title={'智能推荐'} iconHidden={true} image={require('src/res/images/home/recommendation_btn_refresh.png')} more={'换一批'}  onPress={()=>{}} />
                 <View style={styles.IntelligentItemBox}>
                    <IntelligentItem props={this.props} listData={IntelligentData}/>
                 </View>
            </View>
        )
    }
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        // const theme = this.props.navigation.state.params ? this.props.navigation.state.params.theme : null
        // this.state = {
        //     theme: theme
        // }
    }

   render() {
    return (
           <View style={styles.container} >
                <NavigationBar
                    leftHidden={true}
                    title='首页' 
                    statusBar={{backgroundColor: '#2F74ED', barStyle: 'light-content', translucent: false}} 
                    hide={true}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <BackgroundTitle {...this.props}/>
                    <IconBusiness {...this.props}/>
                    <PersonCustomers {...this.props}/>
                    <MeLicense {...this.props}/>
                    <IntelligentRecommend {...this.props}/>
               </ScrollView>
           </View>
       );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
    },
    searchInputBox: {
        width: (GlobalStyles.window_width-180),
        height: (Platform.OS === 'ios') ? 28:40,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 14:20,
        borderWidth: 1,
        backgroundColor:'#fff'
    },
    searchIcon: {
        position: "absolute",
        top: 9,
        left: 12,
        width: 24,
        height: 24,
        tintColor:'#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 20:40,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'flex-start',
        marginLeft: 35,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 14,
        color: '#999',
    },
    iconTouch:{
        alignItems:'center'
    },
    iconBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        flexWrap: 'wrap', 
        paddingHorizontal: 10
    },
    ImageView:{
        width: (GlobalStyles.window_width-20)/4,
        paddingTop: 3,
        alignItems:'center'
    },
    textIcon:{
        paddingTop: 10,
        paddingBottom:10,
        color:'#333',
        fontSize:13   
    },
    ImageBackground: {
       width: '98%',
       height: '98%',
       textAlign: 'center',
       alignItems: 'center',
    },
    serverBox: {
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor:'#E4EEFF',
        alignItems: 'center'
    },
    serverItem: {
        height: 70,
        borderColor: '#DEE1E6',
        alignItems: 'center'
    },
    serverItemText: {
        paddingTop: 22,
        fontSize: 13,
        color: '#333',
        marginLeft: -40,
    },
    linearGradient: {
      position: 'absolute',
      zIndex: -1,
      height: 12,
      left: -2,
      top: 5,
      width: 4,
      borderRadius: 2
    },
    IntelligentContainer:{
        paddingVertical: 5,
        paddingHorizontal: 5,
        
    },
    IntelligentItemBox: {
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom:15
        
    },
    IntelligentBoxLine: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
    },
    IntelligentBox: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 8,
    },
    IntelligentItem: {
        width: (GlobalStyles.window_width-80)/3,
        paddingVertical: 8,
    },

    licenseBox: {
        flexDirection: 'row'
    },
    licenseBody: {
        width: GlobalStyles.window_width-20,
        height: 130,
    },
    imageBg: {
        width: GlobalStyles.window_width-20,
        height: 130,
        flexDirection:'row',
    },
    licenseTitle: {
        fontSize: 16,
        paddingBottom: 5,
        color: '#fff'
    },
    imgBox: {
        width: 40,
        height: 40,
        marginTop: 20,
        margin: 30,
    },
    licenseText: {
        paddingVertical: 4,
        color:'#fff',
    },
    iconSize: {
        width: 36,
        height: 36,
    },
    NavBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    NavIcon: {
        marginHorizontal: 5,
        marginVertical: 1,
        width: 16, 
        height: 16
    }

});