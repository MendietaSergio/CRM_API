import React from "react";

export const DetailOrders = ({ order }) => {
  const { client, orders, total } = order;
  return (
    <li className="order">
      <div className="info-order">
        <p className="id">ID:{order._id} </p>
        <p className="name">
          Cliente: {client.name} {client.surname}
        </p>
        <div className="article-order">
          <p className="products">Artículo pedido: </p>
          <ul>
            {orders.map((product) => (
              <li key={order._id + product.product._id}>
                <p>{product.product.name}</p>
                <p>Precio: {product.product.price}</p>
                <p>Cantidad: {product.cant}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="total">
          Total: <span>$ {total}</span>{" "}
        </p>
      </div>
      <div className="actions"></div>
    </li>
  );
};