<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'zhangh',
            type: 'gauge',
            min: 0,
            max: 300,
            splitNumber: 50,
            radius: '80%',
            axisLine: {
              lineStyle: {
                color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                width: 3,
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisLabel: {
              textStyle: {
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisTick: {
              length: 15,
              lineStyle: {
                color: 'auto',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            splitLine: {
              length: 25,
              lineStyle: {
                width: 3,
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            pointer: {
              shadowColor: '#fff',
              shadowBlur: 5
            },
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            detail: {
              backgroundColor: 'rgba(30,144,255,0.8)',
              borderWidth: 1,
              borderColor: '#fff',
              shadowColor: '#fff',
              shadowBlur: 5,
              offsetCenter: [0, '50%'],
              textStyle: {
                fontWeight: 'bolder',
                color: '#fff'
              }
            },
            data: [{ value: 90, name: 'km/h' }]
          }
        ]
      })
    }
  }
}
</script>
