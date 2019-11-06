<template>
  <div>
    <!--<el-row :gutter="40" class="panel-group">
    <el-col v-if="firstName" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon :icon-class="firstIcon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ firstName }}</div>
          <count-to :start-val="0" :end-val="firstData" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col v-if="secondName" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon :icon-class="secondIcon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ secondName }}</div>
          <count-to :start-val="0" :end-val="secondData" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col v-if="thirdName" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon :icon-class="thirdIcon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ thirdName }}</div>
          <count-to :start-val="0" :end-val="thirdData" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col v-if="fourthName" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon :icon-class="fourthIcon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ fourthName }}</div>
          <count-to :start-val="0" :end-val="fourthData" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>-->

    <div class="cardbox">
      <el-row :gutter="40">
        <el-col v-if="firstName" :xs="12" :sm="12" :lg="6">
          <div class="cardone " @click="handleSetLineChartData('messages')">
            <i class="trans-rotate"/>
            <div class="txtbox">
              <p>{{ firstName }}</p>
              <count-to :start-val="0" :end-val="firstData" :duration="2600" />
            </div>
          </div>
        </el-col>
        <el-col v-if="secondName" :xs="12" :sm="12" :lg="6">
          <div class="cardtwo" @click="handleSetLineChartData('messages')">
            <i class="trans-rotate"/>
            <div class="txtbox">
              <p>{{ secondName }}</p>
              <count-to :start-val="0" :end-val="secondData" :duration="2600" />
            </div>
          </div>
        </el-col>
        <el-col v-if="thirdName" :xs="12" :sm="12" :lg="6">
          <div class="cardthree" @click="handleSetLineChartData('messages')">
            <i class="trans-rotate"/>
            <div class="txtbox">
              <p>{{ thirdName }}</p>
              <count-to :start-val="0" :end-val="thirdData" :duration="2600" />
            </div>
          </div>
        </el-col>
        <el-col v-if="fourthName" :xs="12" :sm="12" :lg="6">
          <div class="cardfour" @click="handleSetLineChartData('messages')">
            <i class="trans-rotate"/>
            <div class="txtbox">
              <p>{{ fourthName }}</p>
              <count-to :start-val="0" :end-val="fourthData" :duration="2600" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    firstIcon: { type: String, default: 'peoples' },
    firstName: { type: String, default: '' },
    firstData: { type: Number, default: 0 },
    secondIcon: { type: String, default: 'message' },
    secondName: { type: String, default: '' },
    secondData: { type: Number, default: 0 },
    thirdIcon: { type: String, default: 'money' },
    thirdName: { type: String, default: '' },
    thirdData: { type: Number, default: 0 },
    fourthIcon: { type: String, default: 'shopping' },
    fourthName: { type: String, default: '' },
    fourthData: { type: Number, default: 0 }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 10px;

    .card-panel-col{
      margin-bottom: 32px;

    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 0 0 3px rgba(0,0,0,0.15), 0 4px 0 -3px #fff, 0 4px 0 -2px #bec2c8, 0 8px 0 -5px #fff, 0 8px 0 -4px #bec2c8;
      border-color: rgba(0, 0, 0, .05);
      border-radius: 6px;

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #94c1e0;
        }
        .icon-message {

          background: #40c9c6;
        }
        .icon-money {
          background: #4aca6d;
        }
        .icon-shopping {
          background: #fad64a
        }
      }
      .card-panel-col:first-child{
        background: yellow;
      }
      .icon-people {
        color: #94c1e0;
      }
      .icon-message {

        color: #40c9c6;
      }
      .icon-money {
        color: #4aca6d;
      }
      .icon-shopping {
        color: #fad64a
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;

      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .cardbox{
    margin-bottom: 30px;
    .txtbox{
      float: left;
      height: 52px;
      margin-top: 34px;
      color: #ffffff;
      font-weight: 600;
      p{
        margin-top: 0;
      }
    }
    .trans-rotate{
      -webkit-transition: transform .35s linear;
      -moz-transition: transform .35s linear;
      -o-transition: transform .35s linear;
      transition: transform .35s linear;
    }
    .cardone{
      height: 120px;
      background-color: #55c794;
      border-radius: 6px;
      i{
        display: block;
        height: 52px;
        width: 52px;
        margin: 34px 24px 0 24px;
        background: url("../../../../assets/img/user01.png") no-repeat center center;
        float: left;
      }
    }
    .cardone:hover i{
      transform:rotate(360deg);
    }
    .cardtwo{
      height: 120px;
      background-color: #8693f3;
      border-radius: 6px;
      i{
        display: block;
        height: 52px;
        width: 52px;
        margin: 34px 16px 0 16px;
        background: url("../../../../assets/img/online.png") no-repeat center center;
        float: left;
      }
    }
    .cardtwo:hover i{
      transform:rotate(360deg);
    }
    .cardthree{
      height: 120px;
      background-color: #ffa897;
      border-radius: 6px;
      i{
        display: block;
        height: 52px;
        width: 52px;
        margin: 34px 16px 0 16px;
        background: url("../../../../assets/img/outline.png") no-repeat center center;
        float: left;
      }
    }
    .cardthree:hover i{
      transform:rotate(360deg);
    }
    .cardfour{
      height: 120px;
      background-color: #bc8dee;
      border-radius: 6px;
      i{
        display: block;
        height: 52px;
        width: 52px;
        margin: 34px 16px 0 16px;
        background: url("../../../../assets/img/yichang.png") no-repeat center center;
        float: left;
      }
    }
    .cardfour:hover i{
      transform:rotate(360deg);
    }
  }
</style>
