/**
 * @description 我的社保卡index
 * @author 择天团队 
*/
import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { 
    List,
    WhiteSpace,
 } from '@ant-design/react-native';

import ComplexNavigationBar from 'src/component/ComplexNavigationBar'
import LinearGradient from 'react-native-linear-gradient'
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationUtil from 'src/util/NavigationUtil'


const Title = ({title}) => {
    const bottomColor = `rgba(134, 106, 255, ${1})`
    const maskColor = `rgba(47, 116, 237, ${1})`
    return (
        <List style={styles.ListBox} styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}} >
            <List.Item styles={{Line: {borderBottomWidth: 0}}}>
                <LinearGradient 
                    colors={[maskColor, bottomColor]} 
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} 
                    locations={[0, 0.75]} 
                    style={styles.linearGradient}>
                </LinearGradient>
                <Text style={{marginLeft: 8, fontSize: 16}}>{title}</Text>
            </List.Item>
        </List>
    )
}

const BaseServer = ({listData}) => {
    return (
        <View style={styles.socialContainer}>
            <Title title="常用服务" />
            <SocialSecurityItem listItem={listData} />
        </View>
    )
}

const OtherServer = ({listData}) => {
    return (
        <View style={styles.socialContainer}>
            <Title title="其他服务" />
            <OtherSocialSecurityItem listItem={listData} />
        </View>
    )
}

const OtherSocialSecurityItem = ({listItem}) => {
    return (
        <View style={styles.socialBox1}>
                {
                    listItem && listItem.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={'other_'+i}
                            style={styles.socialItem1}
                            onPress={item.handler}
                        >
                            <Text style={styles.titleText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
        </View>
    )
}

const SocialSecurityItem = ({listItem}) => {
    return (
        <View style={styles.socialBox}>
                {
                    listItem && listItem.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={'item_'+i} 
                            style={styles.socialItem}
                            onPress={item.handler}
                        >
                            <Image source={item.icon} style={styles.iconImg} />
                            <Text style={styles.titleText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
        </View>
    )
}

const SocialNav = ({listData}) => {
    return (
        <View style={styles.navBox}>
            {
                listData && listData.map((item, index)=>(
                    <TouchableOpacity 
                        style={styles.navItem}
                        key={'nav_'+index}
                        activeOpacity={0.8}
                        onPress={item.handler}
                    >
                        <Image source={item.icon} style={styles.navIconImg} />
                        <Text style={styles.navTitleText}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default function SocialSecurityIndex(props) {
   // const imgList = ["../../../res/images//home/shebao/bg.png"]
    const listData = [
        { 
            title: '定点医院', 
            icon: require('src/res/images/home/shebao/icon_13x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'Hospitals')}
        },
        { 
            title: '定点药店', 
            icon: require('src/res/images/home/shebao/icon_23x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'Drugstore')}
        },
        { 
            title: '社保经办机构', 
            icon: require('src/res/images/home/shebao/icon_33x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'SocialOrganization') }
        },
        { 
            title: '社保卡申领', 
            icon: require('src/res/images/home/shebao/icon_43x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'SocialSecurityApply')}
        },
        { 
            title: '零报处理查询', 
            icon: require('src/res/images/home/shebao/icon_53x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'')}
        },
    ]

    const listData1 = [
        { title: '社保关系转移查询', handler: ()=>{NavigationUtil.navigate(props,'SocialCard') }},
        { title: '社会化管理退休人员信息查询', handler: ()=>{NavigationUtil.navigate(props,'SocialCard') }},
    ]

    const navList = [
        { 
            title: '电子社保卡', 
            icon: require('src/res/images/home/shebao/icon_shebao_ka3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'SocialCard')}
        },
        { 
            title: '社保查询', 
            icon: require('src/res/images/home/shebao/icon_shebao_chaxun3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'SocialSecurityInfo')}
        },
        { 
            title: '个人信息', 
            icon: require('src/res/images/home/shebao/icon_shebao_xinxi3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props,'') }
        },
    ]
        
    return (
        <View style={styles.container}>
            <ScrollView>
                <ComplexNavigationBar 
                    title='社保'  
                    image={require('src/res/images//home/shebao/bg.png')}
                    props={props}/>
                <SocialNav listData={navList} />
                <BaseServer listData={listData}/>
                <OtherServer listData={listData1} />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
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
    socialContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    ListBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    socialBox: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection:'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    iconImg: {
        width: 32,
        height: 32
    },
    titleText: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#333'
    },
    socialItem: {
        width: (GlobalStyles.window_width-50)/2,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialBox1: {
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    socialItem1: {
        flex: 1,
        paddingVertical: 5,
    },
    navBox: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    navItem: {
        flex: 1,
        alignItems: 'center'
    },
    navIconImg: {
        width: 50,
        height: 50,
        marginVertical: 5
    },
    navTitleText: {
        paddingVertical: 5,
        color: '#333'
    }
 
});

