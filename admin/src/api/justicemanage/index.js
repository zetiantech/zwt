import request from '@/utils/request'
// 公证预约接口

export function fetchCertMarkApplyList(params) {
  return request({
    url: '/mgmtRptCertMarkApply/list',
    method: 'get',
    params: params
  })
}
