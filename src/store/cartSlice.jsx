import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: {
    cartItems: [],
    totalQuantity: 0,
  },
  reducers: {
    //Add items to cartItems
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.collectivePrice += existingItem.price;
        state.totalQuantity += 1;
      } else {
        state.cartItems.push(action.payload);
        state.totalQuantity += 1;
      }
    },
    //Remove items from cartItems
    removeFromCart(state, action) {
      const id = action.payload;
      console.log(id);
      const removedItem = state.cartItems.find((item) => id === item.id);

      if (removedItem.quantity === 1) { 
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity -= 1;
      } else {
        removedItem.quantity--;
        removedItem.collectivePrice -= removedItem.price;
        state.totalQuantity -= 1;
      }
    },
    //Reset both states
    resetCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
  },

});

export const cartActions = cartSlice.actions;
export default cartSlice;
