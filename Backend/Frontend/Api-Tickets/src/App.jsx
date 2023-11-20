import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearCuenta from "./paginas/auth/crearCuenta";
import Login from "./paginas/auth/login";
import Index from "./paginas/auth/index";
import RolesAdmin from "./paginas/configuracion/rolesAdmin";
import RolesCrear from "./paginas/configuracion/rolesCrear";
import RolesEditar from "./paginas/configuracion/rolesEditar";
import UsuariosAdmin from "./paginas/configuracion/usuariosAdmin";
import UsuariosCrear from "./paginas/configuracion/usuariosCrear";
import UsuariosEditar from "./paginas/configuracion/usuariosEditar";
import DashBoard from "./paginas/dashBoard";
import CategoriasAdmin from "./paginas/tickets/categoriasAdmin";
import CategoriasCrear from "./paginas/tickets/categoriasCrear";
import CategoriasEditar from "./paginas/tickets/categoriasEditar";
import TicketsAdmin from "./paginas/tickets/ticketsAdmin";
import TicketsCrear from "./paginas/tickets/ticketsCrear";
import TicketEditar from "./paginas/tickets/ticketsEditar";
import BandejaEntrada from "./paginas/tickets/bandejaEntrada";
import DetallesTicket from "./paginas/tickets/detallesTicket";
import DashBoardC from "./paginas/dashBoardC";
import CrearCuentaEmpleado from "./paginas/auth/crearEmpleado";
import DashBoardE from './paginas/dashboardE';
import TicketsEmpleado from './paginas/tickets/ticketsEmpleado';
import TicketsCrearE from "./paginas/tickets/ticketsCrearE";
import TicketsCrearC from "./paginas/tickets/ticketsCrearC";
import TicketsCliente from "./paginas/tickets/ticketsListar";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/menu-principal" element={<DashBoard />} />
          <Route path="/roles-admin" element={<RolesAdmin />} />
          <Route path="/roles-crear" element={<RolesCrear />} />
          <Route path="/roles-editar/:id" element={<RolesEditar />} />
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
          <Route path="/usuarios-crear" element={<UsuariosCrear />} />
          <Route path="/categorias-admin" element={<CategoriasAdmin />} />
          <Route path="/tickets-crear" element={<TicketsCrear />} />
          <Route path="/categorias-crear" element={<CategoriasCrear />} />
          <Route path="/categorias-editar/:id" element={<CategoriasEditar />} />
          <Route path="/usuarios-editar/:id" element={<UsuariosEditar />} />
          <Route path="/tickets-admin" element={<TicketsAdmin />} />
          <Route path="/tickets-crear" element={<TicketsCrear />} />
          <Route path="/tickets-editar/:id" element={<TicketEditar />} />
          <Route path="/bandeja-entrada" element={<BandejaEntrada />} />
          <Route path="/responder-ticket/:id" element={<DetallesTicket />} />
          <Route path="/menu-cliente" element={<DashBoardC />} />
          <Route path="/crear-empleado" element={<CrearCuentaEmpleado />} />
          <Route path="/menu-empleado" element={<DashBoardE />} />
          <Route path="/tickets-empleado" element={<TicketsEmpleado />} />
          <Route path="/tickets-crearE" element={<TicketsCrearE />} />
          <Route path="/tickets-crearC" element={<TicketsCrearC />} />
          <Route path="/tickets-cliente/:clienteId" element={<TicketsCliente />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
