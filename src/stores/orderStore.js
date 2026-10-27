import { defineStore } from 'pinia'
import { createOrder, getOrders, updateOrderStatus } from '@/api/order'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: []
    }),
    actions: {
        async createOrder(orderData) {
            const newOrder = await createOrder(orderData)
            this.orders.unshift(newOrder)
            return newOrder
        },
        async fetchOrders(userId) {
            const orders = await getOrders(userId)
            this.orders = orders
        },
        async updateStatus(orderId, status) {
            const updated = await updateOrderStatus(orderId, status)
            if (updated) {
                const index = this.orders.findIndex(o => o.id === orderId)
                if (index !== -1) this.orders[index] = updated
            }
        }
    }
})