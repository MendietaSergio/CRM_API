import React, { useState, useEffect, useContext } from "react";
import clientsAxios from "../../config/config";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";

export const NewProduct = () => {
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.auth) return navigate("/iniciar-sesion");
  }, []);
  const [products, setProducts] = useState({
    name: "",
    price: "",
  });
  const [archive, setArchive] = useState("");

  const readArchive = (e) => {
    console.log(e.target.files);
    setArchive(e.target.files[0]);
  };

  const updateState = (e) => {
    setProducts({
      ...products,
      [e.target.name]: [e.target.value],
    });
  };
  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("price", products.price);
    formData.append("img", archive);

    try {
      const res = await clientsAxios.post("/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        Swal.fire("Agregado Correctamente", res.data.message, "success").then(
          () => {
            navigate("/productos");
          }
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo",
      });
    }
  };

  return (
    <>
      <h2>Nuevo Producto</h2>
      <form onSubmit={addProduct}>
        <legend>Llena todos los campos</legend>
        <div className="field">
          <label>Nombre: </label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={updateState}
          />
        </div>

        <div className="field">
          <label>Precio: </label>
          <input
            type="number"
            placeholder="Precio del producto"
            name="price"
            min={0}
            step="1"
            onChange={updateState}
          />
        </div>
        <div className="field">
          <label>Imagen: </label>
          <input type="file" name="img" onChange={readArchive} />
        </div>
        <div className="send">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            // disabled={validateClient()}
          />
        </div>
      </form>
    </>
  );
};
