/**
 * @description i18国际化配置
 * @author 择天科技 Jonne
 * @time 2019-10-16
 **/

import I18n from 'react-native-i18n'
import en from './en/en'
import zh from './zh/zh'


export default I18n;

/**
 * 默认i18n
 */
I18n.defaultLocale = 'zh';

/**
 * 允许fallbacks状态（为true时，顺序向下遍历翻译）
 */
I18n.fallbacks = true;
/**
 * 预设两种语言 en和zh，如需其他可添加
 */
I18n.translations = {
    zh, // 中文
    en, // 英文
};
