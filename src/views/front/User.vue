<template>
  <div class="user">
    <van-nav-bar title="个人中心" fixed />
    <div class="user-content" v-if="!userStore.isLoggedIn">
      <!-- 登录头部 -->
      <div class="login-header">
        <div class="avatar-placeholder">👤</div>
        <div class="welcome-text">欢迎登录微商城</div>
      </div>
      <van-cell-group inset class="login-form">
        <van-field v-model="loginForm.username" label="用户名" placeholder="请输入用户名" clearable />
        <van-field v-model="loginForm.password" type="password" label="密码" placeholder="请输入密码" clearable />
        <div class="login-btn-wrap">
          <van-button type="primary" block round @click="handleLogin">登录</van-button>
        </div>
        <div class="register-link">
          <span @click="showRegister = true">没有账号？立即注册</span>
        </div>
      </van-cell-group>
    </div>

    <!-- 已登录 -->
    <div v-else class="user-content">
      <div class="user-header">
        <div class="avatar-large">👤</div>
        <div class="user-welcome">
          <div class="user-name">{{ userStore.info?.username }}</div>
          <div class="user-tag">普通用户</div>
        </div>
      </div>

      <van-cell-group inset class="info-section">
        <van-cell title="用户名" :value="userStore.info?.username" />
        <van-cell title="手机号" :value="userStore.info?.phone || '未绑定'" />
        <van-cell title="邮箱" :value="userStore.info?.email || '未绑定'" />
      </van-cell-group>

      <van-cell-group inset class="info-section">
        <van-cell title="我的订单" is-link to="/order/confirm" icon="orders-o" />
      </van-cell-group>

      <div class="logout-wrap">
        <van-button type="danger" block round @click="logout">退出登录</van-button>
      </div>
    </div>

    <!-- 注册弹窗 -->
    <van-popup v-model:show="showRegister" position="bottom" round :style="{ minHeight: '50%' }">
      <div class="register-form">
        <h3>用户注册</h3>
        <van-field v-model="registerForm.username" label="用户名" placeholder="请输入用户名" clearable />
        <van-field v-model="registerForm.password" type="password" label="密码" placeholder="请输入密码" clearable />
        <van-field v-model="registerForm.phone" label="手机号" placeholder="请输入手机号" clearable />
        <van-field v-model="registerForm.email" label="邮箱" placeholder="请输入邮箱" clearable />
        <div class="register-btn-wrap">
          <van-button type="primary" block round @click="handleRegister">注册</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const showRegister = ref(false)

const loginForm = reactive({ username: '', password: '' })
const registerForm = reactive({ username: '', password: '', phone: '', email: '' })

const handleLogin = async () => {
  const success = await userStore.login(loginForm.username, loginForm.password)
  if (success) {
    ElMessage.success('登录成功')
  } else {
    ElMessage.error('用户名或密码错误')
  }
}
const logout = () => {
  userStore.logout()
  ElMessage.success('已退出')
}
const handleRegister = async () => {
  if (!registerForm.username || !registerForm.password) {
    ElMessage.warning('用户名和密码不能为空')
    return
  }
  const success = await userStore.register(registerForm)
  if (success) {
    ElMessage.success('注册成功，请登录')
    showRegister.value = false
  } else {
    ElMessage.error('用户名已存在')
  }
}
</script>

<style scoped>
.user { background: #f5f5f5; min-height: 100vh; }
.user-content {
  padding: 56px 16px 20px;
}

/* 登录页头部 */
.login-header {
  text-align: center;
  padding: 40px 0 24px;
}
.avatar-placeholder {
  font-size: 64px;
  margin-bottom: 12px;
}
.welcome-text {
  font-size: 18px;
  color: #303133;
  font-weight: 500;
}
.login-form { border-radius: 12px; }
.login-btn-wrap { padding: 16px 16px 0; }
.register-link { text-align: center; margin: 16px 0; color: #409eff; cursor: pointer; font-size: 14px; }

/* 已登录头部 */
.user-header {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #409eff, #337ecc);
  color: white;
  margin: -56px -16px 16px;
  padding: 80px 20px 24px;
}
.avatar-large { font-size: 48px; }
.user-name { font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.user-tag { font-size: 12px; opacity: 0.8; background: rgba(255,255,255,0.2); display: inline-block; padding: 2px 10px; border-radius: 10px; }

/* 信息区域 */
.info-section { margin-bottom: 12px; border-radius: 12px !important; overflow: hidden; }

/* 退出按钮 */
.logout-wrap { padding: 20px 0; }

/* 注册表单 */
.register-form { padding: 24px; }
.register-form h3 { text-align: center; margin-bottom: 20px; font-size: 18px; color: #303133; }
.register-btn-wrap { padding: 16px; }
</style>