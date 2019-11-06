import React from 'react';
import {NativeModules, Platform, DeviceEventEmitter, Share} from 'react-native';

import * as DeviceInfo from 'react-native-device-info';

import validator from 'validator';
import SYImagePicker from 'react-native-syan-image-picker';
import Contacts from 'react-native-contacts';

//自定义工具类
import ToastUtil from 'src/util/ToastUtil';
import LogUtil from 'src/util/LogUtil';
import NavigationUtil from 'src/util/NavigationUtil';
import {API} from 'src/api/Api';
import BaseBridge from './BaseBridge';
import HttpUtil from 'src/util/HttpUtil';
import PermissionUtil from 'src/util/PermissionUtil';

/**
 * 第三方功能插件
 */
// import Alipay from "react-native-yunpeng-alipay";     //阿里支付
// import UPPayControl from "react-native-giti-unionpay"; //银联
import * as WeChat from 'react-native-wechat'; // 微信支付
import Communications from 'react-native-communications';
import AsyncStorageUtil from 'src/util/AsyncStorageUtil';

import RNFS from 'react-native-fs'; // 下载，保存到本地
// import OpenFile from 'react-native-doc-viewer';
// import JPushModule from "jpush-react-native/index";

/**
 * 对webview公开的方法
 */
export default class JSBridge extends BaseBridge {
  /**
   * description 测试带有执行回调方法的列子
   * @param  {[string]} msg  [提示消息内容]
   * @param  {[function]} func [回调方法]
   * @return {[void]}      [执行回调方法，并进行toast提示]
   */
  callbackDemo(msg) {
    ToastUtil.toast(msg);
    super.jsBridgeCallBack(
      JSON.stringify({code: 200, data: 'RN向H5发送的消息'}),
    );
  }

  /**
   * description 消息提示
   * @param  {[string]} message [提示内容]
   * @return {[void]}         [调用toast方法]
   */
  toast(message) {
    if (validator.isEmpty(message)) {
      return;
    }
    ToastUtil.toast(message);
  }
  /**
   *
   * @param url
   * @param options(页面的配置)
   *
   */
  open(url, options = {}) {
    if (url.startsWith('http')) {
      NavigationUtil.navigate(this.props, 'WebView', {
        url: url,
        options: options,
      });
    } else {
      //域名需要配置
      NavigationUtil.navigate(this.props, 'WebView', {
        url: API.URL_BASE + url,
        options: options,
      });
    }
  }
  /**
   * @description 返回首页
   **/
  goHome() {
    NavigationUtil.dispatch(this.props, 'Home');
  }
  /**
   * @description 页面返回
   **/
  goBack() {
    NavigationUtil.goBack(this.props);
  }
  /**
   * 保存到本地
   * @param key key值
   * @param data string
   */
  setStorageItem(key, data) {
    AsyncStorageUtil.setItem(key, data);
  }
  /**
   * 本地获取
   * @param key
   */
  getStorageItem(key) {
    AsyncStorageUtil.getItem(key, data => {
      super.jsBridgeCallBack(JSON.stringify({code: 200, data: {result: data}}));
    });
  }
  /**
   * @description 刷新机制
   * @param{[string]} type  [要刷新页面的类型]
   */
  refresh(type) {
    var data = {
      key: 'refresh',
      data: {type: type},
    };
    DeviceEventEmitter.emit('refresh', JSON.stringify(data));
  }
  /**
   * description 获取当前版本号
   * @param  {[function]} func [接收版本号]
   */
  version() {
    var version = DeviceInfo.getVersion();
    super.jsBridgeCallBack(
      JSON.stringify({code: 200, data: {version: version}}),
    );
  }
  /**
   * 获取联系人
   */
  getContacts() {
    //申请权限
    PermissionUtil.checkPermission(() => {
      Contacts.getAll((err, contacts) => {
        if (err) throw err;
        super.jsBridgeCallBack(JSON.stringify(contacts));
      });
    }, ['contacts']);
  }

