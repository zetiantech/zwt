// 用户模块
export default {
  PREPATH: '/user', // 路径前缀
  /**
   * @description 更新版本
   * @interface GET /common/version
   **/
  URL_VERSION: `/common/version`,
  /**
   * @description 用户登录
   * @interface GET /login
   **/
  URL_LOGIN: `/login`,
  /**
   * @description 用户信息
   * @interface GET /user/info/query
   **/
  QUERY_USER_INFO: `/info/query`,
  /**
   * @description 修改用户信息
   * @interface GET /info/update
   **/
  UPDATE_USER_INFO: `/info/update`,
  /**
   * @description 修改手机号码，验证旧手机号码
   * @interface GET /verify/yzm
   **/
  VERIFY_YZM: `/verify/yzm`,
  /**
   * @description 更新新手机号
   * @interface GET /modify/phone
   **/
  MODIFY_PHONE: `/modify/phone`,
  /**
   * @description 用户首次设置登录密码
   * @interface GET /user/password/firstAdd
   **/
  ADD_PASSWORD: `/password/firstAdd`,
  /**
   * @description 退出登录
   * @interface GET /token/logout
   **/
  LOGOUT: `/token/logout`,
  /**
   * @description 发送验证码
   * @interface GET /common/sms/send
   **/
  SEND_CODE: `/common/sms/send`,
  /**
   * @description 用户注册
   * @interface GET /register
   **/
  URL_REGISTER: `/register`,
  /**
   * @description 设置手势解锁
   * @interface GET /gesture/setting
   **/
  GESTURE_SETTING: `/gesture/setting`,
  /**
   * @description 实名认证
   * @interface GET /user/certify
   **/
  USER_CERTIFY: `/user/certify`,
  /**
   * @description 用户-公共上传接口
   *  @interface GET /common/uploadFile
   */
  UPLOADFILE: `/common/uploadFile`,
  /**
   * @description 用户-添加地址
   *  @interface Post /address/add
   */
  AddressAdd: `/address/add`,
  /**
   * @description 用户-获取用户地址列表
   *  @interface GET address/list
   */
  AddressList: `/address/list`,
  /**
   * @description 用户-编辑收货地址
   *  @interface GET address/list
   */
  AddressSave: `/address/save`,
  /**
   * @description 用户-删除收货地址
   *  @interface GET address/list
   */
  AddressDelete: `/address/delete`,
  /**
   * @description 用户获取编辑地址数据
   *  @interface GET address/getOne
   */
  AddressGetOne: `/address/getOne`,
  /**
   * @description 获取地域列表
   *  @interface GET province/list/query
   */
  QueryProvince: `/province/list/query`,
};
