//车辆业务-交通出行
import OccupyConstruction from '../page/vehicle/transportation/OccupyConstruction'//占道查询
import OccupyConstructionResults from '../page/vehicle/transportation/OccupyConstructionResults'//占到查询结果
import HighwayMaintenance from '../page/vehicle/transportation/HighwayMaintenance'//公路养护
import HighwayMaintenanceResults from '../page/vehicle/transportation/HighwayMaintenanceResults'//公路养护查询结果
import ParkingLog from '../page/vehicle/transportation/ParkingLog'//公路养护查询结果
import ParkDetails from '../page/vehicle/transportation/ParkDetails'//停车场查询
import BusRoute from '../page/vehicle/transportation/BusRoute'//交通线路查询
//机动车状态
import VehicleCondition from '../page/vehicle/vehicleCondition/VehicleCondition'//机动车状态查询
import VehicleResult from '../page/vehicle/vehicleCondition/VehicleResult'//机动车状态查询结果
//驾驶证
import DrivingCard from '../page/vehicle/DrivingCard' // 我的驾驶证
import drivingLicenceIndex from '../page/vehicle/drivingLicenceIndex'//驾驶证全部业务员列表
import DriversLicense from '../page/vehicle/driversLicense/DriversLicense'//驾驶证状态查询
import DriversResults from '../page/vehicle/driversLicense/DriversResults'//驾驶证状态查询结果
import RenewDrivingPermits from '../page/vehicle/RenewDrivingPermits/RenewDrivingPermits'// 换领行驶证1
import RenewDrivingPermits2 from '../page/vehicle/RenewDrivingPermits/RenewDrivingPermits2'// 换领行驶证2
import RenewDrivingPermits3 from '../page/vehicle/RenewDrivingPermits/RenewDrivingPermits3'// 换领行驶证3
import RenewDrivingPermitsEND from '../page/vehicle/RenewDrivingPermits/RenewDrivingPermitsEND'// 换领行驶证end
import dateReplacement from '../page/vehicle/dateReplacement/dateReplacement'//有效期换满证 1
import dateReplacement2 from '../page/vehicle/dateReplacement/dateReplacement2'//有效期换满证2
import dateinformation from '../page/vehicle/dateReplacement/dateinformation'//有效期换满证信息确认3 
import dateResult from '../page/vehicle/dateReplacement/dateResult'//有效期换满证信息确认4  
import dateReplacAddress from '../page/vehicle/dateReplacement/dateReplacAddress'//有效期换满证信息确认map  
//机动车年审
import CarSubscribe from '../page/vehicle/CarAnnualVerification/CarSubscribe'//机动车年审预约1
import CarSubscribe2 from '../page/vehicle/CarAnnualVerification/CarSubscribe2'//机动车年审预约2-选择办证
import CarSubscribe3 from '../page/vehicle/CarAnnualVerification/CarSubscribe3'//机动车年审预约3-选择预约时间
import CarSubscribe4 from '../page/vehicle/CarAnnualVerification/CarSubscribe4'//机动车年审预约4-信息确认
import AppointmentResult from '../page/vehicle/CarAnnualVerification/AppointmentResult'//机动车年审预约5-结果
//补换领机动车合格标志
import CarInformationEx from '../page/vehicle/GetExNewCarPlate/CarInformationEx'//补换领机动车合格标志
import CarInformationExTwo from '../page/vehicle/GetExNewCarPlate/CarInformationExTwo'//补换领机动车合格标志2
import GetlacementCarConfirmation from '../page/vehicle/GetExNewCarPlate/GetlacementCarConfirmation'//补换领机动车合格标志3
import ExResult from '../page/vehicle/GetExNewCarPlate/ExResult'//补换领机动车合格标志结果
import EntrustCheckoutCarMessage from '../page/vehicle/EntrustCheckout/EntrustCheckoutCarMessage'//委托核发动机检验合格标志
import EntrustCheckoutCarMessageTwo from '../page/vehicle/EntrustCheckout/EntrustCheckoutCarMessageTwo'//委托核发动机检验合格标志2
import EntrustConfirmation from '../page/vehicle/EntrustCheckout/EntrustConfirmation'//委托核发动机检验合格标志3EntrustResult
import EntrustResult from '../page/vehicle/EntrustCheckout/EntrustResult'//委托核发动机检验合格标志3


