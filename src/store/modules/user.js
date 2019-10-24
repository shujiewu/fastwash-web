import { login, register, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserName } from '@/utils/auth'
import { resetRouter, router, workerRouterMap, requesterRouterMap } from '@/router'
import { Message } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          if (data.status === 500) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            })
            return Promise.reject('error')
          } else {
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
        //   const data = response
        //   setToken(data.token)
        //   setUserName(data.name)
        //   // if (data.role === 'admin' || data.role === 'requester') {
        //   //   // resetRouter('requester')
        //   //   router.addRoutes(requesterRouterMap)
        //   // } else {
        //   //   // resetRouter('worker')
        //   //   router.addRoutes(workerRouterMap)
        //   // }
        //   commit('SET_TOKEN', data.token)
        //   commit('SET_ROLES', data.role)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 注册
    Register({ commit }, userInfo) {
      const username = userInfo.username.trim()
      register(username, userInfo.password).then(response => {
        const data = response
        if (data.status === 40001) {
          this.$notify({
            title: '失败',
            message: '用户名已经存在',
            type: 'error'
          })
        } else {
          this.$notify({
            title: '成功',
            message: '注册成功',
            type: 'success'
          })
        }
        // console.log(data)
        // setToken(data.token)
        // setUserName(data.name)
        // commit('SET_TOKEN', data.token)
        // commit('SET_ROLES', data.role)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        // resolve()
      })
      // return new Promise((resolve, reject) => {
      //   register(username, userInfo.password).then(response => {
      //     const data = response
      //     console.log(data)
      //     // setToken(data.token)
      //     // setUserName(data.name)
      //     // commit('SET_TOKEN', data.token)
      //     // commit('SET_ROLES', data.role)
      //     // commit('SET_NAME', data.name)
      //     // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          if (data.role) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.role)
          } else {
            commit('SET_ROLES', 'admin')
            // reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
