import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser'
import type { IUserInfo } from '@/type/TreeHole/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/ElectronicWoodfish',
      name: 'ElectronicWoodfish',
      component: () => import('@/views/ElectronicWoodfish/Index.vue')
    },
    {
      path: '/Jw3',
      name: 'Jw3',
      component: () => import('@/views/Jw3/Index.vue')
    },
    {
      path: '/ScrollingTimeline',
      name: 'ScrollingTimeline',
      component: () => import('@/views/ScrollingTimeline/Index.vue')
    },
    {
      path: '/TreeHole',
      name: 'TreeHole',
      redirect: '/TreeHole/TreeHoleIndex/TreeHoleHome',
      children: [
        {
          path: 'TreeHoleIndex',
          name: 'TreeHoleIndex',
          redirect: '/TreeHole/TreeHoleIndex/TreeHoleHome',
          component: () => import('@/views/TreeHole/Index/IndexView.vue'),
          children: [
            {
              path: 'TreeHoleHome',
              name: 'TreeHoleHome',
              component: () => import('@/views/TreeHole/Index/Home/HomeView.vue'),
            },
            {
              path: 'ArticleEdit/:id',
              name: 'ArticleEdit',
              component: () => import('@/views/TreeHole/Index/ArticleEdit/IndexView.vue'),
            }, {
              path: 'ArticleDetail/:id',
              name: 'ArticleDetail',
              component: () => import('@/views/TreeHole/Index/ArticleDetail/IndexView.vue')
            },
            {
              path: 'TreeUser',
              name: 'TreeUser',
              component: () => import('@/views/TreeHole/Index/User/IndexView.vue')
            },
            {
              path: 'TreeGame',
              name: 'TreeGame',
              component: () => import('@/views/TreeHole/Index/Game/IndexView.vue')
            }
          ]
        },
        { path: 'login', name: 'login', component: () => import('@/views/TreeHole/Login/IndexView.vue') }
      ]
    },
    { path: '/:catchAll(.*)', redirect: '/' }
  ]
})

router.beforeEach((to, from) => {

  // 判断进入树洞是否登录（token是否有值）
  if (to.path.includes('TreeHole') && to.path != '/TreeHole/login') {

    let { token } = useTreeHoleUserStore();
    const { setToken, setUserInfo, setFollow } = useTreeHoleUserStore();

    if (!token) {
      token = localStorage.getItem('token') as string;
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string) as IUserInfo;
      const follow = JSON.parse(localStorage.getItem('follow') as string) as any[];
      setToken(token)
      setUserInfo(userInfo)
      setFollow(follow)

    }
    if (!token) {
      return '/TreeHole/login'
    } else {
      return true
    }
  }

})

export default router
