/**
 * @description 我的页面
 * @author 择天团队
 * 
 * **/
import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   Image,
   ImageBackground,
   TouchableOpacity,
   ScrollView,
   DeviceEventEmitter
} from 'react-native'

import { Auth } from 'src/common/Auth' 

import { 
    Flex,
    List,
    WhiteSpace,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationUtil from 'src/util/NavigationUtil';
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';

/**
 * @description 我的头部组件
 * @author Jonne
 */

const  Header = ({user, onPersonalInfo, onSetting}) => {
  return  (
      <View>
          <ImageBackground 
            resizeMode='stretch'
            style={styles.imagesBackground}
            source={require('../res/images/common/bg.png')}>
              <Image 
                style={styles.headerImg}
                resizeMode='stretch'
                source={require('../res/images/me/me_bg_img.png')} />
                <View style={styles.headerContent}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={onPersonalInfo}
                    >
                    <Flex style={{marginTop: 15}}>
                        <Flex.Item style={{flex: 0.4}}>
                                {
                                  user.photoUrl ? <Image style={styles.headPicture} source={{uri: user.photoUrl}} /> : <Image style={styles.headPicture} source={require('../res/images/me/header.png')} />
                                }
                        </Flex.Item>
                        <Flex.Item>
                            <Text numberOfLines={2} style={styles.nameStyles}>{user.name}</Text>
                            <View style={styles.renzhen}>
                              {
                                user.realName ? <Image source={require('../res/images/me/icon_rz.png')} style={{width: 15, height: 15}} /> :  <Image source={require('../res/images/me/icon_rza.png')} style={{width: 15, height: 15}} />
                              }
                              <Text style={user.realName ? styles.rzTextActive : styles.rzText}>{user.realName ? '已实名':'未认证'}</Text>
                            </View>
                            <View style={styles.setBox}>
                              <TouchableOpacity
                                style={styles.realNameBox}
                                activeOpacity={0.8}
                                onPress={onSetting}
                              >
                                <Image source={require('../res/images/me/icon_set.png')} style={{width: 21, height: 21}}/>
                                <Text style={{fontSize: 14, color: '#ffffff', marginLeft: 2}}>设置</Text>
                              </TouchableOpacity>
                            </View>
                        </Flex.Item>
                    </Flex>
                    </TouchableOpacity>
                </View>
          </ImageBackground>
      </View>
  );
}

/**
 * @description 我的导航组件
 * @author Jonne
 */
const MeNavigator = ({navList}) => {
   return (
      <View style={styles.meNavBody} >
        <View style={styles.meNavContent}>
          <Flex style={styles.navItems}>
              {
                 navList && navList.map((item, index) => (
                  <Flex.Item key={index}>
                    <TouchableOpacity
                      style={styles.navItem}
                      onPress={item.onPress}
                    >
                      <Image source={item.icon} style={styles.imgIcon} />
                      <Text style={styles.imgText}>{item.name}</Text>
                    </TouchableOpacity>
                  </Flex.Item>
                 ))
              }
          </Flex>
        </View>
      </View>
   );
}

const ListView = ({list}) => {
   return (
    <View style={styles.meNavBody1} >
      <View style={styles.contentBody}>
          <List 
            styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}
          >
            {
              list && list.map((item, index)=>(
                <List.Item
                  styles={{Line: {borderBottomWidth: 0}}}
                  extra={
                    <Text style={styles.extraStyle}>{item.text||''}</Text>
                  }
                  arrow={item.arrow ? item.arrow:''}
                  onPress={item.onPress}
                >
                  <View style={{flexDirection: 'row'}}>
                      <Image source={item.icon} style={styles.navIcon} />
                      <Text style={styles.listItemText}>{item.name}</Text>
                  </View>
                </List.Item>
              ))
            }
          </List>
        </View>
      </View>
   );
}

/**
 * @description 我的主组件
 * @author Jonne
 */

