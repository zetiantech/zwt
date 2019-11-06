<template>
  <div class="container">
    <!--<span class="svg-container">
      <svg-icon icon-class="password"/>
    </span>-->
    <el-input v-model="yzm" type="text" auto-complete="on" placeholder="验证码" @change="onBlurChange"/>
    <div @click="refreshCode">
      <Identify :identifycode="identifyCodeValue" :contentwidth="120" :contentheight="44"/>
    </div>
  </div>
</template>

<script>
import Identify from './components/Identify'

export default {
  name: 'Identifys',
  components: { Identify },
  data() {
    return {
      yzm: '',
      identifyCodes: '1234567890',
      identifyCodeValue: ''
    }
  },
  mounted() {
    this.identifyCodeValue = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCodeValue = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCodeValue += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    onBlurChange() {
      if (this.yzm === this.identifyCodeValue) {
        this.$emit('success', true)
      } else {
        this.$emit('error', false)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;
  $fontcolor: #6c6c73;
  $nobg: #353535;
  /*@supports (-webkit-mask: none) and (not (cater-color: $bg)) {
    .container .el-input input{
      color: $bg;
      &::first-line {
        color: $bg;
      }
    }
  }*/
  /* reset element-ui css */
  .container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
     // border:1px solid #e1d8c7;
      background: none;
      border-radius: 6px;
      color: #bfd9d7;
      margin-right: 20px;
      input {
        //background: transparent;
        //border: 0px;
        //-webkit-appearance: none;
        //border-radius: 0px;
        //padding: 0;
        //color: #454545;
        height: 47px;
        caret-color: #bfd9d7;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $nobg inset !important;
          -webkit-text-fill-color: #bfd9d7;
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
      top: 10px;
      left: 0;
      z-index: 999;
    }
  }
</style>
<style>
  .el-form-item.is-success .el-input__inner{
    border:1px solid #808080 !important;
    background: rgba(0,0,0,.1) !important;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 4px 0 rgba(0, 0, 0, .06) !important;
  }
</style>
