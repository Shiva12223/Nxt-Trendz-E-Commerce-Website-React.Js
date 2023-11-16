import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import OrderSummery from '../OrderSummery'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, clearCart} = value
      const showEmptyView = cartList.length === 0
      const onClickClearCartItems = () => {
        clearCart()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="cart-header">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    onClick={onClickClearCartItems}
                    className="clear-cart-btn"
                  >
                    Remove all
                  </button>
                </div>

                <CartListView />
                <div className="grand-total-card">
                  <div className="responsive-total-card">
                    <OrderSummery />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
