<template>
  <el-menu
    router
    :default-active="route.path"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409eff"
  >
    <div class="menu-title">导航菜单</div>
    <el-menu-item index="/admin">
      <span class="menu-icon">📊</span>
      <span>仪表盘</span>
    </el-menu-item>
    <el-menu-item index="/admin/category">
      <span class="menu-icon">📂</span>
      <span>分类管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/product">
      <span class="menu-icon">📦</span>
      <span>商品管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/order">
      <span class="menu-icon">📋</span>
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/profile">
      <span class="menu-icon">👤</span>
      <span>个人中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.menu-title {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  padding: 16px 20px 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.menu-icon { margin-right: 8px; }
.el-menu { border-right: none; }
</style>