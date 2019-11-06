/**
 * @description 生活页面
 * @author 择天团队
 *
 * **/
import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Button, Flex, List} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import GlobalStyles from '../res/styles/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'
import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

/**
 * @description 生活头部组件
 * @author
 */
const LifeHeader = ({navList})=>{
   return (
    <View>
      <ImageBackground resizeMode="stretch" style={styles.imagesBackground} source={require('../res/images/common/bg.png')}>
        <View style={styles.headerContent}>
            <Flex style={styles.lifeHead}>
              <Flex.Item><Text style={styles.lifeTitle}>生活服务</Text></Flex.Item>
              <Flex.Item><Image source={require('../res/images/life/icon_life_search.png')} style={styles.searchIcon}/></Flex.Item>
            </Flex>
            <LefeNavBar data={navList}/>
        </View>
      </ImageBackground>
    </View>
   )
}

const LefeNavBar = ({data}) => {
  return (
    <View style={styles.meNavContent}>
      <Flex style={styles.navItems}>
        {
          data && data.map((item, i)=>(
            <Flex.Item  key={`${item.id}-${i}`} style={styles.navItem}>
              <TouchableOpacity activeOpacity={0.8} style={{alignItems:'center'}} onPress={item.handler}>
                <Image source={item.icon} style={styles.imgIcon} />
                <Text style={styles.imgText}>{item.name}</Text>
              </TouchableOpacity>
            </Flex.Item>
          ))
        }
      </Flex>
    </View>
  )
}

/**
 * @description 热门文旅组件
 * @author Jonne
 */
