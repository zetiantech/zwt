package com.sy.government.baiduface.faceactivity;

import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;

import com.baidu.idl.face.platform.FaceStatusEnum;
import com.baidu.idl.face.platform.ui.FaceLivenessActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.sy.government.MainApplication;
import com.sy.government.baiduface.widget.DefaultDialog;

import java.util.HashMap;
import java.util.Iterator;

/**
 * 人脸图像活体检测采集（获取采集图片结果：Base64）
 * create by song 2018-09-19
 */
public class FaceLivenessExpActivity extends FaceLivenessActivity {

    private DefaultDialog mDefaultDialog;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onLivenessCompletion(FaceStatusEnum status, String message, HashMap<String, String> base64ImageMap) {
        super.onLivenessCompletion(status, message, base64ImageMap);
        WritableMap faceCheckResult = Arguments.createMap();
        WritableMap faceCheckImgsResult = Arguments.createMap();
        if (status == FaceStatusEnum.OK && mIsCompletion) {
            faceCheckResult.putInt("remindCode", 0);
            Iterator<String> iterator = base64ImageMap.keySet().iterator();
            Log.e("验证结果: ", base64ImageMap.keySet().toString());
            while (iterator.hasNext()){
                String key = iterator.next();
                String base64Img = base64ImageMap.get(key);
                String newKey = "";
                if(key == "Eye") {
                    newKey = "liveEye";
                } else if(key == "HeadLeft") {
                    newKey = "yawLeft";
                } else if(key == "HeadUp") {
                    newKey = "pitchUp";
                } else if(key == "HeadDown") {
                    newKey = "pitchDown";
                } else if(key == "Mouth") {
                    newKey = "liveMouth";
                } else if (key == "HeadRight") {
                    newKey = "yawRight";
                } else if (key == "HeadLeftOrRight") {
                    newKey = "liveYaw";
                } else {
                    // bestImage0
                    newKey = "bestImage";
                }
                faceCheckImgsResult.putString(newKey, base64Img);
            }

            faceCheckResult.putMap("images", faceCheckImgsResult);
            MainApplication.getBaiduFacePackage().getBaiduFaceModule().sendFaceCheckBase64Img(faceCheckResult);
            finish();
            //            showMessageDialog("活体检测", "检测成功");
        } else if (status == FaceStatusEnum.Error_DetectTimeout ||
                status == FaceStatusEnum.Error_LivenessTimeout ||
                status == FaceStatusEnum.Error_Timeout) {
            faceCheckResult.putInt("remindCode", 36);
//            showMessageDialog("活体检测", "采集超时");
        }
    }

    private void showMessageDialog(String title, String message) {
        if (mDefaultDialog == null) {
            DefaultDialog.Builder builder = new DefaultDialog.Builder(this);
            builder.setTitle(title).
                    setMessage(message).
                    setNegativeButton("确认",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    mDefaultDialog.dismiss();
                                    finish();
                                }
                            });
            mDefaultDialog = builder.create();
            mDefaultDialog.setCancelable(true);
        }
        mDefaultDialog.dismiss();
        mDefaultDialog.show();
    }

    @Override
    public void finish() {
        super.finish();
    }

}