import React, {useState, useEffect} from 'react'
import clientsAxios from '../../config/config'
import { DetailOrders } from './DetailOrders'


export const Orders = () => {

    const [ orders, setOrders] = useState([])

    useEffect(() =>{
        const getAPI = async () =>{
            const result = await clientsAxios.get('/pedidos')
            setOrders(result.data)
        }
        getAPI()
    },[])

    return (
        <>
        <h2>Pedidos</h2>
        <ul className="list-orders">
            {orders.map(order =>(
            <DetailOrders
                order={order}
                key={order._id}
            />
            ))}
        </ul>
        </>
    )
}
