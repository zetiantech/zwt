
// 登录注册
import Login from '../page/login/Login'
import Register from '../page/login/Register'
import UnlockMode from '../page/login/UnlockMode'
import LockMode from '../page/login/LockMode'
import GestureUnlock from '../page/login/GestureUnlock'
import Verified from '../page/login/Verified'
import PasswordLogin from '../page/login/PasswordLogin'
import FaceComponent from '../page/login/FaceLogin'

import MyLicense from '../page/home/MyLicense'
import Setting from '../page/my/Setting' // 设置页面
import PersonalInfo from '../page/my/PersonalInfo' // 个人信息
import NicknameUpdate from '../page/my/NicknameUpdate' // 更改昵称
import Phone from '../page/my/Phone' // 更改手机号
import HeadImgUpdate from '../page/my/HeadImgUpdate' // 更改头像
import NewPhoneSet from '../page/my/NewPhoneSet' // 设置新号码
import AccountSecurity from '../page/my/AccountSecurity' // 账号安全
import PasswordSet from '../page/my/PasswordSet' // 设置密码 AddRess

import UserAddAddRess from '../page/my/UserAddAddRess' // 添加收货地址
import UserAddRess from '../page/my/UserAddRess' // 用户收货地址
import UserRedactAddress from '../page/my/UserRedactAddress' // 编辑收货地址

import FaceRecognition from 'src/component/FaceRecognition' // 人脸识别
import GesturePasswordVerify from 'src/component/gesture/GesturePasswordVerify' // 手势解锁
import TouchIdComponentVerify from 'src/component/touchId/TouchIdComponentVerify' // 指纹解锁

import MyAppointment from '../page/my/MyAppointment' // 我的预约
import MyAppointmentDetail from '../page/my/MyAppointmentDetail' // 预约详情

export default {
    MyAppointment: {
        screen: MyAppointment,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MyAppointmentDetail: {
        screen: MyAppointmentDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    License: {
        screen: MyLicense,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Setting: {
        screen: Setting,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalInfo: {
        screen: PersonalInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    NicknameUpdate: {
        screen: NicknameUpdate,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Phone: {
        screen: Phone,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    HeadImgUpdate: {
        screen: HeadImgUpdate,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    NewPhoneSet: {
        screen: NewPhoneSet,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AccountSecurity: {
        screen: AccountSecurity,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PasswordSet: {
        screen: PasswordSet,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    FaceRecognition: {
        screen: FaceRecognition,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    }, 
    GesturePasswordVerify: {
        screen: GesturePasswordVerify,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TouchIdComponentVerify: {
        screen: TouchIdComponentVerify,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },

    Login: {
        screen: Login,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    UnlockMode: {
        screen: UnlockMode,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    LockMode: {
        screen: LockMode,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    GestureUnlock: {
        screen: GestureUnlock,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Verified: {
        screen: Verified,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PasswordLogin: {
        screen: PasswordLogin,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Face: {
        screen: FaceComponent,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    UserAddRess: {
        screen: UserAddRess,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    UserAddAddRess: {
        screen: UserAddAddRess,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    UserRedactAddress: {
        screen: UserRedactAddress,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}