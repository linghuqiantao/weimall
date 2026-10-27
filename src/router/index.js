import { createRouter, createWebHistory } from 'vue-router'
import frontRoutes from './frontRoutes'
import adminRoutes from './adminRoutes'

const routes = [
    ...frontRoutes,
    ...adminRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from) => {
    const token = localStorage.getItem('token')
    const userInfo = localStorage.getItem('userInfo')
    const isLoggedIn = !!token && !!userInfo
    const user = userInfo ? JSON.parse(userInfo) : null

    // 前台需要登录的页面
    if (to.meta.requiresAuth && !isLoggedIn) {
        return '/user'  // 重定向到个人中心（未登录会显示登录组件）
    }
    // 后台需要管理员权限
    if (to.meta.requiresAdmin) {
        if (!isLoggedIn) return '/admin/login'
        if (user?.role !== 'admin') return '/'
    }
    return true
})

export default router