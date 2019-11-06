//出入境-港澳再次签注
import GAEndorsement from '../page/entryExit/GAEndorsement'

import EntryExitPassInfo from '../page/entryExit/EntryExitPassInfo'
// 出入境申请协议
import ApplicationAgreement from '../page/entryExit/ApplicationAgreement'

import ApplyBusinessType from '../page/entryExit/ApplyBusinessType'//选择申请业务类型
import PersonalStayReport from '../page/entryExit/PersonalStayReport'//个人住宿申报
// 基本信息
import BaseInfo from '../page/entryExit/BaseInfo'
// 填写个人信息
import PersonalBaseInfo from '../page/entryExit/PersonalBaseInfo'
// 填写业务信息
import BusinessInfo from '../page/entryExit/BusinessInfo'
// 
import ReservationInfo from '../page/entryExit/ReservationInfo'
// 取消出入境预约
import CancelApply from '../page/entryExit/CancelApply'
// 办证查询进度
import ScheduleQuery from '../page/entryExit/ScheduleQuery'
// 办证查询结果
import ScheduleResult from '../page/entryExit/ScheduleResult'

// 境外申请 - 外国人个人申请
import ApplyBaseInfo from '../page/entryExit/ApplyBaseInfo'

export default {
    GAEndorsement: {
        screen: GAEndorsement,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EntryExitPassInfo: {
        screen: EntryExitPassInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ApplicationAgreement: {
        screen: ApplicationAgreement,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    BaseInfo: {
        screen: BaseInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalBaseInfo: {
        screen: PersonalBaseInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    BusinessInfo: {
        screen: BusinessInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ReservationInfo: {
        screen: ReservationInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ApplyBusinessType: { //境内人员出入境预约
        screen: ApplyBusinessType,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalStayReport: { //个人住宿申报
        screen: PersonalStayReport,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CancelApply: {
        screen: CancelApply,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ScheduleQuery: {
        screen: ScheduleQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ScheduleResult: {
        screen: ScheduleResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ApplyBaseInfo: {
        screen: ApplyBaseInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}