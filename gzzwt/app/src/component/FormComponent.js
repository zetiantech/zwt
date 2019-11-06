/**
 * @description 表单组件
 * @author heweifeng
 * @param {Object} showData 必传, 显示的数据配置
 * @param {Function} setShowData 可选项, 在使用了校验方法的时候
 * @param {Object} data 必传, 数据
 * @param {Function} setData 必传, 设置填写的数据
 * @param {Object} header 选传, 列表头
 * @param {Object} footer 选传, 列表脚
 * @param {Object} style 选传, 列表样式

 * @example 
 *  const showData = {
        cardCode: '读书证号',
        idCard: '身份证号码',
        name: '姓名',
        phone: {
            label: '手机', // String || React.Element , 支持标签 , 例如, <Text>手机</Text>
            type: 'text',
            inheritAll: true, // 其他项是否继承当前的所有属性
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
            attr: {
                title: '请选择'
            }
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
* const data = {
        id: '65456',
        cardCode: '546354351',
        idCard: '546354351',
        name: '546354351',
        phone: '546354351',
        libraryId: '546354351',
    }
* @update 2019-10-22 增加校验方法 { validate }, 引入后在showData配置里需要校验的配置内添加 validator 属性, 在需要校验的时候调用 validate() ---heweifeng
* @example  passwd: {
                label: '密码',
                type: 'InputItem',
                validator: [ // 添加校验规则
                    {
                        rule: 'require',
                        tip: '请输入密码',
                    },
                    {
                        rule: 'min=6',
                        tip: '请输入6位数的密码',
                    },
                ],
            }
*/
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {
    List,
    Picker,
    InputItem,
    DatePicker,
    TextareaItem,
    Switch,
} from '@ant-design/react-native';
import Rules from 'src/util/RulesUtil';

const Item = List.Item;

let inheritShowData; // 用来保存第0个showData的配置, 用于其他数据的继承

