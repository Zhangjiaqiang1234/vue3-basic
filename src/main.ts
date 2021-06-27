import { createApp } from 'vue'
// vue 路由配置
import App from './App.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory, // 路由模式，使用 history 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('./views/ColumnDetail.vue')
    }
  ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
