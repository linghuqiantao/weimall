<template>
  <div class="home">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <span class="shop-name">📖 微商城</span>
      <div class="top-links">
        <router-link to="/category">分类</router-link>
        <router-link to="/cart">购物车</router-link>
        <router-link to="/user">我的</router-link>
      </div>
    </div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#409eff" class="swipe">
      <van-swipe-item v-for="(img, idx) in banners" :key="idx">
        <div class="banner-wrapper">
          <img :src="img" class="banner-img" @error="onBannerError(idx)" />
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类入口 -->
    <div class="section">
      <div class="section-title">商品分类</div>
      <div class="category-grid">
        <div v-for="cat in categories" :key="cat.id" class="cat-item" @click="goCategory(cat.id)">
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <div class="section-title">
        热门推荐
        <span class="section-more" @click="$router.push('/category')">查看更多 &gt;</span>
      </div>
      <div class="product-grid">
        <ProductCard v-for="p in hotProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'

const router = useRouter()
const banners = ref(['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg'])
const categories = ref([])
const hotProducts = ref([])

onMounted(() => {
  categories.value = JSON.parse(localStorage.getItem('categories') || '[]')
  const products = JSON.parse(localStorage.getItem('products') || '[]')
  hotProducts.value = products.sort((a,b) => (b.sales||0) - (a.sales||0)).slice(0, 4)
})

const goCategory = (catId) => {
  router.push({ path: '/category', query: { categoryId: catId } })
}
const onBannerError = () => {
  // 图片加载失败时替换为占位色块
}
</script>

<style scoped>
.home { padding-bottom: 20px; background: #f5f5f5; min-height: 100vh; }

/* 顶部导航 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #409eff, #337ecc);
  color: white;
  position: sticky;
  top: 0;
  z-index: 99;
}
.shop-name { font-size: 18px; font-weight: bold; }
.top-links { display: flex; gap: 16px; }
.top-links a { color: rgba(255,255,255,0.9); text-decoration: none; font-size: 14px; }
.top-links a:hover { color: white; }

/* 轮播图 */
.swipe {
  margin: 0;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.banner-wrapper {
  width: 100%;
  height: 180px;
  background: #e8edf3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 通用区块 */
.section {
  background: white;
  margin: 12px 12px 0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-more { font-size: 12px; color: #909399; cursor: pointer; }
.section-more:hover { color: #409eff; }

/* 分类入口 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.cat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: pointer;
}
.cat-item:hover { background: #f0f5ff; }
.cat-icon { font-size: 28px; }
.cat-name { font-size: 13px; color: #606266; }

/* 商品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
</style>