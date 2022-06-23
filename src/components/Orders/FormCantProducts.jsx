import React from 'react'

export const FormCantProducts = ({
    product,
    subtractProduct,
    increaseProduct,
    index,
    deleteProdutOrder}) => {

    const {name, cant, price, _id} = product
    return (
        <>
    <li>
        <div className="text-product">
            <p className="name">{name}</p>
            <p className="price">$ {price}</p>
        </div>
        <div className="actions">
            <div className="container-cant">
                <i 
                    onClick={() => subtractProduct(index)}
                    className="fas fa-minus"></i>
                
                <p>{cant}</p>
                
                <i 
                    onClick={() => increaseProduct(index)}
                    className="fas fa-plus"></i>
            </div>
            <button 
                type='submit'
                className="btn btn-rojo"
                onClick={() => deleteProdutOrder(_id)}
                >
                <i className="fas fa-minus-circle"></i>
                Eliminar Producto
            </button>
        </div>
    </li>
        </>
    )
}
