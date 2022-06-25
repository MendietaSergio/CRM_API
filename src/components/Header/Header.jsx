import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";

export const Header = () => {
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate()
  const closedSesion =() =>{
    setAuth({
        token: '',
        auth: false
    })
    localStorage.setItem('token', '')
    navigate('/iniciar-sesion')
  }
  return (
    <header>
      <div className="bar">
        <div className="container">
          <div className="container-bar">
            <h1>CRM - Administrador de Clientes</h1>
          </div>
          {auth.auth ? (
            <button type="button"
                    className="btn btn-rojo"
                    onClick={closedSesion}
                    >
              <i className="fas fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : (
            null
          )}
        </div>
      </div>
    </header>
  );
};
