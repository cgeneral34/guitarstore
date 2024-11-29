
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEM = 1

  useEffect (() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExists >= 0) {
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      console.log('this item not exist')
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function incresesCart(id) {
    const updateCart = cart.map( item => {
      if(item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      } 
      return item
    })
    setCart(updateCart)
  }

  function decresesCart(id) {
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item, 
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart() {
    setCart([])
  }


  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        incresesCart={incresesCart}
        decresesCart={decresesCart}
        clearCart={clearCart}
      
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => 
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          )}
          
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
