<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    const _this = this
    setTimeout(function() {
      _this.initChart()
    }, 1800)
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const title = ['账号', '好友', '微信群']
      const seriesData = []
      const chartData = this.chartData || {}
      seriesData.push(chartData.wechatCount || 0)
      seriesData.push(chartData.contactCount || 0)
      seriesData.push(chartData.chatroomCount || 0)

      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#409eff', '#0e7fff', '#40c9c6', '#4aca6d', '#94c1e0'],
        legend: {
          data: title
        },
        grid: {
          top: 50,
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: title,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '数量',
          type: 'bar',
          stack: 'vistors',
          label: {
            normal: {
              show: true,
              position: 'top',
              distance: 20,
              align: 'center',
              verticalAlign: 'middle',
              rotate: 0,
              formatter: '{b} {c} (人)',
              fontSize: 14,
              rich: {
                name: {
                  textBorderColor: '#fff',
                  color: '#fff'
                }
              }
            }
          },
          barWidth: '20%',
          data: seriesData,
          animationDuration: 1500
        }]
      })
    }
  }
}
</script>
