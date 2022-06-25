import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientsAxios from "../../config/config";
import { Spinner } from "../Spinner/Spinner";
import { Product } from "./Product";

import { CRMContext } from "../../Context/CRMContext";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.auth) return navigate("/clientes");
  }, [])

  useEffect(() => {
    if (auth.token !== "") {
      try {
        const getAPI = async () => {
          const { data } = await clientsAxios.get("/productos",{
            headers:{
                Authorization: `Bearer ${auth.token}`
              }
          });
          setProducts(data);
        };
        getAPI();
      } catch (error) {
        if(error.response.status(500)){
            navigate("/clientes");
          }
      }
    } else {
        navigate("/iniciar-sesion");
      }
  }, [products]);

  if (!products.length) return <Spinner />;

  return (
    <>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"}>
        <i className="fas fa-plus-circle"></i>
        Nuevo producto
      </Link>
      <ul className="list-products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
};
