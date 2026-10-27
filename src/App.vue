<template>
  <div :class="$route.path.includes('/admin') ? 'admin-app' : 'front-app'">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'

onMounted(() => {
  // 从 localStorage 恢复购物车和用户登录状态
  const cartStore = useCartStore()
  const userStore = useUserStore()
  cartStore.loadFromLocal()
  userStore.loadFromLocal()
})
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f5f5f5; }
.front-app { max-width: 750px; margin: 0 auto; background: #f5f5f5; min-height: 100vh; }
.admin-app { min-width: 1200px; background: #f0f2f5; }
</style>