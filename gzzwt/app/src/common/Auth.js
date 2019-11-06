import AsyncStorage from 'src/util/AsyncStorageUtil'
import NavigationUtil from 'src/util/NavigationUtil'

export const Auth = {
    isLogin(props, callback) {
        console.log(global.accessToken, 222222222222);
        if(!global.accessToken || global.accessToken=='' || global.accessToken == null || global.accessToken == undefined){
            AsyncStorage.getItem('ACCESS_TOKEN', async (result) => {
                console.log(result, 3333333333);
                if(result && result!=""){
                    global.accessToken = result;
                    callback && callback()
                }else{
                    NavigationUtil.navigate(props, 'Login')
                }
            });
        }else{
            callback && callback()
        }
    }
}