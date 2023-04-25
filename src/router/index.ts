import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/Demo/DemoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import.meta.env.MODE === 'learn' ? DemoView : HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ElectronicWoodfish',
      name: 'ElectronicWoodfish',
      component: () => import('../views/ElectronicWoodfish/Index.vue')
    },
    {
      path: '/Jw3',
      name: 'Jw3',
      component: () => import('../views/Jw3/Index.vue')
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
