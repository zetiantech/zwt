<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      mode="vertical"
      text-color="#858e99"
    >
      <div ref="one" :class=" isCollapse ? 'toptitle2':'toptitle'"><span/></div>
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      logotoggle: false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" >
  .el-menu-item.is-active{
    border-right: 4px solid #409eff !important;
  }

  .toptitle{
    height: 56px;
    width: 100%;
    background: linear-gradient(#4d4d4d, #333333);
    z-index: 999;
    span{
      display: inline-block;
      width: 100%;
      height: 56px;
      background: url("../../../../assets/img/log02.png")  no-repeat center center;
      background-size: auto;
    }
  }
  .toptitle2{
    height: 56px;
    width: 100%;
    background: linear-gradient(#4d4d4d, #333333);
    background-size: auto;
    z-index: 999;
    span{
      display: inline-block;
      width: 100%;
      height: 56px;
      background: url("../../../../assets/img/minlogo.png")  no-repeat center center;
      background-size: auto;
    }
  }
</style>
