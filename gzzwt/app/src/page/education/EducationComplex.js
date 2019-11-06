/**
 * @description 教育综合页
 * @author caroline
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {
    Provider,
    List,
    WhiteSpace,
    Icon
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar'
import ComplexNavigationBar from 'src/component/ComplexNavigationBar'
import GlobalStyles from '../../res/styles/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient';
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
const bottomColor = `rgba(134, 106, 255, ${1})`
const maskColor = `rgba(47, 116, 237, ${1})`

function TitleBar ({ title }) {
    return (
        <List styles={{ Body: { borderTopWidth: 0 }, BodyBottomLine: { borderBottomWidth: 0 } }} >
            <List.Item styles={{ Line: { borderBottomWidth: 0 } }}>
                <LinearGradient
                    colors={[maskColor, bottomColor]}
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                    locations={[0, 0.75]}
                    style={styles.linearGradient}>
                </LinearGradient>
                <Text style={styles.titleFontStyle}>{title}</Text>
            </List.Item>
        </List>
    )
}

function SearchList ({ data, props }) {
    return (
        <>
            <View>
                <TitleBar title="查询" />
                <View style={styles.searchListBox}>
                    {
                        data && data.map((d, index) => {
                            return (
                                <View style={styles.searchListItem} key={index}>
                                    <TouchableOpacity onPress={() => { NavigationUtil.navigate(props, d.page) }}>
                                        <View style={styles.searchItem} >
                                            <View style={styles.searchIcon}>
                                                <Image source={d.iconImg} style={{ height: 29, width: 26, marginTop: 25, marginLeft: 15 }} resizeMode="cover" />
                                            </View>
                                            <View style={styles.searchText}>
                                                <View><Text style={{ fontSize: 16, color: 'rgba(51, 51, 51, 1)' }}>{d.title}</Text></View>
                                                <View><Text style={{ fontSize: 12, color: 'rgba(153, 153, 153, 1)' }}>{d.remarks}</Text></View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </>
    )
}
function FontList ({ data, props }) {
    return (
        <>
            <View>
                <TitleBar title={data.title} />
                <View style={styles.FontListBox}>
                    {
                        data.list && data.list.map((d, index) => {
                            return (
                                <View style={styles.FontListItem} key={index}>
                                    <View style={styles.FontListItemTitle}>
                                        <Text style={styles.titleFontStyle}>{d.title} </Text>
                                        {(index % 2 === 0) ? <View style={{ flex: 1, }}><Text style={{ fontSize: 15, lineHeight: 24, textAlign: 'right', color: 'rgba(230, 230, 230, 1)', }}>|</Text></View> : null}
                                    </View>
                                    <View style={styles.itemFontBox}>
                                        {d.list && d.list.map((item, itemIndex) => {
                                            return (
                                                <View style={styles.itemFont} key={itemIndex}>
                                                    <Text style={{ marginLeft: 8, fontSize: 14, color: 'rgba(47, 116, 237, 1)' }} onPress={() => { NavigationUtil.navigate(props, item.page) }}>{item.name}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </>
    )
}
function ImageList ({ data, props }) {
    return (
        <>
            <View>
                <TitleBar title={data.title} />
                <View style={styles.imageListBox}>
                    {
                        data.list && data.list.map((d, index) => {
                            return (
                                <View style={styles.imageListItem} key={index}>
                                    <TouchableOpacity onPress={() => { NavigationUtil.navigate(props, d.page) }}>
                                        <View style={styles.imageItem} >
                                            <View style={styles.imageIcon}>
                                                <Image source={d.iconImg} style={{ height: 40, width: 40, marginTop: 10, marginLeft: 35 }} resizeMode="contain" />
                                            </View>
                                            <View style={styles.imageText}>
                                                <Text style={{ fontSize: 14, color: 'rgba(51, 51, 51, 1)', textAlign: "center" }}>{d.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </>
    )
}
export default function EducationComplex (props) {
    const [searchList, setSearchList] = useState([
        {
            title: '高考查询',
            remarks: '成绩、考场座位',
            iconImg: require('src/res/images/education/icon_search_gaokao.png'),
            page: 'CollegeEntranceQuery'
        },
        {
            title: '中考查询',
            remarks: '成绩、考场座位',
            iconImg: require('src/res/images/education/icon_search_zhongkao.png'),
            page: 'SeniorEntranceQuery'
        },
        {
            title: '成考查询',
            remarks: '成绩、考场座位',
            iconImg: require('src/res/images/education/icon_search_chengkao.png'),
            page: 'AdultCollegeQuery'
        }, {
            title: '自考查询',
            remarks: '成绩、考场座位',
            iconImg: require('src/res/images/education/icon_search_zikao.png'),
            page: 'SelfCollegeQuery'
        },
    ])
    const [enrollList, setEnrollList] = useState({
        title: '招生报名',
        list: [{
            title: '公办小学',
            list: [{
                name: '招生信息',
                page: 'PublicPrimarySchool',
            }, {
                name: '报名入口',
                page: 'PublicPrimarySchool',
            }]
        }, {
            title: '民办小学',
            list: [{
                name: '招生信息',
                page: 'PrivatePrimarySchools',
            }, {
                name: '报名入口',
                page: 'PublicPrimarySchool',
            }]
        }, {
            title: '公办初中',
            list: [{
                name: '招生信息',
                page: 'PrivatePrimarySchools',
            }, {
                name: '报名入口',
                page: 'PublicPrimarySchool',
            }]
        }, {
            title: '民办初中',
            list: [{
                name: '招生信息',
                page: 'PrivatePrimarySchools',
            }, {
                name: '报名入口',
                page: 'PublicPrimarySchool',
            }]
        }]
    })
    const [otherList, setOtherList] = useState({
        title: '其他',
        list: [
            {
                title: '幼小中学校年检',
                page: 'PrivatePrimarySchools',
                iconImg: require('src/res/images/education/icon_others_nianjian.png'),
            }, {
                title: '市校车登记查询',
                page: 'CitySchoolBus',
                iconImg: require('src/res/images/education/icon_others_dengji.png'),
            }, {
                title: '校车信息查询',
                page: 'SchoolBus',
                iconImg: require('src/res/images/education/icon_others_xinxi.png'),
            }
        ]
    })
    //滚动事件触发
    const [opacityPercent, setOpacityPercent] = useState(true)
    return (
        <Provider>
            <ScrollView style={styles.container}>
                <ComplexNavigationBar
                    title='教育考试'
                    props={props}
                    image={require('src/res/images/education/bg.png')}
                />
                <SearchList data={searchList} props={props} />
                <WhiteSpace size="lg" />
                <FontList data={enrollList} props={props} />
                <WhiteSpace size="lg" />
                <ImageList data={otherList} props={props} />
                <WhiteSpace size="lg" />

            </ScrollView>
        </Provider >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
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
    searchListBox: {
        padding: 5,
        paddingBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    searchListItem: {
        width: '50%',
        padding: 3,
        borderRadius: 10,
        height: 80
    },
    searchItem: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(47, 116, 237, .1)',
        flexDirection: 'row',
    },
    searchIcon: {
        width: 55,
        height: 80,
    },
    searchText: {
        paddingTop: 19,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'space-between'
    },

    FontListBox: {
        padding: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },
    FontListItem: {
        width: '50%',
        minHeight: 50,
        paddingBottom: 10
        // backgroundColor: 'red'
    },
    FontListItemTitle: {
        height: 36,
        paddingTop: 6,
        width: '100%',
        backgroundColor: 'rgba(248, 250, 254, 1)',
        flexDirection: 'row',

    },
    itemFontBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemFont: {
        padding: 2,
        paddingTop: 10,
        minWidth: '50%',
        paddingBottom: 6,
    },
    titleFontStyle: {
        marginLeft: 8,
        fontSize: 16,
    },
    imageListBox: {
        padding: 5,
        paddingTop: 0,
        paddingBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    imageListItem: {
        width: '33%',
        height: 85,
    },
    imageItem: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    imageIcon: {
        width: '100%',
        height: 30,
        marginBottom: 10
    },
    imageText: {
        margin: 'auto',
        marginTop: 15,
        minHeight: 30,
        width: '100%',
        textAlign: "center"
    }

});