/**
 * @description 公证员详情
 * @author heweifeng
*/
import React from 'react';
import {
    View,
    StyleSheet 
} from 'react-native';

import { 
    WhiteSpace,
    Provider,
} from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar';

import Form from 'src/component/FormComponent'

export default function NotariesDetail(props) {
    const navigationBar = <NavigationBar
        navigator={props.navigation}
        popEnabled={true}
        title='公证员详情'
        hide={false}/>;
    const data = props.navigation.getParam('info', {});
    const showData = {
        name: {
            label: '姓名',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        certCode:  {
            label: '执业证号',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        practiceUnit: {
            label: '执业机构',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        gender:  {
            label: '性别',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        national:  {
            label: '民族',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        politicsStatus:  {
            label: '政治面貌',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        cfMember:  {
            label: '是否涉外人员',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        status:  {
            label: '执业状态',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
        officeDate:  {
            label: '任职时间',
            type: 'text',
            labelStyle: styles.label,
            valueStyle: styles.value,
            attr: {
                last: true,
                multipleLine: true,
                borderBottom: false
            }
        },
    }

    
    return (
        <Provider>
            <View style={styles.container}>
                { navigationBar }
                <WhiteSpace size="xl" />
                <Form  data={data} showData={showData} />
            </View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    label: {
        fontSize: 16,
        color: '#999',
    },
    value: {
        fontSize: 16,
        color: '#333',
        flex: 2,
    }
});