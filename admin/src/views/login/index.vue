<template>
  <div class="login-container">

    <!-- <Background /> -->
    <!--<div class="yuntitle">
      <div class="titbox"><span/></div>
    </div>-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      @submit.native.prevent>

      <div class="title-container">
        <h3 class="title shadow">{{ $t('login.title') }}</h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <el-form-item prop="loginName">
        <!--<span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>-->
        <el-input
          v-model="loginForm.loginName"
          :placeholder="$t('login.username')"
          name="loginName"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span> -->
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          class="loginput"
          @keyup.enter.native.prevent="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <div class="content-center">
        <!-- <Verify :mode="'pop'" :show-button="false" :type="'picture'" :img-url="'http://api.btstu.cn/sjbz/?lx=meizi'" @success="checkSuccess" @error="checkFail" /> -->
        <Identifys @success="checkSuccess" @error="checkFail" @keyup.enter.native.prevent="handleLogin" />
      </div>
      <el-button :loading="loading" class="logbtn" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}<span/></el-button>

    </el-form>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import Background from '@/components/Background'
import { Message } from 'element-ui'
import Verify from 'vue2-verify'
import Identifys from '@/components/Identify'
import { getUserInfo } from '@/api/login'

export default {
  name: 'Login',
  components: { LangSelect, Verify, Background, Identifys },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // TODO： 设置密码时没有校验大于六位，登录时却校验了
      // if (value.length < 6) {
      //   callback(new Error('The password can not be less than 6 digits'))
      // } else {
      //   callback()
      // }
      callback()
    }
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      checkPass: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
  },
  destroyed() {
  },
  mounted() {

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      if (this.checkPass) {
        this.doLogin()
      } else {
        this.$notify.error('请先通过验证.')
      }
    },
    checkSuccess() {
      this.checkPass = true
    },
    checkFail(e) {
      this.checkPass = false
    },
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            getUserInfo().then(responseJson => {
              const { code, data } = responseJson.data
              if (data && code === 0) {
                this.loading = false
                this.$router.push({ path: this.redirect || '/' })
              }
            }, fail => {
              this.loading = false
              this.$notify.error({ title: '失败', message: '用户信息鉴定失败.' })
              this.$store.dispatch('LogOut')
            })
          }).catch((error) => {
            this.loading = false
            Message({
              message: error,
              type: 'error',
              duration: 3 * 1000,
              onClose: () => {
                location.reload()
              }
            })
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://gitee.com/dataact/jeeweb/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;
  $nobg: #353535;

  /*@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }*/

  /* reset element-ui css */
  .login-container {
    /*.yuntitle {
      width: 100%;
      height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, .3);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, .2);
      .titbox {
        width: 85%;
        height: 60px;
        margin: 0 auto;
        padding-top: 5px;
        span {
          display: inline-block;
          height: 50px;
          width: 300px;
          background: url("../../assets/img/logo01.png") no-repeat center center;
          background-size: 100% auto;
        }
      }
    }*/
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
      background: none;
      border-radius: 6px;
      input {
        border:1px solid #808080;
        background: #353535;
        //border: 0px;
        //-webkit-appearance: none;
        border-radius: 6px;
        //padding: 12px 5px 12px 15px;
        color: #bfd9d7 ;
        height: 47px;
        line-height: 47px;
        caret-color: #bfd9d7;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $nobg inset !important;
          -webkit-text-fill-color: #bfd9d7;
        }
        .internal-autofill-selected {
          color:#bfd9d7 !important;
        }
      }
      input::-webkit-input-placeholder{
        color: #808080;
      }

      input:-moz-placeholder{
        color: #808080;
      }

      input::-moz-placeholder{
        color: #808080;
      }

      input:-ms-input-placeholder{
        color: #808080;
      }
    }
    .el-form-item {
      //border: 1px solid rgba(255, 255, 255, 0.1);
      //background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $white: #ffffff;
  $fontcolor: #6c6c73;

  .content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: url("../../assets/img/diqiu3.jpg") no-repeat center center;
    background-size: cover;
    .login-form {
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      max-width: 100%;
      padding: 30px 30px 15px 30px;
      margin: 0 auto;
      border-radius: 8px;
      opacity: 0.95;
      background: linear-gradient(#4d4d4d, #333333);
      box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, .2);
    }
    .tips {
      font-size: 14px;
      color: $fontcolor;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $fontcolor;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: #c2c2c2;
        margin: 0px auto 16px auto;
        text-align: center;
        font-weight: normal;

      }
      .set-language {
        color: $fontcolor;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 8px;
      font-size: 16px;
      color: #666666;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 18px;
    }
    .logbtn {
      width: 60%;
      padding: 0 !important;
      line-height: 40px !important;
      margin-bottom: 20px;
      margin-left: 20%;
      font-size: 16px;
      overflow: hidden !important;
      position: relative;
      border-color: #171717;
    }
    .logbtn {
      color: #bfd9d7;
      background: linear-gradient(#393939, #1f1f1f)
    }
    .logbtn span {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(#2d79c8, #06cef6);
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      -webkit-transition: width 0.4s, height 0.4s;
      transition: width 0.4s, height 0.4s;
      z-index: -1;
    }
    .logbtn:hover {

      color: #409eff;
      background: linear-gradient(#1f1f1f,#393939);
      box-shadow:rgb(18, 18, 18) 0px 0px 8px inset;
    }
    .logbtn:hover span {
      width: 560px;
      height: 560px;
    }
    .logbtn:active {
      background: linear-gradient(to right, #388ae0, #06cef6);
    }
  }
</style>
<style>
  .el-form-item.is-success .el-input__inner{
    border:1px solid #879997 !important;
    color:#bfd9d7 !important;
  }

  .shadow {
    /* linear为线性渐变，也可以用下面的那种写法。left top，right top指的是渐变方向，左上到右下 */
    /* color-stop函数，第一个表示渐变的位置，0为起点，0.5为中点，1为结束点；第二个表示该点的颜色。 */
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(0, #8a8d92),
      color-stop(0.3, #8a8d92),
      color-stop(0.5, #bdc0c9),
      color-stop(0.7, #8a8d92),
      color-stop(1, #8a8d92)
    );
    /* 设置为text，意思是把文本内容之外的背景给裁剪掉 */
    -webkit-background-clip: text;
    /* 设置对象中的文字填充颜色 这里设置为透明 */
    -webkit-text-fill-color: transparent;
    /* 每隔2秒调用下面的CSS3动画 infinite属性为循环执行animate */
    -webkit-animation: animate 2s infinite;
    animation: animate 2s infinite;
  }

  @keyframes animate {
    from {
      background-position: -100px;
    }
    to {
      background-position: 100px;
    }
  }
</style>
