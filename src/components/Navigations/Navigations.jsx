import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CRMContext } from "../../Context/CRMContext";
export const Navigations = () => {
    const [auth, setAuth] = useContext(CRMContext);
    if(!auth.auth) return null
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
