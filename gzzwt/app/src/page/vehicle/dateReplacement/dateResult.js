/**
 * @description 有效期换满证信息确认
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import {
    Provider,
    List,Button,Flex, Modal
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
const Brief = List.Item.Brief;


/**
 * 页面组件
 * @param {*} param0 
 */
function ListWrap({ data, labelName }) {
    return (
        <View>
            <View style={styles.ListWrap}>
                <ScrollView>
                    <List styles={{ Line: { borderWidth: 0 } }} >
                        {
                            Object.keys(labelName).map((key) => {
                                return (
                                    <View>      
                                        <List.Item style={styles.listItem} extra={
                                            <Text style={styles.listItemLabel}>{data[key]}</Text>
                                        }
                                            styles={{ Line: { borderBottomWidth: 0 } }}
                                            align='top'
                                            multipleLine
                                        >
                                            <Text style={styles.listItemText}>{labelName[key]}</Text>
                                        </List.Item>
                                    </View>    
                                )
                            })
                            
                        }
                        <List.Item style={styles.listItem} extra={
                            <Text style={styles.listItemLabel}>10元</Text>
                        }
                            styles={{ Line: { borderBottomWidth: 0 } }}
                            align='top'
                            multipleLine
                        >
                            <Text style={styles.listItemText}>工本费(费用邮寄到付)</Text>
                        </List.Item>
                        <List.Item style={styles.listItem} extra={
                            <Text style={styles.listItemLabel}>35元</Text>
                        }
                            styles={{ Line: { borderBottomWidth: 0 } }}
                            align='top'
                            multipleLine
                        >
                            <Text style={styles.listItemText}>邮寄费(费用邮寄到付)</Text>
                        </List.Item>
                    </List>           
                </ScrollView>          
            </View>
        </View>
    )
}



export default function dateResult(props) {
    const formData = props.navigation.getParam('formData')

    const [data, setData] = useState({})

    const labelName = {
        belongName: '申请人',
        busText: '申请业务名称',
        id: '业务员流水号',
        createTime: '申请时间'
    }

    useEffect(() => {
       setData(formData)
    }, [formData])
    
    function onButtonClick () {
        NavigationUtil.navigate(props, 'ResultPage', {type: 6})
    }       
    return (
        <Provider>
        <View style={styles.container}>
            <NavigationBar title='申请结果' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
        
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>车辆信息</Text>
            </View>
            {data && <ListWrap data={data} labelName={labelName} />}   
            <View style={{marginVertical: 30, marginHorizontal: 20,}}>
                <Button type="primary" onPress={onButtonClick}>确认</Button>
            </View>

        </View>
        </Provider>
    );

}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
},
titleBox: {
    paddingVertical: 10,
    paddingHorizontal: 15 
},
titleText: {
    fontSize: 14,
    color: '#999999'
},
listItemLabel: {
   color: '#999999'
},
listItemText: {
    color: '#333333'
}
});