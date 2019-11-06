import { constantRouterMap, processRouter } from '@/router'
// import { fetchMenuList } from '@/api/menu'

import menus from '@/mock/getMenus'

const permission = {
  state: {
    routers: constantRouterMap,
    fetchRoutes: [],
    addRouters: [],
    permissions: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_FETCHROUTES: (state, routers) => {
      state.fetchRoutes = routers
    },
    SET_PERMISSIONS: (state, routers) => {
      state.permissions = routers
    }
  },
  actions: {
    // 获取未认证路由
    GetRoutes({ commit, state }) {
      return new Promise((resolve, reject) => {
        const data = menus
        if (state.fetchRoutes.length === 0) {
          commit('SET_FETCHROUTES', data)
          const accessedRouters = processRouter(data)
          commit('SET_ROUTERS', accessedRouters)
        }
        resolve()
        // fetchMenuList(state.token).then(response => {
        //   const { data } = response.data
        //   if (state.fetchRoutes.length === 0) {
        //     commit('SET_FETCHROUTES', data)
        //     const accessedRouters = processRouter(data)
        //     commit('SET_ROUTERS', accessedRouters)
        //   }
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  }
}

export default permission
