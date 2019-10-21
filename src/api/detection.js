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
export function getImage(projectName, dataSet, imageId, action) {
  return request({
    url: '/api/fastwash/annotation/image/' + action,
    method: 'get',
    params: { projectName: projectName, dataSetName: dataSet, imageId: imageId }
  })
}

// 用于代替submitItem(), 用于提交标注
export function submitAnnotation(data, action, projectName) {
  return request({
    url: '/api/fastwash/annotation/submit',
    method: 'post',
    data: data,
    params: { projectName: projectName }
  })
}

// 用于代替getConfig,获取项目配置信息
export function getProjectConfig(projectName) {
  return request({
    url: '/api/fastwash/project/' + projectName + '/config',
    method: 'get'
  })
}

// inference
export function inference(projectName, dataSet, imageIdList) {
  return request({
    url: '/api/detection/annotation/model/inference',
    method: 'post',
    data: imageIdList,
    params: { projectName: projectName, dataSetName: dataSet }
  })
}

// training
export function training(projectName, dataSet) {
  return request({
    url: '/api/detection/annotation/model/training',
    method: 'get',
    params: { projectName: projectName, dataSetName: dataSet }
  })
}
