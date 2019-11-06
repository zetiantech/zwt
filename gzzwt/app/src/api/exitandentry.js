//出入境专题
export default {
    PREPATH: '/exitandentry', // 路径前缀
    /**
     * @description 出入境专题-类型列表
     * @interface GET /keyValue/list
     **/
    KEYVALUE_LIST: `/keyValue/list`,
    /**
     * @description 出入境专题-境内人员出入境业务预约
     * @interface GET /cpApply/addApply
     **/
    CPAPPLY_ADDAPPLY: `/cpApply/addApply`,
    /**
     * @description 出入境专题-往来港澳通行证再次签注
     * @interface GET /againSign/add
     **/
    AGAINSIGN_ADD: `/againSign/add`,
    /**
     * @description 出入境专题-获取预约列表
     * @interface GET /addApply/getApplyList
     **/
    GET_APPLY_LIST: `/cpApply/getApplyList`,
    /**
     * @description 出入境专题-取消入境预约
     * @interface GET /addApply/cancelApply
     **/
    CANCEL_APPLY: `/cpApply/cancelApply`,
    /**
     * @description 出入境专题-选择商务签的时候判断组织机构代码是否正确
     * @interface GET/bs/check
     **/
    BS_CHECK: `/bs/check`,

    
    
}