//社保
import PersonalAccount from 'src/page/liveAll/SocialSecurity/PersonalAccount'; // 个人账户划拨金查询
import PersonalAccountResult from 'src/page/liveAll/SocialSecurity/PersonalAccountResult'; // 个人账户划拨金查询
import SearchRetired from 'src/page/liveAll/SocialSecurity/SearchRetired'; // 社会管理退休人员信息查询
import SearchRetiredInfo from 'src/page/liveAll/SocialSecurity/SearchRetiredInfo'; // 社会管理退休人员信息查询结果
import RelationTransfer from 'src/page/liveAll/SocialSecurity/RelationTransfer'; // 社保关系转移查询
import RelationTransferResult from 'src/page/liveAll/SocialSecurity/RelationTransferResult'; // 社保关系转移查询查询结果

//社保  SocialCard
import SocialSecurity from '../page/liveAll/SocialSecurity/SocialSecurity'// 个人社保缴费历史
import SocialSecurityindex from '../page/liveAll/SocialSecurity/SocialSecurityindex'// 个人社保缴费历史
import Socialdetial from '../page/liveAll/SocialSecurity/Socialdetial'// 消费详情
import SocialSecurityResult from '../page/liveAll/SocialSecurity/SocialSecurityResult'// 社保申领
import SocialCard from '../page/liveAll/SocialSecurity/SocialCard'// 社保卡
import SocialOrganization from '../page/liveAll/SocialSecurity/SocialOrganization'//社保经办查询
import MapSocial from '../page/liveAll/SocialSecurity/MapSocial'//社保经办查询地图
import SocialSecurityInfo from '../page/liveAll/SocialSecurity/SocialSecurityInfo' // 社保查询
import SocialSecurityBaseInfo from '../page/liveAll/SocialSecurity/SocialSecurityBaseInfo' // 基本信息修改


export default {
  PersonalAccount: {
    screen: PersonalAccount,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  PersonalAccountResult: {
    screen: PersonalAccountResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SearchRetired: {
    screen: SearchRetired,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SearchRetiredInfo: {
    screen: SearchRetiredInfo,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  RelationTransfer: {
    screen: RelationTransfer,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  RelationTransferResult: {
    screen: RelationTransferResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SocialSecurity: {
      screen: SocialSecurity,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialSecurityindex: {
      screen: SocialSecurityindex,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  Socialdetial: {
      screen: Socialdetial,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialSecurityResult: {
      screen: SocialSecurityResult,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialCard: {
      screen: SocialCard,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialOrganization: {
      screen: SocialOrganization,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  MapSocial: {
      screen: MapSocial,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialSecurityInfo: {
      screen: SocialSecurityInfo,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
  SocialSecurityBaseInfo: {
      screen: SocialSecurityBaseInfo,
      navigationOptions: ({ props, navigation }) => ({
          header: null
      })
  },
};
