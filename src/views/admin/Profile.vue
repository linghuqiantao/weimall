<template>
  <div class="manage-page">
    <div class="page-header">
      <div>
        <h2>个人资料</h2>
        <span class="page-desc">查看和修改个人信息</span>
      </div>
    </div>

    <el-card class="profile-card" shadow="never">
      <template #header>
        <div class="profile-header">
          <span class="avatar">👤</span>
          <span class="header-title">{{ form.username }}</span>
        </div>
      </template>
      <el-form :model="form" label-width="80px" style="max-width: 420px;">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" round>保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const form = reactive({ username: '', phone: '', email: '' })

onMounted(() => {
  if (userStore.info) {
    form.username = userStore.info.username
    form.phone = userStore.info.phone || ''
    form.email = userStore.info.email || ''
  }
})
const save = async () => {
  const success = await userStore.updateProfile({ phone: form.phone, email: form.email })
  if (success) ElMessage.success('保存成功')
  else ElMessage.error('保存失败')
}
</script>

<style scoped>
.manage-page { padding: 20px; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 20px; color: #303133; margin: 0 0 4px; }
.page-desc { font-size: 13px; color: #909399; }
.profile-card { max-width: 500px; }
.profile-header { display: flex; align-items: center; gap: 12px; }
.avatar { font-size: 32px; }
.header-title { font-size: 18px; font-weight: 600; color: #303133; }
</style>