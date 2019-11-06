/**
 * @description 社保经办机构
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {
    Button,
    List,
    Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationUtil from 'src/util/NavigationUtil';
import HttpUtil from 'src/util/HttpUtil';
import { API } from 'src/api/Api';
import ToastUtil from 'src/util/ToastUtil'; // 轻提示


const Card = ({ data, onclick }) => {
    return (
        <View style={{ marginTop: 10 }}>
            {data && data.map((item, i) => (
                <TouchableOpacity style={styles.cardwarp} onPress={onclick}>
                    <View style={{ margin: 20 }}>
                        <Text style={styles.titleCard}>{item.title}</Text>
                        <View style={styles.textCard}>
                            <Image style={{ marginRight: 10, width: 18, height: 18 }} source={require('src/res/images/common/icon_phone.png')} ></Image>
                            <Text>{item.iphon}</Text>
                        </View>
                        <View style={styles.textCard}>
                            <Image style={{ marginRight: 10, width: 18, height: 18 }} source={require('src/res/images/common/icon_address.png')} ></Image>
                            <Text>{item.arrd}</Text>
                        </View>
                    </View>
                    <Image style={styles.skip} source={require('src/res/images/ic_tiaozhuan.png')} ></Image>
                </TouchableOpacity>
            ))
            }
        </View>

    )
}
//搜索框
const Serch = ({ value, setValue }) => {
    return (
        <View style={styles.serchwarp}>
            <View style={styles.address}>
                <Text>全市</Text>
                <Image source={require('src/res/images/ic_tiaozhuan_down.png')}></Image>
            </View>
            <View style={styles.searchInputBox}>
                <Image style={styles.searchIcon} source={require('src/res/images/ic_searc.png')} />
                <TextInput
                    style={styles.textInput}
                    placeholder="搜索业务"
                    autoFocus={false}
                    underlineColorAndroid="white"
                    placeholderTextColor="#999"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                ></TextInput>
            </View>
        </View>
    )
}

export default function Socialdetial(props) {
    const [keyInput, setKeyInput] = useState({
        bankTypeId: '',
        areaId: ''
    })

    const [data, setData] = useState([
        {
            title: '广州市社会保障基金管理中心',
            iphon: '202-83555533',
            arrd: '广州市荔湾区大道东'
        },
        {
            title: '广州市社会保障基金管理中心',
            iphon: '202-83555533',
            arrd: '广州市荔湾区大道东'
        },

    ])

    useEffect(() => {
        // handleBind()
    }, [])

    function handleBind() {
        HttpUtil.get(API.GET_NETWOEKS, keyInput).then((data) => {
            data = data.data;
            if (data.code === 0) {
                setData(data.data);
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });
    }
    function onclick() {
        console.log(111111)
        NavigationUtil.navigate(props, 'MapSocial', { info: { latitude: 23.10623, longitude: 113.323656, } }

        )
    }
    return (
        <View style={styles.container}>
            <NavigationBar
                title='社保经办查询'
                popEnabled={true}
                statusBar={{ backgroundColor: '#FFFFFF', translucent: false }}
                navigator={props.navigation}
                hide={false} />
            <ScrollView>
                <Serch value={keyInput} setValue={setKeyInput}></Serch>
                <Card data={data} onclick={onclick} />
            </ScrollView>
        </View>
    );
}
const { deviceWidth, deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    serchwarp: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    address: {
        flexDirection: 'row',
        marginLeft: 20
    },
    searchInputBox: {
        height: (Platform.OS === 'ios') ? 30 : 35,
        // lineHeight: (Platform.OS === 'ios') ? 30:30,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15 : 20,
        borderWidth: 1,
        width: (GlobalStyles.window_width) / 1.8,
        backgroundColor: '#fff',
        marginLeft: 40
    },
    searchIcon: {
        position: "absolute",
        top: 7,
        left: 12,
        width: 20,
        height: 20,
        tintColor: '#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30 : 40,
        lineHeight: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 10,
        paddingVertical: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 12,
        color: '#999',
    },
    cardwarp: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    titleCard: {
        color: '#333333',
        fontSize: 16
    },
    textCard: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    skip: {
        marginRight: 20,
        tintColor: '#e5e5e5'
    }

});