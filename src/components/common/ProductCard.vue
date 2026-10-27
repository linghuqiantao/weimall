<template>
  <div class="product-card" @click="goDetail">
    <div class="img-wrapper">
      <img :src="product.image" class="product-img" @error="defaultImage" />
    </div>
    <div class="card-body">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">¥{{ product.price }}</div>
      <div class="product-meta">
        <span class="product-sales">已售 {{ product.sales || 0 }}</span>
        <button class="add-cart" @click.stop="addToCart">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { ElMessage } from 'element-plus'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({ id: 0, name: '', price: 0, image: '', sales: 0 })
  }
})

const router = useRouter()
const cartStore = useCartStore()

const goDetail = () => {
  router.push(`/product/${props.product.id}`)
}
const addToCart = () => {
  cartStore.addItem(props.product, 1)
  ElMessage.success('已加入购物车')
}
const defaultImage = (e) => {
  e.target.src = '/images/default.jpg'
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

/* 图片容器：固定比例，等比例显示 */
.img-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f7f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
  transition: transform 0.3s;
}
.product-card:hover .product-img {
  transform: scale(1.05);
}

.card-body {
  padding: 10px 10px 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.product-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
}
.product-price {
  color: #f56c6c;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}
.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.product-sales {
  font-size: 11px;
  color: #909399;
}
.add-cart {
  background: linear-gradient(135deg, #409eff, #337ecc);
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.add-cart:hover {
  transform: scale(1.15);
}
</style>