/**
 * 校验规则
 * @author heweifeng --2019-10-22
 * * {
 * 		require, 必填/必传
 * 		password, 检验是否只有字母加数字的密码
 * 		min=6, 最小长度,默认为6
 * 		max=12, 最大长度,默认为12
 * 		lon=6, 经度,小数位后的最小长度,默认为6
 * 		lat=6, 纬度,小数位后的最小长度,默认为6
 * 		reg=/^[A-Za-z0-9]+$/, 正则表达式
 * 		number, 校验纯数字
 * 		ip，校验IP地址
 * 		in=['haha','hehe']，校验包含在数组内
 * 		notin=['haha','hehe']，校验不包含在数组内
 * 		after=128 或者 2018-01-01 15:15:15 校验在某时间/值之后
 * 		before=128 或者 2018-01-01 15:15:15 校验在某时间/值之前
 * 		eafter=128 或者 2018-01-01 15:15:15 校验在某时间/值之后(包含相等)
 * 		ebefore=128 或者 2018-01-01 15:15:15 校验在某时间/值之前(包含相等)
 * 		sdecimal=2 校验是否最少保留n位小数
 * 		ldecimal=2 校验是否最多保留n位小数
 * 		phone， 校验手机号
 *      cn,汉字
 *      idcard,身份证号码
 * },
 */
export default {
    //必填
    require: function (val) {
        return val === '' ||
            (typeof val === 'string' && !val.trim()) ||
            (Array.isArray(val) && !val.length) ||
            typeof val === 'undefined'
            ? false
            : true;
    },
    /**
     * @description 最小长度
     * @param {String} val 值
     * @param {Number} length 长度,默认6
     */
    min: function (val, length) {
        length = length || 6;
        return val.length < length ? false : true;
    },
    /**
     * @description 最大长度
     * @param {String} val 值
     * @param {Number} length 最大长度,默认12
     */
    max: function (val, length) {
        length = length || 12;
        return val.length > length ? false : true;
    },
    /**
     * @description 经度校验
     * @param {String} val 值
     * @param {Number} length 保留小数点后的最小长度,默认6位
     */
    lon: function (val, length) {
        length = length || 6;
        var reg = new RegExp(
            '^[-+]?(0?\\d{1,2}.\\d{' +
            length +
            ',}|1[0-7]?\\d{1}.\\d{' +
            length +
            ',}|180.0{' +
            length +
            ',})',
        );
        return reg.test(val);
    },
    /**
     * @description 纬度校验
     * @param {String} val 值
     * @param {Number} length 保留小数点后的最小长度,默认6位
     */
    lat: function (val, length) {
        length = length || 6;
        var reg = new RegExp(
            '^[-+]?([0-8]?\\d{1}.\\d{' + length + ',}|90.0{' + length + ',})$',
        );
        return reg.test(val);
    },
    /**
     * @description 检验是否只有字母加数字的密码
     * @param {String} val 值
     */
    password: function (val) {
        return /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{1,}$/.test(val);
    },
    /**
     * @description 检验是否只有数字
     * @param {String} val 值
     */
    number: function (val) {
        return /^[0-9]+$/.test(val);
    },
    /**
     * @description 检验是否符合IP地址输入规则
     * @param {String} val 值
     */
    ip: function (val) {
        return /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(
            val,
        );
    },
    /**
     * @description 匹配传入的正则
     * @param {String} val 值
     * @param {String} reg 正则表达式
     */
    reg: function (val, reg) {
        reg = new RegExp(reg.split('/')[1]);
        return reg.test(val);
    },
    /**
     * @description 是否包含在数组list内
     * @param {String} val 值
     * @param {String} list 数组
     */
    in: function (val, list) {
        list = list.split(',');
        return list.includes(val);
    },
    /**
     * @description 是否不包含在数组list内
     * @param {String} val 值
     * @param {String} list 数组
     */
    notin: function (val, list) {
        list = list.split(',');
        return !list.includes(val);
    },
    /**
     * @description 校验是否在某个日期/时间/值后
     * @param {String} val 值
     * @param {String} ruleVal 日期或者数字
     */
    after: function (val, ruleVal) {
        val = /[-]/.test(ruleVal) ? new Date(Date.parse(val)) : val;
        ruleVal = /[-]/.test(ruleVal) ? new Date(Date.parse(ruleVal)) : ruleVal;
        return val - ruleVal > 0;
    },
    /**
     * @description 校验是否在某个日期/时间/值前
     * @param {String} val 值
     * @param {String} ruleVal 日期或者数字
     */
    before: function (val, ruleVal) {
        val = /[-]/.test(ruleVal) ? new Date(Date.parse(val)) : val;
        ruleVal = /[-]/.test(ruleVal) ? new Date(Date.parse(ruleVal)) : ruleVal;
        return val - ruleVal < 0;
    },
    /**
     * @description 校验是否在某个日期/时间/值后(包含相等)
     * @param {String} val 值
     * @param {String} ruleVal 日期或者数字
     */
    eafter: function (val, ruleVal) {
        val = /[-]/.test(ruleVal) ? new Date(Date.parse(val)) : val;
        ruleVal = /[-]/.test(ruleVal) ? new Date(Date.parse(ruleVal)) : ruleVal;
        return val - ruleVal >= 0;
    },
    /**
     * @description 校验是否在某个日期/时间/值前(包含相等)
     * @param {String} val 值
     * @param {String} ruleVal 日期或者数字
     */
    ebefore: function (val, ruleVal) {
        val = /[-]/.test(ruleVal) ? new Date(Date.parse(val)) : val;
        ruleVal = /[-]/.test(ruleVal) ? new Date(Date.parse(ruleVal)) : ruleVal;
        return val - ruleVal <= 0;
    },
    /**
     * @description 校验是否最少保留n位小数
     * @param {String} val 值
     * @param {String} length 长度
     */
    sdecimal: function (val, length) {
        length = length || 2;
        var reg = new RegExp(
            '(^[1-9](\\d+)?(\\.\\d{' +
            length +
            ',})$)|(^\\d\\.\\d{' +
            length +
            ',}$)',
        );
        return reg.test(val);
    },
    /**
     * @description 校验是否最多保留n位小数
     * @param {String} val 值
     * @param {String} length 长度
     */
    ldecimal: function (val, length) {
        length = length || 2;
        var reg = new RegExp('(^(\\d+)?(\\.\\d{1,' + length + '})?$)');
        return reg.test(val);
    },
    /**
     * @description 检验手机号
     * @param {String} val 值
     */
    phone: function (val) {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(val);
    },
    /**
     * @description 检验汉字
     * @param {String} val 值
     */
    cn: function (val) {
        return /[\u4E00-\u9FFF]$/.test(val);
    },
    /**
     * @description 检验身份证号
     * @param {String} val 值
     */
    idcard: function (idCard) {
        let flag = true;
        //15位和18位身份证号码的正则表达式
        const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                const idCardWi = new Array(
                    7,
                    9,
                    10,
                    5,
                    8,
                    4,
                    2,
                    1,
                    6,
                    3,
                    7,
                    9,
                    10,
                    5,
                    8,
                    4,
                    2,
                ); //将前17位加权因子保存在数组里
                const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (let i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }
                const idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
                const idCardLast = idCard.substring(17); //得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == 'X' || idCardLast == 'x') {
                        flag = true;
                    } else {
                        flag = false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                }
            }
        } else {
            flag = false;
        }
        return flag;
    },
};
