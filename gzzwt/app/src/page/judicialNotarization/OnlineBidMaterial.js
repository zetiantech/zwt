/**
 * @description 公证申办
 * @author heweifeng
 */
import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Flex,
  List,
  Stepper,
  WhiteSpace,
  WingBlank,
  Button,
  Provider,
} from '@ant-design/react-native';

import {IconFill, IconOutline} from '@ant-design/icons-react-native';

import NavigationBar from '../../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';

import NavigationUtil from 'src/util/NavigationUtil'; // 页面跳转

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import {API} from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import JSBridge from 'src/bridge/JSBridge.js';

const Explain = () => {
  return (
    <Text style={styles.explain}>
      <IconOutline name="exclamation-circle" style={styles.explainIcon} />
      <Text>
        1.所上传的材料最好为图片且内容清晰，手机拍摄时最好将文件置于白色背景上。
      </Text>
      <Text>2.如需公证员协助，请直接选择提交。</Text>
    </Text>
  );
};

const ListItem = ({item, handleDesc, handleUpload, materialCopies}) => {
  return (
    <List
      renderHeader={
        <View style={styles.headerBox}>
          <Text>{item.name}</Text>
          {item.list && (
            <TouchableOpacity
              style={styles.questionIcon}
              onPress={() => handleDesc(item)}>
              <IconOutline name="question" style={{color: '#ccc'}} />
            </TouchableOpacity>
          )}
        </View>
      }
      styles={{
        Header: {
          backgroundColor: 'transparent',
          paddingTop: 0,
          paddingBottom: 0,
          color: '#333',
          borderBottomWidth: 0,
        },
        Body: {backgroundColor: 'transparent', borderTopWidth: 0},
        BodyBottomLine: {backgroundColor: 'transparent', borderBottomWidth: 0},
      }}>
      <Flex style={styles.listBox}>
        {materialCopies[item.id] &&
          materialCopies[item.id].length &&
          materialCopies[item.id].map((url, index) => {
            return (
              <Flex.Item style={styles.imgBox} key={url + index}>
                <Image
                  style={styles.img}
                  source={{
                    uri: url,
                  }}
                />
              </Flex.Item>
            );
          })}
        <Flex.Item style={styles.imgBox}>
          <TouchableOpacity
            style={styles.cameraOutbox}
            onPress={() => handleUpload(item)}>
            <Text style={styles.cameraBox}>
              <IconFill name="camera" style={styles.camera} />
            </Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </List>
  );
};

export default function OnlineBidSubList(props) {
  const navigationBar = (
    <NavigationBar
      navigator={props.navigation}
      popEnabled={true}
      title="上传材料"
      hide={false}
    />
  );
  const applyId = props.navigation.getParam('applyId', '44'); // 获取参数
  const [list, setList] = useState([]); // 需要上传的数据
  const [materialCopies, setMaterialCopies] = useState({}); // 已经上传的数据

  useEffect(() => {
    HttpUtil.post(API.GETJUSTICEDIM, {applyId}).then(data => {
      data = data.data;
      if (data.code === 0) {
        setList(data.data);
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }, []);
  /**
   * 触发查看描述
   * @param {String} item 项目
   */
  function handleDesc(item) {
    NavigationUtil.navigate(props, 'OnlineBidMateriaDesc', {
      item,
    });
  } // TODO

  /**
   * 触发上传
   */
  async function handleUpload(item) {
    try {
      const bridge = new JSBridge(props);
      const data = await bridge.selectedPhotos();
      bridge
        .upload(API.UPLOADFILE, {
          uri: data[0].uri,
        })
        .then(imgUrlResult => {
          if (imgUrlResult.code === 0) {
            setMaterialCopies({
              ...materialCopies,
              [item.id]: materialCopies[item.id]
                ? [...materialCopies[item.id], imgUrlResult.data]
                : [imgUrlResult.data],
            });
          } else {
            ToastUtil.toast('上传失败', 'center');
            console.log(imgUrlResult);
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  function handleNext() {
    const material = Object.keys(materialCopies).map(justiceDim => {
      return {
        applyId,
        justiceDim,
        materialUrl: materialCopies[justiceDim].join(','),
      };
    });
    HttpUtil.post(API.ADDAPPLYMATERIAL, {list: material}).then(data => {
      data = data.data;
      if (data.code === 0) {
        ToastUtil.toast('提交成功', 'center', 'short', () => {
          NavigationUtil.navigate(props, 'OnlineBidDetail', {
            applyId,
          });
        });
      } else {
        ToastUtil.toast(data.msg || '获取数据失败', 'center');
      }
    });
  }

  return (
    <View style={styles.container}>
      {navigationBar}
      <ScrollView showsVerticalScrollIndicator={false}>
        <WhiteSpace size="lg" />
        <Explain />
        <WhiteSpace size="lg" />
        {list.map(item => {
          return (
            <Fragment key={item.id}>
              <ListItem
                item={item}
                materialCopies={materialCopies}
                handleDesc={handleDesc}
                handleUpload={handleUpload}
              />
              <WhiteSpace size="sm" />
            </Fragment>
          );
        })}
        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onPress={() => handleNext()}>
            下一步
          </Button>
          <WhiteSpace />
        </WingBlank>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  explain: {
    lineHeight: 25,
    padding: 15,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#666',
  },
  explainIcon: {
    color: '#2F74ED',
    marginRight: 10,
  },
  listBox: {
    padding: 7.5,
    flexWrap: 'wrap',
  },
  imgBox: {
    paddingVertical: 7.5,
    paddingHorizontal: 7.5,
    maxWidth: (GlobalStyles.window_width - 15) / 2,
    minWidth: (GlobalStyles.window_width - 15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  img: {
    borderRadius: 4,
    width: '100%',
    height: 100,
  },
  cameraOutbox: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    paddingHorizontal: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  cameraBox: {
    backgroundColor: '#90B8F5',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    lineHeight: 32,
    textAlign: 'center',
  },
  camera: {
    color: '#fff',
    fontSize: 20,
  },
  questionIcon: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    marginLeft: 5,
  },
  headerBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});
