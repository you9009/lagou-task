module.exports = {
  server: {
    port: 3456
  },
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除基于pages目录默认生成的路由表规则
      routes.splice(0)
      // 自定义路由
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '',
                name: 'HomeIndex',
                component: resolve(__dirname, 'pages/home/')
              },
              {
                path: '/login',
                name: 'LoginIndex',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/register',
                name: 'RegisterIndex',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/settings',
                name: 'SettingsIndex',
                component: resolve(__dirname, 'pages/settings/')
              },
              {
                path: '/editor',
                name: 'EditArticle',
                component: resolve(__dirname, 'pages/create/')
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ]
      )
    }
  }
}
