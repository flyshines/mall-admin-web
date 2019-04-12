import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/home/advertise/list',
    method:'get',
    params:params
  })
}

export function updateBanner(id, data) {
  return request({
    url:'/home/advertise/update/'+id,
    method:'post',
    data:data
  })
}



