import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../helpers/APIInvoke.js";
import mensajeConfirmacion from "../../helpers/mensajes.js";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    usu: "",
    cla: "",
  });

  const { usu, cla } = login;

  const onChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("usu").focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  const iniciarSesion = async () => {
    const body = {
      usuarioAcceso: login.usu,
      claveAcceso: login.cla,
    };
    const response = await APIInvoke.invokePOST(`/api/usuarios/login`, body);
    if (response.ok === "NO_EXISTE") {
      mensajeConfirmacion("error", response.msg);
    } else if (response.ok === "CLAVE_ERRONEA") {
      mensajeConfirmacion("error", response.msg);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("iduser");
      localStorage.removeItem("username");
      localStorage.removeItem("rolusuario");

      const token = response.tokenJwt;
      const idUsuario = response._id;
      const nombreUsuario = response.nombresUsuario;
      const rolUsuario = response.idRol;

      localStorage.setItem("token", token);
      localStorage.setItem("iduser", idUsuario);
      localStorage.setItem("username", nombreUsuario);
      localStorage.setItem("rol", rolUsuario);

      if (rolUsuario === "655a591a6d60ee6e6679f98f") {
        navigate("/menu-principal");
      } else if (rolUsuario === "655a590e6d60ee6e6679f989") {
        navigate("/menu-cliente");
      } else {
        navigate("/menu-empleado");
      }
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div className="text-center">
                <h2 className="fw-bold mb-4">Iniciar Sesión</h2>
              </div>
              <form onSubmit={onSubmit}>
                {/* Usuario input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="usu"
                    className="form-control form-control-lg"
                    value={usu}
                    onChange={onChange}
                    name="usu"
                    required
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <label className="form-label" htmlFor="usu">
                    Usuario
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="cla"
                    className="form-control form-control-lg"
                    value={cla}
                    onChange={onChange}
                    name="cla"
                    required
                    autoComplete="off" // Desactivar el autocompletado
                  />
                  <label className="form-label" htmlFor="cla">
                    Contraseña
                  </label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link to={"#"}>Forgot password?</Link>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-primary text-white text-center py-3">
          <p className="mb-0">Copyright © 2023. All rights reserved.</p>
        </footer>
        {/* End Footer */}
      </section>
    </div>
  );
};

export default Login;
