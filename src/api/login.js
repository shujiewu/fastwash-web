import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/auth/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register(username, password) {
  return request({
    url: '/api/auth/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// export function valUserName(username) {
//   return request({
//     url: '/api/auth/user/register',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/api/auth/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/auth/user/logout',
    method: 'get'
  })
}
