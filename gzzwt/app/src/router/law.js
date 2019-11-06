import JudicialOffices from 'src/page/law/JudicialOffices'; // 司法所查询
import Surveyor from 'src/page/law/Surveyor'; // 鉴定机构鉴定人查询
import SurveyorResult from 'src/page/law/SurveyorResult'; // 鉴定机构鉴定人查询结果
import MediationCommittee from 'src/page/law/MediationCommittee'; // 人民调解委员会查询
import PracticingLawyer from 'src/page/law/PracticingLawyer'; // 执业律师查询
import PracticingLawyerResult from 'src/page/law/PracticingLawyerResult'; // 执业律师查询结果
import LawFirm from 'src/page/law/LawFirm'; // 律师事务所查询
import LawFirmResult from 'src/page/law/LawFirmResult'; // 律师事务所查询

import lawRelationSee from 'src/page/law/lawRelationSee'; // 被监管对象家属会见预约
import lawRelationSee2 from 'src/page/law/lawRelationSee2'; // 被监管对象家属会见预约2
import lawRelationSee3 from 'src/page/law/lawRelationSee3'; // 被监管对象家属会见预约3

import DetaineesFamiliesPay from 'src/page/law/DetaineesFamiliesPay'; //在押人员家属顾送款预存服务

export default {
  JudicialOffices: {
    screen: JudicialOffices,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  MediationCommittee: {
    screen: MediationCommittee,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  Surveyor: {
    screen: Surveyor,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SurveyoResult: {
    screen: SurveyorResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  PracticingLawyer: {
    screen: PracticingLawyer,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  PracticingLawyerResult: {
    screen: PracticingLawyerResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  LawFirm: {
    screen: LawFirm,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  LawFirmResult: {
    screen: LawFirmResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  lawRelationSee: {
    screen: lawRelationSee,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  lawRelationSee2: {
    screen: lawRelationSee2,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  lawRelationSee3: {
    screen: lawRelationSee3,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  DetaineesFamiliesPay: {
    screen: DetaineesFamiliesPay,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
};
