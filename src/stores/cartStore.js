import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []  // { id, name, price, quantity, image, selected }
    }),
    getters: {
        totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        selectedTotal: (state) => state.items.filter(i => i.selected).reduce((sum, i) => sum + i.price * i.quantity, 0),
        selectedCount: (state) => state.items.filter(i => i.selected).reduce((sum, i) => sum + i.quantity, 0),
        isAllSelected: (state) => state.items.length > 0 && state.items.every(i => i.selected),
        selectedItems: (state) => state.items.filter(i => i.selected)
    },
    actions: {
        addItem(product, quantity = 1) {
            const exist = this.items.find(i => i.id === product.id)
            if (exist) {
                exist.quantity += quantity
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.image,
                    selected: true
                })
            }
            this.saveToLocal()
        },
        updateQuantity(id, quantity) {
            const item = this.items.find(i => i.id === id)
            if (item) {
                if (quantity <= 0) {
                    this.removeItem(id)
                } else {
                    item.quantity = quantity
                }
            }
            this.saveToLocal()
        },
        removeItem(id) {
            this.items = this.items.filter(i => i.id !== id)
            this.saveToLocal()
        },
        toggleSelect(id) {
            const item = this.items.find(i => i.id === id)
            if (item) item.selected = !item.selected
            this.saveToLocal()
        },
        toggleSelectAll(selected) {
            this.items.forEach(i => i.selected = selected)
            this.saveToLocal()
        },
        clearSelected() {
            this.items = this.items.filter(i => !i.selected)
            this.saveToLocal()
        },
        saveToLocal() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        loadFromLocal() {
            const saved = localStorage.getItem('cart')
            if (saved) {
                try {
                    this.items = JSON.parse(saved)
                } catch (e) { console.error(e) }
            }
        }
    }
})