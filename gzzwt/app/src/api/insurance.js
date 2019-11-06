// 社保专题
export default {
    PREPATH: '/insurance', // 路径前缀
    /**
     * @description 医疗专题-社保卡申领-申领登记-证件类型下拉列表:
     * @interface GET /bank/getCertificates
     **/
    GETCERTIFICATES: `/bank/getCertificates`,
    /**
     * @description 获取社保详细记录
     * @interface GET /record/list
     **/
    RecordList: `/record/list`,
    /**
     * @description 获取社保详细记录
     * @interface GET /consume/list
     **/
    ConsumeList: `/consume/list`,
    /**
    * @description 获取我的社保卡信息
    * @interface GET /account/getSocials
    **/
    AccountGetSocials: `/account/getSocials`,
    /**
     * @description 获取账户详细信息
     * @interface GET /account/getOne
     **/
    AccountGetOne: `/account/getOne`,
    /**
     * @description 社保卡专题-设备账户管理-获取个人基本信息
     * @interface GET /account/getPersonal
     **/
    GET_PERSONAL: `/account/getPersonal`,
    /**
     * @description 125.社保卡专题-获取受理网点
     * @interface GET /bank/getNetworks
     **/
    GET_NETWOEKS: `/bank/getNetworks`,
    /**
     * @description 社保卡专题-银行管理-获取民族下拉框
     * @interface GET /bank/getNationals
     **/
    GET_NATIONALS: `/bank/getNationals`,
    /**
     * @description 社保卡专题-银行管理-获取证件类型
     * @interface GET /bank/getCertificates
     **/
    GET_CERTIFICATES: `/bank/getCertificates`,

    /**
     * @description 119.社保卡专题-银行管理-银行类型下拉框数据列表
     * @interface GET /bank/typeList
     **/
    GET_BANK_TYPE_LIST: `/bank/typeList`,

    /**
     * @description 114.社保卡专题-设备管理账户-修改基本信息
     * @interface GET /account/save
     **/
    INSURANCE_ACCOUNT_SAVE: `/account/save`,
    /**
     * [4.	个人信息业务办理-社会管理退休人员信息查询]]]
     * @type {[POST]}
     */
    GETSOCIALRETIRER: `/record/getSocialRetirer`,
    /**
     * [5.	个人信息业务办理-社保关系转移查询]
     * @type {[POST]}
     */
    GETELDERCANTEEN: `/social/getElderCanteen`,
    /**
* 13.社会综合业务办理-社会组织查询：
* @type {[POST]}
*/
    GETSOCIALORGANIZE: `/social/getSocialOrganize`,
    /**
   * 14.社会综合业务办理-长者饭堂查询
   * @type {[POST]}
   */
    GETELDERCANTEEN: `/social/getElderCanteen`,

    /**
    *15.社会综合业务办理-查询金融激活时预留手机号码：/api
   * @type {[POST]}
   */
    GETBANKRESERVE: `/social/getBankReserve`,
    /**
     *16.社会综合业务办理-技能人才实操测试查询：/api
    * @type {[POST]}
    */
    GETTECHNIQUETALENTS: `/social/getTechniqueTalents`,
    /**
    *17.社会综合业务办理-报销类型下拉框：
    * @type {[POST]}
    */
    GETZEROREPORTTYPE: `/social/getZeroReportType`,
    /**
     *18.社会综合业务办理-（医疗，生育，工伤）零报处理信息列表查询：
    * @type {[POST]}
    */
    GETZEROREPORTLIST: `/social/getZeroReportList`,
    /**
     * 19.社会综合业务办理-医疗零报处理详情信息：/api/insurance
    * @type {[POST]}
     */
    GETMEDICALZERO: `/social/getMedicalZero`,
    /**
    * 20.社会综合业务办理-生育零报处理详情信息：/api/insurance
   * @type {[POST]}
    */
    GETBEARZERO: `/social/getBearZero`,
    /**
    * 21.社会综合业务办理-工伤零报处理详情信息：/api/insurance
   * @type {[POST]}
    */
    GETINJURYZERO: `/social/getInjuryZero`,
};
