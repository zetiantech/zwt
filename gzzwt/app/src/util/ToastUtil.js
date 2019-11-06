import Toast from 'react-native-root-toast';
import validator from 'validator';
import GlobalStyles from 'src/res/styles/GlobalStyles';
import ScreenUtil from './ScreenUtil';

/**
 * @description 吐司显示工具
 * @author 择天科技 Jonne
 * @time 2019/10/03
 **/
export default class ToastUtil {
  /**
   * @description  吐司提示
   * @param content 显示的内容
   * @param position 显示的位置 1：top  2: center 3: bottom (非必填)
   * @param time 1:short 2 :long (非必填)
   * @param onHidden 关闭时的回调
   * @example ToastUtil.toast("显示内容",'center','short')
   **/
  static toast(content, position = 'center', time = 'short', onHidden) {
    /*判断显示位置*/
    if (validator.isEmpty(position)) {
      position = 'center';
    }
    if (position == 'top') {
      position = Toast.positions.TOP;
    } else if (position == 'bottom') {
      position = Toast.positions.BOTTOM;
    } else {
      position = Toast.positions.CENTER;
    }

    /*判断时间*/
    if (!validator.isEmpty(time) && time == 'long') {
      time = Toast.durations.LONG;
    } else {
      time = Toast.durations.SHORT;
    }
    Toast.show(content.toString(), {
      duration: time,
      position: position,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHidden: () => typeof onHidden === 'function' && onHidden(),
    });
  }
  /**
   * @description  吐司提示
   * @param content 显示的内容
   * @param position 显示的位置 1：top  2: center 3: bottom (非必填)
   * @param time 1:short 2 :long (非必填)
   * @param onHidden 关闭时的回调
   * @example ToastUtil.toast("显示内容",'center','short')
   **/
  static error(
    content,
    position = ScreenUtil.isIphoneX() ? 86 : 50,
    time = 3000,
    onHidden,
  ) {
    if (position == 'top') {
      position = Toast.positions.TOP;
    } else if (position == 'bottom') {
      position = Toast.positions.BOTTOM;
    } else if (position == 'center') {
      position = Toast.positions.CENTER;
    }

    /*判断时间*/
    if (time == 'long') {
      time = Toast.durations.LONG;
    } else if (time == 'short') {
      time = Toast.durations.SHORT;
    }
    Toast.show(content.toString(), {
      duration: time,
      position,
      containerStyle: {
        width: GlobalStyles.window_width,
        borderRadius: 0,
        paddingVertical: 5,
      },
      textStyle: {
        fontSize: 14,
      },
      shadow: false,
      backgroundColor: 'rgba(241, 47, 47, .8)',
      opacity: 1,
      textColor: '#fff',
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHidden: () => typeof onHidden === 'function' && onHidden(),
    });
  }
}
