//车主专题
export default {
    PREPATH: '/vehicle', // 路径前缀
    /**
     * @description  51．车主专题-交通出行-路名下拉框接口：
     * @interface POST /trafficTrip/getRoadBox
     **/
    GetRoadBox: `/trafficTrip/getRoadBox `,
    /**
     * @description52．车主专题-交通出行-占道施工查询接口：
     * @interface POST /trafficTrip/constructQuery
     **/
    ConstructQuery: `/trafficTrip/constructQuery `,
    /**
     * @description53．车主专题-交通出行-公路养护查询接口：
     * @interface POST /trafficTrip/curingQuery
     **/
    CuringQuery: `/trafficTrip/curingQuery `,
    /**
     * @description54．车主专题-车辆业务-机动车状态查询：：
     * @interface POST /vehicleBusiness/statusQuery
     **/
    VehicleStatusQuery: `/vehicleBusiness/statusQuery `,
    /**
     * @description59．车主专题-驾驶证-驾驶证状态查询：
     * @interface POST /drivingLicense/statusQuery
     **/
    DrivingStatusQuery: `/drivingLicense/statusQuery `,
    /**
     * @description55．车主专题-交通违法-驾驶人违法查询：
     * @interface POST /trafficIlleagal/driverIlleagalQuery
     **/
    DriverIlleagalQuery: `/trafficIlleagal/driverIlleagalQuery`,
    /**
     * @description56．车主专题-交通违法-号牌类型下拉框接口：
     * @interface POST /trafficIlleagal/getPlateKindBox
     **/
    GetPlateKindBox: `/trafficIlleagal/getPlateKindBox`,
    /**
     * @description57．车主专题-交通违法-机动车违法查询：
     * @interface POST /trafficIlleagal/vehicleIlleagalQuery
     **/
    VehicleIlleagalQuery: `/trafficIlleagal/vehicleIlleagalQuery`,
    /**
     * @description54．车主专题-车辆业务-车辆网办进度查询：
     * @interface POST /vehicleBusiness/progressQuery
     **/
    ProgressQuery: `/vehicleBusiness/progressQuery`,

  /**车辆业务
   * [-获取下拉框数据 ]]]
   * @type {[GET]}
   */
  KeyValueList: `/keyValue/list`,
  /**车辆业务
   * [-获取用户车辆信息&&检测车辆是否存在]]]
   * @type {[GET]}
   */
  VehicleApplyGetOne: `/vehicleApply/getOne`,
  /**车辆业务
   * [-换领机动车登记证书]]]
   * @type {[Post]}
   */
  AddRptRegistCertApply: `/vehicleApply/addRptRegistCertApply `,
  /**车辆业务
   * [-获取车管所地址]]]
   * @type {[Post]}
   */
  VaoBranchSelectList: `/vaoBranch/selectList`,
  /**车辆业务
   * [-上传车辆图片]]]
   * @type {[Post]}
   */
  CarUploadFile: `/upload/file`,
  /**车辆业务
   * [-新车上牌预约]]]
   * @type {[Post]}
   */
  vehicleApplyAddNewPlateApply: `/vehicleApply/addNewPlateApply `,
  /**车辆业务
   * [-添加机动车转移预约]]]
   * @type {[Post]}
   */
  VehicleApplyAddTransferApply: `/vehicleApply/addTransferApply `,
  /**车辆业务
   * [-换领机动车号码牌]]
   * @type {[Post]}
   */
  VehicleApplyAddRptPlateApply: `/vehicleApply/addRptPlateApply `,
/**驾驶证
   * [-获取驾驶证详细信息]]
   * @type {[GET]}
   */
  VehicleDrivingLicenseGetOne: `/drivingLicense/getOne`,
/**驾驶证
   * [-获取车管所列表]]
   * @type {[GET]}
   */
  VaoBranchList: `/vaoBranch/list`,
/**驾驶证
   * [-获取辆检查站列表]]
   * @type {[GET]}
   */
  DetectionBranchList: `/detectionBranch/list`,
/**驾驶证
   * [-有效期换满证]]
   * @type {[Post]}
   */
  DrivingLicenseAddApply: `/drivingLicense/addApply`,
/**违法办理
   * [-违法办理预约]]
   * @type {[Post]}
   */
  DrivingLicenseAddApply: `/handleIlegal/addApply`,
 /**机动车
   * [-机动车年检]]
   * @type {[Post]}
   */
  VechicleApplyAddYearAuditApply: `/vehicleApply/addYearAuditApply`,
/**机动车
   * [-补领机动车合格标志]]
   * @type {[Post]}
   */
  VechicleApplyAddRptCertMarkApply: `/vehicleApply/addRptCertMarkApply`,
/**机动车
   * [-委托核发动机检验合格标志]]
   * @type {[Post]}
   */
VechicleApplyaddEiCertMarkApply: `/vehicleApply/addEiCertMarkApply`,

};
