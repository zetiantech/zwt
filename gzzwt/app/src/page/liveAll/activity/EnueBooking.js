/**
 * @description 场馆预定
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect  } from 'react';
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,Image,TextInput,TouchableOpacity,
    DeviceEventEmitter
 } from 'react-native'
 import { 
    Button,
    Tabs,Picker,Provider,ListView,

 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import GlobalStyles from 'src/res/styles/GlobalStyles'
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import GeolocationUtil from 'src/util/GeolocationUtil'//定位

const address= [
    {label: '全市',value: '1'},
    {label: '白云区',value: '2'},
    {label: '越秀区',value: '3'},
    {label: '荔湾区',value: '4'},
    {label: '天河区',value: '5'},
    {label: '海珠区',value: '6'},
    {label: '黄埔区',value: '7'},
    {label: '花都区',value: '8'},
    {label: '番禺区',value: '9'},
    {label: '增城区',value: '10'},
    {label: '从化区',value: '11'},
]///全市



const SearchInput = ({keyword, setKeyword, changeKeyword,addressId,address,changeAddress,setAddressId  }) =>{
    return(
        <View style={{flexDirection:'row',paddingVertical:20,alignItems:'center',paddingHorizontal:30,backgroundColor:'#fff'}}>
            <Picker
                    cols={1}
                    data={address} 
                    value={addressId}
                    onOk={(val) => { setAddressId(val[0]); changeAddress(val, 1) }}
                >
                    <TouchableOpacity>
                        <Text style={styles.filterText,{marginRight:10,fontSize:16}}>
                            {
                                address.filter((d) => (d.value === addressId))[0] ?
                                address.filter((d) => (d.value === addressId))[0].label :
                                address[0].label
                            }
                            <Image
                                resizeMode="contain"
                                style={{ width: 15, height: 8 }}  
                                source={
                                    require('src/res/images/ic_tiaozhuan_down.png')
                                }
                            />
                        </Text>
                    </TouchableOpacity>
            </Picker>
            <View style={styles.searchInputBox}>
                <Image style={styles.searchIcon} source={require('../../../res/images/ic_searc.png')} />
                <TextInput 
                    style={styles.textInput}
                    autoFocus={false}  
                    underlineColorAndroid="white"
                    placeholder="搜索赛事"
                    placeholderTextColor="#999"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"  
                    onChange={value => {
                        setKeyword(value)
                        changeKeyword(value);
                    }}
                ></TextInput>
            </View>
        </View>
     )
};
/**
 * tab切换列表
 * @param {*} tabs 切换数据
 * @param {*} onTabsChange 切换回调
 */
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

//场馆列表
const ListText =({data,props})  => {
    return (
        <View style={{marginTop: 15}}> 
        {data&&
        <TouchableOpacity   onPress={() => NavigationUtil.navigate(props,'VenueDetails',{id:data.id}) }  >
            <View style={{borderBottomWidth:1,borderColor:'#ccc',marginHorizontal: 15,paddingVertical:20}}>           
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:100,height:100,marginRight:15}} source={{uri:data.thumbnail}} ></Image>
                        <View>
                            <Text>{data.address||""}</Text>
                            <Text style={{color:'#999'}} >{data.name||""}</Text>
                                {/* {this._renderText(item.categoryName)} */}
                            <Text style={{color:'red',marginTop:15}} >{data.price||"0"}元起</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:'#999'}}>{data.distance.toFixed(1)} Km</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        }               
        </View>
    )
}


