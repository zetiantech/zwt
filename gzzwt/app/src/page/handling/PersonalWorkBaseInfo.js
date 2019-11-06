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
    WhiteSpace,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'

const WorkBaseInfo = ({data, labelName}) => {
   return (
      <ScrollView>
         <View style={styles.infoBox}>
            {
               Object.keys(data).map((key)=>(
                  <Flex style={styles.infoBoxItem}>
                     <Flex.Item style={{flex: 0.4}}>
                        <Text style={styles.infoLabel}>{labelName[key]}</Text>
                     </Flex.Item>
                     <Flex.Item>
                        <Text style={styles.infoContent}>{data[key]||'-'}</Text>
                     </Flex.Item>
                  </Flex>
               ))
            }
         </View>
      </ScrollView>
   )
}

export default  function PersonalWorkBaseInfo(props) {
   const [infoData, setInfoData] = useState();

    const labelName = {
        itemName: '事项名称' ,
        typeMatter: '事项类型',
        basicCode: '基本编码',
        implementationCode: '实施编码',
        exerciseLevel: '行使层级',
        quantitative: '数量限制',
        implementationEntity: '实施主体' ,
        subjectNature: '实施主体性质',
        statutoryTimeLimit: '法定办结时限',
        commitmentTimeLimit: '承诺办结时限',
        resultName: '结果名称',
        resultSample: '结果样本',
        processingResultType: '办理结果类型' ,
        typeHandling: '办件类型',
        approvalServiceForm: '审批服务形式',
        formOfHandling: '办理形式',
        businessSystem: '业务系统',
        makeAppointment: '预约办理',
        logisticsExpress: '物流快递',
        sourceOfPower: '权力来源',
        jointAgency: '联办机构',
        generalScope: '通办范围',
    };

    useEffect(() => {
       setInfoData({
         itemName: '办理Q2字签证' ,
         typeMatter: '其他行政权力',
         basicCode: '2006063010',
         implementationCode: '1454545454545454545454545',
         exerciseLevel: '省级',
         quantitative: '无',
         implementationEntity: '广州市公安局' ,
         subjectNature: '授权组织',
         statutoryTimeLimit: '1(工作日)',
         commitmentTimeLimit: '0(工作日)',
         resultName: '无',
         resultSample: '无',
         processingResultType: '证照' ,
         typeHandling: '即办件',
         approvalServiceForm: '马上办',
         formOfHandling: '窗口办理',
         businessSystem: '无',
         makeAppointment: '不支持',
         logisticsExpress: '不支持',
         sourceOfPower: '中央授权',
         jointAgency: '无',
         generalScope: '无',
       })
    }, [])
   return (
      <Provider>
         <View style={styles.container}>
            <NavigationBar title='预约信息确认' hide={false} popEnabled={true}  navigator ={props.navigation}/>
            <WhiteSpace size="lg" />
            { infoData && <WorkBaseInfo labelName={labelName} data={infoData} /> }
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
    }
});