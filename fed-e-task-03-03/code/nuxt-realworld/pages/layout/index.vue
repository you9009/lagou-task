<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">You Nuxt Demo</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link class="nav-link" exact to="/">主页</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;创建
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;设置
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="'/profile/'+user.username" class="nav-link">
                <img :src="user.image" alt v-if="user.image" />
                {{user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">登录</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">注册</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- 子路由 -->
    <nuxt-child />

    <!-- 底部 -->
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/">You Nuxt Demo</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapState(['user'])
  }
}
</script>
