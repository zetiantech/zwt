/**
 * @description 办事详情
 * @author 择天团队
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Platform,TouchableOpacity
} from 'react-native';

import { 
    Button,
    Tabs,
 } from '@ant-design/react-native';

import NavigationBar from '../common/NavigationBar'

import NavigationUtil from '../util/NavigationUtil';
import GlobalStyles from '../res/styles/GlobalStyles';



//Tab
const TabsComponent = ({tabs, onTabsChange}) => {
    return (
        <Tabs
          initialPage={0}
          tabs={tabs}
          swipeable={true}
          useOnPan={true}
          onTabClick={(tab, index) => onTabsChange(tab,index) }
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




//办事查询|办事大厅
const RouterWorkComposite = ({onClick}) => {
    return (
        <View style={styles.workCompositeWarp}>
            <TouchableOpacity style={styles.workwarp}>
                <View style={styles.work_text}>
                    <Text style={styles.work_textone}>办件查询</Text>
                    <Text style={styles.work_texttwo}>进度随时掌握</Text>
                </View>
                <View style={styles.work_imgwarp}>
                    <Image  style={{width:30,height:30}} source={require('../res/images/work/affairs_affairssearch.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.workwarp} onPress={onClick} >
                <View style={styles.work_text}>
                    <Text style={styles.work_textone}>办事大厅</Text>
                    <Text style={styles.work_texttwo}>政务地址大全</Text>
                </View>
                <View style={styles.work_imgwarp}>
                    <Image  style={{width:30,height:30}} source={require('../res/images/work/affairs_affairscenter.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
   
//办事指南
const WorkGuide = ({bannerData,onMoreClick}) => {
    return(
        <View>  
            <View style={styles.bannerwork}>
                    <Text style={{marginLeft: 10, fontSize: 16}}>办事指南</Text>
                    <TouchableOpacity style={{marginRight: 10,}} onPress={onMoreClick}>
                        <View><Text style={{color:'#ccc'}}>更多>></Text></View>
                    </TouchableOpacity>
                </View>  
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  style={{backgroundColor:'#fff'}} >
                    { bannerData && bannerData.map((item, index)=>( 
                        <View style={styles.ScrollViewWarp}>
                            <TouchableOpacity style={styles.ScrollTouch}>
                                <View>
                                    <View>
                                        <Image style={styles.scrollImg} source={item.url}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.scrollTextTitle}>{item.title}</Text>
                                        <Text style={styles.scrollTextSpan}>{item.span}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>                  
                        </View> 
                         ))
                    }  
                    <View style={{marginRight:10}}></View>  
                </ScrollView>
            </View>
    )
}


//专项服务
const SpecialService = ({listData}) => {
    return (  
        <View>
            <Text style={styles.listwarp}>专项服务</Text>
            <View style={{backgroundColor:'#fff', paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 60, }}>
                {     
                    listData && listData.map((item, index)=>(
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>item.handler(item.id, item.title)}
                        >
                            <View style={styles.listView}>
                                <View style={{flexDirection:'row'}} >
                                    <View >
                                        <Image style={styles.listImage} source={item.url}></Image>
                                    </View>
                                    <View style={{marginLeft:12}}>
                                        <Text style={{fontSize:16}}>{item.title}</Text>
                                        <Text style={{color:'#999',paddingTop:5}}>{item.span}</Text>
                                    </View>
                                </View>
                                <View style={styles.direview}>
                                    <Image style={styles.direimg} source={require('../res/images/ic_tiaozhuan.png')} ></Image>
                                </View>
                            </View>                   
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>      
    )

}

export default function WorkPage (props) {
    const [tabs, setTabs] = useState([
        { name: '个人办事', id: '1' },
        { name: '企业办事', id: '2' },
        { name: '部门机构', id: '3' },
    ])
    const [bannerData,setbannerData] = useState ([
        {url:require('../res/images/work/affairs_bg_ygawq.png'),title:'粤港澳大湾区',span:'往来港澳备案，签注'},
        {url:require('../res/images/work/affairs_bg_jy.png'),title:'教育',span:'入学流程，学位信息'},
        {url:require('../res/images/work/affairs_bg_rh.png'),title:'入户',span:'积分信息'},
        {url:require('../res/images/work/affairs_bg_gf.png'),title:'购房',span:'购房信息'},
        {url:require('../res/images/work/affairs_bg_gzf.png'),title:'公租房',span:'公租房信息'}
    ])
    const listData = [
        {id:1, url:require('../res/images/work/affairs_icon_crj.png'), title:'出入境', span:'港澳台湾通行证，护照办理签注', handler: ()=>{
            NavigationUtil.navigate(props, "EntryExitService")
        }},
        {id:2, url:require('../res/images/work/affairs_icon_bdc.png'), title:'不动产', span:'不动产登记预约，预售查询', handler: ()=>{
            NavigationUtil.navigate(props, "RealEstateService")
        }},
        {id:3, url:require('../res/images/work/affairs_icon_ldjy.png'), title:'劳动就业', span:'就业失业，登记报到',handler: ()=>{
            NavigationUtil.navigate(props, "jobService")
        }},
        {id:4, url:require('../res/images/work/affairs_icon_sfgz.png'), title:'司法公证', span:'公证员、公证处、法律援助', handler: ()=>{
            NavigationUtil.navigate(props, "JudicialJusticeService")
        }},
        {id:5, url:require('../res/images/work/affairs_icon_hyfw.png'), title:'婚育收养', span:'婚姻登记预约', handler: ()=>{
            NavigationUtil.navigate(props, "MarriageService")
        }},
        {id:6, url:require('../res/images/work/affairs_icon_hzfw.png'), title:'户政服务', span:'申(换、补)领身份证',handler: ()=>{
            NavigationUtil.navigate(props, "QueuingInfo")
        }},
        {id:7, url:require('../res/images/work/affairs_icon_swyw.png'), title:'税务业务', span:'个人税务查询',handler: ()=>{
            console.log(1)
        }},
        {id:8, url:require('../res/images/work/affairs_icon_gzf.png'), title:'公租房', span:'家庭、个人公租房申请',handler: ()=>{
            NavigationUtil.navigate(props, "HousingIndex")
        }},
    ]


    //更多
    function onMoreClick () {
        NavigationUtil.navigate(props,'PersonalWorkGuide')     
    }
    //办事大厅
    function onClick () {
        NavigationUtil.navigate(props,'PersonalWorkList')     
    }
    const onTabsChange = (tab, index) => {

    }   
        return (
            <View style={styles.container}>
                <ScrollView >
                    <NavigationBar 
                        statusBar={{backgroundColor: '#2F74ED', barStyle: 'light-content', translucent: false}}
                        leftHidden={true} 
                        title='办事' 
                        hide={true}/>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>办事</Text>
                    </View>
                    <TabsComponent tabs={tabs} onTabsChange={onTabsChange} />
                    <RouterWorkComposite onClick={onClick} onMoreClick={onMoreClick}/>
                    <WorkGuide  bannerData={bannerData} setbannerData={setbannerData} onMoreClick={onMoreClick} />
                    <SpecialService listData={listData} />
                </ScrollView>
            </View>
        );
    }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    bottomLine: {
        position: 'absolute',
        width: 64,
        height: 1,
        bottom: 0,
        left: '50%',
        marginLeft: -32,
        backgroundColor: '#2F74ED'
    },
    bannerwork:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        marginTop: 10,
        paddingVertical:10,
    },
    WorksContentBox: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    workCompositeWarp: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:'#fff',
        paddingHorizontal: 10,
    },
    workwarp: {
        width: (GlobalStyles.window_width-50)/2,
        flexDirection:'row',
        borderWidth:0.3,
        borderRadius:10,
        borderColor: '#ccc',
        marginVertical:  20,
    },
    work_text :{
        marginVertical:20,
        marginHorizontal: 20,
    },
    work_imgwarp:{
        alignSelf:'center',
        marginRight: 20,
    },
    work_texttwo:{
        color:'#ccc',
        fontSize:12
    },
    ScrollViewWarp:{
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row',
        paddingBottom:20
        
    },
    ScrollTouch:{
        marginLeft: 10,
        marginTop: 5,
        borderWidth:0.3,
        borderRadius:5,
        borderColor:'#ccc',
    },
    scrollImg:{
        width:(GlobalStyles.window_width)/2.5,
        height:110,
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    scrollTextTitle:{
        marginLeft:10,
        paddingVertical:6
    },
    scrollTextSpan:{
        color:'#ccc',
        fontSize:12,
        marginLeft:10,
        marginBottom: 18,
    },
    listwarp:{
        backgroundColor:'#fff',
        paddingLeft:15,
        paddingVertical:10, 
        marginTop:20,
        fontWeight:'500',
        fontSize:16,
    },
    listView:{
        flexDirection:'row',
        flex:1,
        paddingLeft:15,
        paddingVertical:25,
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'#ccc',
        justifyContent:'space-between'
    },
    direview:{
        justifyContent:'space-around',
        marginRight:30
    },
    direimg:{
        width:18,
        height:18,
        tintColor:'#ccc'
    },
    listImage:{
        width:45,
        height:45
    },
    headerBox: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#2F74ED'
    },
    headerText: {
        fontSize: 16,
        color: '#FFFFFF'
    }
    
    

})