/**
 * 页面下拉刷新及上拉加载
 * @param {*} getData 获取数据方法
 * @param {*} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setListView, props ,onSkip}) => {
    return (
        <ListView
            // refreshable={false}
            ref={(ref) => setListView(ref)}
            onFetch={getData}
            keyExtractor={(item, index) =>
                `${item.id}`
            }
            renderItem={(item, index) => {
                return (
                    <ListText data={item} props={props} />
                )
            }}
            numColumns={1}
        />
    )
}

export default function EnueBooking (props) {

        const [tabs,setTabs] = useState()//分类列表数据

        const [addressId, setAddressId] = useState();///全市ID
        const [keyword, setKeyword] = useState();//搜索框
        const [first, setFirst] = useState(true); // 搜索关键字
        const [params,setParams]= useState()
        const [listView, setListView] = useState([]); // 用来接收列表元素
        const [coords, setCoords] = useState({
            latitude: 23.10623,
            longitude: 113.323656,
        });//定位
        const [address, setAddress] = useState([
            {label: '全市',value: '1'},
            {label: '白云区',value: '2'},
            {label: '越秀区',value: '3'},
            {label: '荔湾区',value: '4'},
            {label: '天河区',value: '5'},
            {label: '海珠区',value: '6'},
            {label: '黄埔区',value: '7'},
            {label: '花都区',value: '8'},
            {label: '番禺区',value: '9'},
            {label: '增城区',value: '10'},
            {label: '从化区',value: '11'},

        ]);///全市
        // DeviceEventEmitter.addListener('refresh',()=>{
        //     console.log(1111111)
        // })
        
        //场馆分类
        function onTabsChange (tab,index) {
            setParams({
                ...params,
                typeId:tab.id
            })    
        }
        //搜索框
        function changeKeyword (keyword) {
            setKeyword(keyword)
            setParams({ ...params, name: keyword });
            setFirst(false);
            !keyword && ToastUtil.toast('请输入关键字', 'center');
        }
        //选择区域下拉
        function changeAddress (val,type) {
            let obj = {}; 
            obj[{1:'addressId'}[1]]=val[0] || "";
            console.log(obj,44444444)
            setParams({...params,...obj })       
        }
        /**
        * 获取列表数据
        * @param {*} page 页码
        * @param {*} startFetch 设置数据
        * @param {*} abortFetch 获取数据出错
        */
        function getData(page = 1, startFetch, abortFetch) {
            // timer.current && clearTimeout(timer.current);
            // timer.current = setTimeout(() => {
            console.log(params,44444)
            HttpUtil.post(API.VenueInfoList, {
                ...params,
                page: page,
                size: 10,
                latitude: coords.latitude,
                longitude: coords.longitude,
            }).then((responseJson) => {
                const { code, data, msg } = responseJson
                if (data.code === 0) {
                    startFetch(data.data.list || [], 10);
                } else {
                    abortFetch();
                    ToastUtil.toast(data.msg || '获取数据失败', 'center');
                }
            })
            // }, 10); 
        }
        useEffect(() => {
            //场馆预定分类列表
            HttpUtil.get(API.VenueCategory, {    
            }).then(responseJson => {
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    setTabs(data)                                          
                }      
            }).catch(error => {
                console.log(error,'error')
            });
            //获取位置信息
            GeolocationUtil.getCurrentPosition().then((coords) => {
                setCoords(coords);
            }).catch((error) => {
                if (error.code === 12) {
                    ToastUtil.toast('定位权限被禁用,请授予应用定位权限', 'center');
                }
            });
        }, [])
        
        useEffect(() => {
            if (listView && listView.ulv) {
                listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
                listView.refresh();
            } 
        }, [params])

    console.log(params,6666666)
       return (
           <Provider style={styles.container} >
               <ScrollView showsVerticalScrollIndicator={false}>
               <NavigationBar title='场馆预定' hide={false} popEnabled = {true} navigator ={props.navigation}
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
                <SearchInput keyword={keyword} setKeyword={setKeyword} changeKeyword={changeKeyword} addressId={addressId} address={address} changeAddress={changeAddress}setAddressId={setAddressId}/>
                <TabsComponent tabs={tabs}  onTabsChange={onTabsChange} />
                <ScrollViewer getData={getData} setListView={setListView} props={props}  />

                </ScrollView>     
           </Provider>
       );
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
        width:(GlobalStyles.window_width)/1.5,
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
        flex:1,
        backgroundColor: '#ffffff'
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
    filterText: {
        alignSelf: 'center',
        marginRight:50
    },
});