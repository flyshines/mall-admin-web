import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/teacher/list',
    method:'get',
    params:params
  })
}

export function createMember(params) {
  return request({
    url:'/teacher/create',
    method:'post',
    data:params
  })
}

export function getmember(params) {
  return request({
    url:'/teacher/get',
    method:'get',
    params:params
  })
}

export function updatemember(params) {
  return request({
    url:'/teacher/update',
    method:'post',
    data:params
  })
}



