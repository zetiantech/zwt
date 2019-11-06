import request from '@/utils/request'

export function fetchMenuList(query) {
  return request({
    url: '/sys/menu/getMenus',
    method: 'get',
    params: query
  })
}
