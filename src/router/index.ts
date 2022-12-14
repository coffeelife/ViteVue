import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
]

const router = createRouter({ history, routes })
export default router;