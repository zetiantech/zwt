

//其他
import Recharge from '../page/restsall/recharge/recharge'  //羊城通充值
import CarRest from '../page/restsall/caryards/CarRest'  //羊城通乘车码
import DrivingRecord from '../page/restsall/caryards/DrivingRecord'  //羊城通-乘车记录
import RestAccount from '../page/restsall/caryards/RestAccount'  //羊城通-乘车记录
import toiletMap from '../page/restsall/toiletMap'  //公厕查找

export default {
    //其他
    Recharge: {
        screen: Recharge,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarRest: {
        screen: CarRest,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    DrivingRecord: {
        screen: DrivingRecord,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    RestAccount: {
        screen: RestAccount,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    toiletMap: {
        screen: toiletMap,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}