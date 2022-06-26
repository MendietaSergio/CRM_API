import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import clientsAxios from "../../config/config";
import { FormCantProducts } from "./FormCantProducts";
import { SearchProducts } from "./SearchProducts";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";

export const NewOrder = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { _id } = useParams();
  const [search, setSearch] = useState("");
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (!auth.auth) return navigate("/iniciar-sesion");
  }, []);
  useEffect(() => {
    const getAPI = async () => {
      await clientsAxios
        .get(`/clientes/${_id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((resp) => {
          setClient(resp.data);
        })
        .catch((error) => console.log("error ", error));
    };
    getAPI();
    updateTotal();
  }, [products]);
  const getProducts = async (e) => {
    e.preventDefault();
    const result = await clientsAxios.get(`/productos/busqueda/${search}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (result.data[0]) {
      let productResult = result.data[0];
      productResult.product = result.data[0]._id;
      productResult.cant = 0;

      setProducts([...products, productResult]);
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay resultados",
        text: "No se encontró resultados",
      });
    }
  };
  const readSearch = (e) => {
    setSearch(e.target.value);
  };
  const subtractProduct = (index) => {
    const allProducts = [...products];

    if (allProducts[index].cant === 0) return;

    allProducts[index].cant--;

    setProducts(allProducts);
  };
  const increaseProduct = (index) => {
    const allProducts = [...products];

    allProducts[index].cant++;

    setProducts(allProducts);
  };

  const deleteProdutOrder = (_id) => {
    const allProducts = products.filter((product) => product.product !== _id);
    setProducts(allProducts);
  };
  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0);
      return;
    }

    let newTotal = 0;
    products.map((product) => (newTotal += product.cant * product.price));

    setTotal(newTotal);
  };
  const makeAnOrder = async (e) => {
    e.preventDefault();

    const orders = {
      client: _id,
      orders: products,
      total: total,
    };

    console.log(orders);
    const result = await clientsAxios.post(`/pedidos/nuevo/${_id}`, orders);

    if (result.status === 200) {
      Swal.fire({
        icon: "succes",
        title: "Correcto",
        text: result.data.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al generar el pedido",
        text: result.data.message,
      });
    }
    navigate("/pedidos");
  };
  return (
    <>
      <h2>Nuevo pedido</h2>
      <div className="ficha-client">
        <h3>Datos del cliente</h3>
        <p>
          Nombre: {client.name} {client.surname}
        </p>
        <p>Telefono: {client.phone}</p>
      </div>
      <SearchProducts getProducts={getProducts} readSearch={readSearch} />

      <ul className="resumen">
        {products.map((product, index) => (
          <FormCantProducts
            product={product}
            key={product.product}
            subtractProduct={subtractProduct}
            increaseProduct={increaseProduct}
            deleteProdutOrder={deleteProdutOrder}
            index={index}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar: <span>$ {total}</span>{" "}
      </p>

      {total > 0 ? (
        <form onSubmit={makeAnOrder}>
          <input
            type="submit"
            className="btn btn-verde"
            value="Realizar pedido"
          />
        </form>
      ) : null}
    </>
  );
};
