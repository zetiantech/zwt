/**
 * @description 活动赛事
 * @author 择天团队
 * 
 * **/

import React, { Component,useState,useEffect, useRef } from 'react'
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,Image,TextInput,TouchableOpacity,
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



 //搜索框
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


//Tab
function TitleFilter({  areaData, levelData, areaId, setAreaId, levelId, setLevelId, changeHospitals,onClickshow,changeHospitalslevelId }) {
    return (
        <View style={styles.filterBox}>
            <View style={[styles.filterItem, styles.filterItem1]}>
                <Picker
                    cols={1}
                    data={areaData} 
                    value={areaId}
                    onChange={(val) => { setAreaId(val[0]); changeHospitals(val, 1) }}
                    // onOk={(val) => { setLevelId(val[0]); changeHospitals(val, 1) }}
                >
                    <TouchableOpacity>
                        <Text style={styles.filterText}>
                            {
                                areaData.filter((d) => (d.value === areaId))[0] ?
                                areaData.filter((d) => (d.value === areaId))[0].label :
                                areaData[0].label
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
            </View>
            <View style={[styles.filterItem,styles.filterItem1]}>
                <Picker
                    cols={1}
                    data={levelData}
                    value={levelId}
                    onChange={(val) => { setLevelId(val[0]); changeHospitalslevelId(val, 1) }}
                    onOk={(val) => { setLevelId(val[0]); changeHospitalslevelId(val, 1)  }}
                >
                    {/* <Text>开赛/未开赛</Text> */}
                    <TouchableOpacity>
                        <Text style={styles.filterText}>
                            {
                                levelData.filter((d) => (d.value === levelId))[0] ?
                                    levelData.filter((d) => (d.value === levelId))[0].label :
                                    levelData[0].label
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
            </View>
            <View style={[styles.filterItem]}>               
                    {/* <Text>筛选</Text> */}
                    <TouchableOpacity onPress={onClickshow} >
                        <Text style={styles.filterText}>筛选                
                            <Image resizeMode="contain" style={{ width: 15, height: 8 }}source={require('src/res/images/ic_tiaozhuan_down.png')}/>
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

//筛选下拉
const PullDown = ({currentIndexTow,currentIndex, setcurrentIndexTow, setcurrentIndex,onClickshow,onReset,onShow}) =>{
    return (
        <View>     
            <View style={{margin:20,flex:0.1}}>
                    <Text style={{color:'#999999'}} >参赛费用</Text>
                    <View style={{flexDirection:'row'}}>
                        { currentIndex == 1 ? 
                        <View style={styles.gratis} >
                            <Text style={styles.text1}>免费</Text>
                        </View>:
                        <TouchableOpacity style={styles.gratistwo} onPress={()=>setcurrentIndex(1) }                        
                        >
                            <Text style={styles.text2}>免费</Text>
                        </TouchableOpacity>
                        }  
                        { currentIndex == 2 ? 
                        <View style={styles.gratis} >
                            <Text style={styles.text1}>收费</Text>
                        </View>:
                        <TouchableOpacity style={styles.gratistwo} onPress={()=>setcurrentIndex(2) }                        
                        >
                            <Text style={styles.text2}>收费</Text>
                        </TouchableOpacity>
                        }                                        
                    </View>
            </View>
            {/* 参赛时间 */} 
            <View style={{margin:60,marginLeft:20, flex:1}}>
                    <Text style={{color:'#999999'}} >参赛费用</Text>
                    <View style={{flexDirection:'row'}}>
                        { currentIndexTow == 1 ? 
                        <View style={styles.gratis} >
                            <Text style={styles.text1}>本周</Text>
                        </View>:
                        <TouchableOpacity style={styles.gratistwo} onPress={()=>setcurrentIndexTow(1) }                        
                        >
                            <Text style={styles.text2}>本周</Text>
                        </TouchableOpacity>
                        }  
                        { currentIndexTow == 2 ? 
                        <View style={styles.gratis} >
                            <Text style={styles.text1}>本月</Text>
                        </View>:
                        <TouchableOpacity style={styles.gratistwo} onPress={()=>setcurrentIndexTow(2) }                        
                        >
                            <Text style={styles.text2}>本月</Text>
                        </TouchableOpacity>
                        }  
                        { currentIndexTow == 3 ? 
                        <View style={styles.gratis} >
                            <Text style={styles.text1}>近半年</Text>
                        </View>:
                        <TouchableOpacity style={styles.gratistwo} onPress={()=>setcurrentIndexTow(3) }                        
                        >
                            <Text style={styles.text2}>近半年</Text>
                        </TouchableOpacity>
                        }                                        
                    </View>
            </View>                     
            <View style={{flexDirection:'row',marginTop:40}}>
                <TouchableOpacity style={styles.bntminx} onPress={onReset}>        
                        <Text>重置</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.bntminx1} onPress={()=>onShow(currentIndex,currentIndexTow)}>        
                        <Text style={{color:"#fff"}}>确定</Text>
                </TouchableOpacity>                  
            </View>           
        </View>
    )
}

//赛事列表
const ListText =({data,onSkip})  => {
        let stTime = data.startTime.split(' ')[0] || '';    
    return (
        <View> 
            <View style={{backgroundColor:'#f0f0f0',height:10,marginTop:-1}}></View>
            {   
                data &&                                 
                <TouchableOpacity  onPress={()=>onSkip(data.id)}> 
                    <View style={styles.listView}>           
                        <View style={styles.listView1}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{width:100,height:100,marginRight:15}} source={{uri:data.thumbnail}} ></Image>
                                <View>
                                    <Text>{data.name}</Text>                          
                                    <Text style={{color:'#999',marginTop:7}}>{stTime}</Text>
                                    <Text style={{color:'#999',marginTop:0}}>{data.address}</Text>
                                    {data.price ?
                                    <Text style={{color:'red',marginTop:5}}>{data.price}元</Text>:
                                    <Text style={{color:'red',marginTop:5}}>免费</Text>
                                    }
                                    
                                </View>
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
                    <ListText data={item} props={props} onSkip={onSkip} />
                )
            }}
            numColumns={1}
        />
    )
}