//交通违法
import DriversBreakLow from '../page/vehicle/trafficViolation/DriversBreakLow'//驾驶人违法查询
import DriversBreakResults from '../page/vehicle/trafficViolation/DriversBreakResults'//驾驶人违法查询结果
import DriverDetails from '../page/vehicle/trafficViolation/DriverDetails'//驾驶人违法查询详情
import MotorVehicle from '../page/vehicle/trafficViolation/MotorVehicle'//机动车违法查询详
import MotorVehicleResults from '../page/vehicle/trafficViolation/MotorVehicleResults'//机动车违法查询结果
import MotorVehicleDetails from '../page/vehicle/trafficViolation/MotorVehicleDetails'//机动车违法查询结果

//交通违法
import ViolateMake from '../page/vehicle/ViolateMake/ViolateMake'//违法办理预约
import informationOwn from '../page/vehicle/ViolateMake/informationOwn'//违法办理预约信息确认 


//车辆办网进度
import VehicleNetwork from '../page/vehicle/vehicleNetwork/VehicleNetwork'//车辆网办进度查询
import VehicleNetworkDetails from '../page/vehicle/vehicleNetwork/VehicleNetworkDetails'//车辆网办进度查询结果


//车辆专题  
import VehicleIndex from '../page/vehicle/VehicleIndex'//机动车业务列表
import TransferTheBooking from '../page/vehicle/TheCarTransfer/TransferTheBooking'//机动车转移登记
import CarInformation from '../page/vehicle/TheCarTransfer/CarInformation'//机动车转移登记
import CarCountersign from '../page/vehicle/TheCarTransfer/CarCountersign'//机动车转移登记信息确认
import ApplicationResult from '../page/vehicle/TheCarTransfer/ApplicationResult '//机动车转移登记信息确认 
import ExchangeCarRegister from '../page/vehicle/ExchangeCarRegister/ExchangeCarRegister'//换领机动车登记证书
import CarInformations from '../page/vehicle/GetNewCarPlate/CarInformations'//补换领机动车号牌 
import CarInformationTwo from '../page/vehicle/GetNewCarPlate/CarInformationTwo'//补换领机动车号牌2 
import ReplacementCarConfirmation from '../page/vehicle/GetNewCarPlate/ReplacementCarConfirmation'//补换领机动车号牌-信息确认
import Result from '../page/vehicle/GetNewCarPlate/Result'//补换领机动车号牌-申请结果
import NewVehicleMake from '../page/vehicle/UpVehicleBoard/NewVehicleMake'//新车上牌预约
import ConfirmationInformation from '../page/vehicle/UpVehicleBoard/ConfirmationInformation'//新车上牌预约


import VehicleMainIndex from '../page/vehicle/VehicleMainIndex' // 车主服务主页


