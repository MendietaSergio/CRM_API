import React, { useState, useEffect, useContext } from "react";
import clientsAxios from "../../config/config";
import { DetailOrders } from "./DetailOrders";
import { CRMContext } from "../../Context/CRMContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!auth.auth) return navigate("/iniciar-sesion");
  }, []);
  useEffect(() => {
    const getAPI = async () => {
      await clientsAxios
        .get("/pedidos", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((resp) => {
          setTimeout(() => {
            setOrders(resp.data);
            setLoading(false);
          }, 3000);
        });
    };
    getAPI();
  }, []);
  if (loading) return <Spinner />;

  return (
    <>
      {orders.length > 0 ? (
        <>
          <h2>Pedidos</h2>
          <ul className="list-orders">
            {orders.map((order) => (
              <DetailOrders order={order} key={order._id} />
            ))}
          </ul>
        </>
      ) : (
        <>
        <span>No hay pedidos</span>
        </>
      )}
    </>
  );
};
