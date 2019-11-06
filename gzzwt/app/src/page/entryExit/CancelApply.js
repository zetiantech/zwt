/**
 * @description 预约信息确认
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { 
    Button,
    Modal,
    Flex,
    Provider,
    WhiteSpace,
    ListView,
    Checkbox
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import LogUtil from 'src/util/LogUtil'
 import NavigationUtil from 'src/util/NavigationUtil';



const ListWrap = ({data, onChangeValue}) => {
    const labelName = {
        id: '办件流水号',
        idCard: '身份证号',
        startTime: '受理日期',
        hallId: '受理机构'
    }
    return (
        <View style={styles.infoBox}>
            <View style={styles.titleBox} >
                <Text style={styles.titleText}>往来港澳通行证办理</Text>
                <Checkbox onChange={(event)=>onChangeValue(event, data.id)} />
            </View>
            {
                Object.keys(labelName).map((key)=>(
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                            <Text style={styles.infoLabel}>{labelName[key]}</Text>
                        </Flex.Item>
                        <Flex.Item>
                            <Text style={styles.infoContent}>{data[key]||'-'}</Text>
                        </Flex.Item>
                    </Flex>
                ))
            }
        </View>
    )
}


/**
 * 页面下拉刷新及上拉加载
 * @param {*} getData 获取数据方法
 * @param {*} setListView 用来接收列表元素
 */
const ScrollViewer = ({ getData, setListView, props, onChangeValue}) => {
    return (
        <ListView
            ref={(ref) => setListView(ref)}
            onFetch={getData}
            keyExtractor={(item, index) =>
                `${item.id}-${index}`
            }
            renderItem={(item, index) => {
                return (
                    <>
                        <ListWrap data={item} props={props} onChangeValue={onChangeValue}/>
                        <WhiteSpace size='sm'/>
                    </>
                )
            }}
            numColumns={1}
        />
    )
}



export default function CancelApply(props){

   const [listView, setListView] = useState([]); // 用来接收列表元素

   const [params, setParams] = useState({})

   const [checkValue, setCheckValue] = useState([])

   function getData(page = 1, startFetch, abortFetch) {
        HttpUtil.get(API.GET_APPLY_LIST, {
            ...params,
            page: page,
            size: 10
        }).then(responseJson => {
            const { code, data, msg } = responseJson.data;
            let list = data.list
            if (code === 0) {
                startFetch(list || [], 10);
            } else {
                abortFetch();
                ToastUtil.toast(msg || '获取数据失败', 'center');
            }
        })
   }

    useEffect(() => {
        if (listView && listView.ulv) {
            listView.ulv.scrollToOffset({ x: 0, y: 0, animated: true });
            listView.refresh();
        }
        setCheckValue([])
    }, [params])

    const onCancelApply = ()=>{
        Modal.alert('', '确认要取消吗', [
            { text: '返回', color: '#999' },
            { text: '确认', onPress: () => {
                cancelApply()
            }},
        ]);
    }

    function cancelApply(){
        const id = checkValue.join(',')
        console.log(id)
        HttpUtil.get(API.CANCEL_APPLY, {
            id: id
        }).then(responseJson=> {
            const { code, data, msg } = responseJson.data
            if(code == 0){
                getData()
            }else{
                ToastUtil.toast(msg)
            }
        })
    }

    function onChangeValue(event, id){
        if(event.target.checked){
            setCheckValue([...checkValue,id])
        }else{
            checkValue.splice(checkValue.indexOf(id),1)
            setCheckValue([...checkValue])
        }
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='取消出入境预约' 
                hide={false} 
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                popEnabled={true}  
                navigator={props.navigation}/>
                <WhiteSpace size='lg'/>
                <ScrollViewer getData={getData} setListView={setListView} props={props} onChangeValue={onChangeValue}/>
                {
                    checkValue.length ? <View style={styles.footBox}>
                        <Button type="warning" onPress={()=>onCancelApply()}>取消预约</Button>
                    </View>:null
                } 
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    titleBox: { 
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600'
    },
    infoBox: {
        padding: 15,
        backgroundColor: '#ffffff'
    },
    infoBoxItem: {
        paddingTop: 10,
        paddingBottom: 10
    },
    infoLabel: {
       color: '#999999'
    },
    infoContent: {
        color: '#333333'
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30,
    },
    footBox: {
        padding: 15,
        backgroundColor: '#FFFFFF'
    }
})