/**
 * @description 有效期换满证选择业务类型
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,Image,TouchableOpacity,
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast,Radio,Picker,
} from '@ant-design/react-native';
import Form from 'src/component/FormComponent'
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'

import RadioView from '../../../component/RadioViewImage'
import AMAPComponent from '../../../component/AMAPComponent'


//寄送地址
const Address = ({ressData})=>{
    return (
        <View>
            <View style={styles.addWarp}> 
                <Text style={styles.Addtitle}>寄送地址</Text>
            </View>
            {   ressData && ressData.map((item,index)=>(
                 <TouchableOpacity style={styles.addView}id={item.id}>
                    <View style={styles.addtextwarp}>
                        <Text style={styles.text1}>{item.name}</Text>
                        <Text style={styles.text2}>{item.address}</Text>
                    </View>      
                    <Image style={styles.addtnext} source={require('../../../res/images/ic_tiaozhuan.png')}></Image>
                </TouchableOpacity>
            ))       
        }         
        </View>
    )
}       
//网点地址
const BranchAddress = ({branchData,checked,onclick,onclickMap})=>{ 
    return (
        <View style={{backgroundColor:'#fff'}}>
            <View style={styles.addWarp}> 
                <Text style={styles.Addtitle}>网点地址</Text>
            </View>
            { branchData && branchData.map((item,index)=>(
            <TouchableOpacity style={styles.resswarp}  onPress={()=>onclickMap(item)}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}id={item.id}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{paddingVertical:10}}>    
                        <RadioView  id={item.id} onCheck={onclick} radius={16}checked={checked === item.id}/>                                
                    </View>
                </View>          
                <View style={styles.iphonwarp}>
                    <Image style={styles.iphonimg} source={require('../../../res/images/common/icon_phone.png')}></Image>
                    <Text>{item.phone}</Text>
                </View>
                <View style={styles.iphonwarp}>
                    <Image  style={styles.iphonimg} source={require('../../../res/images/common/icon_address.png')}></Image>
                    <Text >{item.address}</Text>
                </View>               
            </TouchableOpacity>  
            ))            
        }               
        </View>
    )
}

/*** 
 * 机动车业务-补领机动车号牌
 * busTypeId-业务类型  reasonAppy-申请原因 takeWayId-获取方式，
*/  
export default function dateReplacement2(props) {
    const formDatas = props.navigation.getParam('formDatas')//车辆详情数据
    const [ressData, setressData] = useState([
        {id:1,name:'李小四',address:'广州市荔湾区龙华大道C2栋',iphon:'13088870731'}
    ]);    
    const [SelectDataThree, setSelectDataThree] = useState([ //邮寄类型
        {value: 0,label: '委托邮政快递'}, 
        {value: 1,label: '前往窗口自取'},
    ]);
    const [formData,setFormData] = useState({
        busTypeId:'',reasonAppy:'',takeWayId:"",
    })
    const [branchData, setbranchData] = useState([]);
    const [selectData, setSelectData] = useState();//业务类型
    const [SelectDataTwo, setSelectDataTwo] = useState();//申请原因
    
    const [busty, setbusty] = useState();//业务类型数据
    const [busText, setbusText] = useState();//获取业务类型文本数据
    const [applying, setapplying] = useState();//申请原因数据
    const [applyingText, setapplyingText] = useState();//获取申请原因文本数据
    const [checked,setchecked] = useState(1)//选中的地址ID

    const [applyingID, setapplyingID] = useState();//申请原因ID
    const [bustyID, setbustyID] = useState();//业务类型ID
    const [threeID, setthreeID] = useState();//邮寄类型ID


    //获取业务类型文本
    function onChangebus (val) {
        setbustyID(val.join(''))
        const key = val[0]
        setbusText(busty[key])
    }
    //获取申请原因文本
    function onApplying (val) {
        setapplyingID(val.join(''))
        const key = val[0]
        setapplyingText(applying[key])
    }
    //获取邮寄方式id
    function onChanggain (val) {
        setthreeID(val.join(''))
    }
  
    useEffect(() => {
        //业务类型
        HttpUtil.get(API.KeyValueList,{kindId:14})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data    
                if(code === 0){       
                    let arr = [];
                    let  bustype = {}   
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })
                        bustype[v.id] = v.name    
                    }
                    setbusty(bustype)
                    setSelectData(arr) 
                }   
                }).catch(error=>{
                console.log(error,'error')
                });
        //申请原因
        HttpUtil.get(API.KeyValueList,{kindId:7})  
        .then(responseJson=>{     
            const { code, data, msg } = responseJson.data   
            if(code === 0){                   
                let arr = [];
                let  bustype = {} 
                for (const v of data) {
                    arr.push({ 
                        value: v.id,
                        label: v.name
                    })
                    bustype[v.id] = v.name    
                }
                setapplying(bustype)
                setSelectDataTwo(arr)   
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
        //申请网点
        HttpUtil.get(API.DetectionBranchList,{areaId:44})    
        .then(responseJson=>{  
            const { code, data, msg } = responseJson.data   
            if(code === 0){    
                console.log(data,'网点地址')               
                setbranchData(data.list)
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
        //地址
        HttpUtil.get(API.AddressList,{userId:1})    
        .then(responseJson=>{  
            console.log(responseJson,'用户')
            const { code, data, msg } = responseJson.data   
            if(code === 0){                   
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
    }, [])
    //单选
    function onclick (id) {
        setchecked(id)
        console.log(id,88)
    }
    //Map
    function onclickMap (item) {
        NavigationUtil.navigate(props, 'dateReplacAddress', {data:item},)
    }
    //下一步
    function onBtnClick () {
        if (bustyID==""||bustyID==undefined) {
            ToastUtil.toast('请选择业务类型','center')
            return
        }
        if (applyingID==""||applyingID==undefined) {
            ToastUtil.toast('请选择申请原因','center')
            return
        }
        if (threeID==""||threeID==undefined) {
            ToastUtil.toast('请选择获取方式','center')
            return
        }
        else{
            if (ressData==undefined&&ressData=='') { //判断是否邮寄
                NavigationUtil.navigate(props, 'GetlacementCarConfirmation',
                {formDatas:formDatas,applyingText:applyingText,busText:busText,applyingID:applyingID,bustyID:bustyID,threeID:threeID}
                );
            }else{
                NavigationUtil.navigate(props, 'GetlacementCarConfirmation',
                {formDatas:formDatas,checked:checked,applyingText:applyingText,busText:busText,ressData:ressData,applyingID:applyingID,bustyID:bustyID,threeID:threeID}
                );
            }
        }
        
    
    }   

    return (  
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='车辆基本信息' hide={false}  popEnabled = {true}  navigator ={props.navigation}/>
                <List style={styles.inputWrap}>
                    <Picker
                        cols={1}
                        itemStyle={{padding: 10}}
                        data={selectData}
                        value={formData.busTypeId}
                        onChange={(val)=>setFormData({...formData, busTypeId: val})}
                        onOk={onChangebus}  
                        >
                        <List.Item arrow="horizontal">业务类型</List.Item>
                    </Picker>
                    <Picker
                        cols={1}
                        itemStyle={{padding: 10}}
                        data={SelectDataTwo}  
                        value={formData.reasonAppy}
                        onChange={(val)=>setFormData({...formData, reasonAppy: val})}
                        onOk={onApplying}  
                        >
                        <List.Item arrow="horizontal">申请原因</List.Item>
                    </Picker>
                    <Picker
                        cols={1}
                        itemStyle={{padding: 10}}
                        data={SelectDataThree}
                        value={formData.takeWayId}
                        onChange={(val)=>setFormData({...formData, takeWayId: val})}
                        onOk={onChanggain}  
                        >
                        <List.Item arrow="horizontal">获取方式</List.Item>
                    </Picker>
                </List>
                    {formData.takeWayId&& formData.takeWayId == 1 ?
                        <BranchAddress branchData={branchData} checked={checked} onclick={onclick} onclickMap={onclickMap}/>:
                        <Address ressData={ressData}/>
                    }
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onBtnClick} >下一步</Button>
                </View>
            </View>
        
       
        </Provider>
        

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    inputWrap: {
        marginTop: 15
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20
    },
    inputBox: {
        height: 50
    },
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        height: 48,
        backgroundColor: '#2F74ED'
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    },
    addWarp:{
        marginTop:12,
        backgroundColor:'#fff',
        borderBottomWidth:0.5,
        borderBottomColor:'#E5E5E5'
    },
    Addtitle:{
        margin:15,
        color:"#333333"
    },
    addView:{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:"center", 
        justifyContent:'space-between'     
    },
    addtextwarp:{
        marginLeft:15,
    },
    text1:{
        color:'#333',
        fontSize:16,
        paddingVertical:5
    },
    text2:{
        color:"#999",
        fontSize:14,
        paddingVertical:5
    },
    addtnext:{
        marginRight:30,
        tintColor:'#ccc'
    },
    iphonwarp:{
        flexDirection:'row',
        // marginLeft:15,
        paddingTop:5


    },
    iphonimg:{
        width:14,
        height:14,
        paddingVertical:10,
        marginRight:10,
        marginBottom:5,
    },
    resswarp:{
        backgroundColor:'#fff',
        // paddingBottom:10,
        borderBottomWidth:0.4,
        borderColor:'#E5E5E5',
        marginHorizontal:15,


    },
    title:{
        // marginLeft:15,
        marginTop:10,
        // marginBottom:10,
        color:'#333',
        fontWeight:'bold'
    },
    

})