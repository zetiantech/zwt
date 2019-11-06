import { loginByUsername, logout, refreshToken, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    refresh_token: getRefreshToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    userId: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, refresh_token) => {
      state.refresh_token = refresh_token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const loginName = userInfo.loginName.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(loginName, userInfo.password).then(response => {
          const { code, data, msg } = response.data
          if (code === 0 || code === undefined) {
            commit('SET_TOKEN', data.accessToken)
            setToken(data.accessToken)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            setRefreshToken(data.refresh_token)
            resolve()
          } else {
            reject(msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const { data } = response.data
          if (!data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          if (data.roles) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          }
          commit('SET_USER_ID', data.id)
          commit('SET_NAME', data.realname)
          commit('SET_AVATAR', data.portrait)
          commit('SET_INTRODUCTION', data.realname)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户名登录
    RefreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        const refreshTokenData = getRefreshToken()
        refreshToken(refreshTokenData).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.access_token)
          setToken(response.data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeRefreshToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   removeRefreshToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
