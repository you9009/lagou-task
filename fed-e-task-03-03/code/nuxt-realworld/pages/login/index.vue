<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href>Need an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="(item, index) in errMsg" :key="index">
              <p v-for="(v, i) in item" :key="i">{{index}} {{v}}</p>
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{isLogin?'Sign in':'Sign up'}}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/utils/api'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  data() {
    return {
      user: {
        username: '',
        email: 'you9009@foxmail.com',
        password: 'ziyou85630',
      },
      errMsg: {},
    }
  },
  computed: {
    isLogin() {
      return this.$route.name == 'LoginIndex'
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            })

        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.$router.push('/')
      } catch (err) {
        this.errMsg = err.response.data.errors
      }
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
