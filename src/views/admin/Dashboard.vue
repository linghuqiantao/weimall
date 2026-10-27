<template>
  <div class="dashboard">
    <div class="page-header">
      <h2>仪表盘</h2>
      <span class="page-desc">商城运营概况</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <el-card class="stat-card" :style="{ borderTop: `3px solid ${stat.color}` }">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value" :style="{ color: stat.color }">{{ stat.prefix }}{{ stat.value }}</div>
          <div class="stat-icon">{{ stat.icon }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const productCount = ref(0)
const orderCount = ref(0)
const userCount = ref(0)
const totalSales = ref(0)
const stats = ref([])

onMounted(() => {
  const products = JSON.parse(localStorage.getItem('products') || '[]')
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  productCount.value = products.length
  orderCount.value = orders.length
  userCount.value = users.length
  totalSales.value = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)

  stats.value = [
    { label: '总商品数', value: productCount.value, prefix: '', color: '#409eff', icon: '📦' },
    { label: '总订单数', value: orderCount.value, prefix: '', color: '#67c23a', icon: '📋' },
    { label: '总用户数', value: userCount.value, prefix: '', color: '#e6a23c', icon: '👥' },
    { label: '总销售额', value: totalSales.value, prefix: '¥', color: '#f56c6c', icon: '💰' },
  ]
})
</script>

<style scoped>
.dashboard { padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 22px; color: #303133; margin-bottom: 4px; }
.page-desc { font-size: 13px; color: #909399; }

.stat-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
}
.stat-card:hover { transform: translateY(-3px); }
.stat-label { font-size: 14px; color: #909399; margin-bottom: 8px; }
.stat-value { font-size: 28px; font-weight: bold; }
.stat-icon {
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 36px;
  opacity: 0.15;
}
</style>