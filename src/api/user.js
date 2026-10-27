import request from '@/utils/request'

// ==========================================
// Axios 网络请求（连接真实后端时使用）
// ==========================================
export const loginApi = (data) => request.post('/auth/login', data)
export const registerApi = (data) => request.post('/auth/register', data)
export const updateProfileApi = (id, data) => request.put(`/users/${id}`, data)

// ==========================================
// localStorage 模拟接口（当前使用）
// ==========================================
export const login = (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.username === username && u.password === password)
      if (user) {
        const { password, ...safeUser } = user
        resolve({ success: true, user: safeUser, token: 'mock-token-' + Date.now() })
      } else {
        resolve({ success: false, message: '用户名或密码错误' })
      }
    }, 300)
  })
}

export const register = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.username === userData.username)) {
        resolve({ success: false, message: '用户名已存在' })
      } else {
        const newUser = { ...userData, id: Date.now(), role: 'user' }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        const { password, ...safeUser } = newUser
        resolve({ success: true, user: safeUser })
      }
    }, 300)
  })
}

export const updateUserProfile = (userId, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem('users') || '[]')
      const index = users.findIndex(u => u.id === userId)
      if (index !== -1) {
        users[index] = { ...users[index], ...data }
        localStorage.setItem('users', JSON.stringify(users))
        const { password, ...safeUser } = users[index]
        resolve({ success: true, user: safeUser })
      } else {
        resolve({ success: false })
      }
    }, 300)
  })
}
