import React, { useState, useEffect, useContext } from "react";
import clientsAxios from "../../config/config";
import { Client } from "./Client";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";
import { CRMContext } from "../../Context/CRMContext";

export const Clients = (props) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);
  useEffect(() =>{
    if (!auth.auth) return navigate("/clientes");
  },[])
  useEffect(() => {
    if (auth.token !== '') {
      try {
        const getApi = async () => {
          await clientsAxios.get("/clientes", {
            headers: {
              Authorization : `Bearer ${auth.token}`,
            },
          })
          .then((resp) =>{
            setClients(resp.data);
          })
        };
        getApi();
      } catch (error) {
        if (error.response.status(500)) {
          navigate("/clientes");
        }
      }
    } else {
      navigate("/iniciar-sesion");
    }
  }, [clients]);

  
  if (!clients.length) return <Spinner />;

  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-client">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="list-clients">
        {clients.map((client) => (
          <Client key={client._id} client={client} />
        ))}
      </ul>
    </>
  );
};
