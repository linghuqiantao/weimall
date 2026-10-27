import request from '@/utils/request'

// ==========================================
// Axios 网络请求（连接真实后端时使用）
// ==========================================
export const fetchCategories = () => request.get('/categories')
export const createCategory = (data) => request.post('/categories', data)
export const editCategory = (id, data) => request.put(`/categories/${id}`, data)
export const removeCategory = (id) => request.delete(`/categories/${id}`)

// ==========================================
// localStorage 模拟接口（当前使用）
// ==========================================
export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = JSON.parse(localStorage.getItem('categories') || '[]')
      resolve(categories)
    }, 100)
  })
}

export const addCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = JSON.parse(localStorage.getItem('categories') || '[]')
      const newCat = { ...category, id: Date.now() }
      categories.push(newCat)
      localStorage.setItem('categories', JSON.stringify(categories))
      resolve(newCat)
    }, 100)
  })
}

export const updateCategory = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let categories = JSON.parse(localStorage.getItem('categories') || '[]')
      const index = categories.findIndex(c => c.id === id)
      if (index !== -1) {
        categories[index] = { ...categories[index], ...data }
        localStorage.setItem('categories', JSON.stringify(categories))
        resolve(categories[index])
      } else {
        resolve(null)
      }
    }, 100)
  })
}

export const deleteCategory = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let categories = JSON.parse(localStorage.getItem('categories') || '[]')
      categories = categories.filter(c => c.id !== id)
      localStorage.setItem('categories', JSON.stringify(categories))
      resolve(true)
    }, 100)
  })
}
