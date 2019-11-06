
//办事指南
import PersonalWorkGuide from '../page/handling/PersonalWorkGuide'//个人办事指南
import PersonalWorkList from '../page/handling/PersonalWorkList'
import PersonalWorkDetail from '../page/handling/PersonalWorkDetail'
//材料详情
import MaterialDetail from '../page/handling/MaterialDetail'
// 基本信息
import PersonalWorkBaseInfo from '../page/handling/PersonalWorkBaseInfo'

// 婚姻服务
import MarriageService from '../page/works/MarriageService'
// 出入境服务
import EntryExitService from '../page/works/EntryExitService'
// 不动产
import RealEstateService from '../page/works/RealEstateService'
// 司法公正
import JudicialJusticeService from '../page/works/JudicialJusticeService'
//劳动就业列表
import jobService from '../page/works/jobService'

export default {
    PersonalWorkGuide: {
        screen: PersonalWorkGuide,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalWorkList: {
        screen: PersonalWorkList,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalWorkDetail: {
        screen: PersonalWorkDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MaterialDetail: {
        screen: MaterialDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PersonalWorkBaseInfo: {
        screen: PersonalWorkBaseInfo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    MarriageService: {
        screen: MarriageService,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EntryExitService: {
        screen: EntryExitService,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    RealEstateService: {
        screen: RealEstateService,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    JudicialJusticeService: {
        screen: JudicialJusticeService,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    jobService: {
        screen: jobService,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
}