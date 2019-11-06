//教育考试
import EducationComplex from '../page/education/EducationComplex' // 教育综合
import Query from '../page/education/Query' // 中考查询页面
import QueryResult from '../page/education/QueryResult' // 中考查询结果页面
import CollegeEntranceQuery from '../page/education/CollegeEntranceQuery' // 高考查询页面
import CollegeEntranceResult from '../page/education/CollegeEntranceResult' // 高考查询结果页面
import AdultCollegeQuery from '../page/education/AdultCollegeQuery' // 成考查询页面
import AdultCollegeResult from '../page/education/AdultCollegeResult' // 成考查询结果页面
import SelfCollegeQuery from '../page/education/SelfCollegeQuery' // 自考查询页面
import SelfCollegeResult from '../page/education/AdultCollegeResult' // 自考查询结果页面

//校车
import SchoolBus from '../page/education/SchoolBus' // 校车查询
import SchoolBusResult from '../page/education/SchoolBusResult' // 校车查询结果
import CitySchoolBus from '../page/education/CitySchoolBus' // 市校车查询
import CitySchoolBusResult from '../page/education/CitySchoolBusResult' // 市校车查询
//学校
import PublicPrimarySchool from '../page/education/PublicPrimarySchool' // 公办小学招生信息查询
import PrivatePrimarySchools from '../page/education/PrivatePrimarySchools' // 民办小学招生信息查询
import PrivateMiddleSchool from '../page/education/PrivateMiddleSchool' // 民办初中招生信息查询
import PrivateSchoolsDetail from '../page/education/PrivateSchoolsDetail' // 公办/民办小学/民办初中招生信息查询-详情

export default {
    EducationComplex: {//教育综合
        screen: EducationComplex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SeniorEntranceQuery: {//中考查询
        screen: Query,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SeniorEntranceQueryResult: {//中考查询结果
        screen: QueryResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CollegeEntranceQuery: {//高考查询
        screen: CollegeEntranceQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CollegeEntranceResult: {//高考查询结果
        screen: CollegeEntranceResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AdultCollegeQuery: {//成考查询
        screen: AdultCollegeQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    AdultCollegeResult: {//成考查询结果
        screen: AdultCollegeResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SelfCollegeQuery: {//自考查询
        screen: SelfCollegeQuery,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SelfCollegeResult: {//自考查询结果
        screen: SelfCollegeResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SchoolBus: {//校车查询
        screen: SchoolBus,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    SchoolBusResult: {//校车查询结果
        screen: SchoolBusResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CitySchoolBus: {//市校车查询
        screen: CitySchoolBus,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CitySchoolBusResult: {//市校车查询结果
        screen: CitySchoolBusResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PublicPrimarySchool: {//公办小学招生信息查询
        screen: PublicPrimarySchool,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PrivatePrimarySchools: {//民办小学招生信息查询
        screen: PrivatePrimarySchools,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PrivateMiddleSchool: {//民办初中招生信息查询
        screen: PrivateMiddleSchool,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    PrivateSchoolsDetail: {//公办/民小学招生信息查询-详情
        screen: PrivateSchoolsDetail,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
};
