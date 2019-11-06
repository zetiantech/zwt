//公租房申请
import Housing from '../page/housing/familyHousimg/Housing' 
// 公租房申请
import HousingApply from '../page/housing/familyHousimg/HousingApply'
// 家庭房屋情况
import HousingFamily from '../page/housing/familyHousimg/HousingFamily'
// 信息确认
import HousimgConfirm from '../page/housing/familyHousimg/HousimgConfirm'
// 人才住房补贴申请
import TalentsHousimg from '../page/housing/talentsHousimg/TalentsHousimg'
// 
import TalentsHousimgComfirm from '../page/housing/talentsHousimg/TalentsHousimgComfirm'

import TalentsHousimgMessage from '../page/housing/talentsHousimg/TalentsHousimgMessage'

import HousingIndex from '../page/works/HousingIndex' //公租房列表

export default {
    Housing: {
        screen: Housing,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    HousingApply: {
        screen: HousingApply,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    HousingFamily: {
        screen: HousingFamily,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    HousimgConfirm: {
        screen: HousimgConfirm,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TalentsHousimg: {
        screen: TalentsHousimg,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TalentsHousimgComfirm: {
        screen: TalentsHousimgComfirm,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TalentsHousimgMessage: {
        screen: TalentsHousimgMessage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    HousingIndex: {
        screen: HousingIndex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}