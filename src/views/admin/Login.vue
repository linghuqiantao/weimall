<template>
  <div class="admin-login">
    <div class="login-bg"></div>
    <el-card class="login-card" shadow="xl">
      <template #header>
        <div class="card-header">
          <div class="header-icon">📖</div>
          <div class="header-title">后台管理系统</div>
          <div class="header-desc">请使用管理员账号登录</div>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="handleLogin">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            :prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="密码"
            :prefix-icon="Lock"
            size="large"
            clearable
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" size="large" class="login-btn">登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="tip">测试账号：admin / 123456</div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  try {
    await formRef.value.validate()
  } catch {
    return
  }
  const success = await userStore.login(form.username, form.password)
  if (success && userStore.isAdmin) {
    ElMessage.success('登录成功')
    router.push('/admin')
  } else {
    ElMessage.error('用户名或密码错误，或非管理员账号')
  }
}
</script>

<style scoped>
.admin-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;
  position: relative;
  overflow: hidden;
}
.login-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, #2d3a4b 0%, #409eff 50%, #2d3a4b 100%);
  animation: gradient 15s ease infinite;
  opacity: 0.3;
}
@keyframes gradient {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
.login-card {
  width: 400px;
  position: relative;
  border-radius: 12px;
}
.card-header {
  text-align: center;
  padding: 12px 0;
}
.header-icon { font-size: 48px; margin-bottom: 8px; }
.header-title { font-size: 22px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.header-desc { font-size: 13px; color: #909399; }
.login-btn { width: 100%; }
.tip { text-align: center; color: #909399; font-size: 12px; margin-top: 8px; }
</style>