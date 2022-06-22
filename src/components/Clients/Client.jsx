import React from 'react'

export const Client = ({client}) => {
    const {_id ,name, surname, business, email, phone} = client
    return (
        <li className='client'>
           <div className="info-client">
                <p className="name">{name} {surname}</p>
                <p className="business">{business}</p>
                <p>{email}</p>
                <p>Tel: {phone}</p>
           </div>
           <div className="actions">
            <a href="#" className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>Editar Cliente
            </a>
            <button className='btn btn-rojo' type='button'>
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
           </div>
        </li>
    )
}
