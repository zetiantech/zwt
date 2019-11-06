import React, { Component } from 'react';

import { 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Tabs } from '@ant-design/react-native';


export default class BasicTabsComponent extends Component {
  constructor (props) {
     super(props)
     this.state = {
        type: this.props.type || 0
     }
  }
  _renderTabBar1(tabProps) {
    return (
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: '#FFFFFF'
            }}
          >
            {tabProps.tabs.map((tab, i) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={tab.key || i}
                style={{
                  // width: '33%',
                  paddingVertical: 12,
                  // paddingHorizontal:33,
                }}
                onPress={() => {
                  const { goToTab, onTabClick } = tabProps;
                  onTabClick && onTabClick(tabs[i], i);
                  goToTab && goToTab(i);
                }}
              >
                <Text
                  style={{
                    color: tabProps.activeTab === i ? '#2F74ED' : undefined
                  }}
                >
                  {tab.name}
                </Text>
                {
                  tabProps.activeTab === i && <Text style={styles.bottomLine}></Text>
                }
              </TouchableOpacity>
            ))}
          </View>
    );
  }

  _renderTabBar2(tabProps) {
    return (
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor:'#fff'
            }}
          >
            {tabProps.tabs.map((tab, i) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={tab.key || i}
                style={{
                  // width: '33%',
                  padding: 12,
                  
                }}
                onPress={() => {
                  const { goToTab, onTabClick } = tabProps;
                  onTabClick && onTabClick(tabs[i], i);
                  goToTab && goToTab(i);
                }}
              >
                <Text
                  style={{
                    color: tabProps.activeTab === i ? '#ffffff' : undefined,
                    backgroundColor: tabProps.activeTab === i ? '#2F74ED' : undefined,
                    textAlign: 'center',
                    borderRadius: 20,
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 0.1,justifyContent:'space-evenly' }}>
        { this.state.type == 0 && <Tabs
          tabs={this.props.tabs}
          onPress={(tab, index) => this.props.onPress(tab,index) }
          renderTabBar={tabProps => this._renderTabBar1(tabProps)}
        >
          { this.props.children }
        </Tabs>}

        { this.state.type == 1 && <Tabs
          styles={{topTabBarSplitLine: { borderBottomWidth: 0 }}}
          tabs={this.state.tabs}
          onTabClick={(tab, index) => this.props.onPress(tab,index) }
          renderTabBar={tabProps => this._renderTabBar2(tabProps)}
        >
          { this.props.children }
        </Tabs>}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomLine: {
    position: 'absolute',
    width: 20,
    height: 1,
    bottom: 0,
    left: '90%',
    marginLeft: -20,
    backgroundColor: '#2F74ED'
  }
});