// 公共页面组件
import DestinationMap from 'src/common/DestinationMap'; // 目的地地图

export default {
  DestinationMap: {
    //教育综合
    screen: DestinationMap,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
};
