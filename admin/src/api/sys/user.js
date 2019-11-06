import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: params
  })
}

export function createUser(params) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    params: params
  })
}

export function deleteUser(params) {
  return request({
    url: '/sys/user/add',
    method: 'get',
    params: params
  })
}

export function updateUser(params) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    params: params
  })
}

export function modifyPassword(params) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    params: params
  })
}