export default function MyComponent(props) {
    const [user, setUser] = useState({
       name: '未登录',
       photoUrl: null
    })
    const [auth, setAuth] = useState('未实名')
    const [phone, setphone] = useState('')

    DeviceEventEmitter.addListener('refresh', ()=>{
      getUserInfo()
    });

    useEffect(() => {
      getUserInfo()
    }, [user])

    const getUserInfo = () => {
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                  setUser(data)
                  setAuth(data.realName?'已实名':'未实名')
                  setphone(data.phone)
                }
            }).catch(error=>{
                LogUtil.debug(error)
            });
    }

    const navList = [
      { 
        name: '我的预约', 
        icon: require('../res/images/me/icon_yy.png'),
        onPress: () => {
          NavigationUtil.navigate(props, 'MyAppointment')
        }
      },
      { 
        name: '我的申办', 
        icon: require('../res/images/me/icon_sb.png'), 
        onPress: () => {
              
        } 
      },
      { 
        name: '我的证照', 
        icon: require('../res/images/me/icon_zz.png'),
        onPress: () => {
              NavigationUtil.navigate(props,'License')
        }
      },
      { 
        name: '我的收藏', 
        icon: require('../res/images/me/icon_sc.png'),
        onPress: () => {
              
        }
      }
  ];

  const listData = [
     {
        name: '个人信息',
        icon: require('../res/images/me/icon_01.png'),
        arrow: "horizontal",
        text: auth,
        onPress: () => {
          NavigationUtil.navigate(props, "PersonalInfo")
        }
     },
     {
        name: '账号安全',
        icon: require('../res/images/me/icon_02.png'),
        arrow: "horizontal",
        onPress: () => {
          NavigationUtil.navigate(props, "AccountSecurity", {phone: phone})
        }
    },
    {
      name: '切至企业服务',
      icon: require('../res/images/me/icon_03.png'),
      arrow: "horizontal",
      text: '企业办事必备',
      onPress: () => {   
      }
   }
  ]

  
  const listData1 = [
    {
       name: '分享政务通',
       icon: require('../res/images/me/icon_04.png'),
       arrow: "horizontal",
       onPress: () => {
        
       }
    },
    {
       name: '关于我们',
       icon: require('../res/images/me/icon_05.png'),
       arrow: "horizontal",
       onPress: () => {
        
       }
   },
   {
     name: '意见反馈',
     icon: require('../res/images/me/icon_06.png'),
     arrow: "horizontal",
     onPress: () => {
      
     }
  }
 ]

  const onSetting = () => {
     NavigationUtil.navigate(props, 'Setting')
  }

  const onPersonalInfo = () => {
    Auth.isLogin(props, ()=>{
      NavigationUtil.navigate(props, 'PersonalInfo')
    })
  }

  return (
    <View style={styles.container} >
        <NavigationBar 
          statusBar={{backgroundColor: '#2F74ED', barStyle: 'light-content', translucent: false}}
          hide={true}
        />
        <ScrollView>
            <Header user={user} onSetting={onSetting} onPersonalInfo={onPersonalInfo} />
            <MeNavigator navList={navList}  />
            <ListView list={listData}/>
            <ListView list={listData1}/>
            <Text style={styles.footerText}>广州市政务服务数据管理局主办</Text>
        </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    imagesBackground: {
      flex: 1,
      width: GlobalStyles.window_width,
      height: 160
    },
    headerImg: {
       position: 'absolute',
       zIndex: 0,
       width: GlobalStyles.window_width,
    },
    headerContent: {
       position: 'absolute',
       zIndex: 9,
       top: 0,
       left: 0,
       padding: 20, 
       width: GlobalStyles.window_width - 40,
       height: 120,
       backgroundColor: 'rgba(255,255,255,0)'
    },
    headPicture: {
       width:  70,
       height: 70,
       borderRadius: 40
    },
    nameStyles: {
      width: 150,
      fontSize: 21,
      color: '#ffffff'
    },
    renzhen: {
      marginTop: 5,
      flexDirection: 'row',
      width: 70,
      paddingTop: 2,
      paddingBottom: 2,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 9,
      borderBottomRightRadius: 9,
      justifyContent: 'center',
      backgroundColor: '#E7F0FF',
    },
    rzTextActive: {
      marginLeft: 5,
      fontSize: 12,
      color: '#2F74ED',
    },
    rzText: {
      marginLeft: 5,
      fontSize: 12,
      color: '#848484',
    },
    setBox: {
      position: 'absolute',
      width: 80,
      height: 28,
      zIndex: 99,
      right: -40,
      top: -10
    },
    meNavBody: {
      marginTop: -30,
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: 'rgba(255,255,255,0)'
    },
    meNavContent: {
      borderRadius: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 25,
      backgroundColor: '#ffffff',
    },
    imgIcon: {
      width: 36,
      height: 36,
      alignItems: 'center'
    },
    navItems: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgText: {
      marginTop: 5,
      fontSize: 14,
      color: '#333'
    },
    contentBody: {
       paddingTop: 15,
       paddingBottom: 15,
       backgroundColor: 'white',
       borderRadius: 10
    },
    listItemText: {
        fontSize: 15,
        marginTop: 4,
        marginLeft: 8,
        paddingTop: 5,
        paddingBottom: 5
    },
    meNavBody1: {
      marginTop: -15,
      padding: 15,
    },
    footerText: {
      paddingTop: 10,
      paddingBottom: 20,
      alignItems: 'center',
      fontSize: 14,
      textAlign:'center',
      color: '#cccccc'
    },
    navIcon: {
      marginTop: 9,
      width: 21, 
      height: 21,
    },
    extraStyle: {
       fontSize: 14,
       color: '#ccc'
    },
    realNameBox: {
      flexDirection: 'row', 
      justifyContent: 'flex-end',
      flex: 1
    }
});