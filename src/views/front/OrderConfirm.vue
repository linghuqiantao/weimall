<template>
  <div class="order-confirm">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.back()" />
    <div class="content">
      <!-- 收货地址 -->
      <van-cell-group inset class="section">
        <template #title>
          <div class="section-label">📍 收货地址</div>
        </template>
        <van-cell
          :value="address ? `${address.name} ${address.phone}` : '请选择收货地址'"
          :label="address?.address"
          is-link
          @click="showAddress = true"
          value-class="address-value"
        />
      </van-cell-group>

      <!-- 商品清单 -->
      <van-cell-group inset class="section">
        <template #title>
          <div class="section-label">📦 商品清单</div>
        </template>
        <van-cell v-for="item in cartStore.selectedItems" :key="item.id" class="order-item-cell">
          <template #title>
            <div class="order-item">
              <div class="item-img-wrapper">
                <img :src="item.image" class="item-img" />
              </div>
              <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-price">¥{{ item.price }}</div>
                <div class="item-qty">x {{ item.quantity }}</div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 金额总计 -->
      <div class="total-section">
        <span class="total-label">实付金额</span>
        <span class="total-amount">¥{{ cartStore.selectedTotal }}</span>
      </div>

      <!-- 提交按钮 -->
      <div class="submit-wrap">
        <van-button type="danger" block round size="large" @click="submitOrder">
          提交订单 · ¥{{ cartStore.selectedTotal }}
        </van-button>
      </div>
    </div>

    <!-- 地址选择弹窗 -->
    <van-action-sheet v-model:show="showAddress" title="选择收货地址">
      <div class="address-list">
        <van-radio-group v-model="selectedAddressId">
          <van-cell v-for="addr in addressList" :key="addr.id" clickable @click="selectedAddressId = addr.id">
            <template #title>
              <div class="addr-name">{{ addr.name }} {{ addr.phone }}</div>
              <div class="addr-detail">{{ addr.address }}</div>
            </template>
            <template #right-icon>
              <van-radio :name="addr.id" />
            </template>
          </van-cell>
        </van-radio-group>
        <div class="address-confirm">
          <van-button type="primary" block round @click="confirmAddress">确认地址</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { useOrderStore } from '@/stores/orderStore'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const orderStore = useOrderStore()

const showAddress = ref(false)
const addressList = ref([
  { id: 1, name: '张三', phone: '13800000000', address: '北京市朝阳区xxx街道xxx号' }
])
const selectedAddressId = ref(1)
const address = ref(addressList.value[0])

const confirmAddress = () => {
  address.value = addressList.value.find(a => a.id === selectedAddressId.value)
  showAddress.value = false
}

const submitOrder = async () => {
  if (!address.value) {
    ElMessage.warning('请选择收货地址')
    return
  }
  if (cartStore.selectedItems.length === 0) {
    ElMessage.warning('请选择商品')
    return
  }
  const orderData = {
    userId: userStore.info.id,
    address: address.value,
    items: cartStore.selectedItems.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
    totalAmount: cartStore.selectedTotal,
    createTime: new Date().toISOString()
  }
  await orderStore.createOrder(orderData)
  cartStore.clearSelected()
  ElMessage.success('订单已提交')
  router.push('/user')
}
</script>

<style scoped>
.order-confirm { background: #f5f5f5; min-height: 100vh; }
.content { padding: 56px 12px 20px; }

/* 区块 */
.section { margin-bottom: 12px; border-radius: 12px !important; overflow: hidden; }
.section-label { font-size: 14px; font-weight: 600; color: #303133; padding: 4px 0; }
.address-value { flex: 1; }

/* 商品列表 */
.order-item-cell { padding: 4px 0; }
.order-item { display: flex; gap: 12px; align-items: center; }
.item-img-wrapper {
  width: 64px;
  height: 64px;
  background: #f7f8fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.item-img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }
.item-info { flex: 1; }
.item-name { font-size: 14px; font-weight: 500; color: #303133; margin-bottom: 4px; }
.item-price { font-size: 14px; color: #f56c6c; font-weight: 600; display: inline; }
.item-qty { font-size: 13px; color: #909399; display: inline; margin-left: 6px; }

/* 总计 */
.total-section {
  background: white;
  margin: 0 0 12px;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.total-label { font-size: 15px; color: #303133; }
.total-amount { font-size: 22px; color: #f56c6c; font-weight: bold; }

.submit-wrap { padding: 8px 0 20px; }

/* 地址选择 */
.address-list { padding: 16px; }
.addr-name { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
.addr-detail { font-size: 13px; color: #909399; }
.address-confirm { padding: 16px 0 24px; }
</style>