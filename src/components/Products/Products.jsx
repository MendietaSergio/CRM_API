import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import clientsAxios from '../../config/config'
import { Spinner } from '../Spinner/Spinner'
import { Product } from './Product'


export const Products = () => {
    
    const [ products, setProducts] = useState([])

    useEffect(() =>{
        const getAPI = async () =>{
            const { data } = await clientsAxios.get('/productos')
            setProducts(data)
        }
        getAPI()
    },[products])
    
    if(!products.length) return <Spinner />

    return (
        <>
        <h2>Productos</h2>
        <Link to={"/productos/nuevo"}>
            <i className="fas fa-plus-circle"></i>
            Nuevo producto
        </Link>
        <ul className="list-products" >
            {products.map(product =>(
                <Product 
                    key={product._id}
                    product={product}
                    /> 
            ))}
        </ul>
        </>

    )
}
