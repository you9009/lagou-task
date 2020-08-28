module.exports = {
  mode: 'spa',
  server: {
    host: '0.0.0.0',
    port: 2345
  },
  plugins: ['~/plugins/dayjs.js', '~/plugins/request.js'],
  router: {
    mode: 'hash',
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
                path: '/',
                name: 'home',
                component: resolve(__dirname, 'pages/home/')
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/profile',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/')
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/article',
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
