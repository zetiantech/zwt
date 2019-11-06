
// 文体预约
export default {
    PREPATH: '/sports', // 路径前缀
    /**
     * @description  文体娱乐-场馆分类列表
     * @interface GET /sports/venuecategory/list
     */
    VenueCategory: `/venue/category/list`,
    /**
     * @description  文体娱乐-场馆详情
     * @interface GET sports/venuedetail
     */
    VenueDetail: `/venue/detail`,
    /**
     * @description  文体娱乐-场馆列表
     * @interface GET sports/venue/info/list
     */
    VenueInfoList: `/venue/info/list`,
     /**
     * @description  文体娱乐-场馆详情可定
     * @interface GET sports/venuevalid/category/list
     */
    VenueValidICateGoryList: `/venue/valid/category/list`,
    /**
     * @description  文体娱乐-场馆预约列表
     * @interface GET /venuevalid/item/list
     */
    VenueValidItemList: `/venue/valid/item/list`,
    /**
     * @description  文体娱乐-场馆订单添加
     * @interface POST /venueApply/add
     */
    VenueApplyAdd: `/venueApply/add`, 
    /**
     * @description  文体娱乐-获取赛事分类列表
     * @interface GET /match/category/list
     */
    CategoryList: `/match/category/list`, 
    /**
     * @description  文体娱乐-获取赛事详细列表
     * @interface GET /match/getOne
     */
    MatchGetOne: `/match/getOne`, 
    /**
     * @description  文体娱乐-获取赛事列表
     * @interface GET /match/list
     */
    MatchList: `/match/list`, 
    /**
     * @description  文体娱乐-更新赛事
     * @interface GET /match/list
     */
    MatchSave: `/match/save`, 
    /**
     * @description  文体娱乐-添加赛事报名
     * @interface GET /match/list
     */
    MatchApplyAdd: `/matchApply/add`, 
    /**
     * @description  文体娱乐-支付
     * @params 1-支付宝 2-微信
     * @interface POST /venueApply/pay
     */
    PayOrder:`/venueApply/pay`,
}