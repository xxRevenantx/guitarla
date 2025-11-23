import { useMemo } from "react"

function Header({ cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }) {

    // State derivado
    const isEmpty = useMemo(() => cart.length > 0, [cart])

    // Calcula el total a pagar del carrito, sumando el precio de cada item multiplicado por su cantidad.
    // `useMemo` memoriza el resultado de la función que se le pasa como primer argumento.
    // En este caso, memoriza el valor booleano de `cart.length > 0`.
    // El valor memorizado solo se recalcula si las dependencias (el array `[cart]`) cambian.
    // Esto evita recálculos innecesarios en cada renderizado si `cart` no ha cambiado, optimizando el rendimiento.

    const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart])



    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />
                            <div
                                id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${item.image}.jpg`} alt={item.name} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td className="fw-bold">${item.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                min="1"
                                                                onClick={() => decreaseQuantity(item.id)}
                                                                type="button" className="btn btn-dark">
                                                                -
                                                            </button>
                                                            {item.quantity}
                                                            <button
                                                                onClick={() => increaseQuantity(item.id)}
                                                                type="button" className="btn btn-dark">
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="btn btn-danger" type="button">
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">
                                            Total pagar:{" "}
                                            <span className="fw-bold">
                                                {cartTotal.toLocaleString("es-MX", {
                                                    style: "currency",
                                                    currency: "MXN",
                                                })}
                                            </span>
                                        </p>
                                        <button
                                            onClick={clearCart}
                                            type="button"
                                            className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                    </>
                                ) : (
                                    <p className="text-center">

                                        El carrito esta vacio</p>
                                )}
                            </div>


                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header