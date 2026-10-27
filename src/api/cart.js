import request from '@/utils/request'

// ==========================================
// Axios 网络请求（连接真实后端时使用）
// ==========================================
export const submitCheckout = (items) => request.post('/orders/checkout', { items })

// ==========================================
// localStorage 模拟接口（当前使用）
// ==========================================
export const checkout = (items) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, orderId: Date.now() })
    }, 500)
  })
}
