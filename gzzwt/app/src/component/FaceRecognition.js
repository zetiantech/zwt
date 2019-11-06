/**
 * 人脸样本采集封装（百度AI-SDK）
 */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    NativeModules,
    NativeEventEmitter,
    ScrollView,
    Platform, 
    TouchableOpacity
} from 'react-native';

import PermissionUtil from 'src/util/PermissionUtil'
import NavigationBar from 'src/common/NavigationBar'
import { Button } from '@ant-design/react-native';

const FaceCheckHelper = NativeModules.PushFaceViewControllerModule;
const FaceCheckModules = Platform.select({
    android: ()=> FaceCheckHelper,
    ios: ()=> NativeModules.RNIOSExportJsToReact
})();
const NativeModule = new NativeEventEmitter(FaceCheckModules);


export default function FaceRecognition(props){

    const [imagesArray, setImagesArray] = useState([])
    const [photoUrls, setShotoUrls] = useState([])

    useEffect(() => {
        PermissionUtil.checkPermission(() => {
            NativeModule.addListener('FaceCheckHelper', (data) => faceCheckCallback(data));
            liveness()
        }, ['camera', 'photo']);
    }, [])

     /**
     * 人脸检测结果
     */
    function faceCheckCallback(data) {
        if (data.remindCode == 0){
            let imagesArray = [];
            let imagesName = Object.keys(data.images); // bestImage liveEye liveYaw liveMouth yawRight yawLeft pitchUp pitchDown
            imagesName.map((info,index) =>{
                let image = data.images[info]
                if (Platform.OS === 'ios' && info === 'bestImage' && typeof(image) !== 'string') {
                    image = data.images.bestImage[0]
                }
                // setImagesArray([imagesArray], 'data:image/jpg;base64,'+ image)
                console.log(image, 22222222222222222222);
                imagesArray.push(
                    <View key={index} style={{margin:50}}>
                        <Image
                            style={{width:180, height: 320, backgroundColor:'red'}}
                            source={{uri:'data:image/jpg;base64,'+ image}}/>
                        <Text>{info}</Text>
                    </View>
                )
             })
            this.setState({imagesArray})
        } else if (data.remindCode == 36) {
            alert('采集超时');
        }
    }

    /**
     * 检测参数配置
     */
    function liveness() {
        let obj = {
            //质量校验设置
            'quality':{
                'minFaceSize' : 200,// 设置最小检测人脸阈值 默认是200
                'cropFaceSizeWidth' : 400,// 设置截取人脸图片大小 默认是 400
                'occluThreshold' : 0.5,// 设置人脸遮挡阀值 默认是 0.5
                'illumThreshold' : 40,// 设置亮度阀值 默认是 40
                'blurThreshold' : 0.7,// 设置图像模糊阀值 默认是 0.7
                'EulurAngleThrPitch' : 10,// 设置头部姿态角度 默认是 10
                'EulurAngleThrYaw' : 10,// 设置头部姿态角度 默认是 10
                'EulurAngleThrRoll' : 10,// 设置头部姿态角度 默认是 10
                'isCheckQuality' : true,// 设置是否进行人脸图片质量检测 默认是 true
                'conditionTimeout' : 10,// 设置超时时间 默认是 10
                'notFaceThreshold' : 0.6,// 设置人脸检测精度阀值 默认是0.6
                'maxCropImageNum' : 1,// 设置照片采集张数 默认是 1
            },
            'liveActionArray' :[
                0, //眨眨眼
                1, //张张嘴
                2, //向右摇头
                3, //向左摇头
                4, //抬头
                5, //低头
                6, //摇头
            ], //活体动作列表
            'order': false,//是否按顺序进行活体动作
            'sound': true, // 提示音，默认不开启
        };
        FaceCheckHelper.openPushFaceViewController( obj );
        // 如果都不设置，需要传 {} 空对象， 建议设置 liveActionArray
        // FaceCheckHelper.openPushFaceViewController( {} );
    }

    function onClickUpload(){
        NativeModule.addListener('FaceCheckHelper', (data) => faceCheckCallback(data));
        liveness()
    }

    return (
        <ScrollView style={styles.container}>
            <NavigationBar 
                title='人脸识别' 
                hide={false} 
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                popEnabled={true}  
                navigator={props.navigation}
            />
            {imagesArray}
            <View style={styles.ImgContainer}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={onClickUpload}>
                    <View style={styles.ImgBody}>
                        <Image resizeMode='stretch' source={{uri: photoUrls}} style={styles.img} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    ImgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'    
    },
    ImgBody: {
        marginTop: 100,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e4e4e4',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
});