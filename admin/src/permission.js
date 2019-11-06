import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta && to.meta.requireAuth === false) {
    // 不需要登陆，直接进入
    next()
  } else {
    if (getToken()) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        if (store.getters.permissions.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetUserInfo').then(res => {
            if (store.getters.fetchRoutes.length === 0) { // 判断是否获取路由
              store.dispatch('GetRoutes').then(() => {
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true })
              })
            } else {
              next()
            }
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message.error('请重新登录')
              next('/login') // 否则全部重定向到登录页
            })
          })
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          next()
          // if (hasPermission(store.getters.permissions, to.meta.permission)) {
          //   next()
          // } else {
          //   next({ path: '/401', replace: true, query: { noGoBack: true }})
          // }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
