/**
 * @description 首页-全部服务
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   ScrollView,
   TextInput,
   Image,
   TouchableOpacity,
   Platform,
} from 'react-native'

import { 
    Provider, WhiteSpace
} from '@ant-design/react-native'

import GlobalStyles from 'src/res/styles/GlobalStyles'
import ToastUtil from 'src/util/ToastUtil'
import NavigationUtil from 'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'


const LeftNav = ({currentIndex, listData, onChangeLeftNav, clickToScroll}) => {
    return (
        <ScrollView>
            <View style={styles.LeftNavBox}>
                {
                    listData && listData.map((item, i)=>(
                        <TouchableOpacity 
                            key={`${item.id}-${i}`}
                            style={
                                currentIndex == item.id ? styles.LeftNavItemActive : styles.LeftNavItem
                            }
                            activeOpacity={0.6}
                            onPress={()=>clickToScroll(item, i)}

                        >
                            <Text style={
                                currentIndex == item.id ? styles.LeftNavTextActive : styles.LeftNavText
                            }>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const RightContent = ({iconList, setScrollViews, layout, setLayout}) => {
    return (
        <ScrollView
            style={styles.contentListBox}
            ref={(view) => setScrollViews(view)}
        >
            {
                iconList && iconList.map((item, i)=>(
                    <View style={styles.RightContentBox} onLayout={event=>setLayout([...layout,event.nativeEvent.layout])}>
                        <Text style={styles.titleStyles}>{item.name}</Text>
                        <Icon list={item.list} />
                    </View>
                ))
            }
        </ScrollView>
    )
}

const Icon = ({list}) => {
    return (
        <View style={styles.IconBox}>
            {
                list && list.map((item, i)=>(
                    <TouchableOpacity 
                        style={styles.IconItem}
                        activeOpacity={0.6}
                        onPress={()=>item.hanler(item)}
                    >
                        <Image style={styles.IconImg} source={item.icon} />
                        <Text style={styles.IconText}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const MeServer = () => {
    return (
        <View style={styles.MeServerBox}>
            <View>
                <Text style={styles.MeServerTitle}>我的服务</Text>
            </View>
            <View style={styles.MeServerContent}>
                <Image style={styles.MeIcon} source={require('src/res/images/home/icon_shebao.png')} />
                <Image style={styles.MeIcon} source={require('src/res/images/home/icon_gongjijin.png')} />
                <Image style={styles.MeIcon} source={require('src/res/images/home/icon_yiyuan.png')} />
                <Image style={styles.MeIcon} source={require('src/res/images/home/icon_weizhang.png')} />
                <Image style={styles.MeIcon} source={require('src/res/images/home/icon_weizhang.png')} />
            </View>
            <View style={styles.btnBox}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                >
                    <Text style={styles.btnText}>编辑</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SearchInput = ({keyInput, setKeyInput, props}) => {
    return (
        <View style={styles.searchInputBox} >
            <View style={styles.BackBtn}>
                <TouchableOpacity 
                    activeOpacity={0.6}
                    onPress={()=>{
                        NavigationUtil.goBack(props)
                    }}
                >
                    <Image style={styles.back} source={require('src/res/images/back.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchInput}>
                <Image style={styles.searchIcon} source={require('src/res/images/ic_searc.png')} />
                <TextInput
                    style={styles.textInput}
                    autoFocus={false}
                    underlineColorAndroid="white"
                    placeholder="搜索业务"
                    placeholderTextColor="#999"
                    clearTextOnFocus={true}
                    value={keyInput}
                    clearButtonMode="while-editing"
                    onChangeText={(inputKey) => setKeyInput(inputKey)}
                ></TextInput>
            </View>
        </View>
    )
}


export default function AllServer(props){

    const [currentIndex, setCurrentIndex] = useState(1)

    const [keyInput, setKeyInput] = useState()

    const [scrollViews, setScrollViews] = useState(null)
    const [layout, setLayout] = useState([])
    const [listData, setListData] = useState([])
    const [iconList, setIconList] = useState([])

    const data = [{
            id: 1,
            name: '社保',
            list: [
                { id: 11, name: '社保卡', icon: require('src/res/images/all/sb/icon_shebao_1_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "SocialCard")
                }},
                { id: 12, name: '社保查询', icon: require('src/res/images/all/sb/icon_shebao_2_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "SocialSecurity")
                }},
                { id: 13, name: '社保经办机构', icon: require('src/res/images/all/sb/icon_shebao_3_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "SocialOrganization")
                }},
                { id: 14, name: '定点医院', icon: require('src/res/images/all/sb/icon_shebao_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "Hospitals")
                } },
                { id: 15, name: '定点药店', icon: require('src/res/images/all/sb/icon_shebao_5_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "Drugstore")
                }},
                { id: 16, name: '零报查询', icon: require('src/res/images/all/sb/icon_shebao_6_2x.png'),hanler:()=>{
                    console.log(11)
                } }
            ]
        },
        {
            id: 2,
            name: '公积金',
            list: [
                { id: 21, name: '公积金卡', icon: require('src/res/images/all/gjj/icon_gongjijin_1_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "MyGoldCard")
                }},
                { id: 22, name: '公积金查询', icon: require('src/res/images/all/gjj/icon_gongjijin_2_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "Deposite")
                }},
                { id: 23, name: '前台提取预约', icon: require('src/res/images/all/gjj/icon_gongjijin_3_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "ExtractBooking")
                }},
                { id: 24, name: '提取申请', icon: require('src/res/images/all/gjj/icon_gongjijin_4_2x.png'), hanler:()=>{
                    NavigationUtil.navigate(props, "ExtractApplicationFund")
                }},
                { id: 25, name: '预约信息查询', icon: require('src/res/images/all/gjj/icon_gongjijin_5_2x.png'), hanler:()=>{
                    console.log(11)
                }},
                { id: 26, name: '贷款信息查询', icon: require('src/res/images/all/gjj/icon_gongjijin_6_2x.png'),hanler:()=>{
                    console.log(11)
                } },
                { id: 27, name: '贷款还款明细', icon: require('src/res/images/all/gjj/icon_gongjijin_7_2x.png'),hanler:()=>{
                    console.log(11)
                } },
                { id: 28, name: '还款计划查询', icon: require('src/res/images/all/gjj/icon_gongjijin_8_2x.png'),hanler:()=>{
                    console.log(11)
                } },
                { id: 29, name: '可贷额度计算', icon: require('src/res/images/all/gjj/icon_gongjijin_9_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "ProvidentFundLoan")
                } }
            ]
        },
        {
            id: 3,
            name: '医疗服务',
            list: [
                { id: 31, name: '预约挂号', icon: require('src/res/images/all/yl/icon_yiliao_1_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "SubscribeRegist")
                } },
                { id: 32, name: '医疗机构查询', icon: require('src/res/images/all/yl/icon_yiliao_2_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "Hospitals")
                } },
                { id: 33, name: '健康证查询', icon: require('src/res/images/all/yl/icon_yiliao_3_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "HealthCertificate")

                } },
                { id: 34, name: '执业医师查询', icon: require('src/res/images/all/yl/icon_yiliao_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "MedicalPractitioners")
                } },
                { id: 35, name: '执业护士查询', icon: require('src/res/images/all/yl/icon_yiliao_5_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "MedicalPractitioners")
                } },
                { id: 36, name: '卫生许可查询', icon: require('src/res/images/all/yl/icon_yiliao_6_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "HygieneLicense")

                } },
                { id: 37, name: '新生儿预约接种', icon: require('src/res/images/all/yl/icon_yiliao_7_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "NewbornVaccinate")
                    console.log(11)
                } },
                { id: 38, name: '献血查询', icon: require('src/res/images/all/yl/icon_yiliao_8_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "DonationQuery")
                    
                } }
            ]
        },
        {
            id: 4,
            name: '车主服务',
            list: [
                { id: 41, name: '违章查询', icon: require('src/res/images/all/car/icon_chezhu_1_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "MotorVehicle")
                } },
                { id: 42, name: '机动车业务', icon: require('src/res/images/all/car/icon_chezhu_2_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "VehicleIndex")

                } },
                { id: 43, name: '驾驶证业务', icon: require('src/res/images/all/car/icon_chezhu_3_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "drivingLicenceIndex")
                } },
                { id: 44, name: '交通违法', icon: require('src/res/images/all/car/icon_chezhu_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "DriverDetails")
                } },
                { id: 45, name: '交通出行', icon: require('src/res/images/all/car/icon_chezhu_5_2x.png'),hanler:()=>{
                    console.log(11)
                } }
            ]
        },
        {
            id: 5,
            name: '教育考试',
            list: [
                { id: 51, name: '中考查询', icon: require('src/res/images/all/jy/icon_jiaoyu_1_2x.png'), 
                hanler:()=>{
                    NavigationUtil.navigate(props,'SeniorEntranceQuery')
                }},
                { id: 52, name: '高考查询', icon: require('src/res/images/all/jy/icon_jiaoyu_1_2x.png'), 
                hanler:()=>{
                    NavigationUtil.navigate(props,'CollegeEntranceQuery')
                }},
                { id: 53, name: '自考查询', icon: require('src/res/images/all/jy/icon_jiaoyu_1_2x.png'), 
                hanler:()=>{
                    NavigationUtil.navigate(props,'SelfCollegeQuery')
                }},
                { id: 54, name: '成考查询', icon: require('src/res/images/all/jy/icon_jiaoyu_1_2x.png'), 
                hanler:()=>{
                    NavigationUtil.navigate(props,'AdultCollegeQuery')
                }}
            ]
        },
        {
            id: 6,
            name: '出入境',
            list: [
                { id: 61, name: '出入境', icon: require('src/res/images/all/entry/icon_churujing_1_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "EntryExitService")
                } },
                { id: 62, name: '港澳台签注', icon: require('src/res/images/all/entry/icon_churujing_1_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "GAEndorsement")
                } },
                { id: 63, name: '进度查询', icon: require('src/res/images/all/entry/icon_churujing_1_2x.png'),hanler:()=>{
                    console.log(11)
                } }
            ]
        },
        {
            id: 7,
            name: '生活缴费',
            list: [
                { id: 71, name: '水费', icon: require('src/res/images/all/shjf/icon_shenghuo_1_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "LivePay")
                } },
                { id: 72, name: '电费', icon: require('src/res/images/all/shjf/icon_shenghuo_2_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "electricPay")

                } },
                { id: 73, name: '燃气', icon: require('src/res/images/all/shjf/icon_shenghuo_3_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "fuelPay")

                } },
                { id: 74, name: '话费充值', icon: require('src/res/images/all/shjf/icon_shenghuo_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "iphoneFee")
                } },
                { id: 75, name: '羊城通充值', icon: require('src/res/images/all/shjf/icon_shenghuo_5_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "recharge")
                } },
                { id: 76, name: '乘车码', icon: require('src/res/images/all/shjf/icon_shenghuo_6_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "CarRest")
                }
             }
            ]
        },
        {
            id: 8,
            name: '劳动就业',
            list: [
                { id: 77, name: '个人就业登记信息查询', icon: require('src/res/images/home/icon_weizhang.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "Employment")
                }},
                { id: 78, name: '个人失业登记信息查询', icon: require('src/res/images/home/icon_weizhang.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "Unemployment")
                } },
                { id: 79, name: '高校毕业生档案查询', icon: require('src/res/images/home/icon_weizhang.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "GraduateProfile")
                } },
                { id: 80, name: '人才引进进度查询', icon: require('src/res/images/home/icon_weizhang.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "TalentIntroduction")
                } },
                { id: 81, name: '专业技术资格查询', icon: require('src/res/images/home/icon_weizhang.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "ProfessionalSkill")
                } }
            ]
        },
        {
            id: 9,
            name: '其他服务', 
            list: [
                { id: 81, name: '结婚登记', icon: require('src/res/images/all/qt/icon_qita_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "MarriageService")
                } },
                { id: 82, name: '不动产网上登记', icon: require('src/res/images/all/qt/icon_qita_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "EstateAppointment")
                } },
                { id: 83, name: '就业登记', icon: require('src/res/images/all/qt/icon_qita_4_2x.png'),hanler:()=>{
                    NavigationUtil.navigate(props, "Employment")
                } },
                
            ]
        },
    ];

    useEffect(() => {
        setListData([
            { id: 1, name: '社保'},
            { id: 2, name: '公积金'},
            { id: 3, name: '车主服务'},
            { id: 4, name: '教育服务'},
            { id: 5, name: '出入境'},
            { id: 6, name: '生活缴费'},
            { id: 7, name: '劳动就业'},
            { id: 8, name: '其他服务'}
        ])
    }, [])

    useEffect(() => {
        setIconList(data)
    }, [])
    
    function onChangeLeftNav(item) {
        // setCurrentIndex(item.id)
    }

    const clickToScroll = (item, index) => {
        setCurrentIndex(item.id)
        // 其中layouot.y就是距离现在的高度位置
        const lay = index > 1 ? layout[index+1] : layout[index] 
        if(scrollViews){
            scrollViews.scrollTo({ x: 0, y: lay.y, animated: true});
        }
      }

    return (
        <Provider>
            <View style={styles.container} >
                <NavigationBar  navigator={props.navigation} popEnabled = {true} statusBar={{backgroundColor: '#FFFFFF'}} title='全部服务' hide={true}/>
                <SearchInput keyInput={keyInput} setKeyInput={setKeyInput} props={props} />
                <MeServer />
                <WhiteSpace size="lg" />
                <View style={styles.contentBody}>
                    <LeftNav currentIndex={currentIndex} listData={listData} onChangeLeftNav={onChangeLeftNav} clickToScroll={clickToScroll}/>
                    <RightContent iconList={iconList} setScrollViews={setScrollViews} layout={layout} setLayout={setLayout}/>
                </View>
            </View>
        </Provider>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    contentBody: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
    },
    LeftNavBox: {
        width: 100,
        height: GlobalStyles.window_height-100,
        backgroundColor: "#F0F0F0"
    },
    LeftNavItem: {
        alignItems: 'center',
        paddingVertical: 12
    },
    LeftNavText: {
        fontSize: 14,
        color: '#333'
    },
    LeftNavTextActive: {
        fontSize: 14,
        color: '#2F74ED'
    },
    LeftNavItemActive: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderLeftWidth: 2,
        borderLeftColor: '#2F74ED'
    },
    contentListBox: {
        width: GlobalStyles.window_width-100,
        height: GlobalStyles.window_height-150,
    },
    RightContentBox: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    titleStyles: {
        fontSize: 16,
    },
    IconBox: {
        paddingTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    IconItem: {
        width: (GlobalStyles.window_width-130)/3,
        paddingVertical: 10,
        alignItems: 'center'
    },
    IconImg: {
        width: 46,
        height: 46,
    },
    IconText: {
        paddingVertical: 6,
        fontSize: 12,
        color: '#4D4D4D'
    },
    MeServerBox: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    MeServerTitle: {
        marginRight: 10,
        fontSize: 14,
        color: '#999999',
    },  
    MeServerContent: {
        flexDirection: 'row'
    },
    MeIcon: {
        marginHorizontal: 5,
        width: 28,
        height: 28,
    },
    btnBox: {
        position: 'absolute',
        right: 15,
    },
    btnText: {
        borderRadius: 20,
        fontSize: 16,
        color: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#9296FF',
    },
    searchInputBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        // marginTop:10,
        paddingVertical:10
    },
    searchInput: {
        width: (GlobalStyles.window_width-80),
        height: (Platform.OS === 'ios') ? 30:40,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15:20,
        borderWidth: 1,
        backgroundColor:'#fff',
    },
    searchIcon: {
        position: "absolute",
        top: 7,
        left: 12,
        width: 24,
        height: 24,
        tintColor:'#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 36:40,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 40,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 14,
        alignItems: 'center',
        color: '#999',
    },
    BackBtn: {
        paddingTop: 5,
        marginRight: 10,
        width: 36,
        height: 36,
        alignItems: 'center'
    },
    back: {
        width: 28,
        height: 28,
    }
})