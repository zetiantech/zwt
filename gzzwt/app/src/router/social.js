//社会综合业务
import SocialOrganizationQuery from '../page/socialBusiness/SocialOrganization' //社会组织查询
import SocialOrganizationResult from '../page/socialBusiness/SocialOrganizationResult' //社会组织查询结果
import CafeteriaElderly from '../page/socialBusiness/CafeteriaElderly' //长者饭堂查询
import CafeteriaElderlyResult from '../page/socialBusiness/CafeteriaElderlyResult' //长者饭堂查询结果
import QueryFinance from '../page/socialBusiness/QueryFinance' //查询金融激活时预留手机号码
import QueryFinanceResult from '../page/socialBusiness/QueryFinanceResult' //查询金融激活时预留手机号码-查询结果
import SkilledTalents from '../page/socialBusiness/SkilledTalents' //技能人才实操测试查询
import SkilledTalentsResult from '../page/socialBusiness/SkilledTalentsResult' //技能人才实操测试查询-查询结果

import dwellcardGet from '../page/socialBusiness/dwellcardGet' //居住证申领
import dwellcardGet2 from '../page/socialBusiness/dwellcardGet2' //居住证申领2
import dwellcardGet3 from '../page/socialBusiness/dwellcardGet3' //居住证申领3
import personIndexApply1 from '../page/socialBusiness/personIndexApply1' //个人增量指标申请1-阅读协议
import personIndexApply from '../page/socialBusiness/personIndexApply' //个人增量指标申请
import personIndexApply2 from '../page/socialBusiness/personIndexApply2' //个人增量指标申请2



export default {
    SocialOrganizationQuery: {
        screen: SocialOrganizationQuery,//社会组织查询
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SocialOrganizationResult: {
        screen: SocialOrganizationResult,//社会组织查询结果
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CafeteriaElderly: {
        screen: CafeteriaElderly,//长者饭堂查询
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CafeteriaElderlyResult: {
        screen: CafeteriaElderlyResult,//长者饭堂查询结果
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    QueryFinance: {
        screen: QueryFinance,//查询金融激活时预留手机号码
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    QueryFinanceResult: {
        screen: QueryFinanceResult,//查询金融激活时预留手机号码-查询结果
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SkilledTalents: {
        screen: SkilledTalents,//技能人才实操测试查询
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SkilledTalentsResult: {
        screen: SkilledTalentsResult,//技能人才实操测试查询结果
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },

    dwellcardGet: {
        screen: dwellcardGet,//居住证申领
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    dwellcardGet2: {
        screen: dwellcardGet2,//居住证申领2
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    dwellcardGet3: {
        screen: dwellcardGet3,//居住证申领3
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    personIndexApply: {
        screen: personIndexApply,//个人增量指标申请
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    personIndexApply2: {
        screen: personIndexApply2,//个人增量指标申请
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    personIndexApply1: {
        screen: personIndexApply1,//个人增量指标申请
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },


}
