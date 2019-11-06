import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import HomeScreen from '../page/HomePage';
import NewsScreen from '../page/NewsPage';
import LifeScreen from '../page/lifePage';
import MyScreen from '../page/MyPage';
import WorkPage from '../page/WorkPage';

import ArrayUtils from '../util/ArrayUtils';
import ScreenUtil from 'src/util/ScreenUtil';

import TouchIdComponentVerify from 'src/component/touchId/TouchIdComponentVerify';
import {GesturePasswordVerify} from 'src/component/gesture/GesturePasswordVerify';

global.lock = false;

const dataSource = [
  {
    icon: require('../res/images/tab/tab1.png'),
    selectedIcon: require('../res/images/tab/tab1_pre.png'),
    selectedTab: 'Home',
    tabName: '首页',
    component: HomeScreen,
  },
  {
    icon: require('../res/images/tab/tab2.png'),
    selectedIcon: require('../res/images/tab/tab2_pre.png'),
    selectedTab: 'News',
    tabName: '资讯',
    component: NewsScreen,
  },
  {
    icon: require('../res/images/tab/tab5.png'),
    selectedIcon: require('../res/images/tab/tab5_pre.png'),
    selectedTab: 'Work',
    tabName: '办事',
    component: WorkPage,
  },
  {
    icon: require('../res/images/tab/tab3.png'),
    selectedIcon: require('../res/images/tab/tab3_pre.png'),
    selectedTab: 'Life',
    tabName: '生活',
    component: LifeScreen,
  },
  {
    icon: require('../res/images/tab/tab4.png'),
    selectedIcon: require('../res/images/tab/tab4_pre.png'),
    selectedTab: 'My',
    tabName: '我的',
    component: MyScreen,
  },
];

type Props = {};
export default class BottomNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      show_touchId_view: false, // 指纹
      show_gesture_view: false, // 手势
      // theme: this.props.theme
    };
  }
  /**
   * 控件渲染后触发
   */
  componentDidMount() {
    this.lockEmitter = DeviceEventEmitter.addListener('lock', data => {
      try {
        let info = JSON.parse(data);
        if (info.type == 'touchId') {
          this.setState({show_touchId_view: info.status});
        } else {
          this.setState({show_gesture_view: info.status});
        }
      } catch (e) {}
    });
  }

  /**
   * 件卸载和销毁之前被调用
   */
  componentWillUnmount() {
    this.lockEmitter.remove();
  }

  render() {
    let tabViews = dataSource.map((item, i) => {
      return (
        <TabNavigator.Item
          title={item.tabName}
          selected={this.state.selectedTab === item.selectedTab}
          titleStyle={styles.titleStyle}
          // selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
          renderIcon={() => (
            <Image style={styles.tabBarIcon} source={item.icon} />
          )}
          renderSelectedIcon={() => (
            <Image
              style={[styles.tabBarSelectedIcon]}
              source={item.selectedIcon}
            />
          )}
          // renderSelectedIcon={() => <Image style={[styles.tabBarSelectedIcon, this.state.theme.styles.tabBarSelectedIcon]} source={item.selectedIcon}/>}
          tabStyle={styles.tabStyle}
          key={i}
          onPress={() => {
            this.setState({
              selectedTab: item.selectedTab,
            });
          }}>
          {/* <item.component  {...this.props} theme={this.state.theme}/> */}
          <item.component {...this.props} />
        </TabNavigator.Item>
      );
    });
    let touchIdComponent = this.state.show_touchId_view ? (
      <TouchIdComponentVerify />
    ) : null;
    let gestureComponent = this.state.show_gesture_view ? (
      <GesturePasswordVerify />
    ) : null;
    return (
      <TabNavigator
        tabBarStyle={{opacity: 1}}
        sceneStyle={{paddingBottom: 0,marginBottom: -11}}
        style={{marginBottom: ScreenUtil.isIphoneX() ? 34 : 0}}>
        {touchIdComponent}
        {gestureComponent}
        {tabViews}
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    // color: '#000000',
  },
  tabStyle: {
    alignSelf: 'center',
    
  },
  tabBarIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  tabBarSelectedIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
