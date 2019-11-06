/**
 * @description 办证大厅预约取号排队查询
 * @author heweifeng
 */
import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Flex,
  WhiteSpace,
  Picker,
  Modal,
  Provider,
} from '@ant-design/react-native';

import NavigationBar from '../../common/NavigationBar';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import Table from 'src/component/TableComponent'; // 表格

const Filter = ({
  areaData,
  areaId,
  setAreaId,
  pointData,
  accreditationPointId,
  setAccreditationPointId,
}) => {
  return (
    <Flex style={styles.filterContain}>
      <Flex.Item style={styles.fliterBox}>
        <Picker
          title=""
          data={areaData}
          cols={1}
          value={[areaId]}
          onChange={v => setAreaId(v[0])}>
          <TouchableOpacity>
            <Text style={styles.filterText}>
              {areaData.filter(d => d.value === areaId)[0]
                ? areaData.filter(d => d.value === areaId)[0].label
                : areaData[0].label}
              <Image
                resizeMode="contain"
                style={{width: 15, height: 8}}
                source={require('src/res/images/ic_tiaozhuan_down.png')}
              />
            </Text>
          </TouchableOpacity>
        </Picker>
      </Flex.Item>
      <Flex.Item style={styles.fliterBox}>
        <Picker
          title=""
          data={pointData}
          cols={1}
          value={[accreditationPointId]}
          onChange={v => setAccreditationPointId(v[0])}>
          <TouchableOpacity>
            <Text style={styles.filterText}>
              {pointData.filter(d => d.value === accreditationPointId)[0]
                ? pointData.filter(d => d.value === accreditationPointId)[0]
                    .label
                : pointData[0].label}
              <Image
                resizeMode="contain"
                style={{width: 15, height: 8}}
                source={require('src/res/images/ic_tiaozhuan_down.png')}
              />
            </Text>
          </TouchableOpacity>
        </Picker>
      </Flex.Item>
    </Flex>
  );
};

const ScrollViewer = ({rowData, listData}) => {
  return (
    <ScrollView>
      {listData.map(item => {
        return (
          <Fragment key={item.id}>
            <View>
              <Flex>
                <Flex.Item style={styles.fr}>
                  <View style={styles.point}></View>
                  <Text style={styles.mainTitle}>
                    {item.accreditationPointName}
                  </Text>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <View style={styles.table}>
                <Table
                  rowData={rowData}
                  tableData={item.subList}
                  rowStyle={styles.rowStyle}
                />
              </View>
            </View>
            <WhiteSpace />
          </Fragment>
        );
      })}
    </ScrollView>
  );
};

