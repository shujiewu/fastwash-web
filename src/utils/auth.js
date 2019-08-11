import Cookies from 'js-cookie'

const TokenKey = 'fast_wash_token'
const UserKey = 'fast_wash_user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(token) {
  return Cookies.set(UserKey, token)
}

export function getUserName() {
  return Cookies.get(UserKey)
}
