import request from '@/utils/request'

/**
 * 获取所有字典数据
 */
export function fetchDicts() {
  return request({
    url: '/sys/dict',
    method: 'get'
  })
}
