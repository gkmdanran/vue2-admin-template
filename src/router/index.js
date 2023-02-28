import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from "js-cookie";
import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    children: [
      {
        path: '',
        name: 'Welcome',
        component: () => import('@/views/Welcome/index.vue'),
      },
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/Demo/index.vue'),
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (Cookies.get('TOKEN')) {
      next()
    } else {
      Message({
        type: 'warning',
        message: '请先登录',
      })
      next({ name: 'Login' })
    }
  }
})
export default router
