// 婚姻专题
export default {
    PREPATH: '/marital', // 路径前缀
    /**
     * @description 获取获取办理时间,可预约列表数据
     * @interface GET /marital/registry/getValidApplyList
     **/
    GETVALIDAPPLY_LIST: `/registry/getValidApplyList`,
    /**
     * @description 获取婚姻登记处可预约列表
     * @interface GET /registry/getValidDateList
     **/
    GETVALIDDATE_LIST: `/registry/getValidDateList`,

    /**
     * @description 获取婚姻登记处列表
     * @interface GET /registry/list
     **/
    REGISTRY_LIST: `/registry/list`,
    /**
     * @description 获取婚姻登记处列表
     * @interface POST /proveApply/addApply
     **/
    PROVEAPPLY_ADDAPPLY: `/proveApply/addApply`,
    /**
     * @description 获取婚姻证明预约列表
     * @interface GET /proveApply/list
     **/
    PROVEAPPLY_LIST: `/proveApply/list`,
    /**
     * @description 婚姻登记处管理
     * @interface POST /registry/add
     **/
    ADD_REGISTRY: `/registry/add`,

    /**
     * @description 婚姻申请
     * @interface POST /marriedApply/addApply
     **/
    ADD_MARRIEDAPPLY: `/marriedApply/addApply`,
    /**
     * @description 婚姻取消
     * @interface GET /marriedApply/cancel
     **/
    CANCEL_MARRIEDAPPLY: `/marriedApply/cancel`,

    /**
     * @description 婚姻申请列表
     * @interface GET /marriedApply/list
     **/
    MARRIEDAPPLY_LIST: `/marriedApply/list`,

    /**
     * @description 下拉框接口 kindId //1-人员类型，2-证件类别，3-军人类别 ，4-婚姻状况
     * @interface GET /select/list
     **/
    SELECT_LIST: `/select/list`,
     /**GET 
     * @description 婚姻-获取获取办理时间,可预约列表数据
     * @interface GET /registry/getValidApplyList 
     **/
    GETVALIDAPPLY_LIST: `/registry/getValidApplyList`,
};