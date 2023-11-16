import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state

    const existingCartItem = cartList.find(item => item.id === product.id)

    const updatedSameCartItem = cartList.map(item =>
      item.id === product.id
        ? {...item, quantity: item.quantity + product.quantity}
        : item,
    )
    const updatedNewCartItem = this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))

    return existingCartItem
      ? this.setState({cartList: updatedSameCartItem})
      : updatedNewCartItem
  }

  deleteCartItem = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== itemId),
    }))
  }

  cartItemUpdateCount = (id, newQuantity) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: newQuantity} : item,
      ),
    }))
  }

  clearCart = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            cartItemUpdateCount: this.cartItemUpdateCount,
            clearCart: this.clearCart,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
