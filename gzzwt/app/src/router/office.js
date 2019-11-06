import QueuingInfo from '../page/household/QueuingInfo'; // 办证大厅预约取号排队查询
// 户政
export default {
  QueuingInfo: {
    screen: QueuingInfo,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
};
