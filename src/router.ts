import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue' // 首页
import Login from './views/Login.vue' // 登录页
import ColumnDetail from './views/ColumnDetail.vue' // 专栏详情页
import CreatePost from './views/CreatePost.vue' // 创建文章页面
import store from './store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        // 已经登录的话进行重定向
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        // 添加路由元信息
        requiredLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
})
// 全局前置导航守卫 to:即将进入的目标 from:正在离开的路由
router.beforeEach((to, from, next) => {
  // 如果不在登录页面，且用户没有登录
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    // 强制跳转至登录页
    next({
      name: 'login'
    })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    // 如果已登录用户跳转至登录页，那么重定向至首页
    next('/')
  } else {
    next()
  }
})

export default router
