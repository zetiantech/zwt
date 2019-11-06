// 婚姻生育
import MarriageAppointment from '../page/marriage/MarriageAppointment' // 婚姻登记
import MarriageOutlets from '../page/marriage/MarriageOutlets'
import OutletsTime from '../page/marriage/OutletsTime'
import MarriageResult from '../page/marriage/MarriageResult' // 婚姻预约信息确认
import MarriageLog from '../page/marriage/MarriageLog' // 婚姻登记记录证明
import MarriageLogResult from '../page/marriage/MarriageLogResult' // 婚姻查询结果

import MarriageLogProve from '../page/marriage/MarriageLogProve' // 婚姻登记记录证明
import MarriageProveResult from '../page/marriage/MarriageProveResult' // 婚姻登记记录证明确认

export default {
    MarriageAppointment: {
        screen: MarriageAppointment,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageOutlets: {
        screen: MarriageOutlets,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    OutletsTime: {
        screen: OutletsTime,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageResult: {
        screen: MarriageResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageLogResult: {
        screen: MarriageLogResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageLog: {
        screen: MarriageLog,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageLogProve: {
        screen: MarriageLogProve,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageProveResult: {
        screen: MarriageProveResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}