const HotWenLv = ({}) => {
  const hotList = [
    { id: 11, uri: require('../res/images/life/b_img.png'), content: '那些年我们一起拼过的青春', handler: ()=>{}}
  ]
  return (
    <View style={styles.mainBox}>
      <Text style={styles.hotTitle}>热门文旅</Text>
      <View style={styles.hotContent}>
        {
          hotList && hotList.map((item, i)=>(
              <TouchableOpacity
                 activeOpacity={0.8}
                 onPress={item.handler}
              >
                <Image resizeMode="cover" style={styles.hotImg} source={item.uri} />
                <View style={styles.hotContentMask}>
                  <Text numberOfLines={1} style={styles.hotContentText}>{item.content}</Text>
                </View>
              </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

/**
 * @description 公用标题公共组件
 * @author Jonne
 */
const TitleNav = ({title, subTitle, more, onPress}) => {
  const bottomColor = `rgba(134, 106, 255, ${1})`;
  const maskColor = `rgba(47, 116, 237, ${1})`;
  return (
    <List styles={{ Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0},}}>
      <List.Item styles={{Line: {borderBottomWidth: 0}}} arrow="horizontal"
        extra={
          <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 14, color: '#cccccc'}}>{more}</Text>
          </TouchableOpacity>
        }>
        <LinearGradient colors={[maskColor, bottomColor]} start={{x: 0, y: 1}} end={{x: 1, y: 0}} locations={[0, 0.75]} style={styles.linearGradient}></LinearGradient>
        <View style={styles.lifeActivityText}>
          <Text style={{marginRight: 5, fontSize: 16}}> {title} </Text>
          <Text style={{fontSize: 12, color: '#ccc'}}> {subTitle} </Text>
        </View>
      </List.Item>
    </List>
  )
}

/**
 * @description 公用内容公共组件
 * @author Jonne
 */
 const ContentCommon = ({data, subData}) => {
    return (
      <View style={styles.lifeContentBox}>
          <Flex style={styles.lifeItems}>
             { 
              data && data.map((item, i)=>(
                <Flex.Item style={[styles.lifeItem, i != 2 && styles.lifeItemLine]} key={`${item.id}-${i}`}>
                  <TouchableOpacity onPress={item.handler} style={{alignItems: 'center'}}>
                    <Image source={item.icon} style={styles.lifeImgIcon} />
                    <Text style={styles.lifeImgText}>{item.title}</Text>
                  </TouchableOpacity>
                </Flex.Item>
              )) 
             }
          </Flex>
          {
            subData && (
              <Flex style={styles.lifeFootItems}>
                  {
                      subData.map((item, i)=>(
                      <Flex.Item style={[styles.lifeFootItem, i != 2 && styles.lifeItemLine]}  key={`${item.id}-${i}`}>
                        <TouchableOpacity onPress={item.handler} style={{alignItems: 'center'}}>
                          <Text style={styles.lifeFootText}>{item.title}</Text>
                        </TouchableOpacity>
                      </Flex.Item>
                      ))
                  }
              </Flex>
            )
          }
        </View>
    )
 }

/**
 * @description 主要内容组件
 * @author Jonne
 */
const MiddleContent = ({data, subData}) =>{
  return (
    <>
       {
         data && data.map((item, i)=>(
            <View style={styles.mainBox}>
              <TitleNav title={item.title} subTitle={item.subTitle} more={item.more} onPress={item.handler} />
              <ContentCommon data={item.list} subData={item.subList} />
            </View>
         ))
       }
    </>
    
  )
}

/**
 * @description 生活主组件
 * @author Jonne
 */
export default function LifeComponent(props) {

  const data = [
    { id: 115, title: '图书', subTitle: '广州图书馆', more: '更多', handler: ()=>{ },
      list: [
        { id: 1151, title: '借阅查询', icon: require('../res/images/life/life_icon_library_2x.png'), handler: () => { 
          NavigationUtil.navigate(props, 'MyBorrow')
        }},
        { id: 1152, title: '预约查询', icon: require('../res/images/life/life_icon_library2_2x.png'), handler: () => {
            NavigationUtil.navigate(props, 'SuspendReadCard')
        }},
        { id: 1153, title: '图书检索', icon: require('../res/images/life/life_icon_library3_2x.png'), handler: () => {
          
        }},
      ],
      subList: [
        { id: 1154, title: '用户注册', handler: () => {
          NavigationUtil.navigate(props, 'RegisterReadCard')
        }},
        { id: 1155, title: '图书续借', handler: () => { 
          NavigationUtil.navigate(props, 'SearchBooks')
        }},
        { id: 1156, title: '读者证挂失', handler: () => {
          NavigationUtil.navigate(props, 'SuspendReadCard')
         }},
      ]
    },
    { id: 111, title: '活动', subTitle: '群体通', more: '更多', handler: ()=>{ },
      list: [
        { id: 1111, title: '场馆预定', icon: require('../res/images/life/icon_life_05.png'), handler: () => {
           NavigationUtil.navigate(props, 'EnueBooking')
        }},
        { id: 1112, title: '赛事报名', icon: require('../res/images/life/icon_life_06.png'), handler: () => {
          NavigationUtil.navigate(props, 'ActivityEvents')
        }},
        { id: 1113, title: '赛事公布', icon: require('../res/images/life/icon_life_07.png'), handler: () => {
          NavigationUtil.navigate(props, 'ActivityEvents',{ endID: '3' })
        }}
      ]
    },
    { id: 112, title: '法律', subTitle: '广州法律援助中心', more: '更多', handler: ()=>{ },
      list: [
        { id: 1121, title: '咨询预约', icon: require('../res/images/life/icon_life_08.png'), handler: () => { }},
        { id: 1122, title: '援助网申请', icon: require('../res/images/life/icon_life_09.png'), handler: () => { } },
        { id: 1123, title: '援助机构查询', icon: require('../res/images/life/icon_life_10.png'), handler: () => { } },
      ],
      subList: [
        { id: 1124, title: '执业律师', handler: () => {  } },
        { id: 1125, title: '律师事务所', handler: () => { } },
        { id: 1126, title: '案件机构查询', handler: () => { } },
      ]
    },
    { id: 113, title: '出行', subTitle: '广州交通', more: '更多', handler: ()=>{ },
      list: [
        { id: 1131, title: '公交路线查询', icon: require('../res/images/life/icon_life_11.png'), handler: () => {
          NavigationUtil.navigate(props, 'BusRoute')
        }},
        { id: 1132, title: '停车场查询', icon: require('../res/images/life/icon_life_12.png'), handler: () => {
          NavigationUtil.navigate(props, 'ParkingLog')
        }},
        { id: 1133, title: '路况查询', icon: require('../res/images/life/icon_life_13.png'), handler: () => {
          NavigationUtil.navigate(props, 'HighwayMaintenance')
        }}
      ]
    },
    { id: 114, title: '公证', subTitle: '广州公证', more: '更多', handler: ()=>{ },
      list: [
        { id: 1141, title: '预约申请', icon: require('../res/images/life/icon_life_14.png'), handler: () => { }},
        { id: 1142, title: '预约查询', icon: require('../res/images/life/icon_life_15.png'), handler: () => { } },
        { id: 1143, title: '进度查询', icon: require('../res/images/life/icon_life_16.png'), handler: () => { } },
      ],
      subList: [
        { id: 1144, title: '网上公证申请', handler: () => { 
          NavigationUtil.navigate(this.props, 'OnlineBid');
        }},
        { id: 1145, title: '公证员查询', handler: () => { 
          NavigationUtil.navigate(this.props, 'Notaries');
        }},
        { id: 1146, title: '公证处查询', handler: () => {
          NavigationUtil.navigate(this.props,'Notarization');
         }},
      ]
    },
    { id: 115, title: '宠物登记', subTitle: '宠物管理', more: '更多', handler: ()=>{ },
      list: [
        { id: 1151, title: '养犬申请', icon: require('../res/images/life/icon_life_17.png'), handler: () => { }},
        { id: 1152, title: '申请进度', icon: require('../res/images/life/icon_life_18.png'), handler: () => { }},
        { id: 1153, title: '续期申请', icon: require('../res/images/life/icon_life_19.png'), handler: () => { }},
      ],
      subList: [
        { id: 1154, title: '申请查询', handler: () => {
        }},
        { id: 1155, title: '养犬注销', handler: () => { 
        }},
        { id: 1156, title: '注销记录', handler: () => {
         }},
      ]
    }
  ]

  const navList = [
    { id: 1, name: '公交查询', icon: require('../res/images/life/icon_life_01.png'), handler: ()=>{ 
        NavigationUtil.navigate(props, 'BusRoute')
    }},
    { id: 2, name: '社会组织', icon: require('../res/images/life/icon_life_02.png'), handler: ()=>{  }},
    { id: 3, name: '增量指标', icon: require('../res/images/life/icon_life_03.png'), handler: ()=>{  }},
    { id: 4, name: '公厕查找', icon: require('../res/images/life/icon_life_04.png'), handler: ()=>{ 
      NavigationUtil.navigate(props, 'toiletMap')
    }},
  ]

  return (
    <View style={styles.container}>
      <ScrollView>
        <NavigationBar 
          statusBar={{backgroundColor: '#2F74ED', barStyle: 'light-content', translucent: false}} 
          hide={true}/>
        <LifeHeader  props={props}  navList={navList} />
        <HotWenLv props={props} />
        <MiddleContent props={props} data={data} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 60,
  },
  imagesBackground: {
    flex: 1,
    width: GlobalStyles.window_width,
    height: 180,
  },
  headerContent: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    padding: 15,
    width: GlobalStyles.window_width,
    height: 180,
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  lifeHead: {
    justifyContent: 'space-between',
    padding: 15,
  },
  lifeTitle: {
    fontSize: 21,
    color: 'white',
  },
  meNavContent: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    top: -10,
    width: 21,
    height: 21,
  },
  imgIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
  },
  navItems: {
    justifyContent: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  imgText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  mainBox: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  hotTitle: {
    fontSize: 16,
    color: '#333',
    paddingTop: 15,
    paddingBottom: 15,
  },
  hotImg: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  linearGradient: {
    position: 'absolute',
    zIndex: -1,
    height: 12,
    left: -10,
    top: 6,
    width: 4,
    borderRadius: 2,
  },
  lifeActivityText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lifeContentBox: {
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  lifeItems: {
    justifyContent: 'center',
  },
  lifeFootItems: {
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  lifeItem: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  lifeFootItem: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  lifeImgIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
  },
  lifeImgText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  lifeFootText: {
    fontSize: 13,
    color: '#999',
  },
  lifeItemLine: {
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    borderStyle: 'solid',
  },
  hotContentMask: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     width: '100%',
     paddingVertical: 10,
     paddingHorizontal: 15,
     backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  hotContentText: {
    color: '#FFFFFF'
  }
});
