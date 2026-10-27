<template>
  <div class="detail-page" v-if="product">
    <!-- 顶部导航 -->
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" />

    <!-- 商品图片 -->
    <div class="detail-img-wrapper">
      <img :src="product.image" class="detail-img" @error="defaultImage" />
    </div>

    <!-- 商品信息 -->
    <div class="detail-info">
      <h2 class="detail-name">{{ product.name }}</h2>
      <div class="detail-price-row">
        <span class="detail-price">¥{{ product.price }}</span>
        <span class="detail-sales">已售 {{ product.sales || 0 }}</span>
      </div>
      <div class="detail-desc">{{ product.description }}</div>
      <div class="detail-stock">库存：{{ product.stock }}</div>
    </div>

    <!-- 购买操作 -->
    <div class="detail-actions">
      <div class="qty-selector">
        <span class="qty-label">数量：</span>
        <van-stepper v-model="quantity" min="1" :max="product.stock" />
      </div>
      <div class="action-btns">
        <van-button type="warning" round block @click="addToCart">加入购物车</van-button>
        <van-button type="danger" round block @click="buyNow">立即购买</van-button>
      </div>
    </div>
  </div>
  <van-empty v-else description="商品不存在" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref(null)
const quantity = ref(1)

onMounted(() => {
  const id = parseInt(route.params.id)
  const products = JSON.parse(localStorage.getItem('products') || '[]')
  product.value = products.find(p => p.id === id)
})

const addToCart = () => {
  cartStore.addItem(product.value, quantity.value)
  ElMessage.success('已加入购物车')
}
const buyNow = () => {
  cartStore.addItem(product.value, quantity.value)
  router.push('/cart')
}
const defaultImage = (e) => {
  e.target.src = '/images/default.jpg'
}
</script>

<style scoped>
.detail-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 20px; }

/* 图片区域 */
.detail-img-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
}

/* 商品信息 */
.detail-info {
  background: white;
  margin: 10px 12px;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.detail-name { font-size: 18px; font-weight: 600; color: #303133; margin-bottom: 10px; line-height: 1.4; }
.detail-price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.detail-price { color: #f56c6c; font-size: 26px; font-weight: bold; }
.detail-sales { font-size: 13px; color: #909399; }
.detail-desc { font-size: 14px; color: #606266; line-height: 1.7; padding: 12px 0; border-top: 1px solid #f0f0f0; margin-bottom: 8px; }
.detail-stock { font-size: 13px; color: #909399; }

/* 购买操作 */
.detail-actions {
  background: white;
  margin: 0 12px;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.qty-selector {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.qty-label { font-size: 14px; color: #606266; margin-right: 8px; }
.action-btns { display: flex; gap: 12px; }
</style>