import request from '@/utils/request'

// ==========================================
// Axios 网络请求（连接真实后端时使用）
// 用法示例：const products = await getProducts()
// ==========================================
export const fetchProducts = () => request.get('/products')
export const fetchProductById = (id) => request.get(`/products/${id}`)
export const createProduct = (data) => request.post('/products', data)
export const editProduct = (id, data) => request.put(`/products/${id}`, data)
export const removeProduct = (id) => request.delete(`/products/${id}`)

// ==========================================
// localStorage 模拟接口（当前使用）
// ==========================================
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      resolve(products)
    }, 100)
  })
}

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const product = products.find(p => p.id === id)
      resolve(product)
    }, 100)
  })
}

export const addProduct = (product) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const newProduct = { ...product, id: Date.now() }
      products.push(newProduct)
      localStorage.setItem('products', JSON.stringify(products))
      resolve(newProduct)
    }, 100)
  })
}

export const updateProduct = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products') || '[]')
      const index = products.findIndex(p => p.id === id)
      if (index !== -1) {
        products[index] = { ...products[index], ...data }
        localStorage.setItem('products', JSON.stringify(products))
        resolve(products[index])
      } else {
        resolve(null)
      }
    }, 100)
  })
}

export const deleteProduct = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let products = JSON.parse(localStorage.getItem('products') || '[]')
      products = products.filter(p => p.id !== id)
      localStorage.setItem('products', JSON.stringify(products))
      resolve(true)
    }, 100)
  })
}
