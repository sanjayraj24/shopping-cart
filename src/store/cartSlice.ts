import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  items: Record<string, number>
}

const initialState: CartState = {
  items: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      const id = action.payload
      state.items[id] = (state.items[id] || 0) + 1
    },
    increaseQty(state, action: PayloadAction<string>) {
      const id = action.payload
      state.items[id] = (state.items[id] || 0) + 1
    },
    decreaseQty(state, action: PayloadAction<string>) {
      const id = action.payload
      if (!state.items[id]) return

      if (state.items[id] <= 1) {
        delete state.items[id]
      } else {
        state.items[id] -= 1
      }
    },
    clearCart(state) {
      state.items = {}
    },
    setCart(state, action: PayloadAction<Record<string, number>>) {
      state.items = action.payload
    },
  },
})

export const { addItem, increaseQty, decreaseQty, clearCart, setCart } = cartSlice.actions
export default cartSlice.reducer
