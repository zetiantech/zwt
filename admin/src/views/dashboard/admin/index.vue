<template>
  <div class="dashboard-editor-container">

    <el-row class="update-log-row">
      <ul>
        <li class="update-log-li title">更新日志</li>
        <li v-for="updateLog in updateLogs" :key="updateLog.label" class="update-log-li">
          <div class="update-log-label">{{ updateLog.label }}</div>
          <div class="update-log-value">{{ updateLog.value }}</div>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { formatDate } from '@/utils/date'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  filters: {
    filterDatetime(value, format = 'yyyy-MM-dd h:m:s') {
      if (value) {
        return formatDate(value, format)
      } else {
        return '不限'
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      pieChartData: {},
      lineChartData: {
        expectedData: [],
        actualData: []
      },
      updateLogs: {
        label: '最新公告',
        value: '最新公告'
      }
    }
  },
  mounted() {},
  methods: {
    handleSetLineChartData(type) {
    },
    filterDate(value, format = 'yyyy-MM-dd') {
      if (value) {
        return formatDate(value, format)
      } else {
        return '不限'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background: none;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      border-radius: 4px;
    }
    .update-log-row {
      background-color: #fff;
      margin-bottom: 30px;
      border-radius: 6px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 4px 0 -3px #fff, 0 4px 0 -2px #bec2c8, 0 8px 0 -5px #fff, 0 8px 0 -4px #bec2c8;
      .title {
        font-size: 1.5em;
        line-height: 3em;
      }
      .update-log-li {
        display: flex;
        .update-log-label {
          width: 200px;
          color: #aaa;
        }
        .update-log-value {
          color: #666;
        }
      }
    }
  }
</style>
