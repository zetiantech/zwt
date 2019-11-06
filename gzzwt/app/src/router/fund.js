

//公积金
import AccumulationFundindex from '../page/AccumulationFund/AccumulationFundindex' // 公积金
import Deposite from '../page/AccumulationFund/Deposite' // 公积金缴存查询
import DepositeDetail from '../page/AccumulationFund/DepositeDetail' // 公积金缴存明细ExtractApplicationFund
import ExtractApplicationFund from '../page/AccumulationFund/ExtractApplicationFund/ExtractApplicationFund' // 公积金提取申请
import MyGoldCard from '../page/AccumulationFund/MyGoldCard' // 公积金卡
import ProvidentFundLoan from '../page/AccumulationFund/ProvidentFundLoan' // 公积金贷款计算

// 公积金前台提取预约
import ExtractBooking from '../page/AccumulationFund/ExtractBookingFund/ExtractBooking'
import ExtractBooking2 from '../page/AccumulationFund/ExtractBookingFund/ExtractBooking2'
import ExtractBookingResult from '../page/AccumulationFund/ExtractBookingFund/ExtractBookingResult'

//公积金活期定期余额查询
import SumAccountFundQuery from '../page/AccumulationFund/SumAccountFundQuery'
import SumAccountFundQuery2 from '../page/AccumulationFund/SumAccountFundQuery2'
//公积金启封*封存
import AccountSealFund from '../page/AccumulationFund/AccountSealFund'

import AccountPayFund from '../page/AccumulationFund/AccountPayFund'//公积金-自愿账户汇缴
import AccountPayFund1 from '../page/AccumulationFund/AccountPayFund1'//公积金-自愿账户补缴


export default {
    AccumulationFundindex: {
        screen: AccumulationFundindex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Deposite: {
        screen: Deposite,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DepositeDetail: {
        screen: DepositeDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ExtractApplicationFund: {   //公积金提取申请  
        screen: ExtractApplicationFund,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MyGoldCard: {   //公积金提取申请  
        screen: MyGoldCard,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ProvidentFundLoan: {
        screen: ProvidentFundLoan,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    // 前台预约
    ExtractBooking: {
        screen: ExtractBooking,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ExtractBooking2: {
        screen: ExtractBooking2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ExtractBookingResult: {
        screen: ExtractBookingResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //活期定期余额查询
    SumAccountFundQuery: {
        screen: SumAccountFundQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SumAccountFundQuery2: {
        screen: SumAccountFundQuery2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AccountSealFund: {
        screen: AccountSealFund,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AccountPayFund: {
        screen: AccountPayFund,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AccountPayFund1: {
        screen: AccountPayFund1,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
   
}