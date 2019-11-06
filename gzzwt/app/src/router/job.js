//劳动就业
import Unemployment from '../page/employment/Unemployment' // 个人失业登记查询
import UnemploymentResults from '../page/employment/UnemploymentResults' // 个人失业登记查询结果
import TalentIntroduction from '../page/employment/TalentIntroduction' // 人才引进接收情况查询
import TalentIntroductionResults from '../page/employment/TalentIntroductionResults' // 人才引进接收情况查询结果
import GraduateProfile from '../page/employment/GraduateProfile' // 高校毕业生档案查询
import GraduateProfileResults from '../page/employment/GraduateProfileResults' // 高校毕业生档案查询结果
import Employment from '../page/employment/Employment' // 个人就业登记信息查询 
import EmploymentResults from '../page/employment/EmploymentResults' // 个人就业登记信息查询结果
import ProfessionalSkill from '../page/employment/ProfessionalSkill' // 专业技术资格查询
import ProfessionalSkillResults from '../page/employment/ProfessionalSkillResults' // 专业技术资格查询结果
export default {
    Unemployment: {//个人失业登记查询
        screen: Unemployment,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    UnemploymentResults: {//个人就业登记信息查询结果
        screen: UnemploymentResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TalentIntroduction: {//人才引进接收情况查询
        screen: TalentIntroduction,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TalentIntroductionResults: {//人才引进接收情况查询结果
        screen: TalentIntroductionResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    GraduateProfile: {//高校毕业生档案查询
        screen: GraduateProfile,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    GraduateProfileResults: {//高校毕业生档案查询结果
        screen: GraduateProfileResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Employment: {//个人就业登记信息查询
        screen: Employment,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EmploymentResults: {//个人就业登记信息查询结果
        screen: EmploymentResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ProfessionalSkill: {//专业技术资格查询
        screen: ProfessionalSkill,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ProfessionalSkillResults: {//专业技术资格查询结果
        screen: ProfessionalSkillResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },//
};
