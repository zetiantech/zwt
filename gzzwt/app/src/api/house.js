//不动产专题
export default {
    PREPATH: '/house', // 路径前缀
    /**
     * @description 59.不动产专题-不动产档案查询
     * @interface POST /immovable/getDossierInfo
     **/
    GetDossierInfo: `/immovable/getDossierInfo`,

    /**
     * @description 60.不动产专题-不动产预约登记-办理登记所下拉框
     * @interface POST /immovable/getRegistryBox
     **/
    GetRegistryBox: `/immovable/getRegistryBox`,

    /**
     * @description 61.不动产专题-不动产预约登记-办理登记所日期选择
     * @interface POST /immovable/getDateBox
     **/
    ImmovableGetDateBox: `/immovable/getDateBox`,

    /**
     * @description 62.不动产专题-不动产预约登记-办理登记所时间段选择
     * @interface POST /immovable/getSlotBox
     **/
    ImmovableGetSlotBox: `/immovable/getSlotBox`,

    /**
     * @description 63.不动产专题-不动产登记网上预约
     * @interface POST /immovable/registerAppointment
     **/
    ImmovableRegisterAppointment: `/immovable/registerAppointment`,

    /**
     * @description 64.不动产专题-预售证信息查询 66.不动产专题-预售楼盘项目查询 67 不动产专题-房地产项目查询
     * @interface POST /immovable/preSaleQuery
     **/
    ImmovablePreSaleQuery: `/immovable/preSaleQuery`,

    /**
     * @description 65.不动产专题-预售楼盘项目查询-查询业务种类下拉框
     * @interface POST /immovable/getPreSaleBox
     **/
    ImmovableGetPreSaleBox: `/immovable/getPreSaleBox`,

    /**
     * @description 68.不动产专题-存量房房源信息查询
     * @interface POST /immovableStockQuery
     **/
    HouseStockQuery: `/immovable/houseStockQuery`,
};
