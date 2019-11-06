import request from '@/utils/request'

// 补换领机动车合格标志
export function fetchCertMarkApplyList(params) {
  return request({
    url: '/mgmtRptCertMarkApply/list',
    method: 'get',
    params: params
  })
}

// 换领机动车登记证书
export function fetchRegistCertApplyList(params) {
  return request({
    url: '/mgmtRptRegistCertApplay/list',
    method: 'get',
    params: params
  })
}

//机动车年审预约
export function fetchYearAuditApplyList(params) {
  return request({
    url: '/mgmtYearAuditApply/list',
    method: 'get',
    params: params
  })
}

// 机动车转移登记
export function fetchTransferApplyList(params) {
  return request({
    url: '/mgmtTransferApply/list',
    method: 'get',
    params: params
  })
}

// 交通违法办理预约
export function fetchHandleIllegalApplyList(params) {
  return request({
    url: '/mgmtHandleIllegalApply/list',
    method: 'get',
    params: params
  })
}

// 有效期满换证
export function fetchDrivingLicenseApplyList(params) {
  return request({
    url: '/MgmtRptDrivingLicenseApply/list',
    method: 'get',
    params: params
  })
}

// 换领机动车号牌、补领机动车号牌
export function fetchMgmtRptPlateApplyList(params) {
  return request({
    url: '/MgmtRptPlateApply/list',
    method: 'get',
    params: params
  })
}


