<template>
  <el-container class="admin-layout">
    <el-header>
      <div class="logo">📖 微商城后台管理</div>
      <div class="user-info">
        <span class="admin-name">{{ adminName }}</span>
        <el-button text @click="logout" class="logout-btn">退出登录</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SideMenu from './SideMenu.vue'

const router = useRouter()
const adminName = ref('管理员')

onMounted(() => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    adminName.value = JSON.parse(userInfo).username
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-layout { height: 100vh; }
.el-header {
  background: #2d3a4b;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  z-index: 10;
}
.logo { font-size: 18px; font-weight: bold; letter-spacing: 1px; }
.user-info { display: flex; align-items: center; gap: 16px; }
.admin-name { font-size: 14px; opacity: 0.9; }
.logout-btn { color: rgba(255,255,255,0.7) !important; }
.logout-btn:hover { color: white !important; }

.el-aside { background: #304156; overflow-y: auto; }
.el-main { background: #f0f2f5; padding: 0; }
</style>