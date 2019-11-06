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
    List,
    Modal,
    Flex,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'


/**
 * 页面组件
 */
function ListWrap({ data, labelName }) {
    return (
        <View style={styles.ListWrap}>
            <ScrollView>
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>材料名称</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>《外国人口岸签证申请表》</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem} align='start'>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>材料要求</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <View style={styles.infoContent}>
                                <Text>原件：1</Text>
                                <Text>材料形式：纸质</Text>
                                <Text>材料分类：申请表格文书</Text>
                                <Text>材料必要性：必要</Text>
                           </View>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem} align='start'>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>来源</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>申请人</Text>
                           <Text style={styles.infoContent}>窗口领取，当场填写</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>填报须知</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>无</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>资料下载</Text>
                        </Flex.Item>
                        <Flex.Item style={{flexDirection:'row'}}>
                            <Button style={styles.textBtn} >
                                <Text style={styles.textBtnStyle}>样本下载</Text>
                            </Button>
                             <Button style={styles.textBtn} >
                                <Text style={styles.textBtnStyle}>空表下载</Text>
                            </Button>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>中介服务</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>无</Text>
                        </Flex.Item>
                    </Flex>
                </View>

            </ScrollView>          
        </View>
    )
}

export default function MaterialDetail(props){

    const [infoData, setInfoData] = useState();

    const labelName = {
        materialName: '材料名称' ,
        materialRequirements: '材料要求',
        source: '来源',
        notice: '填报须知',
        download: '资料下载',
        service: '中介服务',
    };

    useEffect(() => {
        setInfoData({
            materialName: '《外国人口岸签证申请表》' ,
            materialRequirements: '国籍',
            source: '身份证号或护照号码',
            notice: '工作单位职务',
            download: '高层次人才认证日期',
            service: '人才证书类型',
        })
    }, [])

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='材料详情' hide={false} popEnabled={true}  navigator ={props.navigation}/>
                <WhiteSpace size="lg" />
                { infoData && <ListWrap labelName={labelName} data={infoData}/>}
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
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
       
    },
    titleText: {
        fontSize: 14,
        color: '#999999'
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
    textBtn: {  
        borderWidth: 0,
        padding: 0,
        margin: 0
    },
    textBtnStyle: {
        color: '#2F74ED',
        fontSize: 14,
    },
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItem: {
        borderBottomWidth: 0
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: '#999999'
    },
    listItemText2: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
        color: '#999999'
    },
    listItemLabel: {
        color: '#333333',
        fontSize: 16,
        flex: 2
    },
});