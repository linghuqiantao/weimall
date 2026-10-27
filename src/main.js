import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import { products } from './mock/products'
import { categories } from './mock/categories'
import { users } from './mock/users'

// 初始化本地存储
function initLocalStorage() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products))
    }
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(categories))
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users))
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]))
    }
}
initLocalStorage()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Vant)
app.mount('#app')