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
      default: null
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
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
      const title = []
      const chartData = this.chartData
      this.chart = echarts.init(this.$el, 'macarons')

      for (let i = 0; i < chartData.length; i++) {
        title.push(chartData[i].name)
      }

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}(人)'
        },
        color: ['#4aca6d', '#40c9c6', '#fad64a', '#94c1e0'],
        legend: {
          left: 'center',
          bottom: '5',
          data: title
        },
        calculable: true,
        series: [
          {
            name: '数据报表',
            type: 'pie',
            center: ['50%', '45%'],
            data: chartData,
            animationEasing: 'cubicInOut',
            animationDuration: 1500
          }
        ]
      })
    }
  }
}
</script>
