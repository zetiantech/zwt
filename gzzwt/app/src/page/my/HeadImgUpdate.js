/**
 * @description 修改头像
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import { 
    InputItem,
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import ToastUtil from 'src/util/ToastUtil'
 import NavigationUtil from  'src/util/NavigationUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil';
 import LogUtil from 'src/util/LogUtil';
 import GlobalStyles from 'src/res/styles/GlobalStyles'

 import JSBridge from 'src/bridge/JSBridge.js';


const RightBtnView = ({onRightBtn}) => {
    return (
        <View style={styles.rightBtnBox}>
            <TouchableHighlight
                underlayColor='transparent'
                onPress={onRightBtn}>
                <View style={{paddingRight: 15}}>
                    <Text style={styles.rightBtn}>完成</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}



/**
   * 默认参数
   */
  const options = {
    imageCount: 1,          // 最大选择图片数目，默认6
    isCamera: true,         // 是否允许用户在内部拍照，默认true
    isCrop: true,          // 是否允许裁剪，默认false
    CropW: ~~(GlobalStyles.window_width * 0.6), // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(GlobalStyles.window_width * 0.6), // 裁剪高度，默认屏幕宽度60%
    isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,  // 是否显示圆形裁剪区域，默认false
    showCropFrame: true,    // 是否显示裁剪区域，默认true
    showCropGrid: false     // 是否隐藏裁剪区域网格，默认false
};

export default function HeadImgUpdate(props) {
    const photoUrl = props.navigation.getParam("photoUrl")

    const bridge = new JSBridge(props);
    const [photoUrls, setPhotoUrls] = useState(photoUrl)

    const onRightBtn = () => {
        HttpUtil.post(API.UPDATE_USER_INFO, {
            photoUrl: photoUrls
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                ToastUtil.toast(msg, 'bottom', 'short', ()=>{
                    DeviceEventEmitter.emit("refresh", '1');
                    NavigationUtil.goBack(props)
                })
            }else{
                ToastUtil.toast(msg)
            }
        })
    }
    async function onClickUpload(){
        const data = await bridge.selectedPhotos(options);
        bridge.upload(API.UPLOADFILE, {
            uri: data[0].uri,
        })
        .then(imgUrlResult => {
            if (imgUrlResult.code === 0) {
                setPhotoUrls(imgUrlResult.data)
            } else {
                ToastUtil.toast('上传失败', 'center');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>
            <NavigationBar 
            navigator={props.navigation} 
            popEnabled={true} 
            rightButton={
                <RightBtnView onRightBtn={onRightBtn} />
            }
            title='修改头像' 
            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
            hide={false} />
            <View style={styles.ImgContainer}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={onClickUpload}>
                    <View style={styles.ImgBody}>
                        <Image resizeMode='stretch' source={{uri: photoUrls}} style={styles.img} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    rightBtnBox: {
        flexDirection: 'row'
    },
    rightBtn: {
        color: '#2F74ED'
    },
    ImgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'    
    },
    ImgBody: {
        width: 200,
        height: 200,
        borderRadius: 120,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e4e4e4',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 120,
    }
});