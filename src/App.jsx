import React,{ useContext} from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navigations } from "./components/Navigations/Navigations";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Clients } from "./components/Clients/Clients";

import { Products } from "./components/Products/Products";
import { Orders } from "./components/Orders/Orders";
import { NewClient } from "./components/Clients/NewClient";
import { EditClient } from "./components/Clients/EditClient";
import { EditProduct } from "./components/Products/EditProduct";
import { NewProduct } from "./components/Products/NewProduct";
import { NewOrder } from "./components/Orders/NewOrder";
import { Login } from "./components/Auth/Login";
import { CRMContext, CRMProvider } from './Context/CRMContext';
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <div className="App">
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="grid container  container-principal">
            <Navigations />
            <main className="box-container col-9">
              <Switch>
                <Route exact path="/clientes" element={<Clients />} />
                <Route exact path="/clientes/nuevo" element={<NewClient />} />
                <Route
                  exact
                  path="/clientes/editar/:_id"
                  element={<EditClient />}
                />
                <Route exact path="/productos" element={<Products />} />
                <Route exact path="/productos/nuevo" element={<NewProduct />} />
                <Route
                  exact
                  path="/productos/editar/:_id"
                  element={<EditProduct />}
                />
                <Route exact path="/pedidos" element={<Orders />} />
                <Route
                  exact
                  path="/pedidos/nuevo/:_id"
                  element={<NewOrder />}
                />
                <Route exact path="/iniciar-sesion" element={<Login />} />
                <Route  exact path="/*" element={ <NotFound/> }/>
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </div>
    </Router>
  );
}

export default App;
