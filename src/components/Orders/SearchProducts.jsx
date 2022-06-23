import React,{useState, useEffect} from 'react'
import clientsAxios from '../../config/config'
import { Products } from '../Products/Products'

export const SearchProducts = ({getProducts, readSearch}) => {
    return (
        <>
            <form
                onSubmit={getProducts} >
            <legend>Busca un producto y agrega una cantidad</legend>
            <div className="field">
                <label >Producto:</label>
                <input 
                    type="text"
                    placeholder='Nombre Productos'
                    name='product'
                    onChange={readSearch} />
            </div>
            <input 
                    type="submit"
                    name="send"
                    className='btn btn-azul' />
          </form>
        </>
    )
}
