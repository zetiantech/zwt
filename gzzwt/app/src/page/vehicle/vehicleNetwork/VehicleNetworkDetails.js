/**
 * @description 车辆网版主进度法详情
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text
} from 'react-native';
import {
    Provider,
} from '@ant-design/react-native';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import StepIndicator from 'react-native-step-indicator';//进度条
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form from 'src/component/FormComponent'

function ListWrap({ data, labelData }) {
    return (
        <View style={styles.ListWrap}>
            <Form data={data} showData={labelData} />
        </View>
    )
}
/**
 * 进度
 */
function Step({ labels, customStyles, currentPosition }) {
    return (
        <View style={styles.stepWrap}>
            <StepIndicator
                stepCount={labels.length}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
            />
        </View>
    )
}

export default function VehicleNetworkDetails(props) {
    const infoData = props.navigation.getParam('info', {});//参数,医院经纬度
    const labelData = {
        flowNumber: {
            label: '业务流水号',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        businessName: {
            label: '业务名称',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        applyDate: {
            label: '申请时间',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        handleProgress: {
            label: '网办进度',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                labelNumber: 6,
            }
        },
        plateKindName: {
            label: '号牌种类',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
            }
        },
        plateNumber: {
            label: '号牌号码',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                multipleLine: true,
                wrap: true,
                styles: { Line: { borderBottomWidth: 0 } }//不显示下划线
            }
        },
        cost: {
            label: '费用',
            type: 'text',
            height: 50, // 自定义高度
            valueStyle: styles.valueStyle,
            labelStyle: styles.labelStyle,
            attr: {
                labelNumber: 6,
                multipleLine: true,
                wrap: true,
                styles: { Line: { borderBottomWidth: 0 } }//不显示下划线
            }
        }
    }
    const [currentPosition, setCurrentPosition] = useState(infoData.status || 0);
    const labels = infoData && infoData.process ? infoData.process.split('，') : '';
    labels && console.log('label--')
    const customStyles = {
        stepIndicatorSize: 25,//圈的大小
        currentStepIndicatorSize: 26,//当前圈的大小
        separatorStrokeWidth: 2,//线的大小
        currentStepStrokeWidth: 3,//当前线的大小
        stepStrokeCurrentColor: '#52C41A',//当前状态色
        stepStrokeWidth: 3,//圈的大小
        stepStrokeFinishedColor: '#52C41A',//已完成边框色
        stepStrokeUnFinishedColor: '#CCCCCC',//未完成边框色
        separatorFinishedColor: '#52C41A',//已完成进度线颜色
        separatorUnFinishedColor: '#CCCCCC',//未完成进度线颜色
        stepIndicatorFinishedColor: '#52C41A',//已完成背景色
        stepIndicatorUnFinishedColor: '#CCCCCC',//未完成背景色
        stepIndicatorCurrentColor: '#52C41A',//当前进度背景色
        stepIndicatorLabelFontSize: 13,//圈内字体大小
        currentStepIndicatorLabelFontSize: 13,//当前圈字体大小
        stepIndicatorLabelCurrentColor: '#fff',//当前圈内字体颜色
        stepIndicatorLabelFinishedColor: '#fff',//已完成圈内字体颜色
        stepIndicatorLabelUnFinishedColor: '#fff',//未完成圈内字体颜色
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#52C41A'//当前选择label色
    }
    useEffect(() => {
    }, [])
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='查询结果' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <ScrollView >
                    {
                        infoData ? (
                            <>
                                <ListWrap data={infoData} labelData={labelData} />
                                {infoData.process && <Step labels={labels} customStyles={customStyles} currentPosition={currentPosition} />}
                            </>
                        )
                            : <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>
                    }
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
    ListWrap: {
        marginTop: 15,
        backgroundColor: '#fff'
    },
    valueStyle: {
        color: '#333333',
        fontSize: 16,
        flex: 2
    },
    labelStyle: {
        color: '#999999',
        fontSize: 16
    },
    stepWrap: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 25
    },
    noData: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: (GlobalStyles.window_height - 60),
        display: 'flex',
    },
    noDataText: {
        fontSize: 16,
        color: '#999'
    }
})