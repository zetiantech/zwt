/**
 * 
 * 不动产-列表
 * 
 *  */ 
import React, { useState, useEffect } from 'react'

import  {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity
 } from 'react-native'
 
 import { 
     Flex,
     List,
     Provider,
     WhiteSpace
  } from '@ant-design/react-native';


import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import NavigationUtil from 'src/util/NavigationUtil';


const ListView = ({listData}) => {
    const bottomColor = `rgba(134, 106, 255, ${1})`
    const maskColor = `rgba(47, 116, 237, ${1})`
    return (
        <View>
            {
                listData && listData.map((item, i)=>(
                    <>
                        <View style={styles.listWrap}>
                            <List 
                                styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}
                            >
                                <List.Item 
                                    styles={{Line: {borderBottomWidth: 0}}}>
                                    <LinearGradient 
                                        colors={[maskColor, bottomColor]} 
                                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} 
                                        locations={[0, 0.75]} 
                                        style={styles.linearGradient}>
                                    </LinearGradient>
                                    <Text style={styles.titleText}>{item.title}</Text>
                                </List.Item>
                                <List.Item >
                                    <ListItem subList={item.list} />
                                </List.Item>
                            </List>
                        </View>
                        <WhiteSpace size="lg" />
                    </>
                ))
            } 
         </View>
     );
}

const Header = ({props}) => {
    return (
        <View style={styles.headerBox}>
            <ImageBackground
                resizeMode="stretch"
                style={styles.imagesBackground}
                source={require('src/res/images/work/affairs_bg_bdc.png')}>
                <View style={styles.backBtn}>
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={()=>{
                            NavigationUtil.goBack(props)
                        }}
                    >
                        <Image style={styles.backImg} source={require('src/res/images/work/back.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleStyles}>不动产</Text>
            </ImageBackground>
        </View>
    )
}

const ListItem = ({subList}) => {
    return (
        <View>
            {
                subList && subList.map((item, i) => (
                    <TouchableOpacity
                        key={`${item.id}-${i}`}
                        activeOpacity={0.6}
                        onPress={()=>item.handler()}
                    >
                        <Text style={styles.ListItemText}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}
  
export default function RealEstateService(props) {

    const listData = [
        {
            id: 1,
            title: '不动产档案',
            list: [
                { id: 11, title: '档案查询', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateAdvance')
                 } }
            ]
        },
        {
            id: 2,
            title: '登记预约',
            list: [
                { id: 21, title: '不动产登记网上预约', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateAppointment')
                 } }
            ]
        },
        {
            id: 3,
            title: '信息查询',
            list: [
                { id: 31, title: '预售证信息查询', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateAdvance')
                 } },
                { id: 32, title: '预售楼盘项目查询', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateBuilding')
                 } },
                { id: 33, title: '房地产项目查询', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateProject')
                 } },
                { id: 34, title: '存量房源信息查询', handler: ()=>{ 
                    NavigationUtil.navigate(props,'EstateHousing')
                 } }
            ]
        }
    ]

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar statusBar={{backgroundColor: '#0695A3'}} title='出入境服务' hide={true}/>
                <ScrollView>
                    <Header props={props} />
                    <ListView listData={listData} />
                </ScrollView>
                
            </View>
        </Provider>
    )
}


  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#f0f0f0'
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
      listWrap: {
          paddingVertical: 5,
          paddingHorizontal: 15,
          paddingHorizontal: 0,
          backgroundColor: '#FFFFFF'
      },
      titleText: {
          fontSize: 16,
          marginLeft: 6,
      },
      ListItemText: {
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0.8,
        borderStyle: 'solid',
        fontSize: 16,
        color: '#333',
        borderRadius: 4
      },
      headerBox: {
          width: GlobalStyles.window_width,
          height: 200, 
          backgroundColor: '#97CDD8'
      },
      imagesBackground: {
        flex: 1,
        width: GlobalStyles.window_width,
        height: 200,
      },
      titleStyles: {
          marginTop: 90,
          paddingTop: 30,
          paddingLeft: 20,
          fontSize: 20,
          color: '#FFFFFF'
      },
      backBtn: {
          position: 'absolute',
          top: 30,
          left: 20,
          width: 24,
          height: 24,
      },
      backImg: {
          width: 24,
          height: 24,
      }
  })