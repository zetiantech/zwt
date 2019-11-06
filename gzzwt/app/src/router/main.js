

import MainPage from '../page/MainPage' // 主入口

import ResultPage from '../page/ResultPage' // 公用结果页

import AllServer from '../page/home/All'
import WelcomeScreen from '../page/WelcomePage' // 欢迎页
import HomeScreen from '../page/HomePage' // 首页
import LifeScreen from '../page/lifePage' // 生活
import WorkPage from '../page/WorkPage' // 办事
import MyScreen from '../page/MyPage' // 我的

import Authorization from '../page/Authorization' // 公用授权

export default {
    Main: {
        screen: MainPage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Life: {
        screen: LifeScreen,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    WorkPage: {
        screen: WorkPage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    My: {
        screen: MyScreen,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Authorization: {
        screen: Authorization,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AllServer: {
        screen: AllServer,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ResultPage: {
        screen: ResultPage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}