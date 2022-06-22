import React from 'react'
import { Link } from 'react-router-dom'

export const Navigations = () => {
    return (
        <aside className='sidebar col-3'>
            <h2>Administración</h2>
            <nav className='navigation'>
                <Link to={"/Clientes"} className="clients">Clientes</Link>
                <Link to={"/Productos"} className="products">Productos</Link>
                <Link to={"/Pedidos"} className="orders">Pedidos</Link>
            </nav>
        </aside>
    )
}
