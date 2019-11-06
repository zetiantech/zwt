/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Image
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    DatePicker,
    WhiteSpace,
    Modal
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';
import JSBridge from 'src/bridge/JSBridge.js';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import Utils from 'src/util/Utils'
import Form from 'src/component/FormComponent'

const dataSource = require('@bang88/china-city-data');

export default function SocialSecurityApply(props) {

    const [nationSource, setNationSource] = useState([])
    const [idTypeSource, setIdTypeSource] = useState([])
    const [sexSource, setSexSource] = useState([
        { label: '女', value: '女' },
        { label: '男', value: '男' }
    ])
    const [bankSource, setBankSource] = useState([])
    const [branchSource, setBranchSource] = useState([])

    const [params, setParams] = useState({
        idType: [],
        idCard: '',
        name: '',
        brithday: '',
        gender: [],
        national: '',
        phone: '',
        validitystartTime: '',
        validityEndTime: '',
        signUnit: '',
        address: '',
        bankId: [],
        bankName: '',
        areaId: [],
        branchId: ['1'],
        branchName: '121'
    })

    useEffect(() => {
        // 获取民族
        getNationals()
        // 获取证件类型
        getCertificates()
        // 获取银行类型
        getBankTypeList() 
    }, [])

    const labelName = {
        idType: {
            label: '证件类型',
            type: 'Picker',
            data: idTypeSource,
            attr: {
                title: '证件类型',
            }
        },
        idCard: {
            label: '证件号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        name: {
            label: '姓名',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        brithday: {
            label: '出生日期',
            type: 'DatePicker'
        },
        gender: {
            label: '性别',
            type: 'Picker',
            data: sexSource,
            attr: {
                title: '性别',
            }
        },
        national: {
            label: '民族',
            type: 'Picker',
            data: nationSource,
            attr: {
                title: '民族',
            }
        },
        phone: {
            label: '手机号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        validitystartTime: {
            label: '证件有效开始期',
            type: 'DatePicker'
        },
        validityEndTime: {
            label: '证件有效截止期',
            type: 'DatePicker'
        },
        signUnit: {
            label: '证件签发机关',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        address: {
            label: '住址',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        areaId: {
            label: '地区',
            type: 'Picker',
            cols: 3,
            data: dataSource,
            attr: {
                title: '地区',
            }
        },
        bankId: {
            label: '金融银行',
            type: 'Picker',
            data: bankSource,
            attr: {
                title: '金融银行',
            }
        },
        branchId: {
            label: '受理网点',
            type: 'Picker',
            data: branchSource,
            attr: {
                title: '受理网点',
            }
        },
    }

    /**
     * @description 获取民族列表 
     **/
    function getNationals() {
        HttpUtil.get(API.GET_NATIONALS, {}).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setNationSource(list)
            }
        })
    }
    /**
     * @description 获取证件类型列表 
     **/
    function getCertificates() {
        HttpUtil.get(API.GET_CERTIFICATES, {}).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setIdTypeSource(list)
            }else{
                ToastUtil.toast(msg || '获取数据失败')
            }
        })
    }
    /**
     * @description 获取银行类型列表 
     **/
    function getBankTypeList() {
        HttpUtil.get(API.GET_BANK_TYPE_LIST, {}).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setBankSource(list)
            }else{
                ToastUtil.toast(msg || '获取数据失败')
            }
        })
    }
    /**
     * @description 获取银行网点列表 
     **/
    function getNetworks(bankTypeIds, areaIds) {
        if(bankTypeIds == undefined || bankTypeIds=='' ||  areaIds==''){
            return;
        }
        HttpUtil.post(API.GET_NETWOEKS, {
            bankTypeId: bankTypeIds,
            areaId: areaIds
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setBranchSource(list)
            }else{
                ToastUtil.toast(msg || '获取数据失败')
            }
        })
    }

    // 获取列表值
    function getLabelValue(list, id) {
        let str = ''
        list && list.map((item, i)=>{
            if(item.value == id){
                str = item.label
            }
        })
        return str
    }

    // 获取银行网点
    useEffect(() => {
        getNetworks(params.bankId[0], params.areaId[2])
    }, [params.bankId, params.areaId])

    useEffect(() => {
        setParams({...params, bankName: getLabelValue(bankSource, params.bankId)})
    }, [params.bankId])

    useEffect(() => {
        setParams({...params, branchName: getLabelValue(branchSource, params.branchId)})
    }, [params.branchId])

    

    const [imgData,setimgData] = useState()//获取上传接口图片1
    const [imgData2,setimgData2] = useState()//获取上传接口图片2
    const [imgData3,setimgData3] = useState()//获取上传接口图片3
    //上传
    function onClickUpload (index) {
        onUpload(index)
    }
    async function onUpload (index) {
        const bridge = new JSBridge(props);
        const data = await bridge.selectedPhotos();
        bridge.upload(API.UPLOADFILE, {
                uri: data[0].uri,
            })
            .then(imgUrlResult => {
            if (imgUrlResult.code === 0) {
                if (index==1) {
                    setimgData(imgUrlResult.data)
                }
                if (index==2) {
                    setimgData2(imgUrlResult.data)
                }
                if (index==3) {
                    setimgData3(imgUrlResult.data)
                }
            } else {
                ToastUtil.toast('上传失败', 'center');
            }
            })
            .catch(err => console.log(err));
}

    let parmsImg = {
        img1:imgData||'',
        img2:imgData2||'',
        img3:imgData3||'',    
    }

    const onNextPage = () => {
        
        // if(!params.idType || !params.idType.length){
        //     ToastUtil.toast('请选择证件类型','center')
        //     return
        // }
        // if(!Utils.validIdCard(params.idCard)){
        //     ToastUtil.toast('请输入正确身份证号码','center')
        //     return
        // }
        // if(validator.isEmpty(params.name)){
        //     ToastUtil.toast('请输入姓名','center')
        //     return
        // }
        // if(validator.isEmpty(params.brithday.toString())){
        //     ToastUtil.toast('请输入出生日期','center')
        //     return
        // }
        // if(validator.isEmpty(params.gender.join(""))){
        //     ToastUtil.toast('请输入性别','center')
        //     return
        // }
        // if(validator.isEmpty(params.national.join(""))){
        //     ToastUtil.toast('请输入民族','center')
        //     return
        // }
        // if(validator.isEmpty(params.phone)){
        //     ToastUtil.toast('请输入手机号码','center')
        //     return
        // }
        // if(validator.isEmpty(params.validitystartTime.toString())){
        //     ToastUtil.toast('请选择证件有效开始期','center')
        //     return
        // }
        // if(validator.isEmpty(params.validityEndTime.toString())){
        //     ToastUtil.toast('请选择证件有效截止期','center')
        //     return
        // }
        // if(validator.isEmpty(params.address)){
        //     ToastUtil.toast('请输入地址','center')
        //     return
        // }
        // if(validator.isEmpty(params.areaId.join(""))){
        //     ToastUtil.toast('请选择地区','center')
        //     return
        // }
        // if(validator.isEmpty(params.bankId.join(""))){
        //     ToastUtil.toast('请选择金融银行','center')
        //     return
        // }
        // if(validator.isEmpty(params.branchId.join(""))){
        //     ToastUtil.toast('请选择受理网点','center')
        //     return
        // }
        // if(validator.isEmpty(params.validityEndTime.toString())){
        //     ToastUtil.toast('请输入证件签发机关','center')
        //     return
        // }
        // if (imgData==""||imgData==undefined) {
        //     ToastUtil.toast('请上传一寸彩照','center')
        //     return
        // }
        // if (imgData2==""||imgData2==undefined) {
        //     ToastUtil.toast('请上传身份证正面照','center')
        //     return
        // }
        // if (imgData3==""||imgData3==undefined) {
        //     ToastUtil.toast('请上传身份证反面照','center')
        //     return
        // }
        Modal.alert('信息确认', '确认提交申请？', [
            {
              text: '取消'
            },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'SocialSecurityResult', {form: params, parmsImg: parmsImg})
            }},
          ]);
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    popEnabled={true}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    title='申领登记' 
                    hide={false}/>
                <WhiteSpace size='lg' />
                <ScrollView>
                    <Form data={params} showData={labelName} setData={setParams} />
                    { imgData == undefined ?
                        <View >                                  
                            <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(1)} >
                                <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                                <Text>社保卡制作相片(白底一小存彩照)</Text>    
                            </TouchableOpacity>               
                        </View>:
                        <View>  
                            <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(1)}>
                                <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData}}></Image>
                            </TouchableOpacity>
                        </View> 
                    }
                     { imgData2 == undefined ?
                        <View >                                  
                            <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(2)} >
                                <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                                <Text>身份证(人像面)</Text>    
                            </TouchableOpacity>               
                        </View>:
                        <View>  
                            <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(2)}>
                                <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData2}}></Image>
                            </TouchableOpacity>
                        </View> 
                        }
                     { imgData3 == undefined ?
                        <View >                                  
                            <TouchableOpacity style={styles.upImg} onPress={()=>onClickUpload(3)} >
                                <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                                <Text>身份证(国微面)</Text>    
                            </TouchableOpacity>               
                        </View>:
                        <View>  
                            <TouchableOpacity style={styles.upImgs} onPress={()=>onClickUpload(3)}>
                                <Image style={styles.imgwh} resizeMode='stretch' source={{uri:imgData3}}></Image>
                            </TouchableOpacity>
                        </View> 
                        }
                        <Button style={styles.btnBox} type="primary" onPress={onNextPage}>下一步</Button>
        
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
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20
    },
    upImg:{
        backgroundColor:'#fff',
        marginHorizontal:50,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:60,
        borderRadius:10,
        marginTop:20
    },
    upImgs:{
        backgroundColor:'#fff',
        marginHorizontal:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop:20,
        width:(GlobalStyles.window_width)/1.4,
        height:(GlobalStyles.window_width)/2,
    },
    imgwh:{
        width:'100%',
        height:'100%',
        borderRadius:10,


    },
});

