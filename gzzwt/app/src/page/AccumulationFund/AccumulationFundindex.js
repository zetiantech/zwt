/**
 * @description 公积金
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

const BaseServer = ({title, listData}) => {
    return (
        <View style={styles.socialContainer}>
            <Title title={title} />
            <AccumulationItem listItem={listData} />
        </View>
    )
}

const OtherServer = ({listData}) => {
    return (
        <View style={styles.socialContainer}>
            <Title title="预约服务" />
            <OtherItem listItem={listData} />
        </View>
    )
}

const OtherItem = ({listItem}) => {
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

const AccumulationItem = ({listItem}) => {
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
                            { item.icon && <Image source={item.icon} style={styles.iconImg} /> }
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


export default function AccumulationFundindex(props) {
    //const imgList = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570797879881&di=ee74d4ca8a2b11e551fa7717e80e48c8&imgtype=0&src=http%3A%2F%2Fimages.maxlaw.cn%2Fuploadpic%2F10752%2F2018102659581589.jpg'];
    
    const listData = [
        { 
            title: '贷款信息查询', 
            icon: require('src/res/images//home/gMPF/icon_13x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '贷款还款明细', 
            icon: require('src/res/images//home/gMPF/icon_23x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '还款计划', 
            icon: require('src/res/images//home/gMPF/icon_33x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '') }
        },
        { 
            title: '可贷款额度计算', 
            icon: require('src/res/images//home/gMPF/icon_43x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'ProvidentFundLoan')}
        },
        { 
            title: '账户余额查询', 
            icon: require('src/res/images//home/gMPF/icon_53x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
    ]

    const listData1 = [
        { title: '住房公积金单位账户设立预约', handler: ()=>{NavigationUtil.navigate(props, '') }},
        { title: '住房公积金单位账户注销预约', handler: ()=>{NavigationUtil.navigate(props, '') }},
        { title: '降低住房公积金缴存比例或缓缴申请预约', handler: ()=>{NavigationUtil.navigate(props, '') }},
        { title: '年度调整预约', handler: ()=>{NavigationUtil.navigate(props, '') }},
    ]

    const listData2 = [
        { title: '自愿账户封存', handler: ()=>{NavigationUtil.navigate(props, 'AccountSealFund') }},
        { title: '自愿账户启封', handler: ()=>{NavigationUtil.navigate(props, '') }},
        { title: '自愿账户汇缴', handler: ()=>{NavigationUtil.navigate(props, 'AccountPayFund1') }},
        { title: '自愿账户补缴', handler: ()=>{NavigationUtil.navigate(props, 'AccountPayFund') }},
    ]

    const navList = [
        { 
            title: '公积金查询', 
            icon: require('src/res/images//home/gMPF/icon_gjj_chaxun3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'Deposite')}
        },
        { 
            title: '提取申请', 
            icon: require('src/res/images//home/gMPF/icon_gjj_tiqu3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'ExtractApplicationFund')}
        },
        { 
            title: '预约查询', 
            icon: require('src/res/images//home/gMPF/icon_gjj_yuyue3x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'ExtractBooking') }
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView>
                <ComplexNavigationBar 
                    title='公积金'  
                    image={require('src/res/images//home/gMPF/bg.png')}
                    props={props}/>
                <SocialNav listData={navList} />
                <BaseServer title="公积金贷款" listData={listData}/>
                <OtherServer listData={listData1} />
                <BaseServer title="其他服务" listData={listData2}/>
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
