import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  cartItemUpdateCount: () => {},
  clearCart: () => {},
})

export default CartContext
