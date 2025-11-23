export default function Guitar({ guitar, addToCart }) {

    const { id, name, image, description, price, stock } = guitar // Se le aplica desestructuración a guitar



    return (

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <p

                    className="fw-black text-primary"
                >{stock} guitarras disponibles</p>
                <button
                    onClick={() => addToCart(guitar)} // Se le aplica una función flecha para que no se ejecute al momento de renderizar
                    type="button" className="btn btn-dark w-100">Agregar al Carrito</button>
            </div>
        </div>


    )
}