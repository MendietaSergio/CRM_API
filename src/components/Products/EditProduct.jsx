import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clientsAxios from "../../config/config";
import { Spinner } from "../Spinner/Spinner";
import {useNavigate} from 'react-router-dom'
export const EditProduct = () => {
    const navigate = useNavigate()
  const { _id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: "",
  });
  const [archive, setArchive] = useState("");

  useEffect(() => {
    const getAPI = async () => {
      const data = await clientsAxios.get(`/productos/${_id}`);
      console.log("data => ", data);
      setProduct(data.data);

    };
    getAPI();
  }, []);
  const readArchive = (e) => {
    console.log(e.target.files);
    setArchive(e.target.files[0]);
  };

  const updateState = (e) => {
    setProduct({
      ...product,
      [e.target.name]: [e.target.value],
    });
  };

const updateProduct = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('img', archive)

    try {
        const res = await clientsAxios.put(`/productos/${_id}`, formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        if(res.status===200){
            Swal.fire(
                'Editado Correctamente',
                res.data.message,
                'success'
            ).then(
                () => {
                  navigate("/productos");
                }
              );
        }
    } catch (error) {
        Swal.fire({
            icon:'error',
            title: 'Hubo un error',
            text:'Vuelva a intentarlo'
        })
    }

}

  const { name, price, img } = product;


//   if (!name) return <Spinner />;
  return (
    <>
      <h2>Editar Producto</h2>
      <form onSubmit={updateProduct}>
        <legend>Llena todos los campos</legend>
        <div className="field">
          <label>Nombre: </label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            defaultValue={name}
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
            defaultValue={price}
            onChange={updateState}
          />
        </div>
        <div className="field">
          <label>Imagen: </label>
          {img ? (
            <img src={`http://localhost:5000/${img}`} alt={name} width="300" />
          ) : null}
        </div>
          <input type="file" name="img" onChange={readArchive} />
        <div className="send">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar producto"
            // disabled={validateClient()}
          />
        </div>
      </form>
    </>
  );
};
