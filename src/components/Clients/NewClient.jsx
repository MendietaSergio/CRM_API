import React,{useState, useEffect} from "react";
import React,{useState, useEffect} from "react";
import clientsAxios from "../../config/config";
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'


export const NewClient = () => {

    const [ client, setClient ] = useState({
        name:"",
        surname:"",
        business:"",
        email:"",
        phone:""
    })

    const updateState = (e) =>{
        setClient({
            ...client,
            [e.target.name] : e.target.value
        })
    }
    const validateClient = () =>{
        const {name, surname, business, email, phone} = client;
        let validate = !name.length || !surname.length || !business.length || !email.length || !phone.length;
        return validate;
    }
    const addClient = (e) =>{
        e.preventDefault()
         clientsAxios.post('/clientes',client)
            .then(res=>{
                if(res.data.code === 11000){
                    Swal.fire({
                        icon: 'error',
                        position: 'center',
                        title: 'Oops...',
                        text: 'El cliente ya existe!',
                      })
                }else{
                    Swal.fire(
                        'Se agregó el cliente!',
                        res.data.message,
                        'success'
                    )
                }
            })
    }
  return (
    <>
      <h2>Nuevo cliente</h2>
      <form 
            onSubmit={addClient}
            >
        <legend>Llena todos los campos</legend>
        <div className="field">
          <label>Nombre: </label>
          <input 
                type="text"
                placeholder="Nombre Cliente"
                name="name" 
                onChange={updateState}
                />
        </div>
        <div className="field">
          <label>Apellido: </label>
          <input type="text" 
                 placeholder="Apellido Cliente"
                 name="surname" 
                onChange={updateState}
                />
        </div>
        <div className="field">
          <label>Empresa: </label>
          <input type="text"
                 placeholder="Empresa"
                 name="business" 
                onChange={updateState}
                />
        </div>
        <div className="field">
          <label>Email: </label>
          <input type="mail"
                 placeholder="Email Cliente"
                 name="email" 
                onChange={updateState}
                />
        </div>
        <div className="field">
          <label>Telefono: </label>
          <input type="tel"
                 placeholder="Telefono Cliente"
                 name="phone" 
                onChange={updateState}
                />
        </div>
        <div className="send">
            <input type="submit"
                   className="btn btn-azul"
                   value="Agregar Cliente"
                   disabled={validateClient()}
                   />
        </div>
      </form>
    </>
  );
};
