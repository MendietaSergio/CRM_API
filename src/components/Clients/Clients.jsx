import React, { useState, useEffect } from "react";
import clientsAxios from "../../config/config";
import { Client } from "./Client";

export const Clients = () => {
  const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getApi = async () => {
      const clientConsult = await clientsAxios.get("/clientes");
      console.log(clientConsult);
      setClients(clientConsult.data);
    //   setTimeout(() => {
        
    //       setLoading(false);
    //   }, 3000);
    };
    getApi();
  }, []);

  return (
    <>
      <h2>Clientes</h2>
      {/* {loading ? (<p>cargando</p>) : ( */}
        <ul className="list-clients">
          {clients.map((client) => (
            <Client key={client._id} client={client} />
          ))}
        </ul>
      {/* )} */}
    </>
  );
};
