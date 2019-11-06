/**
 * @description 常用工具
 * @author Jonne 
 * **/
export default class Utils {
    static objectIsValueEqual(object1, object2) {
        for (var _key in object1) {
            if (object1._key !== object2._key) return false;
        }
        return true;
    }
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item, items) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (item.id.toString() === items[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @params Post请求参数转Get请求参数
     * @param { id: 1, name: 2 }
     * @returns "id=1&name=2"
    */

    static objToStr(obj) {
        let paramArr = Object.keys(obj).reduce((acc, cur) => {
            acc.push(cur + '=' + obj[cur]);
            return acc;
        }, []);
        return paramArr.join('&');
    }

    /**
     * @params Get请求参数转Post请求参数
     * @param "id=1&name=2"
     * @returns { id: 1, name: 2 }
    */
    static StrToObej(strParam) {
        let arr = strParam.split('&');
        let obj = {};
        for (let item of arr) {
            let keyarr = item.split('=');
            obj[keyarr[0]] = keyarr[1];
        }
        return obj
    }

    /**
      * @params 验证必须包含字母和数字的密码
      * @param  password
      * @returns bool
     */
    static validPwd(password) {
        return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password)
    }

    /**
      * @params 验证身份证号码
      * @param  idcard - 证件号码 type-1 身份证 2-军官证 3-护照
      * @returns bool
     */
    static validIdCard(idcard, type) {
        const cardType = type || 1
        if(cardType == 1){
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcard)
        }
        if(cardType == 2){
            return /^[0-9]{8}$/.test(idcard)
        }
        if(cardType == 3){
            return /^[a-zA-Z0-9]{5,17}$/.test(idcard)
        }
    }

    /**
     * 获取数据key或value 
     **/
    static getLabelValue(list, val){
        let data = ''
        if(list && list.length){
            list.map((item, i)=>{
                if(item.value == val){
                    data = item.label
                }
                if(item.label == val){
                    data = item.value
                }
            })
        }
        return data
    }

    /**
        * @params 获取两个经纬度之间的距离
        * @param  p1,p2
        * @returns bool
       */
    static getDistance(p1, p2) {
        let radLat1 = p1.lat * Math.PI / 180.0;
        let radLat2 = p2.lat * Math.PI / 180.0;
        let a = radLat1 - radLat2;
        let b = p1.lng * Math.PI / 180.0 - p2.lng * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2);//指定小数点后的位数。   
        return s;
    }
}