
// 公积金专题
export default {
  PREPATH: '/fund', // 路径前缀
  /**
    * @description 公积金 - 获取公积金明细
    * @interface GET /fund/accountDetail/list
    **/
  AccountDetailList: `/accountDetail/list`,
  /**
    * @description 公积金 - 获取公积金缴纳记录
    * @interface GET /account/getOne
    **/
  AccountGetOne: `/account/getOne`,
  /**
    * @description 公积金 - 获取公积金提取原因下拉
    * @interface GET /account/getOne
    **/
  onlineDrawdrawTypeList: `/onlineDraw/drawTypeList`,
  /**
   * @description 公积金-获取银行类型下拉
   * @interface POST /bank/typeList
   */
  BankTypeList: `/bank/typeList`,
  /**
   * @description 公积金-在线添加预约
   *  @interface POST /onlineDraw/addApply
   */
  OnlineDrawAddApply: `/onlineDraw/addApply`,
  /**
   * @description 公积金-银行网点信息
   *  @interface GET /bank/selectList
   */
  BANK_SELECT_LIST: `/bank/selectList`,
  /**
   * @description 公积金-网点信息
   *  @interface GET /bank/getOne
   */
  BANK_GET_ONE: `/bank/getOne`,

  /**
   * @description 公积金-银行网点信息
   *  @interface GET /offlineDraw/getValidApplyList
   */
  GET_VALLID_APPLY_LIST: `/offlineDraw/getValidApplyList`,

  /**
   * @description 公积金-添加预约记录
   *  @interface POST /offlineDraw/addApply
   */
  OFFLINEDRAW_ADD_APPLY: `/offlineDraw/addApply`,
  /**
   * @description 公积金-获取公积金账户详细信息
   *  @interface GET /account/getOne
   */
  ACCOUNT_GET_ONE: `/account/getOne`,
  /**
   * @description 公积金-银行类型信息
   *  @interface GET /bank/typeList
   */
  BANK_TYPE_LIST: `/bank/typeList`,
  /**
   * @description 公积金专题-账户管理-获取公积金账户列表
   *  @interface GET /account/list
   */
  FUND_ACCOUNT_LIST: `/account/list`,


  
}