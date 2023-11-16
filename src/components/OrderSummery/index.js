import CartContext from '../../context/CartContext'

import './index.css'

const OrderSummery = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)
      const totalQuantity = cartList.reduce(
        (acc, item) => acc + item.quantity,
        0,
      )
      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )
      return (
        <div className="order-summery-card">
          <h1 className="order-summery-title">Order Summery: </h1>
          <hr className="line" />
          <ul className="cart-items-list">
            {cartList.map(item => (
              <li className="cart-item-tags-container">
                <p className="cart-item-tag">
                  <span className="cart-item-tagName">Name: </span> {item.title}
                </p>
                <p>
                  <span className="cart-item-tagName">Price: </span>
                  {item.price.toFixed(2)}
                </p>
                <p>
                  <span className="cart-item-tagName">Quantity: </span>
                  {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="cart-items-total-quantity-container">
            <p className="cart-item-tagName">Total Quantity: </p>
            <p>{totalQuantity}</p>
          </div>
          <div className="cart-items-total-price-container">
            <p className="cart-item-tagName">Total Price: </p>
            <p>{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default OrderSummery
