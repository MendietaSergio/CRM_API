import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import clientsAxios from "../../config/config";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";

export const EditClient = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext)
  useEffect(() => {
    if(!auth.auth) return navigate('/iniciar-sesion')
  }, [])
  
  const { _id } = useParams();
  const [client, setClient] = useState({
    name: "",
    surname: "",
    business: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    const getAPI = async () => {
      const data = await clientsAxios.get(`/clientes/${_id}`,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setClient(data.data);
    };
    getAPI();
  }, []);
  const updateState = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };
  const validateClient = () => {
    const { name, surname, business, email, phone } = client;
    let validate =
      !name.length ||
      !surname.length ||
      !business.length ||
      !email.length ||
      !phone.length;
    return validate;
  };
  const updateClient = (e) => {
    e.preventDefault();
    clientsAxios.put(`/clientes/${_id}`, client).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Oops...",
          text: "El cliente ya existe!",
        });
      } else {
        Swal.fire(
          "Se actualizó correctamente!",
          res.data.message,
          "success"
        ).then(() => {
          navigate("/clientes");
        });
      }
    });
  };
  const {name, surname, business, email, phone} = client;
  return (
    <>
      <h2>Editar cliente</h2>
      <form onSubmit={updateClient}>
        <legend>Llena todos los campos</legend>
        <div className="field">
          <label>Nombre: </label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="name"
            onChange={updateState}
            value={client.name}
          />
        </div>
        <div className="field">
          <label>Apellido: </label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="surname"
            value={client.surname}
            onChange={updateState}
          />
        </div>
        <div className="field">
          <label>Empresa: </label>
          <input
            type="text"
            placeholder="Empresa"
            value={client.business}
            name="business"
            onChange={updateState}
          />
        </div>
        <div className="field">
          <label>Email: </label>
          <input
            type="mail"
            placeholder="Email Cliente"
            name="email"
            value={client.email}
            onChange={updateState}
          />
        </div>
        <div className="field">
          <label>Telefono: </label>
          <input
            type="tel"
            placeholder="Telefono Cliente"
            value={client.phone}
            name="phone"
            onChange={updateState}
          />
        </div>
        <div className="send">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar cambios"
            disabled={validateClient()}
          />
        </div>
      </form>
    </>
  );
};
