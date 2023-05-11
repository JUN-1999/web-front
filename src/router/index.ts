import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useTreeHoleUserStore } from '@/stores/ThreeHoleUser'

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
    {
      path: '/ScrollingTimeline',
      name: 'ScrollingTimeline',
      component: () => import('../views/ScrollingTimeline/Index.vue')
    },
    {
      path: '/TreeHole',
      name: 'TreeHole',
      redirect: '/TreeHole/index',
      children: [
        { path: 'index', name: 'index', component: () => import('@/views/TreeHole/Index/IndexView.vue') },
        { path: 'login', name: 'login', component: () => import('@/views/TreeHole/Login/IndexView.vue') }
      ]
    },
    { path: '/:catchAll(.*)', redirect: '/' }
  ]
})

router.beforeEach((to, from) => {
  // 判断进入树洞是否登录（token是否有值）
  if (to.path.includes('TreeHole') && to.path != '/TreeHole/login') {
    const { token } = useTreeHoleUserStore();
    if (!token) {
      return '/TreeHole/login'
    } else {
      return true
    }
  }

})

export default router
