import request from '@/utils/request'

export function loginByUsername(loginName, password) {
  return request({
    url: '/mgmtUser/login',
    method: 'post',
    data: {
      loginName,
      password
    }
  })
}

export function getUserInfo() {
  return request({
    url: '/mgmtUser/info/query',
    method: 'post'
  })
}

export function refreshToken(refresh_token) {
  const data = {
    refresh_token
  }
  return request({
    url: '/auth/refresh_token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/sso/oauth2/revoke_token',
    method: 'post'
  })
}

