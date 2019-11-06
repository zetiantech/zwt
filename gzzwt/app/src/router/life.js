
//生活专题 
import LivePay from '../page/restsall/livepay/LivePay'//生活缴费首页
import AddLivePay from '../page/restsall/livepay/AddLivePay'//添加缴费用户
import ConfirmPay from '../page/restsall/livepay/ConfirmPay'//添加缴费用户electricPay
import electricPay from '../page/restsall/electricPay/electricPay'//电费首页
import ComElectrcPay from '../page/restsall/electricPay/ComElectrcPay'//电费2
import AddElectricPay from '../page/restsall/electricPay/AddElectricPay'//电费3
import fuelPay from '../page/restsall/fuelPay/fuelPay'//燃气首页
import ComFuel from '../page/restsall/fuelPay/ComFuel'//燃气2
import AddFuelPay from '../page/restsall/fuelPay/AddFuelPay'//燃气3
import iphoneFee from '../page/restsall/iphoneFee'//充值

export default {
    LivePay: {
        screen: LivePay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    }, 
    AddLivePay: {
        screen: AddLivePay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ConfirmPay: {
        screen: ConfirmPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    electricPay: {
        screen: electricPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ComElectrcPay: {
        screen: ComElectrcPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AddElectricPay: {
        screen: AddElectricPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    fuelPay: {
        screen: fuelPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ComFuel: {
        screen: ComFuel,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AddFuelPay: {
        screen: AddFuelPay,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    iphoneFee: {
        screen: iphoneFee,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}