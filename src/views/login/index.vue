<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Fast Wash</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" @click="showDialog=true">
          Sign up
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="Registration" :visible.sync="showDialog" width="600px">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="center" style="width: 100%">
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input v-model="registerForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            :type="rpwdType"
            v-model="registerForm.password"
            name="password"
            auto-complete="on"
            placeholder="password"/>
          <span class="show-pwd" @click="showRPwd">
          <svg-icon :icon-class="rpwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </el-form-item>
        <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            :type="rrpwdType"
            v-model="registerForm.repassword"
            name="repassword"
            auto-complete="on"
            placeholder="repassword"
            @keyup.enter.native="handleRegister" />
          <span class="show-pwd" @click="showRRPwd">
          <svg-icon :icon-class="rrpwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="registerLoading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
            Sign up
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { register } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!this.isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validateRPass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入不一致'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registerForm: {
        username: 'admin',
        password: '',
        repassword: '',
        type: 'worker'
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        repassword: [{ required: true, trigger: 'blur', validator: validateRPass }]
      },
      loading: false,
      registerLoading: false,
      pwdType: 'password',
      redirect: undefined,
      showDialog: false,
      rpwdType: 'password',
      rrpwdType: 'password',
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    showRPwd() {
      if (this.rpwdType === 'password') {
        this.rpwdType = ''
      } else {
        this.rpwdType = 'password'
      }
    },
    showRRPwd() {
      if (this.rrpwdType === 'password') {
        this.rrpwdType = ''
      } else {
        this.rrpwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.registerLoading = true
          register(this.registerForm.username, this.registerForm.password).then(response => {
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
              this.showDialog = false
            }
            this.registerLoading = false
          }).catch(() => {
            this.registerLoading = false
          })
          // this.$store.dispatch('Register', this.registerForm).then(() => {
          //
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isValidUsername() {
      return true
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
<!--$bg:#2d3a4b;-->
<!--$dark_gray:#889aa4;-->
<!--$light_gray:#eee;-->
<!--.login-container {-->
  <!--position: fixed;-->
  <!--height: 100%;-->
  <!--width: 100%;-->
  <!--background-color: $bg;-->
  <!--.login-form {-->
    <!--position: absolute;-->
    <!--left: 0;-->
    <!--right: 0;-->
    <!--width: 520px;-->
    <!--max-width: 100%;-->
    <!--padding: 35px 35px 15px 35px;-->
    <!--margin: 120px auto;-->
  <!--}-->
  <!--.tips {-->
    <!--font-size: 14px;-->
    <!--color: #fff;-->
    <!--margin-bottom: 10px;-->
    <!--span {-->
      <!--&:first-of-type {-->
        <!--margin-right: 16px;-->
      <!--}-->
    <!--}-->
  <!--}-->
  <!--.svg-container {-->
    <!--padding: 6px 5px 6px 15px;-->
    <!--color: $dark_gray;-->
    <!--vertical-align: middle;-->
    <!--width: 30px;-->
    <!--display: inline-block;-->
  <!--}-->
  <!--.title {-->
    <!--font-size: 26px;-->
    <!--font-weight: 400;-->
    <!--color: $light_gray;-->
    <!--margin: 0px auto 40px auto;-->
    <!--text-align: center;-->
    <!--font-weight: bold;-->
  <!--}-->
  <!--.show-pwd {-->
    <!--position: absolute;-->
    <!--right: 10px;-->
    <!--top: 7px;-->
    <!--font-size: 16px;-->
    <!--color: $dark_gray;-->
    <!--cursor: pointer;-->
    <!--user-select: none;-->
  <!--}-->

  <!--.thirdparty-button {-->
    <!--position: absolute;-->
    <!--right: 0;-->
    <!--bottom: 6px;-->
  <!--}-->
<!--}-->
<!--</style>-->
