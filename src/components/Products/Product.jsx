import React from "react";
import { Link } from "react-router-dom";
import clientsAxios from "../../config/config";

export const Product = ({ product }) => {
  const { _id, name, price, img } = product;

  const deleteProduct = (_id) => {
    Swal.fire({
      title: "¿Quiere eliminar el producto?",
      text: "El producto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("eliminado... ", _id);
        clientsAxios.delete(`/productos/${_id}`).then((res) => {
          console.log(res);
          Swal.fire("Eliminado!", res.data.message, "success");
        });
      }
    });
  };
  return (
    <>
      <li className="product">
        <div className="info-products">
          <p className="name">{name}</p>
          <p className="price">${price}</p>
          {img ? <img src={`http://localhost:5000/${img}`} alt={name} /> : null}
        </div>
        <div className="actions">
          <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </Link>
          <button
            className="btn btn-rojo"
            type="button"
            onClick={() => deleteProduct(_id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
    </>
  );
};
