/**
 * @description 表格组件
 * @author heweifeng
 * @param {Object} showData 显示的数据配置
 * @param {Object} data 数据
 * @param {Object} setData 获取填写的数据
 * 
 * @example 
 *  const showData = {
        cardCode: '读书证号',
        idCard: '身份证号码',
        name: '姓名',
        phone: {
            label: '手机', // String || React.Element , 支持标签 , 例如, <Text>手机</Text>
            type: 'text',
            height: 50, // 自定义高度
            labelStyle: styles.labels,
            valueStyle: styles.labels,
            attr: {
                align: 'top',
                last: true, // 不显示下边框线
                borderBottom: false, //不显示下边框线, 设置了multipleLine时用
                multipleLine: true, // 多行
            }
        },
        libraryId: {
            label: '开户馆名称',
            type: 'Picker',
            valueStyle: styles.labels,
            data: [{
                value: 1,
                label: '广州图书馆'
            }, {
                value: 2,
                label: '广州市萝岗区图书馆'
            }],
        },
        startDate: {
            label: '受理开始日期',
            type: 'DatePicker',
            height: 50,
            attr: {
                defaultDate: new Date(),
                minDate: new Date(2015, 7, 6),
                maxDate: new Date(2026, 11, 3)
            }
        },
        passwd: {
            label: '密码',
            type: 'InputItem',
            attr: {
                type: 'password',
                placeholder: '请设置6位数密码',
                maxLength: 6,
                textAlign: "right",
            }
        },
    }
*   data = {
        id: '65456',
        cardCode: '546354351',
        idCard: '546354351',
        name: '546354351',
        phone: '546354351',
        libraryId: '546354351',
    }
*/
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';


import { 
    Flex,
} from '@ant-design/react-native';

const Table = ({ rowData, tableData, rowStyle }) => {
    return (
        <View>
            <Flex style={{...rowStyle}}>
                {
                    rowData.map((item) => {
                        return (
                            <Flex.Item key={`${item.key}-title`} style={[styles.fr, item.titleStyles ? {...item.titleStyles} : '']}>
                                {
                                    typeof item.name === 'string' || typeof item.name === 'number' ?
                                    <Text 
                                        style={[item.titleStyles && item.titleStyles.Text ? {...item.titleStyles.Text} : '']}
                                        {...item.titleAttr}
                                    >
                                        {item.name}
                                    </Text> :
                                    item.name
                                }
                            </Flex.Item>
                        )
                    })
                }
            </Flex>
            {
                tableData.map((item, index) => {
                    return (
                        <Flex key={`row${index}`}  style={{...rowStyle}}>
                            {
                                rowData.map((row) => {
                                    return (
                                        <Flex.Item key={row.key + index} style={[styles.fr, row.titleStyles ? {...row.titleStyles} : '']}>
                                            {
                                                typeof row.template === 'function' ?
                                                row.template(item) :
                                                <Text
                                                    style={[row.valueStyles && row.valueStyles.Text ? {...row.valueStyles.Text} : '']}
                                                    {...row.valueAttr}
                                                    onPress={() => row.onPress(item)}
                                                >
                                                    {item[row.key]}
                                                </Text>
                                            }
                                        </Flex.Item>
                                    )
                                })
                            }
                        </Flex>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    fr: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Table