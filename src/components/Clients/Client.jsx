import React, { useContext } from "react";
import { Link } from "react-router-dom";
import clientsAxios from "../../config/config";
import { CRMContext } from "../../Context/CRMContext";
export const Client = ({ client }) => {
  const { _id, name, surname, business, email, phone } = client;
  const [auth, setAuth] = useContext(CRMContext);
  const deleteClient = (_id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un cliente eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clientsAxios
          .delete(`/clientes/${_id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            Swal.fire("Eliminado!", res.data.message, "success");
          });
      }
    });
  };
  return (
    <li className="client">
      <div className="info-client">
        <p className="name">
          {name} {surname}
        </p>
        <p className="business">{business}</p>
        <p>{email}</p>
        <p>Tel: {phone}</p>
      </div>
      <div className="actions">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>Editar Cliente
        </Link>
        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>Nuevo pedido
        </Link>
        <button
          className="btn btn-rojo"
          type="button"
          onClick={() => deleteClient(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};
