import MyBorrow from '../page/library/MyBorrow'; // 借阅查询
import LibraryBooking from '../page/library/Booking'; // 我的预约
import SearchBooks from '../page/library/SearchBooks'; // 书目检索
import SearchBooksResult from '../page/library/SearchBooksResult'; // 书目检索结果
import SuspendReadCard from '../page/library/SuspendReadCard'; // 读书证挂失
import SuspendReadCardSuccess from '../page/library/SuspendReadCardSuccess'; // 读书证挂失成功
import BindReadCard from '../page/library/BindReadCard'; // 绑定读书证
import RegisterReadCard from '../page/library/RegisterReadCard'; // 注册读书证
// 图书馆
export default {
  LibraryBorrow: {
    screen: MyBorrow,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  LibraryBooking: {
    screen: LibraryBooking,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SearchBooks: {
    screen: SearchBooks,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SearchBooksResult: {
    screen: SearchBooksResult,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SuspendReadCard: {
    screen: SuspendReadCard,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  SuspendReadCardSuccess: {
    screen: SuspendReadCardSuccess,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  BindReadCard: {
    screen: BindReadCard,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
  RegisterReadCard: {
    screen: RegisterReadCard,
    navigationOptions: ({props, navigation}) => ({
      header: null,
    }),
  },
};
