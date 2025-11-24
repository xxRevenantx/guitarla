import { useEffect, useState } from 'react'
import { db } from '../data/db'


export const useCart = () => {




    const initialCart = localStorage.getItem('cart')  // Obtiene el carrito guardado en el localStorage
        ? JSON.parse(localStorage.getItem('cart')) // Parsea el carrito guardado en el localStorage
        : [] // Si no hay carrito guardado, inicializa el carrito como un array vacío

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

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




    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    }

}

