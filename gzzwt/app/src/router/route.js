import main from './main'; // 主要入口

import justice from './justice'; // 司法公证
import library from './library'; // 图书馆
import office from './office'; // 户政
import education from './education'; // 教育
import job from './job'; // 就业
import house from './house'; // 不动产
import medical from './medical'; // 医疗
import vehicle from './vehicle'; //车辆业务
import old from './old'; // 原来的 route 文件
import marital from './marital'; // 婚育收养
import housing from './housing'; // 住房保障
import works from './works'; // 办事
import news from './news'; // 新闻
import socialsecurity from './socialsecurity'; // 社保
import law from './law'; // 法律
import social from './social'; // 社会综合业务
import pet from './pet'; // 宠物业务办理

import fund from './fund'; // 公积金
import user from './user'; // 用户
import other from './other'; // 其他
import sports from './sports'; // 文体娱乐
import life from './life'; // 生活
import common from './common'; // 公共页面组件

import exitandentry from './exitandentry'; // 出入境

export const route = Object.assign(
  main,
  user,
  fund,
  other,
  sports,
  life,
  old,
  office,
  library,
  justice,
  education,
  job,
  house,
  medical,
  vehicle,
  marital,
  housing,
  works,
  exitandentry,
  news,
  socialsecurity,
  law,
  social,
  pet,
  common,
);
