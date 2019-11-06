/**
 * @description 此文件是映射到window对象，可以理解为h5可以调用的方法都是通过字符串js的方式定义
 * 所以此出的方法通常与JSBridge.js的方法一致
 * H5页面可以通过ms.app.execute方法直接执行JSBridge的方法
 */


let JavaScriptString = `
    (function() {
        
        if(window.jsLoadStart){
         try{
             window.jsLoadStart();
             }catch (e) {
             }
        }
        
        var func = null;

        function callback(data) {
               if(this.func){
               eval(this.func(JSON.parse(data)));
               }
        }

        function execute(data) {
            window.ReactNativeWebView.postMessage(data);
        }
        
        function callbackDemo(msg,func) {
            this.execute("this.callbackDemo(\'"+msg+"\')");
            this.func = func;
        }

        function toast(msg) {
            this.execute("this.toast(\'"+msg+"\')");
        }

        function open(url,options={}) {
            this.execute("this.open(\'"+url+"\',"+JSON.stringify(options)+")");
        }
  
        function logout() {
            this.execute("this.logout()");
        }
        
            function setStorageItem(key,data){
         this.execute("this.setStorageItem(\'"+key+"\',\'"+data+"\')");
        }
        
        function getStorageItem(key,func){
         this.execute("this.getStorageItem(\'"+key+"\')");
         this.func = func;
        }
        
           function refresh(type) {
            this.execute("this.refresh(\'"+type+"\')");
        }
  
        
        function goHome() {
            this.execute("this.goHome()");
        } 
        function goBack() {
            this.execute("this.goBack()");
        } 

        function version (func) {
             this.execute("this.version()");
             this.func = func;
        } 

        function checkCacheSize(func) {
            this.execute("this.checkCacheSize()");
            this.func = func;
        }  
        
      
         function checkVersionUpdate() {
            this.execute("this.checkVersionUpdate()");
        }  
        
        
       function cleanCacheSize(func) {
            this.execute("this.cleanCacheSize()");
            this.func = func;
        }               
        
        function setNavigation(navigaBarConfig,func){
         this.execute("this.setNavigation("+JSON.stringify(navigaBarConfig)+")");
         this.func = func;
        }
        
        function setStatusBar(statusConfig){
         this.execute("this.setStatusBar("+JSON.stringify(statusConfig)+")");
        }
        
       function setTabBar(tabConfig,func){
         this.execute("this.setTabBar("+JSON.stringify(tabConfig)+")");
         this.func = func;
        }
        
       function goTab(tabName) {
         this.execute("this.goTab(\'"+tabName+"'\)");
     }
        
     
       function getContacts(func) {
         this.execute("this.getContacts()");
         this.func = func;
       }   

       function pay(payType,orderInfo,func) {
         this.execute("this.pay(\'"+payType+"\',"+JSON.stringify(orderInfo)+")");
         this.func = func;    
       }   
        
      function geolocation(func){
           this.execute("this.geolocation()");
           this.func = func; 
      }  
      
      function wxOAuth(func){
            this.execute("this.wxOAuth()");
            this.func =func;
      }
      
      function qqOAuth(func){
            this.execute("this.qqOAuth()");
            this.func =func;
      }
      
      function callTel(tel){
           this.execute("this.callTel(\'"+tel+"\')");
      }

      function selectedPhotos(imageOpint,func) {
         this.execute("this.selectedPhotos("+JSON.stringify(imageOpint)+")");
         this.func = func;
      }  
      
     function selectedVideo(func) {
         this.execute("this.selectedVideo()");
         this.func = func;
     }  
     
     function upload(url,parma,options,func) {
         this.execute("this.upload(\'"+url+"\',"+JSON.stringify(parma)+","+JSON.stringify(options)+")");
         this.func = func;
     }
     
     function openSearch() {
         this.execute("this.openSearch()");
     }
     
       function download(uri,fileName,func) {
         this.execute("this.download(\'"+uri+"\',\'"+fileName+"'\)");
         this.func = func;
     }
     
      function fileExit(fileName,func) {
         this.execute("this.fileExit(\'"+fileName+"\')");
         this.func = func;
     }
       function share(content,options,func) {
         this.execute("this.share("+JSON.stringify(content)+","+JSON.stringify(options)+")");
         this.func = func;
     }
     
       function openFile(fileData,func) {
         this.execute("this.openFile("+JSON.stringify(fileData)+")");
         this.func = func;
     }
     
       function playSound(playInfo) {
         this.execute("this.playSound("+JSON.stringify(playInfo)+")");
     }
     
       function playerStop(func) {
         this.execute("this.playerStop()");
           this.func = func;
     }
     
       function playerPause(func) {
         this.execute("this.playerPause()");
           this.func = func;
     }
     
         function playerResume(func) {
         this.execute("this.playerResume()");
           this.func = func;
     }
     
      function getSound(func) {
         this.execute("this.getSound()");
           this.func = func;
       }
       
     function setPushAlias(alias,func){
         this.execute("this.setPushAlias(\'"+alias+"'\)");
         this.func = func;
        }
        
     function setPushTag(tag,func){
         this.execute("this.setPushTag(\'"+tag+"'\)");
         this.func = func;
        }   
     

        let app = {
                execute:execute,
                callback:callback,
                callbackDemo:callbackDemo,
                toast:toast,
                open:open,
                logout:logout,
                goHome:goHome,
                goBack:goBack,
                version:version,
                checkCacheSize:checkCacheSize,
                cleanCacheSize:cleanCacheSize,
                checkVersionUpdate:checkVersionUpdate,
                setStorageItem:setStorageItem,
                getStorageItem:getStorageItem,
                refresh:refresh,
                setNavigation:setNavigation,
                setStatusBar:setStatusBar,
                setTabBar:setTabBar,
                goTab,goTab,
                getContacts:getContacts,
                pay:pay,
                selectedPhotos:selectedPhotos,
                selectedVideo:selectedVideo,
                upload:upload,
                geolocation:geolocation,
                wxOAuth,wxOAuth,
                qqOAuth,qqOAuth,
                callTel:callTel,
                openSearch:openSearch,
                download:download,
                fileExit:fileExit,
                share:share,
                openFile:openFile,
                playSound:playSound,
                playerStop:playerStop,
                playerPause:playerPause,
                playerResume:playerResume,
                getSound:getSound,
                setPushAlias,
                setPushTag
        };
        if(typeof rn == 'undefined') {
            rn = {};
        }
        window.rn.app = app;
        if(window.jsLoadEnd){
           try{
             window.jsLoadEnd();
           } catch (e) {
            }
        }  
    }());
`;

export default JavaScriptString;