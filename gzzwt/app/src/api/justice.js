// 司法公证
export default {
  PREPATH: '/justice',
  /**
   * @description 36．司法公证专题-公证员查询
   * @interface POST /justice/getWorker
   **/
  GETWORKER: `/getWorker`,

  /**
   * @description 36．司法公证专题-公证处查询
   * @interface POST /getUnit
   **/
  GETUNIT: `/getUnit`,

  /**
   * @description 36．司法公证专题-公证预约查询
   * @interface POST /justiceSubscribe/getJusticeSubscribes
   **/
  GETJUSTICESUBSCRIBES: `/justiceSubscribe/getJusticeSubscribes`,

  /**
   * @description 36．40．司法公证专题-网上公证申请-涉外公证用途下拉框
   * @interface GET /foreignJustice/getForeignJustices
   **/
  GETFOREIGNJUSTICES: `/foreignJustice/getForeignJustices`,

  /**
   * @description 36．40．司法公证专题-网上公证申请-涉外公证用途下拉框-子项
   * @interface POST /foreignJustice/getForeignJusticeSon
   **/
  GETFOREIGNJUSTICESON: `/justice/foreignJustice/getForeignJusticeSon`,

  /**
   * @description 36．40．司法公证专题--网上公证申请-申办列表
   * @interface POST /justice/getJusticeApply
   **/
  GETJUSTICEAPPLY: `/getJusticeApply`,

  /**
   * @description 36．40．司法公证专题--网上公证申请-使用地
   * @interface GET /foreignJustice/ getUsePlaces
   **/
  GETUSEPLACES: `/foreignJustice/getUsePlaces`,

  /**
   * @description 36．40．司法公证专题--网上公证申请-语言
   * @interface POST /foreignJustice/getLanguages
   **/
  GETLANGUAGES: `/foreignJustice/getLanguages`,

  /**
   * @description 36．40．司法公证专题--网上公证申请-领取地点
   * @interface GET /foreignJustice/ getUnitName
   **/
  GETUNITNAME: `/foreignJustice/getUnitName`,

  /**
   * @description 36．40．45．司法公证专题-网上公证申请-在线申办（初次提交）
   * @interface POST /addJusticeApply
   **/
  ADDJUSTICEAPPLY: `/addJusticeApply`,

  /**
   * @description 司法公证专题-网上公证申请-添加公证费用数据
   * @interface POST /addCost
   **/
  ADDCOST: `/addCost`,
  /**
   * @description 司法公证专题-网上公证申请-获取涉外子项的配置
   * @interface POST /getJusticeDim
   **/
  GETJUSTICEDIM: `/getJusticeDim`,
  /**
   * @description 司法公证专题-网上公证申请-删除
   * @interface POST /delApplys
   **/
  DELAPPLYS: `/delApplys`,
  /**
   * @description 司法公证专题-网上公证申请--取消申办
   * @interface POST /updateApplys
   **/
  UPDATEAPPLYS: `/updateApplys`,
  /**
   * @description 司法公证专题-网上公证申请-再次提交（提交材料
   * @interface POST /addApplyMaterial
   **/
  ADDAPPLYMATERIAL: `/addApplyMaterial`,
  /**
   * @description 司法公证专题-网上公证申请-获取公证详情
   * @interface POST /getApply
   **/
  GETAPPLY: `/getApply`,
};
