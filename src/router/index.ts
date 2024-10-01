import LayoutIndex from '@/components/LayoutIndex.vue'
import { createRouter, createWebHistory } from 'vue-router'

/**
 * 静态路由，与权限无关，所有用户都可以访问
 * hidden: true，不显示在菜单中
 * alwaysShow: true，默认当子路由只有一个时，只显示子菜单，当 alwayShow 设为 true时，永远显示该菜单
 * meta.breadcrumb = false 表示该菜单的标题不显示在面包屑中
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404Page.vue'),
    hidden: true
  },
  {
    path: '/',
    component: LayoutIndex,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/WelcomePage.vue')
      },
      {
        path: '/routeSearch',
        component: () => import('@/views/RoutePlanningSearch.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(), // 如果使用哈希模式，可以用 createWebHashHistory()
  routes: constantRoutes
})

export default router
