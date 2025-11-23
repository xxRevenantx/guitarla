import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Guitar from './Components/Guitar'
import { db } from './data/db'


function App() {


  const initialCart = localStorage.getItem('cart')  // Obtiene el carrito guardado en el localStorage
    ? JSON.parse(localStorage.getItem('cart')) // Parsea el carrito guardado en el localStorage
    : [] // Si no hay carrito guardado, inicializa el carrito como un array vacío

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const [modal, setModal] = useState(false)



  // Este código utiliza el hook `useEffect` para guardar el estado actual del carrito (`cart`) en el `localStorage` 
  // del navegador cada vez que el carrito cambia. Esto permite que el carrito persista incluso si el usuario cierra y
  // vuelve a abrir la página.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])



  function addToCart(item) {
    const itemInCart = cart.findIndex(guitar => guitar.id === item.id);

    if (itemInCart >= 0) {
      const updatedCart = [...cart];
      if (updatedCart[itemInCart].quantity < item.stock) { // Verify stock before increasing
        updatedCart[itemInCart].quantity++;
        setCart(updatedCart);
      }
    } else {
      if (item.stock > 0) { // Verify stock before adding a new item
        item.quantity = 1;
        setCart([...cart, item]);
      }
    }


  }

  // Remover item del carrito
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  // Vaciar carrito
  function clearCart() {
    setCart([])
  }

  // Aumentar item del carrito
  function increaseQuantity(id) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < guitar.stock) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    })
    setCart(updatedCart)
  }

  // Disminuir item del carrito
  function decreaseQuantity(id) {
    // Crea un nuevo array mapeando el carrito actual
    const updatedCart = cart.map(guitar => {
      // Si el ID de la guitarra actual coincide con el ID proporcionado
      if (guitar.id === id && guitar.quantity > 1) {
        // Crea un nuevo objeto de guitarra con la cantidad disminuida en 1
        return { ...guitar, quantity: guitar.quantity - 1 };
      }
      // De lo contrario, devuelve la guitarra tal cual
      return guitar;
    })
    // Actualiza el estado del carrito con el nuevo array
    setCart(updatedCart);
  }


  function updateStock(id) {
    setData(prevData =>
      prevData.map(guitar =>
        guitar.id === id && guitar.stock > 0
          ? { ...guitar, stock: guitar.stock - 1 } // baja stock
          : guitar
      )
    )
  }








  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateStock={updateStock}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección de Guitarras</h2>

        <div className="row mt-5">
          {data.map(guitar => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              updateStock={updateStock}
            />
          ))}


        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
