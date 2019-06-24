import request from '@/utils/request'

/** 项目管理相关的API **/
// 验证项目名是否唯一
export function valProjectName(projectName) {
  return request({
    url: '/project/' + projectName + '/exist',
    method: 'get'
  })
}

// 创建项目
export function createProject(data) {
  return request({
    url: '/project/create',
    method: 'post',
    data
  })
}

// 删除项目！！！谨慎使用
export function deleteProject(projectName) {
  return request({
    url: '/project/' + projectName + '/delete',
    method: 'get'
  })
}

// 获取项目列表
export function fetchList(query) {
  return request({
    url: '/project/list',
    method: 'get',
    params: query
  })
}

// 获取存在的数据集
export function fetchDataset(query) {
  return request({
    url: '/dataset/list',
    method: 'get'
  })
}

// 发布项目
export function publishProject(projectName) {
  return request({
    url: '/project/' + projectName + '/publish',
    method: 'get'
  })
}

// 获取项目的图像列表
export function fetchImageList(projectName, query) {
  return request({
    url: '/project/' + projectName + '/images',
    method: 'get',
    params: query
  })
}
