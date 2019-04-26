import request from '@/utils/request'

export function getItem() {
  return request({
    url: '/send_img_items',
    method: 'get'
  })
}

export function submitItem(data) {
  return request({
    url: '/Post_Front_End_Framedata',
    method: 'post',
    data: data
  })
}

export function getConfig() {
  return request({
    url: '/detection/config',
    method: 'get'
  })
}

