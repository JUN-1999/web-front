import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    { path: '/:catchAll(.*)', redirect: '/' }
  ]
})

export default router
