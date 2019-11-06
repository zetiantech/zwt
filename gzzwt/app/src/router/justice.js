import Notaries from 'src/page/judicialNotarization/Notaries'; // 公证员查询
import NotariesDetail from 'src/page/judicialNotarization/NotariesDetail'; // 公证员详情
import Notarization from 'src/page/judicialNotarization/Notarization'; // 公证处查询
import NotarizeOrder from 'src/page/judicialNotarization/NotarizeOrder'; // 公证预约查询
import OnlineBid from 'src/page/judicialNotarization/OnlineBid'; // 公证申请
import OnlineBidSubList from 'src/page/judicialNotarization/OnlineBidSubList'; // 公证申请
import OnlineBidInfo from 'src/page/judicialNotarization/OnlineBidInfo'; // 公证申办信息
import OnlineBidMaterial from 'src/page/judicialNotarization/OnlineBidMaterial'; // 公证申办上传资
import OnlineBidDetail from 'src/page/judicialNotarization/OnlineBidDetail'; // 公证申办详情
import OnlineBidSuccess from 'src/page/judicialNotarization/OnlineBidSuccess'; // 公证申办成功
import HtmlWebview from 'src/page/judicialNotarization/Webview'; // HtmlWebview
import OnlineBidMateriaDesc from 'src/page/judicialNotarization/OnlineBidMateriaDesc'; // HtmlWebview
// 司法公证
export default {
  // 司法公证
  Notaries: {
    screen: Notaries,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  NotariesDetail: {
    screen: NotariesDetail,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  Notarization: {
    screen: Notarization,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  NotarizeOrder: {
    screen: NotarizeOrder,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBid: {
    screen: OnlineBid,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidSubList: {
    screen: OnlineBidSubList,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidInfo: {
    screen: OnlineBidInfo,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidMaterial: {
    screen: OnlineBidMaterial,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidDetail: {
    screen: OnlineBidDetail,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidSuccess: {
    screen: OnlineBidSuccess,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  HtmlWebview: {
    screen: HtmlWebview,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  OnlineBidMateriaDesc: {
    screen: OnlineBidMateriaDesc,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
};
