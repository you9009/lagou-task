import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c54e886 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _24ac8e32 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _711d8076 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _78e60b76 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _351b73f6 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _b93f9ce2 = () => interopDefault(import('../pages/create' /* webpackChunkName: "" */))
const _5fb04ec3 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _9c54e886,
    children: [{
      path: "",
      component: _24ac8e32,
      name: "HomeIndex"
    }, {
      path: "/login",
      component: _711d8076,
      name: "LoginIndex"
    }, {
      path: "/register",
      component: _711d8076,
      name: "RegisterIndex"
    }, {
      path: "/profile/:username",
      component: _78e60b76,
      name: "profile"
    }, {
      path: "/settings",
      component: _351b73f6,
      name: "SettingsIndex"
    }, {
      path: "/editor",
      component: _b93f9ce2,
      name: "EditArticle"
    }, {
      path: "/article/:slug",
      component: _5fb04ec3,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
