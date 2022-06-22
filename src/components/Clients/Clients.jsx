import React, { useState, useEffect } from "react";
import clientsAxios from "../../config/config";
import { Client } from "./Client";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getApi = async () => {
      const clientConsult = await clientsAxios.get("/clientes");
      setClients(clientConsult.data);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 3000);
    };
    getApi();
  }, [clients]);

  if(!clients.length) return <Spinner />


  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-client">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      {/* {loading ? null : ( */}
        <ul className="list-clients">
          {clients.map((client) => (
            <Client key={client._id} client={client} />
          ))}
        </ul>
      {/* )} */}
    </>
  );
};
