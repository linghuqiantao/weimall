import AdminLayout from '@/components/layout/AdminLayout.vue'

export default [
    { path: '/admin/login', name: 'AdminLogin', component: () => import('@/views/admin/Login.vue') },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAdmin: true },
        children: [
            { path: '', name: 'Dashboard', component: () => import('@/views/admin/Dashboard.vue') },
            { path: 'category', name: 'CategoryManage', component: () => import('@/views/admin/CategoryManage.vue') },
            { path: 'product', name: 'ProductManage', component: () => import('@/views/admin/ProductManage.vue') },
            { path: 'order', name: 'OrderManage', component: () => import('@/views/admin/OrderManage.vue') },
            { path: 'profile', name: 'AdminProfile', component: () => import('@/views/admin/Profile.vue') }
        ]
    }
]