const Form = ({
    showData,
    setShowData,
    data,
    setData,
    header,
    footer,
    style,
}) => {
    const borderTop =
        !style || !style.borderTop ? { Body: { borderTopWidth: 0 } } : {};
    const borderBottom =
        !style || !style.borderBottom
            ? { BodyBottomLine: { borderBottomWidth: 0 } }
            : {};

    return (
        <List
            style={style || null}
            styles={{ ...borderTop, ...borderBottom }}
            renderHeader={header || ''}
            renderFooter={footer || ''}>
            {Object.keys(showData).map((item, index) => {
                showData[item].inheritAll && (inheritShowData = showData[item]); // 保存继承属性
                let el = <></>;

                if (
                    typeof showData[item] === 'string' &&
                    inheritShowData &&
                    inheritShowData.inheritAll
                ) {
                    const value = showData[item];
                    showData[item] = {
                        ...inheritShowData,
                        label: value,
                    };
                }

                const label =
                    typeof showData[item].label === 'string' ? (
                        <Text
                            style={[
                                styles.label,
                                showData[item].labelStyle || null,
                                showData[item].error ? styles.error : null,
                            ]}>
                            {showData[item].label}
                        </Text>
                    ) : (
                            showData[item].label
                        );

                if (typeof showData[item] === 'string') {
                    el = (
                        <Item
                            key={index}
                            extra={data[item] || '-'}
                            arrow="empty"
                            {...showData[item].attr}>
                            <Text style={styles.label}>{showData[item]}</Text>
                        </Item>
                    );
                } else if (typeof showData[item] === 'object') {
                    if (showData[item].type == 'Picker') {
                        el = (
                            <Picker
                                data={showData[item].data}
                                cols={showData[item].cols || 1}
                                value={data[item]}
                                format={(labels) => { return labels.join(' ') }}
                                onChange={val => {
                                    setData({ ...data, [item]: val });
                                }}
                                onOk={val => {
                                    setData({ ...data, [item]: val });
                                }}
                                onVisibleChange={val => {
                                    if (
                                        val &&
                                        typeof showData[item].validator === 'object' &&
                                        showData[item].validator.length
                                    ) {
                                        const copier = { ...showData };
                                        copier[item].error = false;
                                        setShowData({
                                            ...copier,
                                        });
                                    }
                                }}
                                {...showData[item].attr}>
                                <List.Item arrow="horizontal">{label}</List.Item>
                            </Picker>
                        );
                    } else if (showData[item].type === 'InputItem') {
                        el = (
                            <InputItem
                                style={showData[item].valueStyle || null}
                                // clear 
                                value={data[item]}
                                onFocus={val => {
                                    if (
                                        typeof showData[item].validator === 'object' &&
                                        showData[item].validator.length
                                    ) {
                                        const copier = { ...showData };
                                        copier[item].error = false;
                                        setShowData({
                                            ...copier,
                                        });
                                    }
                                }}
                                onChange={val => {
                                    setData({ ...data, [item]: val });
                                }}
                                {...showData[item].attr}>
                                {label}
                            </InputItem>
                        );
                    } else if (showData[item].type === 'text') {
                        if (showData[item].attr && showData[item].attr.multipleLine) {
                            el = (
                                <Item
                                    extra={
                                        typeof showData[item].valueTemplate === 'function' ? (
                                            showData[item].valueTemplate(
                                                data[item],
                                                data,
                                                item,
                                                setData,
                                            )
                                        ) : (
                                                <Text
                                                    style={[
                                                        styles.value,
                                                        showData[item].valueStyle || null,
                                                    ]}>
                                                    {data[item] || '-'}
                                                </Text>
                                            )
                                    }
                                    arrow="empty"
                                    styles={
                                        !showData[item].attr.borderBottom
                                            ? { Line: { borderBottomWidth: 0 } }
                                            : ''
                                    }
                                    {...showData[item].attr}>
                                    {label}
                                </Item>
                            );
                        } else {
                            el = (
                                <InputItem
                                    style={showData[item].valueStyle || null}
                                    value={
                                        // typeof showData[item].valueTemplate === 'function' ? (
                                        //   showData[item].valueTemplate(
                                        //     data[item],
                                        //     data,
                                        //     item,
                                        //     setData,
                                        //   )
                                        // ) : (
                                        //   <Text
                                        //     style={[
                                        //       styles.value,
                                        //       showData[item].valueStyle || null,
                                        //     ]}>
                                        // String(data[item]) || '-'
                                        data[item] || '-'

                                        //   </Text>
                                        // )
                                    }
                                    editable={false}
                                    {...showData[item].attr}>
                                    {label}
                                </InputItem>
                            );
                        }
                    } else if (showData[item].type === 'DatePicker') {
                        el = (
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate={new Date(1932, 7, 6)}
                                maxDate={new Date(2036, 11, 3)}
                                value={data[item]}
                                onChange={val => {
                                    if (
                                        typeof showData[item].validator === 'object' &&
                                        showData[item].validator.length
                                    ) {
                                        const copier = { ...showData };
                                        copier[item].error = false;
                                        setShowData({
                                            ...copier,
                                        });
                                    }
                                    setData({ ...data, [item]: val });
                                }}
                                {...showData[item].attr}>
                                <List.Item arrow="horizontal">{label}</List.Item>
                            </DatePicker>
                        );
                    } else if (showData[item].type === 'textarea') {
                        el = (
                            <TextareaItem
                                rows={4}
                                onChange={val => {
                                    setData({ ...data, [item]: val });
                                }}
                                {...showData[item].attr}
                            />
                        );
                    } else if (showData[item].type === 'Switch') {
                        // 2019-10-20 Jonne 新增
                        el = (
                            <Item
                                extra={
                                    <Switch
                                        checked={data[item]}
                                        color={showData[item].color || '#2F74ED'}
                                        onChange={val => {
                                            setData({ ...data, [item]: val });
                                        }}
                                    />
                                }
                                arrow="empty"
                                {...showData[item].attr}>
                                {label}
                            </Item>
                        );
                    }
                }
                const calcHeight =
                    showData[item].height - 44.5 > 0 ? showData[item].height - 44.5 : 0;
                return (
                    <View
                        key={index}
                        style={{
                            paddingTop: calcHeight,
                        }}>
                        {el}
                    </View>
                );
            })}
        </List>
    );
};

const styles = StyleSheet.create({
    label: {
        color: '#333333',
        fontSize: 16,
    },
    value: {
        flex: 4,
    },
    error: {
        color: '#F12F2F',
    },
});

/**
 * 校验
 * @param {Object} showData Form表单中显示的配置 , 格式与Form表单相同
 * @param {Object} data Form表单中的数据 , 格式与Form表单相同
 * @param {Function} setShowData 可以修改showData的方法
 * @returns {Promise} 返回Promise对象, 校验失败可在 catch 里捕获
 */
export function validate({ showData, setShowData, data }) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(showData);
        let pass = true;
        for (let index = 0, len = keys.length; index < len; index++) {
            const key = keys[index];
            if (
                typeof showData[key].validator === 'object' &&
                showData[key].validator.length
            ) {
                let copier = { ...showData };
                for (let i = 0, l = showData[key].validator.length; i < l; i++) {
                    const item = showData[key].validator[i]; // 获得规则配置对象
                    const rule = item.rule.split('='); // 获得规则
                    if (!Rules[rule[0]](data[key], rule[1])) {
                        // 校验规则
                        copier[key].error = true;
                        pass = false;
                        setShowData({
                            ...copier,
                        });
                        reject(item.tip); // 检验失败返回错误提示语
                        break;
                    } else {
                        copier[key].error = false;
                        setShowData({
                            ...copier,
                        });
                    }
                }
            }
            if (!pass) break;
        }
        pass && resolve();
    });
}

export default Form;
