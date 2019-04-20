import request from '@/utils/request'

export function getItem() {
  return request({
    url: '/send_img_items',
    method: 'get'
  })
}

export function submitItem() {
  return request({
    url: '/send_img_items',
    method: 'post'
  })
}

