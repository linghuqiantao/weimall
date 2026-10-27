<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
    <div class="cart-list">
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="cart-item"
      >
        <!-- 自定义勾选按钮 -->
        <div class="check-btn" @click="toggleItem(item.id)">
          <span v-if="item.selected" class="check-icon checked">✓</span>
          <span v-else class="check-icon unchecked"></span>
        </div>
        <!-- 商品图片 -->
        <div class="item-img-wrapper">
          <img :src="item.image" class="item-img" />
        </div>
        <!-- 商品信息 -->
        <div class="item-detail">
          <div class="name">{{ item.name }}</div>
          <div class="price">¥{{ item.price }}</div>
          <van-stepper
            :model-value="item.quantity"
            :min="1"
            @change="(qty) => updateQty(item.id, qty)"
          />
        </div>
        <!-- 删除按钮 -->
        <van-icon name="delete" class="delete-icon" @click="deleteItem(item.id)" />
      </div>
      <van-empty v-if="cartStore.items.length === 0" description="购物车空空如也" />
    </div>

    <!-- 底部结算栏 -->
    <div class="cart-footer" v-if="cartStore.items.length > 0">
      <div class="footer-check" @click="toggleAll(!cartStore.isAllSelected)">
        <span v-if="cartStore.isAllSelected" class="check-icon checked">✓</span>
        <span v-else class="check-icon unchecked"></span>
        <span class="check-label">全选</span>
      </div>
      <div class="total">
        <span class="total-label">合计：</span>
        <span class="total-amount">¥{{ cartStore.selectedTotal }}</span>
      </div>
      <van-button type="danger" round @click="toCheckout">去结算</van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const toggleItem = (id) => {
  cartStore.toggleSelect(id)
}
const toggleAll = (val) => {
  cartStore.toggleSelectAll(val)
}
const updateQty = (id, qty) => {
  cartStore.updateQuantity(id, qty)
}
const deleteItem = (id) => {
  cartStore.removeItem(id)
}
const toCheckout = () => {
  router.push('/order/confirm')
}
</script>

<style scoped>
.cart { background: #f5f5f5; min-height: 100vh; }
.cart-list { margin-top: 46px; padding: 10px; padding-bottom: 70px; }

/* 购物车单项 */
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
}

/* ---------- 自定义勾选按钮 ---------- */
.check-btn {
  flex-shrink: 0;
  cursor: pointer;
  padding: 4px;
}
.check-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #dcdfe6;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s;
}
.check-icon.unchecked {
  background: white;
  border-color: #dcdfe6;
}
.check-icon.checked {
  background: #f56c6c;
  border-color: #f56c6c;
  color: white;
}

/* 商品图片 */
.item-img-wrapper {
  width: 80px;
  height: 80px;
  background: #f7f8fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.item-img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }

/* 商品详情 */
.item-detail { flex: 1; min-width: 0; }
.name {
  font-weight: 500;
  font-size: 14px;
  color: #303133;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price { color: #f56c6c; font-size: 15px; font-weight: 600; margin-bottom: 8px; }

/* 删除 */
.delete-icon {
  font-size: 20px;
  color: #c0c4cc;
  flex-shrink: 0;
  cursor: pointer;
}
.delete-icon:hover { color: #f56c6c; }

/* ---------- 底部结算栏 ---------- */
.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 750px;
  margin: 0 auto;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
  gap: 12px;
}
.footer-check {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}
.check-label { font-size: 14px; color: #303133; }
.total { flex: 1; text-align: right; }
.total-label { font-size: 14px; color: #606266; }
.total-amount { font-size: 20px; color: #f56c6c; font-weight: bold; }
</style>