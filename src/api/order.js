import request from '@/utils/request'

// ==========================================
// Axios 网络请求（连接真实后端时使用）
// ==========================================
export const fetchOrders = (userId) => request.get(`/orders?userId=${userId}`)
export const fetchAllOrders = () => request.get('/orders')
export const placeOrder = (data) => request.post('/orders', data)
export const patchOrderStatus = (id, status) => request.patch(`/orders/${id}/status`, { status })

// ==========================================
// localStorage 模拟接口（当前使用）
// ==========================================
export const createOrder = (order) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const newOrder = { ...order, id: Date.now(), createTime: new Date().toISOString(), status: '待付款' }
      orders.push(newOrder)
      localStorage.setItem('orders', JSON.stringify(orders))
      resolve(newOrder)
    }, 300)
  })
}

export const getOrders = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const userOrders = orders.filter(o => o.userId === userId)
      resolve(userOrders)
    }, 100)
  })
}

export const updateOrderStatus = (orderId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const index = orders.findIndex(o => o.id === orderId)
      if (index !== -1) {
        orders[index].status = status
        localStorage.setItem('orders', JSON.stringify(orders))
        resolve(orders[index])
      } else {
        resolve(null)
      }
    }, 300)
  })
}

export const getAllOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      resolve(orders)
    }, 100)
  })
}