  /**
   * @description 支付
   * @param payType 支付类型
   * @param  {[string]} payType  [支付类型]
   * @param {[obj]} orderInfo [订单信息]
   * @param {[func]} 回调  [方法]
   * {code:0,message:""} 0:为成功
   */
  pay(payType, orderInfo, success, fail) {
    try {
      var _this = this;
      if (payType == 'alipay') {
        // 支付宝
        Alipay.pay(orderInfo).then(
          function(data) {
            //成功
            _this.super.jsBridgeCallBack(
              JSON.stringify({code: 200, data: {}, msg: '支付成功'}),
            );
          },
          function(error) {
            //失败
            _this.super.jsBridgeCallBack(
              JSON.stringify({code: -1, data: {}, msg: error.message}),
            );
          },
        );
      } else if (payType == 'wx') {
        // 微信
        //回传给微信的数据
        var weChatParm = {
          package: orderInfo.packageValue,
          prepayId: orderInfo.prepayId,
          sign: orderInfo.sign,
          partnerId: orderInfo.partnerId,
          appId: orderInfo.appId,
          timeStamp: orderInfo.timeStamp,
          nonceStr: orderInfo.nonceStr,
        };
        WeChat.pay(weChatParm).then(function(data) {
          //成功
          ToastUtil.toast('支付成功');
          success && success(data);
          // _this.super.jsBridgeCallBack(JSON.stringify({code: 200, data: {}, msg: '支付成功'}));
        }),
          error => {
            // super.jsBridgeCallBack(JSON.stringify({code: -1, data: {}, msg: error.message}));
            fail && fail(data);
            ToastUtil.toast('支付失败');
          };
      } else if (payType == 'unionpay') {
        //银联
        UPPayControl.pay(orderInfo, false).then(
          resp => {
            ToastUtil.toast('支付成功');
            _this.super.jsBridgeCallBack(
              JSON.stringify({code: 200, data: {}, msg: '支付成功'}),
            );
          },
          error => {
            ToastUtil.toast('支付失败');
            _this.super.jsBridgeCallBack(
              JSON.stringify({code: -1, data: {}, msg: error.message}),
            );
          },
        );
      }
    } catch (error) {
      ToastUtil.toast('支付失败');
      super.jsBridgeCallBack(
        JSON.stringify({code: -1, data: {}, msg: error.message}),
      );
    }
  }
  /**
   * 打开相册并且上传
   * @param webview
   * @param imageOpint 选择图片配置
   */
  selectedPhotos(imageOpint) {
    imageOpint = {
      imageCount: 1, // 默认只能选择一张
      ...imageOpint,
    };
    //申请权限
    return new Promise((resolve, reject) => {
      PermissionUtil.checkPermission(() => {
        SYImagePicker.showImagePicker(
          imageOpint,
          async (err, selectedPhotos) => {
            if (err) {
              // 取消选择
              LogUtil.debug(err);
              reject(err);
              return;
            }
            resolve(selectedPhotos);
            // selectedPhotos.map((photo, index) => {
            //   var data = JSON.stringify({key: index, photo: photo});
            // });
          },
        );
      }, ['photo']);
    });
  }
  /**
   * @param {[function]}   func   [回调用]
   */
  selectedVideo() {
    PermissionUtil.checkPermission(() => {
      // 这里android 和ios 各写一套，android 调用原生拍摄的视频会过大。
      if (Platform.OS == 'android') {
        NativeModules.AndroidUtils.selectedVideo((videoPath, thumbPath) => {
          var videoObj = {thumbPath: thumbPath, videoPath: videoPath};
          for (var key in videoObj) {
            //遍历key
            var name;
            if (key == 'videoPath') {
              name = 'video.mp4';
            } else {
              name = 'videoThumb.jpg';
            }
            super.jsBridgeCallBack(
              JSON.stringify({
                code: -1,
                data: {videoPath: videoPath, thumbPath, thumbPath},
                msg: '',
              }),
            );
          }
        });
      } else {
        //ios视频

        const options = {
          //配置视频参数，  待优化1：可以给开发者 自定义配置 2： 暂无获取到视频缩略图
          title: '选择视频',
          cancelButtonTitle: '取消',
          takePhotoButtonTitle: '录制视频',
          chooseFromLibraryButtonTitle: '选择视频',
          mediaType: 'video',
          videoQuality: 'medium',
        };
        SYImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            //取消操作
            console.log('User cancelled video picker');
          } else if (response.error) {
            //返回错误
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            //用户按了自定义按钮
            console.log('User tapped custom button: ', response.customButton);
          } else {
            ToastUtil.toast('视频:' + response.uri);
            super.jsBridgeCallBack(
              JSON.stringify({
                code: -1,
                data: {videoPath: response.uri, thumbPath: ''},
                msg: '',
              }),
            );
          }
        });
      }
    }, ['camera', 'microphone']);
  }
  /**
   * 上传文件
   * @param url 上传接口地址
   * @param options 配置 {type:文件类型，key:文件索引}
   */
  upload(url, params) {
    return HttpUtil.upload(url, params.uri);
  }

  /**
   *
   * @param content 分享的内容{message:'message',url:url,title}
   * @param options
   * @return {Promise<void>}
   */
  async share(content, options = {}) {
    try {
      var result;
      if (Platform.OS == 'ios') {
        result = await Share.share(content, options);
      } else {
        if (content.url) {
          result = await Share.share(
            {
              message: content.message + ':' + content.url,
              url: content.url,
              title: content.title,
            },
            options,
          );
        } else {
          result = await Share.share(content, options);
        }
      }
      super.jsBridgeCallBack(JSON.stringify(result));
    } catch (error) {
      ToastUtil.toast(error.message);
    }
  }

  /**
   * 下载
   * @param uri 下载地址
   * @param targetName 文件名包括后缀
   */
  download(uri, targetName) {
    // 下载文件本地保存路径
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${targetName}`;
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        console.log('begin', res);
        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
      progress: res => {
        let pro = res.bytesWritten / res.contentLength;
        console.log('进度:' + pro);
      },
    };
    try {
      let self = this;
      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          super.jsBridgeCallBack(JSON.stringify(res));
        })
        .catch(error => {
          super.jsBridgeCallBack(JSON.stringify(error));
        });
    } catch (error) {
      super.jsBridgeCallBack(JSON.stringify(error));
    }
  }

  /**
   * description 定位
   * 返回定位信息 location
   * https://github.com/qiuxiang/react-native-amap-geolocation/blob/master/docs/geolocation.md
   *
   */
  geolocation() {
    let _this = this;
    PermissionUtil.checkPermission(() => {
      // 监听回调的地方需要优化
      Geolocation.addLocationListener(async location => {
        try {
          if (location) {
            await super.jsBridgeCallBack(JSON.stringify(location));
          }
          Geolocation.stop();
        } catch (e) {
          ToastUtil.toast('错误:' + e.message);
        }
      });
      Geolocation.start();
    }, ['location']);
  }
  /**
   * @description 微信授权
   **/
  wxOAuth() {
    /*应用授权作用域，如获取用户个人信息则填写snsapi_userinfo*/
    let scope = 'snsapi_userinfo';
    /**
     * 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击
     * 建议第三方带上该参数，可设置为简单的随机数加session进行校验
     */
    let state = 'wechat_sdk';
    let _this = this;
    /*判断是否需要安装*/
    WeChat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        /*发起登陆授权*/
        WeChat.sendAuthRequest(scope, state)
          .then(responseCode => {
            /*返回code码，通过code获取access_token*/
            super.jsBridgeCallBack(
              JSON.stringify({code: responseCode.code, data: {}, msg: ''}),
            );
          })
          .catch(err => {
            ToastUtil.toast('登陆授权发生错误，错误信息：' + err.message);
          });
      } else {
        /*ios 提供 下载 微信 接口，Android没有*/
        ToastUtil.toast('没有下载微信');
      }
    });
  }
  /**
   * 拨打电话
   */
  callTelephone(tel) {
    // 拨打电话
    Communications.phonecall(tel, false);
  }
  /**
   * @description 获取缓存大小
   * @param  {[function]} func [检查缓存大小]
   **/
  checkCacheSize() {
    // 项目需求确定 计算 缓存 暂时先处理0.00MB
    super.jsBridgeCallBack(
      JSON.stringify(JSON.stringify({code: 200, size: '0.00MB'})),
    );
  }

  /**
   * @description 清理缓存处理
   **/
  cleanCacheSize() {
    super.jsBridgeCallBack(
      JSON.stringify(JSON.stringify({code: 200, size: '0.00MB'})),
    );
  }
  /**
   * @description 检查版本更新
   */
  checkVersionUpdate() {
    /*如果是Android,版本更新*/
    if (Platform.OS === 'android') {
      /*檢查版本更新*/
      NativeModules.AppVersionUpdate.versionUpdate(true);
    } else {
      ToastUtil.toast('已经是最新版本');
    }
  }
  playerResume() {
    DeviceEventEmitter.emit('player', {key: 'resume'});
  }
  playerPause() {
    DeviceEventEmitter.emit('player', {key: 'pause'});
  }
  playerStop() {
    DeviceEventEmitter.emit('player', {key: 'stop'});
  }
  getSound() {
    if (!global.playInfo) {
      this.jsBridgeCallBack(JSON.stringify({code: 200, sound: {}}));
    } else {
      this.jsBridgeCallBack(
        JSON.stringify({code: 200, sound: global.playInfo}),
      );
    }
  }
  /**
   * 播放的声音
   * @param playInfo:{index:0 当前播放的索引,data:[]播放列表}
   */
  playSound(playInfo) {
    if (!playInfo) {
      playInfo = {
        index: 2,
        playList: [
          {
            id: '0',
            title: '好好说话', //章节标题
            media:
              ' http://dl.stream.qqmusic.qq.com/M500002B2EAA3brD5b.mp3?vkey=7527781D3475F881065EFD06FD83BA519B0375CFC750F97A9AB8DD3332BB1E9607B1DD9EB186C6D8DB94BDEED76EB76711E6699C0D7C034F&guid=5150825362&fromtag=1', //多媒体url
            lecturerName: '张碧晨', //讲师名
            duration: 0, //时长 单位：秒
          },
          {
            id: '1',
            title: 'I Love You',
            media:
              'http://dl.stream.qqmusic.qq.com/M500001outPq2OQXYv.mp3?vkey=43CC0D652245699D64C7DD393C4D058A81EA40957AAE30B2FF6D5B5C7735257EADA29C73D439368FEC3A8E4D6EB69E948D1BAEAA172EA552&guid=5150825362&fromtag=1',
            lecturerName: 'Stewart Mac',
            duration: 0,
          },
          {
            id: '2',
            title: '差不多先生 (Live) ',
            media:
              'http://dl.stream.qqmusic.qq.com/M500002myhYp3RKtQK.mp3?vkey=CAD370755616767322D6D76CC31053F3B12FE23DB3DAF3FB230FBB6E10C0508E747F26A08A356BFAAAC0F7E5228FE5DE2ACF192AFDAEE2F7&guid=5150825362&fromtag=1',
            lecturerName: '张震岳,MC HotDog',
            duration: 0,
          },
          {
            id: '3',
            title: '说好的幸福呢',
            media:
              'http://dl.stream.qqmusic.qq.com/M5000042QMDR1VzSsx.mp3?vkey=192299B58733D58D32062E30DB489F62B023E872505A61CBB182EF4B713B6EA2AF1C01AB35BA01F33A05608E0B5DFDA61EA47E6429E49F36&guid=5150825362&fromtag=1',
            lecturerName: '周杰伦',
            duration: 0,
          },
          {
            id: '4',
            title: '小幸运 (Live)',
            media:
              'http://dl.stream.qqmusic.qq.com/M500004WwYrR0Uhdzk.mp3?vkey=66BDFC15CA8A5E847004ACA81DE9C728ABF1DE0664F6BF89F432B30904D82EEEDC7363E1CD790DB47A43764B31DFFE071CCFEB1C16BBFFD3&guid=5150825362&fromtag=1',
            lecturerName: '田馥甄',
            duration: 0,
          },
        ],
      };
    }

    playInfo.key = 'play';
    DeviceEventEmitter.emit('player', playInfo);
  }
  /**
   * 功能描述: <br>
   * 〈
   * 判断文件是否存在  文件存在返回:true  不存在返回:false
   * 〉
   *
   * @MethodName: _fileEx
   * @Param: [filePath文件路径    callback:回调函数]
   *
   */
  fileExit(filePath) {
    let self = this;
    var localPath = `${RNFS.DocumentDirectoryPath}/${filePath}`;
    RNFS.exists(localPath).then(res => {
      super.jsBridgeCallBack(
        JSON.stringify({code: 0, filePath: filePath, fileExit: res}),
      );
    });
  }
  /**
   * @param fileData={fileName,fileType,}
   */
  openFile(fileData) {
    var localPath = `${RNFS.DocumentDirectoryPath}/${fileData.fileName}.${fileData.fileType}`;
    var data;
    if (Platform.OS == 'android') {
      data = {
        url: 'file://' + localPath,
        fileName: fileData.fileName,
        cache: false,
        fileType: fileData.fileType,
      };
    } else {
      data = {
        url: localPath,
        fileNameOptional: fileData.fileName,
      };
    }
    OpenFile.openDoc([data], (error, url) => {
      if (error) {
        super.jsBridgeCallBack(JSON.stringify(error));
      } else {
        super.jsBridgeCallBack(JSON.stringify({code: 0, url: url}));
      }
    });
  }
  /**
   * 设置推送别名
   * @param alias
   */
  setPushAlias(alias) {
    if (!alias || alias == '') {
      return;
    }
    JPushModule.setAlias(alias, cb => {
      if (cb) {
        // 设置别名
        super.jsBridgeCallBack(JSON.stringify(cb));
      }
    });
  }
  /**
   * 设置推送标签
   * @param alias
   */
  setPushTag(tag) {
    if (!tag || tag == '') {
      return;
    }
    let tags = [];
    tags[0] = tag;
    JPushModule.setTags(tags, cb => {
      // 设置别名
      if (cb) {
        // 设置别名
        super.jsBridgeCallBack(JSON.stringify(cb));
      }
    });
  }
}
