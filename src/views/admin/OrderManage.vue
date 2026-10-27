<template>
  <div class="manage-page">
    <div class="page-header">
      <div>
        <h2>订单管理</h2>
        <span class="page-desc">查看和管理所有订单</span>
      </div>
    </div>

    <el-table :data="orders" border stripe style="width: 100%" empty-text="暂无订单数据">
      <el-table-column prop="id" label="订单号" width="130" align="center" />
      <el-table-column prop="userId" label="用户ID" width="80" align="center" />
      <el-table-column prop="totalAmount" label="金额" width="100" align="center">
        <template #default="{ row }">¥{{ row.totalAmount }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusTag(row.status)" effect="dark" round>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-select v-model="row.status" placeholder="更新状态" size="small" @change="updateStatus(row.id, row.status)">
            <el-option label="待付款" value="待付款" />
            <el-option label="已付款" value="已付款" />
            <el-option label="已发货" value="已发货" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllOrders, updateOrderStatus } from '@/api/order'
import { ElMessage } from 'element-plus'

const orders = ref([])

const loadOrders = async () => {
  orders.value = await getAllOrders()
}
const statusTag = (status) => {
  const map = { '待付款': 'danger', '已付款': 'warning', '已发货': 'primary', '已完成': 'success' }
  return map[status] || 'info'
}
const updateStatus = async (id, newStatus) => {
  await updateOrderStatus(id, newStatus)
  ElMessage.success('订单状态已更新')
}
onMounted(loadOrders)
</script>

<style scoped>
.manage-page { padding: 20px; }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.page-header h2 { font-size: 20px; color: #303133; margin: 0 0 4px; }
.page-desc { font-size: 13px; color: #909399; }
</style>