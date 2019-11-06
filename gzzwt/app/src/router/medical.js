//社保-医疗专题
import Hospitals from '../page/socialSecurity/Hospitals' //定点医院
import HospitalsAddress from '../page/socialSecurity/HospitalsAddress' //医院位置
import Drugstore from '../page/socialSecurity/Drugstore' //定点药店
import DrugstoreAddress from '../page/socialSecurity/DrugstoreAddress' //定点药店


//社保-
import SocialSecurityApply from '../page/liveAll/SocialSecurity/SocialSecurityApply' //社保卡申领 SocialSecurityInfo
import SocialSecurityInfo from '../page/liveAll/SocialSecurity/SocialSecurityInfo' //社保卡申领 SocialSecurityInfo
import SocialSecurityBaseInfo from '../page/liveAll/SocialSecurity/SocialSecurityBaseInfo' //基本信息修改



//医疗服务
import NursePractitioner from '../page/medicalService/NursePractitioner' //职业护士查询
import NurseResults from '../page/medicalService/NurseResults' //职业护士查询结果
import MedicalPractitioners from '../page/medicalService/MedicalPractitioners' //职业医师查询
import MedicalResults from '../page/medicalService/MedicalResults' //职业医师查询结果
import HygieneLicense from '../page/medicalService/HygieneLicense' //卫生许可证查询
import HygieneResults from '../page/medicalService/HygieneResults' //卫生许可证查询结果
import HealthCertificate from '../page/medicalService/HealthCertificate' //健康证查询
import HealthResults from '../page/medicalService/HealthResults' //健康证查询结果
//预约挂号
import SubscribeRegist from '../page/medicalService/SubscribeRegist' //预约挂号
import SubscribeRegist1 from '../page/medicalService/SubscribeRegist1' //
import SubscribeRegist2 from '../page/medicalService/SubscribeRegist2' //
import SubscribeRegist3 from '../page/medicalService/SubscribeRegist3' //
import SubscribeRegist4 from '../page/medicalService/SubscribeRegist4' //
//献血信息查询 DonationQuery
import DonationQuery from '../page/medicalService/DonationQuery' //献血信息查询

//新生儿接种
import NewbornVaccinate from '../page/medicalService/NewbornVaccinate' //新生儿接种

import ZeroReport from '../page/socialSecurity/ZeroReport' //零报处理信息查询
import ZeroReportResults from '../page/socialSecurity/ZeroReportResults' //零报处理信息查询
import MedicalZeroDetails from '../page/socialSecurity/MedicalZeroDetails' //医疗零报详情
import BearZeroDetails from '../page/socialSecurity/BearZeroDetails' //生育零报详情
import InjuryZeroDetails from '../page/socialSecurity/InjuryZeroDetails' //工伤零报详情

// 社保，医疗服务
export default {
    //社保
    //定点医院
    Hospitals: {
        screen: Hospitals,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //医院位置
    HospitalsAddress: {
        screen: HospitalsAddress,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //定点药店
    Drugstore: {
        screen: Drugstore,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //定点药店位置
    DrugstoreAddress: {
        screen: DrugstoreAddress,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //医疗服务
    //执业护士
    NursePractitioner: {
        screen: NursePractitioner,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    // //执业护士查询结果
    NurseResults: {
        screen: NurseResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    // //执业医师查询
    MedicalPractitioners: {
        screen: MedicalPractitioners,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    // //执业医师查询结果
    MedicalResults: {
        screen: MedicalResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //卫生许可证查询
    HygieneLicense: {
        screen: HygieneLicense,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //卫生许可证查询结果
    HygieneResults: {
        screen: HygieneResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //健康证查询
    HealthCertificate: {
        screen: HealthCertificate,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //健康证查询结果
    HealthResults: {
        screen: HealthResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    // 社保卡
    SocialSecurityApply: {
        screen: SocialSecurityApply,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //社保查询
    SocialSecurityInfo: {
        screen: SocialSecurityInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //基本信息修改
    SocialSecurityBaseInfo: {
        screen: SocialSecurityBaseInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //预约挂号
    SubscribeRegist: {
        screen: SubscribeRegist,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //预约挂号-选择科室
    SubscribeRegist1: {
        screen: SubscribeRegist1,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SubscribeRegist2: {
        screen: SubscribeRegist2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SubscribeRegist3: {
        screen: SubscribeRegist3,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SubscribeRegist4: {
        screen: SubscribeRegist4,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //献血信息查询
    DonationQuery: {
        screen: DonationQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //新生儿接种
    NewbornVaccinate: {
        screen: NewbornVaccinate,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ZeroReport: {//零报信息出处理业务
        screen: ZeroReport,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ZeroReportResults: {//零报信息出处理业务-查询结果
        screen: ZeroReportResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MedicalZeroDetails: {//医疗零报详情
        screen: MedicalZeroDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    BearZeroDetails: {//生育零报详情
        screen: BearZeroDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    InjuryZeroDetails: {//工伤零报详情
        screen: InjuryZeroDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
};
