import request from '@/utils/request'

/** 目标检测图像标注相关的API **/
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

export function exportResult() {
  return request({
    url: '/export_result',
    method: 'get'
  })
}

/** in the future **/
// 用于代替getItem(), 获取待标注的图像
export function getImage(projectName, dataset, fileName, action) {
  return request({
    url: '/send_img_items/' + projectName,
    method: 'get',
    params: { dataset: dataset, fileName: fileName, action: action }
  })
}

// 用于代替submitItem(), 用于提交标注
export function submitAnnotation(data, action, projectName) {
  return request({
    url: '/Post_Front_End_Framedata',
    method: 'post',
    data: data,
    params: { action: action, projectName: projectName }
  })
}

// 用于代替getConfig,获取项目配置信息
export function getProjectConfig(projectName) {
  return request({
    url: '/project/' + projectName + '/config',
    method: 'get'
  })
}
