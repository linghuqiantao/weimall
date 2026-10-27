export default [
    { path: '/', name: 'Home', component: () => import('@/views/front/Home.vue') },
    { path: '/category', name: 'Category', component: () => import('@/views/front/Category.vue') },
    { path: '/product/:id', name: 'ProductDetail', component: () => import('@/views/front/ProductDetail.vue') },
    { path: '/cart', name: 'Cart', component: () => import('@/views/front/Cart.vue') },
    { path: '/user', name: 'User', component: () => import('@/views/front/User.vue'), meta: { requiresAuth: true } },
    { path: '/order/confirm', name: 'OrderConfirm', component: () => import('@/views/front/OrderConfirm.vue'), meta: { requiresAuth: true } }
]