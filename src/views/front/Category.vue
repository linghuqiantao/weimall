<template>
  <div class="category-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="商品分类" left-arrow @click-left="$router.push('/')" />

    <div class="category-content">
      <van-sidebar v-model="activeKey" class="sidebar">
        <van-sidebar-item v-for="cat in categories" :key="cat.id" :title="cat.name" />
      </van-sidebar>
      <div class="product-list" v-if="currentProducts.length">
        <ProductCard v-for="p in currentProducts" :key="p.id" :product="p" />
      </div>
      <div class="empty-state" v-else>
        <van-empty description="该分类暂无商品" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'

const route = useRoute()
const categories = ref([])
const products = ref([])
const activeKey = ref(0)

const currentProducts = computed(() => {
  const catId = categories.value[activeKey.value]?.id
  if (!catId) return []
  return products.value.filter(p => p.categoryId === catId)
})

onMounted(() => {
  categories.value = JSON.parse(localStorage.getItem('categories') || '[]')
  products.value = JSON.parse(localStorage.getItem('products') || '[]')
  // 如果有路由参数指定分类，可设置激活索引
  const catId = parseInt(route.query.categoryId)
  if (catId) {
    const index = categories.value.findIndex(c => c.id === catId)
    if (index !== -1) activeKey.value = index
  }
})
</script>

<style scoped>
.category-page { background: #f5f5f5; min-height: 100vh; }
.category-content { display: flex; min-height: calc(100vh - 46px); }
.sidebar { width: 90px; }
.product-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  align-content: start;
}
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>