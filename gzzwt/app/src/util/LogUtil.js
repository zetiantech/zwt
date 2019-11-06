const DEBUG_ON = true;

/**
 * @description 日志工具类
 * @author 择天科技 Jonne
 * @time 2019/10/3
 **/
import React from 'react'

export default class LogUtil {
    /**
     * @description 设置debug
     * @param message 显示内容
     * @param optionalParams
     */
    static debug(message, ...optionalParams) {
        if (DEBUG_ON) {
            console.log(message)
        }
    }
}
