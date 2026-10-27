import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, updateUserProfile } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        info: null,
        token: null
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        isAdmin: (state) => state.info?.role === 'admin'
    },
    actions: {
        async login(username, password) {
            const res = await apiLogin(username, password)
            if (res.success) {
                this.info = res.user
                this.token = res.token
                localStorage.setItem('token', this.token)
                localStorage.setItem('userInfo', JSON.stringify(this.info))
                return true
            }
            return false
        },
        logout() {
            this.info = null
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
        async register(userData) {
            const res = await apiRegister(userData)
            if (res.success) {
                return true
            }
            return false
        },
        async updateProfile(data) {
            if (!this.info) return false
            const res = await updateUserProfile(this.info.id, data)
            if (res.success) {
                this.info = res.user
                localStorage.setItem('userInfo', JSON.stringify(this.info))
                return true
            }
            return false
        },
        loadFromLocal() {
            const token = localStorage.getItem('token')
            const userInfo = localStorage.getItem('userInfo')
            if (token && userInfo) {
                this.token = token
                this.info = JSON.parse(userInfo)
            }
        }
    }
})