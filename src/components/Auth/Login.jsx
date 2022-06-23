import React, { useState, useEffect } from "react";
import clientsAxios from "../../config/config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState();

  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await clientsAxios.post("/iniciar-sesion", credentials);
      const { token } = resp;
      //almaceno token en localstorage
      localStorage.setItem("token", token);
      Swal.fire({
        title: "Login correcto",
        text: "Has iniciado sesion",
        icon: "success",
      });
      navigate("/clientes");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.message,
      });
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
