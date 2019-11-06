// 图书馆
export default {
  // PREPATH: '/api/library', // 路径前缀
  /**
   * @description 4．图书专题-借阅信息查询
   * @interface GET /book/getBorrowInfo
   **/
  GETBORROWINFO: `/library/book/getBorrowInfo`,

  /**
   * @description 5．图书专题-预约图书列表
   * @interface GET /book/getApplyBookList
   **/
  GETAPPLYBOOKLIST: `/library/book/getApplyBookList`,

  /**
   * @description 5．图书专题-取消预约
   * @interface POST /library/book/updateCancelApplyBook
   **/
  UPDATECANCELAPPLYBOOK: `/library/book/updateCancelApplyBook`,

  /**
   * @description 5．图书专题-搜索类型查询
   * @interface GET /library/book/getBookListSearchType
   **/
  GETBOOKLISTSEARCHTYPE: `/library/book/getBookListSearchType`,

  /**
   * @description 5．图书专题-书目检索查询
   * @interface POST /library/book/getSearchBookList
   **/
  GETSEARCHBOOKLIST: `/library/book/getSearchBookList`,

  /**
   * @description 5．图书专题-读书证挂失
   * @interface POST /library/book/updateLossReadCard
   **/
  UPDATELOSSREADCARD: `/library/book/updateLossReadCard`,

  /**
   * @description 5．图书专题-开户馆下拉框
   * @interface GET /library/book/getLibrary
   **/
  GETLIBRARY: `/library/book/getLibrary`,

  /**
   * @description 5．图书专题-获取注册信息
   * @interface GET /library/book/getRegisterUserBookInfo
   **/
  GETREGISTERUSERBOOKINFO: `/library/book/getRegisterUserBookInfo`,

  /**
   * @description 5．图书专题-人脸识别注册
   * @interface POST /library/book/addBookUser
   **/
  ADDBOOKUSER: `/library/book/addBookUser`,

  /**
   * @description 5．图书专题-个人信息查询
   * @interface GET /library/book/getUserBookInfo
   **/
  GETUSERBOOKINFO: `/library/book/getUserBookInfo`,

  /**
   * @description 5．图书专题-绑定读书证
   * @interface POST /library/book/updateBindReadCard
   **/
  UPDATEBINDREADCARD: `/library/book/updateBindReadCard`,
};
