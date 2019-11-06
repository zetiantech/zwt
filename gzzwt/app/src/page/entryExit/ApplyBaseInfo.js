/**
 * @description 外国人个人申请
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { 
    Button,
    Provider,
    WhiteSpace,
    Modal,
    Picker
 } from '@ant-design/react-native';

 import validator from 'validator';
 import I18n from "src/i18n/I18n";
 import NavigationBar from 'src/common/NavigationBar'
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import LogUtil from 'src/util/LogUtil'
 import NavigationUtil from 'src/util/NavigationUtil';

const dataSource = require('@bang88/china-city-data');


const sexSource = [
    { label: '女', value: '女' },
    { label: '男', value: '男' }
]

const RightBtn = ({lang, onChangeLang}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
                onPress={()=>onChangeLang(lang=='zh'?'en':'zh')}
                underlayColor='transparent'>
                <View style={{paddingRight: 15}}>
                    <Text style={{color: '#2F74ED'}}>{lang=='zh'?'English':'中文'}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}


export default function ApplyBaseInfo(props) {

    const [lang, setLang] = useState('zh')

    const [cardType, setCardType] = useState([])
    const [identityType, setIdentityType] = useState([])

    const [params, setParams] = useState({
        ensurname: '',
        enName: '',
        zhCNName: '',
        sex: [],
        brithdy: '',
        brithAddress: [],
        cardType: '',
        cardId: '',
        cardTime: '',
        identity: '',
        receipt: ''
    })

    const labelData1 = {
        ensurname: {
            label: I18n.t("englistSureName", {locale: lang}),
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 10,
                placeholder: I18n.t("placeholder", {locale: lang}),
            }
        },
        enName: {
            label: I18n.t("englistName", {locale: lang}),
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder: I18n.t("placeholder", {locale: lang}),
            }
        },
        zhCNName: {
            label: I18n.t("zhName", {locale: lang}),
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder: I18n.t("placeholder", {locale: lang}),
            }
        },
        sex: {
            label: I18n.t("sex", {locale: lang}),
            type: 'Picker',
            data: sexSource,
            attr: {
                title: I18n.t("PickerPlaceholder", {locale: lang}),
            }
        },
        brithdy: {
            label: I18n.t("brithday", {locale: lang}),
            type: 'DatePicker'
        },
        brithAddress: {
            label: I18n.t("bridthDayAddress", {locale: lang}),
            type: 'Picker',
            data: dataSource,
            attr: {
                title: I18n.t("PickerPlaceholder", {locale: lang}),
            }
        },
    }

    const labelData2 = {
        cardType: {
            label: I18n.t("idType", {locale: lang}),
            type: 'Picker',
            data: cardType
        },
        cardId: {
            label: I18n.t("idCard", {locale: lang}),
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 10,
                placeholder: I18n.t("placeholder", {locale: lang}),
            }
        },
        cardTime: {
            label: I18n.t("cardTime", {locale: lang}),
            type: 'DatePicker',
            attr: {
                title: I18n.t("PickerPlaceholder", {locale: lang}),
            }
        },
        identity: {
            label: I18n.t("idChina", {locale: lang}),
            type: 'Picker',
            data: identityType,
            attr: {
                title: I18n.t("PickerPlaceholder", {locale: lang})
            }
        },
    }

    const labelData3 = {
        receipt: {
            label: I18n.t("photoReceiptNo", {locale: lang}),
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 10,
                placeholder: I18n.t("placeholder", {locale: lang}),
            }
        }
    }

    useEffect(() => {
        getSelectValue(6)
        getSelectValue(16)
    }, [])


    function getSelectValue(kindId) {
        HttpUtil.get(API.KEYVALUE_LIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                switch(kindId) {
                    case 6:
                        setCardType(list)
                    break;
                    case 16:
                        setIdentityType(list)
                    break;
                }
            }else{
                ToastUtil.toast(msg)
            }
        })
    }

    function onSubmitLogin() {
        Modal.alert('', '确认要提交吗', [
            { text: '返回', color: '#999' },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'EntryExitService')
            }},
        ]);
    }

    function onChangeLang (item){
        setLang(item)
    }


    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    title={I18n.t("baseTitle", {locale: lang})}
                    rightButton={<RightBtn lang={lang} onChangeLang={onChangeLang} />}
                    hide={false}/>
                <ScrollView>
                    <Form header={I18n.t("personalData", {locale: lang})} data={params} showData={labelData1} setData={setParams} />
                    <Form header={I18n.t("certificateInfo", {locale: lang})} data={params} showData={labelData2} setData={setParams} />
                    <WhiteSpace size="lg" />
                    <Form data={params} showData={labelData3} setData={setParams} />
                    <Button type="primary" style={styles.btnBox} onPress={onSubmitLogin}>{I18n.t("submission", {locale: lang})}</Button>
                </ScrollView>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

