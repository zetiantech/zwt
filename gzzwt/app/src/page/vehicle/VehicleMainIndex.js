/**
 * @description 车主服务
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

const BaseServer = ({title, listData, subListData}) => {
    return (
        <View style={styles.socialContainer}>
            <Title title={title} />
            <VehicleMainItem listItem={listData} subList={subListData}/>
        </View>
    )
}

const VehicleMainItem = ({listItem, subList}) => {
    return (
        <>
            <View style={styles.socialBox}>
                    {
                        listItem && listItem.map((item, i) => (
                            <TouchableOpacity
                                activeOpacity={0.6}
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
            <View style={styles.socialBox1}>
            {
                subList && subList.map((item, i) => (
                    <TouchableOpacity
                        activeOpacity={0.6}
                        key={'item_'+i} 
                        style={((i+1)%2==0)?styles.socialItem2 : (i==(subList.length-1))? styles.socialItem3 : styles.socialItem1}
                        onPress={item.handler}
                    >   
                        <Text style={styles.titleText1}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
            </View>
        </>
    )
}

const VehicleNav = ({listData}) => {
    return (
        <View style={styles.navBox}>
            {
                listData && listData.map((item, index)=>(
                    <TouchableOpacity 
                        style={styles.navItem}
                        key={'nav_'+index}
                        activeOpacity={0.6}
                        onPress={item.handler}
                    >
                        <Image source={item.icon} style={styles.navIconImg} />
                        <View style={styles.navTitleBox}>
                            <Text style={styles.navTitleText}>{item.title}</Text>
                            <Text style={styles.navTitleText1}>{item.subTitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


export default function VehicleMainIndex(props) {
   // const imgList = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570797879881&di=ee74d4ca8a2b11e551fa7717e80e48c8&imgtype=0&src=http%3A%2F%2Fimages.maxlaw.cn%2Fuploadpic%2F10752%2F2018102659581589.jpg'];
    
    const listData = [
        { 
            title: '机动车状态查询', 
            icon: require('../../../src/res/images/home/chezhu/icon_63x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '年审预约', 
            icon: require('../../../src/res/images/home/chezhu/icon_23x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '新车上牌预约', 
            icon: require('../../../src/res/images/home/chezhu/icon_33x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '') }
        },
        { 
            title: '补换领车牌', 
            icon: require('../../../src/res/images/home/chezhu/icon_43x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'ProvidentFundLoan')}
        },
        { 
            title: '申请临时车牌', 
            icon: require('../../../src/res/images/home/chezhu/icon_53x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
    ]

    const subListData = [
        { title: '补换领登记证书',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '补换领合格标志',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '转移登记',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '委托核发机动车检验合格标志',  handler: ()=>{ NavigationUtil.navigate(props, '')}}
    ]

    const listData1 = [
        { 
            title: '驾驶证状态查询', 
            icon: require('../../../src/res/images/home/chezhu/icon_63x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '换领驾驶证', 
            icon: require('../../../src/res/images/home/chezhu/icon_73x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '规定年龄换证', 
            icon: require('../../../src/res/images/home/chezhu/icon_83x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '') }
        },
        { 
            title: '有效期满换证', 
            icon: require('../../../src/res/images/home/chezhu/icon_93x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'ProvidentFundLoan')}
        }
    ]
    const subListData1 = [
        { title: '转入换证',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '自愿降低准驾车型换证',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '毁坏换证',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '驾驶人信息发生变化换证',  handler: ()=>{ NavigationUtil.navigate(props, '')}},
        { title: '提交驾驶人身体条件证明',  handler: ()=>{ NavigationUtil.navigate(props, '')}}
    ]

    const listData2 = [
        { 
            title: '占道施工查询', 
            icon: require('../../../src/res/images/home/chezhu/icon_103x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '公路养护查询', 
            icon: require('../../../src/res/images/home/chezhu/icon_113x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '')}
        },
        { 
            title: '停车场查询', 
            icon: require('../../../src/res/images/home/chezhu/icon_123x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, '') }
        }
    ]

    const navList = [
        { 
            title: '驾驶证', 
            subTitle: '电子证照',
            icon: require('../../../src/res/images/home/chezhu/icon_license2x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'DrivingCard')}
        },
        { 
            title: '违法查询',
            subTitle: '交通违法', 
            icon: require('../../../src/res/images/home/chezhu/icon_inquiries2x.png'), 
            handler: ()=>{ NavigationUtil.navigate(props, 'MotorVehicle')}
        }
    ]

    return (
        <View style={styles.container}>
            <ScrollView>
                <ComplexNavigationBar 
                    title='车主服务'  
                    image={require('../../../src/res/images/home/chezhu/bg.png')}
                    props={props}/>
                <VehicleNav listData={navList} />
                <BaseServer title="机动车业务" listData={listData} subListData={subListData}/>
                <BaseServer title="驾驶证业务" listData={listData1} subListData={subListData1}/>
                <BaseServer title="交通出行" listData={listData2}/>
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
    titleText1: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#999'
    },
    socialItem: {
        width: (GlobalStyles.window_width-50)/2,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialBox1: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection:'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    socialItem1: {
        width: (GlobalStyles.window_width-100)/2,
        paddingVertical: 5,
    },
    socialItem2: {
        width: (GlobalStyles.window_width)/2,
        paddingVertical: 5,
    },
    socialItem3: {
        width: GlobalStyles.window_width-40,
        paddingVertical: 5,
    },
    navBox: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    navIconImg: {
        width: 50,
        height: 50,
        marginVertical: 5
    },
    navTitleBox: {
        paddingHorizontal: 10,
    },
    navTitleText: {
        paddingVertical: 2,
        fontSize: 16,
        color: '#333333'
    },
    navTitleText1: {
        paddingVertical: 2,
        fontSize: 14,
        color: '#666666'
    }
 
});