export default function QueuingInfo(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="办证大厅预约取号排队查询"
      hide={false}
    />
  );
  const [areaId, setAreaId] = useState(''); // 区域选择
  const [accreditationPointId, setAccreditationPointId] = useState(''); // 办证点选择
  const [areaData, setAreaData] = useState([
    {
      value: '',
      label: '全市',
    },
  ]); // 区域数据
  const [pointData, setPointData] = useState([
    {
      value: '',
      label: '办证点',
    },
  ]); // 办证点数据
  const [listData, setListData] = useState([]); // 列表数据
  const timer = useRef(null); // 防抖flag

  useEffect(() => {
    // 获取区域数据
    getAreaData();
  }, []);

  useEffect(() => {
    // 触发获取列表数据
    getData();
  }, [accreditationPointId]);

  useEffect(() => {
    // 触发获取办证点数据
    getAccreditationPoint();
  }, [areaId]);

  /**
   * 获取区域下拉框数据
   */
  function getAreaData() {
    HttpUtil.get(API.QueryProvince, {}).then(data => {
      data = data.data;
      if (data.code === 0) {
        data = data.data.map(item => ({
          value: item.id,
          label: item.cityName,
        }));
        data.unshift({
          value: '',
          label: '全市',
        });
        setAreaData(data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }
  /**
   * 获取办证点下拉框数据
   */
  function getAccreditationPoint() {
    if (areaId) {
      HttpUtil.get(API.GETACCREDITATIONPOINT, {
        areaId,
      }).then(data => {
        data = data.data;
        if (data.code === 0) {
          data = data.data.map(item => ({
            value: item.id,
            label: item.name,
          }));
          data.unshift({
            value: '',
            label: '办证点',
          });
          !accreditationPointId && getData();
          setAccreditationPointId('');
          setPointData(data);
        } else {
          ToastUtil.toast(data.msg || '获取数据失败', 'center');
        }
      });
    } else {
      !accreditationPointId && getData();
      setAccreditationPointId('');
      setPointData([
        {
          value: '',
          label: '办证点',
        },
      ]);
    }
  }

  /**
   * 获取列表数据
   */
  function getData() {
    // timer.current && clearTimeout(timer.current);
    // timer.current = setTimeout(() => {
    HttpUtil.get(API.GETACCREDITATIONRESERVATIONLIST, {
      areaId,
      accreditationPointId,
    }).then(data => {
      data = data.data;
      if (data.code === 0) {
        setListData(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
    // }, 10);
  }

  const rowData = [
    {
      key: 'serviceName',
      name: '业务类别',
      titleStyles: {
        flex: 2,
        justifyContent: 'center',
        Text: {
          color: '#999999',
          fontSize: 14,
        },
      },
      valueAttr: {
        numberOfLines: 1,
      },
      onPress: item => {
        Modal.alert(
          <Text style={{color: '#999999', fontSize: 16}}>业务类别</Text>,
          <Text style={{color: '#333333', fontSize: 16, paddingBottom: 30}}>
            {item.serviceName}
          </Text>,
          [
            {
              text: '确定',
            },
          ],
        );
      },
    },
    {
      key: 'takeTotalNum',
      name: '取号总数',
      titleStyles: {
        justifyContent: 'center',
        Text: {
          color: '#999999',
          width: 30,
        },
      },
      valueStyles: {
        Text: {
          color: '#2F74ED',
        },
      },
    },
    {
      key: 'sceneWaitingNum',
      name: '现场等候',
      titleStyles: {
        justifyContent: 'center',
        Text: {
          color: '#999999',
          width: 30,
        },
      },
      valueStyles: {
        Text: {
          color: '#2F74ED',
        },
      },
    },
    {
      key: 'appointmentWaitingNum',
      name: '现场等候',
      titleStyles: {
        justifyContent: 'center',
        Text: {
          color: '#999999',
          width: 30,
        },
      },
      valueStyles: {
        Text: {
          color: '#2F74ED',
        },
      },
    },
    {
      key: 'processingNum',
      name: '正在办理',
      titleStyles: {
        justifyContent: 'center',
        Text: {
          color: '#999999',
          width: 30,
        },
      },
      valueStyles: {
        Text: {
          color: '#2F74ED',
        },
      },
    },
  ];

  return (
    <Provider>
      <View style={styles.container}>
        {navigationBar}
        <WhiteSpace />
        <Filter
          areaData={areaData}
          areaId={areaId}
          setAreaId={setAreaId}
          pointData={pointData}
          accreditationPointId={accreditationPointId}
          setAccreditationPointId={setAccreditationPointId}
        />
        <WhiteSpace />
        <ScrollViewer rowData={rowData} listData={listData} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  filterContain: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingTop: 15,
  },
  filterText: {
    alignSelf: 'center',
  },
  fliterBox: {
    borderRightWidth: 0.5,
    borderRightColor: '#E5E5E5',
  },
  point: {
    width: 6,
    height: 12,
    backgroundColor: '#2F74ED',
    marginLeft: 15,
    marginRight: 5,
    borderRadius: 2,
  },
  mainTitle: {
    fontSize: 16,
  },
  fr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  table: {
    backgroundColor: '#FFF',
    paddingLeft: 15,
  },
  rowStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
});
