import React, { useState, useContext } from "react";
import clientsAxios from "../../config/config";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";
import { Messaje } from "../Message/Messaje";

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState();

  const [auth, setAuth] = useContext(CRMContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await clientsAxios
        .post("/iniciar-sesion", credentials)
        .then((resp) => {
          const { token } = resp.data;
          //almaceno token en localstorage
          localStorage.setItem("token", token);
          //guardar datos en auth(context)
          setAuth({
            token,
            auth: true,
          });
          Swal.fire({
            title: "Login correcto",
            text: "Has iniciado sesion",
            icon: "success",
          });
          navigate("/clientes");
        });
    } catch (error) {
      if (!error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Contactese con Desarrollo web",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: error.response.data.message,
        });
      }
    }
  };

  const readDate = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Messaje />
      <div className="login">
        <h2>Iniciar sesion</h2>

        <div className="container-form">
          <form onSubmit={login}>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email para iniciar sesion"
                required
                onChange={readDate}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña para iniciar sesion"
                required
                onChange={readDate}
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-verde btn-block"
            />
          </form>
        </div>
      </div>
    </>
  );
};
