import request from '@/utils/request'

export function fetchNewsList(params) {
  return request({
    url: '/news/list',
    method: 'get',
    params: params
  })
}
export function fetchNewsCategoryList(params) {
  return request({
    url: '/mgmtNewsCategory/list',
    method: 'get',
    params: params
  })
}
