//不动产
import EstateProfile from '../page/estate/EstateProfile' // 不动产档案查询
import EstateProfileResults from '../page/estate/EstateProfileResults' // 不动产档案查询
import EstateAppointment from '../page/estate/EstateAppointment' // 不动产登记预约 
import EstateAppointmentBook from '../page/estate/EstateAppointmentBook' // 不动产登记预约 -第二步
import EstateAppointmentSuccess from '../page/estate/EstateAppointmentSuccess' // 不动产登记预约成功
import EstateAdvance from '../page/estate/EstateAdvance' // 不动产-预售证信息查询 
import EstateAdvanceResults from '../page/estate/EstateAdvanceResults' // 不动产-预售证信息查询结果
import EstateBuilding from '../page/estate/EstateBuilding' // 不动产-预售楼盘信息查询 
import EstateBuildingResults from '../page/estate/EstateBuildingResults' // 不动产-预售楼盘信息查询结果
import EstateProject from '../page/estate/EstateProject' // 不动产-房地产项目信息查询 
import EstateProjectResults from '../page/estate/EstateProjectResults' // 不动产-房地产项目信息查询  
import EstateHousing from '../page/estate/EstateHousing' // 不动产-存量房源信息查询
import EstateHousingResults from '../page/estate/EstateHousingResults' // 不动产-存量房源信息查询查询 
export default {
    EstateProfile: {//不动产档案查询
        screen: EstateProfile,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateProfileResults: {//不动产档案查询结果
        screen: EstateProfileResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateAppointment: {//不动产网上预约
        screen: EstateAppointment,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateAppointmentBook: {//不动产网上预约-第二步
        screen: EstateAppointmentBook,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateAppointmentSuccess: {//不动产网上预约成功
        screen: EstateAppointmentSuccess,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateAdvance: {//不动产-预售证信息查询
        screen: EstateAdvance,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateAdvanceResults: {//不动产-预售证信息查询结果
        screen: EstateAdvanceResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateBuilding: {//不动产-预售楼盘信息
        screen: EstateBuilding,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateBuildingResults: {//不动产-预售楼盘查询结果
        screen: EstateBuildingResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateProject: {//不动产-房地产项目查询
        screen: EstateProject,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },//
    EstateProjectResults: {//不动产-房地产项目查询结果
        screen: EstateProjectResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    EstateHousing: {//不动产-存量房源信息查询
        screen: EstateHousing,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },//
    EstateHousingResults: {//不动产-存量房源信息查询结果
        screen: EstateHousingResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
};
