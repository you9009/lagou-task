<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in':'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="{messages,field} in errors">
              <li :key="index" v-for="(item,index) in messages">{{field}} {{item}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                placeholder="Your Name"
                required
                type="text"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                placeholder="Email"
                required
                type="email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                minlength="8"
                placeholder="Password"
                required
                type="password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{isLogin ? 'Sign in':'Sign up'}}</button>
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
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user
            })
          : await register({
              user: this.user
            })
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.$router.push('/')
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
    }
  },
  middleware: ['not-auth']
}
</script>
