import LIBRARY from './library'; // 图书馆
import JUSTICE from './justice'; // 司法公证
import OFFICE from './office'; // 户政
import EDUCATION from './education'; // 教育
import HOUSE from './house'; // 不动产专题
import JOB from './job'; // 劳动就业专题
import MEDICAL from './medical'; // 医疗
import VEHICLE from './vehicle'; // 交通
import INSURANCE from './insurance'; // 社保
import NEWS from './news' // 资讯
import USER from './user' // 用户模块
import MARITAL from './marital' // 婚育
import HOUSEING from './houseing' // 住房保障
import EXITANDENTRY from './exitandentry' // 出入境
import SPORTS from './sports' // 文体娱乐
import FUND from './fund' // 公积金


/**
 *  @description  接口文档
 */
// let baseUrl = 'http://192.168.1.194:81';  
// let baseUrl = 'http://192.168.10.14:8910';
// let baseUrl = 'http://gdsiyu.qicp.vip:8181';
baseUrl = 'http://192.168.1.192:7300/mock/5da40183d88e2b0020908ff8/gzzwt';

const BASE = {
    /**
     * [BASEURL 服务器路径]
     */
    BASEURL: baseUrl,
    /**
     * [APP_ID APP唯一标识]
     */
    APP_ID: '888888'
};

/**
 * 添加api前缀路径
 * @param {Object} apiObj 接口对象
 */
function addPrePath(apiObj) {
    let prePath = {};
    const getPrePath = apiObj.PREPATH || '';
    const setToBaseUrl = baseUrl + getPrePath;
    Object.keys(apiObj).forEach(item => {
        prePath[item] = setToBaseUrl + apiObj[item];
    });
    delete prePath.PREPATH;
    return prePath;
}

export const API = Object.assign(
    BASE,
    addPrePath(LIBRARY),
    addPrePath(JUSTICE),
    addPrePath(OFFICE),
    addPrePath(EDUCATION),
    addPrePath(HOUSE),
    addPrePath(JOB),
    addPrePath(MEDICAL),
    addPrePath(VEHICLE),
    // addPrePath(LIVEALL),
    addPrePath(NEWS),
    addPrePath(INSURANCE),
    addPrePath(MARITAL),
    addPrePath(HOUSEING),
    addPrePath(EXITANDENTRY),
    addPrePath(USER),
    addPrePath(SPORTS),
    addPrePath(FUND)
);