export default function CarRest (props) {

    const endID = props.navigation.getParam('endID')||''

    console.log(endID,11111111)
    const [areaData, setAreaData] = useState([
        {label: '全类',value: '1'},
    ]);///全类
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
    const [addressId, setAddressId] = useState();///全市ID
    const [levelData, setLevelData] = useState([
        {label: '开赛',value: '1'},
        {label: '未开赛',value: '2'},
        {label: '已结束',value: '3'},
    ]);//开赛
    const [areaId, setAreaId] = useState('');

    const [levelId, setLevelId] = useState();
    const [listView, setListView] = useState([]); // 用来接收列表元素
    const [keyword, setKeyword] = useState();//搜索框
    const [first, setFirst] = useState(true); // 搜索关键字

    const [pullDown, setpullDown] = useState(false); // 筛选切换
    const [currentIndex, setcurrentIndex] = useState(1); // 免费/收费
    const [currentIndexTow, setcurrentIndexTow] = useState(1); // 本周/本月/近半年

    const [params, setParams] = useState(); //


    /**
     * 切换分类
     * @param {*} val 
     * @param {*} type  1全市,2开赛,3已结束
     */
    function changeHospitals(val, type) { 
        let obj = {};    
        obj[{ 1: 'areaId'}[type]] = val[0] 
        setParams({...params,...obj })
    }
    function changeHospitalslevelId(val, type) {
        let obj = {};    
        obj[{ 1: 'levelId',}[type]] = val[0] 
        setParams({...params,...obj })
    }
    function changeAddress (val,type) {
        let obj = {}; 
        obj[{1:'addressId'}[1]]=val[0] || "";
        console.log(obj,44444444)
        setParams({...params,...obj })       
    }

    //点击筛选切换
    function onClickshow (){
        setpullDown(!pullDown)
    }
    //筛选重置
    function onReset () {
        setcurrentIndex(1)
        setcurrentIndexTow(1)
    }
    //筛选确定
    function onShow (index,i) {
        setpullDown(false)
        setParams({...params,matchPayId:index,matchTime:i})
    }
    useEffect(() => {
        //分类
        HttpUtil.get(API.CategoryList, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [];
                for (const v of data.data) {  
                    arr.push({
                        value: v.id,
                        label: v.name
                    })  
                }   
                setAreaData(arr)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch((err) => {
            console.log(err)
        })
        //获取全市的行政区域
        HttpUtil.post(API.GetProvinceList, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [{
                    value: '',
                    label: '全市'
                }];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.cityName
                    })
                }
                setAddress(arr)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    /**
    * 获取列表数据
    * @param {*} page 页码
    * @param {*} startFetch 设置数据
    * @param {*} abortFetch 获取数据出错
    */
   function getData(page = 1, startFetch, abortFetch) {
    // timer.current && clearTimeout(timer.current);
    // timer.current = setTimeout(() => {
    HttpUtil.get(API.MatchList, {
        ...params,
        // page: page,
        size: 10
    }).then((data) => {
        console.log(params,88888)
        data = data.data;
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
        if (listView && listView.ulv) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
        console.log('param change')
        if(endID&&endID!==""&endID!==undefined){
            setLevelId(endID+"")//赛事公布
        }
    }, [params])

    function onSkip (id) {
        NavigationUtil.navigate(props,'EventDetails',{id:id})
    }

    function changeKeyword (keyword) {
        setKeyword(keyword)
        setParams({ ...params, name: keyword });
        setFirst(false);
        !keyword && ToastUtil.toast('请输入关键字', 'center');
    }

    return (  
        <Provider style={styles.container} >
            <View showsVerticalScrollIndicator={false}>
                <NavigationBar title='活动赛事'  hide={false} popEnabled = {true} navigator ={props.navigation}
                            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}

                />
                <SearchInput keyword={keyword} setKeyword={setKeyword} changeKeyword={changeKeyword} addressId={addressId} address={address} changeAddress={changeAddress}setAddressId={setAddressId}/>
                <TitleFilter areaId={areaId} levelId={levelId} setAreaId={setAreaId} setLevelId={setLevelId} areaData={areaData} 
                levelData={levelData} changeHospitals={changeHospitals} 
                onClickshow={onClickshow} changeHospitalslevelId={changeHospitalslevelId}/>
                {   pullDown == true ?
                    <View >
                    <PullDown setcurrentIndex={setcurrentIndex} setcurrentIndexTow={setcurrentIndexTow} currentIndex={currentIndex} currentIndexTow={currentIndexTow} onReset={onReset} onShow={onShow} />
                    </View>
                    :<ScrollViewer getData={getData} setListView={setListView} props={props} onSkip={onSkip} />
                }
            </View>     
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
        width: GlobalStyles.window_width-130,
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
    filterItem1: {
        borderRightColor: '#E5E5E5',
        borderRightWidth: 1
    },
    filterItem: {
        flex: 1,
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        alignSelf: 'center',
        color:'#333',     
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
    filterBox: {
        backgroundColor: '#fff',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    //筛选下拉
    gratis: {
        borderWidth:0.5,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#2F74ED',
        backgroundColor:'#E4EEFF',
        marginTop:20,
        marginRight:15,
        height:30 
    },
    gratistwo:{
        borderWidth:0.5,width:80,justifyContent:'center',alignItems:'center',height:30,
        borderColor:'#E5E5E5',backgroundColor:'#FFFFFF',marginTop:20,marginRight:15,
    },
    toll:{
        borderWidth:0.5,width:80,justifyContent:'center',alignItems:'center',
        borderColor:'#2F74ED',backgroundColor:'#E4EEFF',marginTop:20 
    },
    tolltwo:{
        borderWidth:0.5,width:80,justifyContent:'center',alignItems:'center',
        borderColor:'#E5E5E5',backgroundColor:'#FFFFFF',marginTop:20,
    },
    bntminx:{
        width:'30%',marginLeft:20, height:50,borderWidth:1,borderColor:'#F0F0F0',backgroundColor:'#F0F0F0',
        justifyContent:'center',alignItems:'center',
    },
    bntminx1:{
        width:'60%',height:50,borderWidth:1,borderColor:'#F0F0F0',backgroundColor:'#2F74ED',
        justifyContent:'center',alignItems:'center',marginBottom:20
    },
    text1:{
        paddingVertical:5,
        color:'#2F74ED'
    },
    text2:{
        paddingVertical:5,
        color:'#333'
    },
    //list
    listView:{
        flex:1,
        borderBottomWidth:1,
        borderColor:'#ccc',
        marginHorizontal: 15,
        paddingVertical:20
    },
    listView1:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }


}); 



