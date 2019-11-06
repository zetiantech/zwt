/**
 * @description 我的证照
 * @author 择天团队
 * 
 * **/

import React, { Component } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   ScrollView,
   ImageBackground,
   Image,
   TouchableOpacity,
   TouchableHighlight
} from 'react-native'
import GlobalStyles from 'src/res/styles/GlobalStyles'

import ToastUtil from 'src/util/ToastUtil'
import NavigationUtil from 'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'



const License = ({licenseData, onClickLicense}) => {
    return (
        <View>
            <View style={styles.licenseBox} >
                {
                    licenseData && licenseData.map((item, i)=>(
                        <TouchableOpacity 
                            activeOpacity={0.9}
                            style={{flex:1}}
                            onPress={onClickLicense}
                        >
                            <View style={styles.licenseBody}>
                                <ImageBackground 
                                    resizeMode='stretch' 
                                    style={styles.imageBg} 
                                    source={item.bg}>
                                    <Image style={styles.imgBox} source={item.icon}></Image>
                                    <View style={{marginTop:30}}>
                                        <Text style={styles.licenseTitle}>{item.title}</Text>
                                        <Text style={styles.licenseText}>{item.content}</Text>
                                        <Text style={styles.licenseText}>{item.number}</Text>
                                    </View>
                                </ImageBackground>                                                                      
                            </View>
                        </TouchableOpacity>
                    ))
                }                      
            </View> 
        </View>
    )
}

const AddLicense = ({onAddLicense}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
                underlayColor='transparent'
                onPress={onAddLicense}>
                <View style={{paddingRight: 15}}>
                    <Image source={require('src/res/images/home/icon_add.png')} style={styles.IconBox} />
                </View>
            </TouchableHighlight>
        </View>
    )
}


export default function MyLicense(props){
    const licenseData = [
        { 
            id: 1,
            bg: require('src/res/images/home/card_bg_1.png'),
            icon: require('src/res/images/home/icon_zz_1.png'),
            title: '社会保障卡',
            content: '广东省人力资源和社会保障厅',
            number: '306************5666'
        },
        { 
            id: 2,
            bg: require('src/res/images/home/card_bg_3.png'),
            icon: require('src/res/images/home/icon_zz_2.png'),
            title: '电子身份证',
            content: '广东省公安厅交通管理员',
            number: '306************5666'
        },
        { 
            id: 3,
            bg: require('src/res/images/home/card_bg_2.png'),
            icon: require('src/res/images/home/icon_zz_3.png'),
            title: '公积金',
            content: '广州市住房公积金管理中心',
            number: '306************5666'
        },
        { 
            id: 4,
            bg: require('src/res/images/home/card_bg_4.png'),
            icon: require('src/res/images/home/icon_zz_4.png'),
            title: '驾驶证',
            content: '广州市公安局',
            number: '未领取'
        }
    ]
    
    
    const onAddLicense = () =>{
        ToastUtil.toast("添加证件页面")
    }

    const onClickLicense = () => {
        
    }


    return (
        <View style={styles.container}>
            <NavigationBar 
                navigator={props.navigation}
                popEnabled = {true}
                title='我的证照'
                rightButton={
                    <AddLicense onAddLicense={onAddLicense}/>
                }
                hide={false}/>
            <ScrollView >
                <License licenseData={licenseData} onClickLicense={onClickLicense} />
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    licenseBox: {
        marginTop: 15,
        marginHorizontal: 10,
        marginBottom: 60,
        flexDirection: 'column'
    },
    licenseBody: {
        width: GlobalStyles.window_width-20,
        height: 145,
    },
    imageBg: {
        width: GlobalStyles.window_width-20,
        height: 145,
        flexDirection:'row',
    },
    licenseTitle: {
        fontSize: 16,
        paddingBottom: 5,
        color: '#fff'
    },
    imgBox: {
        width: 40,
        height: 40,
        margin: 30,
    },
    licenseText: {
        paddingVertical: 3,
        color:'#fff',
    },

    IconBox: {
        width: 26,
        height: 26
    }

});