// 车辆业务
export default {
    VehicleMainIndex: {
        screen: VehicleMainIndex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    }, 
    DrivingCard: {
        screen: DrivingCard,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车状态查询
    VehicleIndex: {
        screen: VehicleIndex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    TransferTheBooking: {
        screen: TransferTheBooking,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarInformations: {
        screen: CarInformations,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarInformation: {
        screen: CarInformation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarCountersign: {
        screen: CarCountersign,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ApplicationResult: {
        screen: ApplicationResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ExchangeCarRegister: {
        screen: ExchangeCarRegister,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarInformation: {
        screen: CarInformation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ReplacementCarConfirmation: {
        screen: ReplacementCarConfirmation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    NewVehicleMake: {
        screen: NewVehicleMake,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    ConfirmationInformation: {
        screen: ConfirmationInformation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    CarInformationTwo: {
        screen: CarInformationTwo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    Result: {
        screen: Result,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },

    //车辆业务-交通出行
    //占道施工
    OccupyConstruction: {
        screen: OccupyConstruction,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //占道施工结果查询
    OccupyConstructionResults: {
        screen: OccupyConstructionResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //公路养护查询
    HighwayMaintenance: {
        screen: HighwayMaintenance,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //公路养护查询结果
    HighwayMaintenanceResults: {
        screen: HighwayMaintenanceResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //停车场
    ParkingLog: {
        screen: ParkingLog,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //停车场详情
    ParkDetails: {
        screen: ParkDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //公交线路查询
    BusRoute: {
        screen: BusRoute,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车状态查询
    VehicleCondition: {
        screen: VehicleCondition,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车状态查询结果
    VehicleResult: {
        screen: VehicleResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶证状态查询
    DriversLicense: {
        screen: DriversLicense,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶证状态查询结果
    DriversResults: {
        screen: DriversResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶人违法查询
    DriversBreakLow: {
        screen: DriversBreakLow,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶人违法查询结果
    DriversBreakResults: {
        screen: DriversBreakResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶人违法查询结果详情
    DriverDetails: {
        screen: DriverDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车违法查询
    MotorVehicle: {
        screen: MotorVehicle,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车违法查询结果
    MotorVehicleResults: {
        screen: MotorVehicleResults,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车违法查详情
    MotorVehicleDetails: {
        screen: MotorVehicleDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //车辆网办证进度查询
    VehicleNetwork: {
        screen: VehicleNetwork,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //车辆网办证进度查询结果
    VehicleNetworkDetails: {
        screen: VehicleNetworkDetails,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //换领机动车行驶证end
    RenewDrivingPermitsEND: {
        screen: RenewDrivingPermitsEND,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //换领机动车行驶证3
    RenewDrivingPermits3: {
        screen: RenewDrivingPermits3,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //换领机动车行驶证1
    RenewDrivingPermits2: {
        screen: RenewDrivingPermits2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //换领机动车行驶证
    RenewDrivingPermits: {
        screen: RenewDrivingPermits,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //驾驶证全部业务列表
    drivingLicenceIndex: {
        screen: drivingLicenceIndex,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //有效期换满证1
    dateReplacement: {
        screen: dateReplacement,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //有效期换满证2 
    dateReplacement2: {
        screen: dateReplacement2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //有效期换满证3 
    dateinformation: {
        screen: dateinformation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //有效期换满证4 
    dateResult: {
        screen: dateResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //有效期换满证map 
    dateReplacAddress: {
        screen: dateReplacAddress,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //交通违法-违法办理预约 
    ViolateMake: {
        screen: ViolateMake,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //交通违法-违法办理预约申请确认 
    informationOwn: {
        screen: informationOwn,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车年审预约1   
    CarSubscribe: {
        screen: CarSubscribe,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车年审预约2   
    CarSubscribe2: {
        screen: CarSubscribe2,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车年审预约3   
    CarSubscribe3: {
        screen: CarSubscribe3,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车年审预约4-信息确认
    CarSubscribe4: {
        screen: CarSubscribe4,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //机动车年审预约5-结果
    AppointmentResult: {
        screen: AppointmentResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //补换领机动车合格标志
    CarInformationEx: {
        screen: CarInformationEx,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //补换领机动车合格标志2
    CarInformationExTwo: {
        screen: CarInformationExTwo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //补换领机动车合格标志3
    GetlacementCarConfirmation: {
        screen: GetlacementCarConfirmation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //补换领机动车合格标志4
    ExResult: {
        screen: ExResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //委托核发动机检验合格标志1
    EntrustCheckoutCarMessage: {
        screen: EntrustCheckoutCarMessage,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //委托核发动机检验合格标志2
    EntrustCheckoutCarMessageTwo: {
        screen: EntrustCheckoutCarMessageTwo,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //委托核发动机检验合格标志3
    EntrustConfirmation: {
        screen: EntrustConfirmation,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
    //委托核发动机检验合格标志4
    EntrustResult: {
        screen: EntrustResult,
        navigationOptions: ({ props, navigation }) => ({
            header: null
        })
    },
};

