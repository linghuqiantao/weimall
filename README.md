# 📖 微商城 (Vue.js 实训项目)

一个基于 **Vue 3 + Vite** 构建的完整电商 Web 应用，包含前台（用户端）和后台（管理端）两部分。使用 `localStorage` 模拟后端数据存储。

## 🚀 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 + Vite | 项目脚手架 |
| Vue Router | 路由管理（前后台路由分离） |
| Pinia | 状态管理（购物车、用户信息、订单） |
| Axios | 网络请求（已配置拦截器，连接真实后端时使用） |
| Element Plus | 后台管理 UI 组件库 |
| Vant 4 | 前台移动端 UI 组件库 |
| localStorage | 本地数据存储（模拟后端 CRUD） |

## 📁 项目结构

```
src/
├── api/                    # API 接口（含 Axios 请求 + localStorage 模拟）
│   ├── product.js
│   ├── category.js
│   ├── cart.js
│   ├── order.js
│   └── user.js
├── assets/images/          # 静态资源
├── components/
│   ├── common/            # 通用组件（ProductCard）
│   └── layout/            # 布局组件（AdminLayout, SideMenu）
├── mock/                   # 初始模拟数据
│   ├── products.js
│   ├── categories.js
│   └── users.js
├── router/                 # 路由配置
│   ├── index.js           # 主路由 + 全局守卫
│   ├── frontRoutes.js     # 前台路由
│   └── adminRoutes.js     # 后台路由
├── stores/                 # Pinia 状态管理
│   ├── cartStore.js
│   ├── userStore.js
│   └── orderStore.js
├── utils/
│   └── request.js         # Axios 实例（拦截器、token 注入）
├── views/
│   ├── front/             # 前台页面
│   │   ├── Home.vue
│   │   ├── Category.vue
│   │   ├── ProductDetail.vue
│   │   ├── Cart.vue
│   │   ├── User.vue
│   │   └── OrderConfirm.vue
│   └── admin/             # 后台页面
│       ├── Login.vue
│       ├── Dashboard.vue
│       ├── CategoryManage.vue
│       ├── ProductManage.vue
│       ├── OrderManage.vue
│       └── Profile.vue
├── App.vue
└── main.js
```

## ✨ 功能清单

### 前台功能（用户端）

| 页面 | 路由 | 功能 |
|------|------|------|
| 首页 | `/` | 轮播图、商品分类入口、热门推荐 |
| 分类页 | `/category` | 商品分类展示，左右联动 |
| 商品详情页 | `/product/:id` | 商品信息展示、加入购物车、立即购买 |
| 购物车页 | `/cart` | 商品列表、数量修改、单选/全选、总价计算 |
| 个人中心 | `/user` | 登录/注册、用户信息、订单入口 |
| 订单确认页 | `/order/confirm` | 收货地址、商品清单、提交订单 |

### 后台功能（管理端）

| 页面 | 路由 | 功能 |
|------|------|------|
| 登录页 | `/admin/login` | 管理员登录验证 |
| 仪表盘 | `/admin` | 数据统计（商品、订单、用户、销售额） |
| 分类管理 | `/admin/category` | 分类的增删改查 |
| 商品管理 | `/admin/product` | 商品的增删改查 |
| 订单管理 | `/admin/order` | 订单列表、状态更新 |
| 个人中心 | `/admin/profile` | 管理员信息修改 |

## 🛠️ 快速开始

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 🔐 测试账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | `admin` | `123456` |
| 普通用户 | `user1` | `123456` |

## 📋 实训要求覆盖

- ✅ Vue 3 + Vite 脚手架搭建
- ✅ Vue Router 前后台路由分离 + 路由守卫
- ✅ Pinia 状态管理（购物车、用户、订单）
- ✅ Axios 网络请求配置（含拦截器）
- ✅ Element Plus 后台 UI + Vant 前台 UI
- ✅ localStorage 数据持久化
- ✅ 前后台分离的开发模式
- ✅ 移动端适配（前台 ≤ 750px）+ PC 端适配（后台 ≥ 1200px）
