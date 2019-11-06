'use strict';

/**
 * @desc 网络请求工具类 包含post get 如果想自定义配置调用request
 * @author 择天科技 Jonne
 * @time 2019/9/10
 **/
import validator from 'validator';
import AsyncStorage from './AsyncStorageUtil';
import RNFetchBlob from 'rn-fetch-blob';
import Utils from './Utils';

if (
  !global.accessToken ||
  global.accessToken == '' ||
  global.accessToken == null ||
  global.accessToken == undefined
) {
  AsyncStorage.getItem('ACCESS_TOKEN', result => {
    global.accessToken = result;
  });
}

export default class HttpUtil {
  /**
   * @description 网络请求get方式
   * @param url 请求地址参数，参数拼接到地址后面
   * @returns {返回data（json数据）和 header对象数据}
   */
  static get(url, data) {
    let params = Utils.objToStr(data);
    return this.request(url + '?' + params, 'GET', null, null);
  }

  /**
   * @description 网络请求post方式
   * @param url 请求地址
   * @param data 参数（表单或则json 数据的格式）
   * @returns {返回data（json数据）和 header对象数据}
   *
   */
  static post(url, data) {
    return this.request(url, 'POST', JSON.stringify(data), null);
  }

  /**
   * @description 上传文件
   * @param url 上传地址
   * @param data 参数数据（表单形式）
   * @param config json 格式配置 例如{header:{'Accept': 'application/json','Content-Type':'application/json'}}（非必填）
   * @returns {返回data（json数据）和 header对象数据}
   */
  static upload(url, data, config) {
    return this.request(url, 'POST', data, config);
  }
  /**
   * @description 网络请求底层方法 可配置
   * @param url   请求地址
   * @param method 请求方式
   * @param data  参数（表单或则json 数据的格式）
   * @param config json 格式配置 例如{header:{'Accept': 'application/json','Content-Type':'application/json'}}
   * @example
   * let url = 'http://***.com' //地址
   * let data =  {name：'ms'，age:'6'} //json数据
   * let config ={header:{'Accept': 'application/json','Content-Type':'multipart/form-data'}},key:'我自定义的key');
   * HttpUtil.request(url,'POST',data,config)
   *    .then(dataJson=>{
   *              let data = dataJson.data;     // 请求服务端返回的数据
   *              let headers= dataJson.headers; //请求返回的头部
   *              let config = dataJson.config // 你自己传入的配置
   *        })
   *    .catch(error=>{
   *            // 错误处理，error的对象结构是
   *             error:{ name: string,
   *                  message: string,
   *                  stack?: string,}
   *
   *           }
   *          )
   *
   */
  static request(url, method, data, config) {
    if (
      !global.accessToken ||
      global.accessToken == '' ||
      global.accessToken == null ||
      global.accessToken == undefined
    ) {
      AsyncStorage.getItem('ACCESS_TOKEN', result => {
        global.accessToken = result;
      });
    }
    // 默认的头
    let deaultConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        accessToken: global.accessToken ? global.accessToken : '',
      },
    };
    let useConfig;
    // 判断是否是json 对象
    if (config != null) {
      useConfig = Object.assign(deaultConfig, config); // 合并 相同key以config 为准
    } else {
      useConfig = deaultConfig;
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: validator.isEmpty(method) ? 'POST' : method, //默认post
        headers: useConfig.headers,
        body: data != null ? data : '',
      })
        .then(response => {
          /*判断服务端返回的是文本还json格式，后端最后做统一处理 ，目前上传头像是传文本*/
          let content_type = response.headers.get('content-type');
          let responseData =
            content_type && content_type.indexOf('application/json') > -1
              ? response.json()
              : response.text();
          Promise.all([response.headers, responseData, config]).then(result => {
            resolve({
              headers: result[0],
              data: result[1],
              config: result[2],
            });
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 文件上传
   * @author heweifeng
   * @param {String} url 上传接口
   * @param {String} imgUrl 图片路径, file:// 协议
   * @returns {Promise} Promise 对象
   */
  static upload(url, imgUrl) {
    if (
      !global.accessToken ||
      global.accessToken == '' ||
      global.accessToken == null ||
      global.accessToken == undefined
    ) {
      AsyncStorage.getItem('ACCESS_TOKEN', result => {
        global.accessToken = result;
      });
    }
    const fileName = imgUrl.split('/')[imgUrl.split('/').length - 1]; // 文件名字
    return RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
        accessToken: global.accessToken ? global.accessToken : '',
      },
      [
        {
          name: 'file',
          filename: fileName,
          data: RNFetchBlob.wrap(imgUrl),
        },
      ],
    )
      .then(res => res.json())
      .catch(err => console.log(`文件上传失败!错误信息:->`, err));
  }
}
