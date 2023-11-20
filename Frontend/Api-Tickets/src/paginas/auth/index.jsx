
import { Link } from "react-router-dom";
import './css/style.css';
import './css/bootstrap.css';
import telephone from './images/telephone-white.png';
import envelope from './images/envelope-white.png';
import location from './images/location-white.png';




const Index = () => {
    return(
<div>
  <div className="hero_area">
    {/* header section strats */}
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <a className="navbar-brand" href="index.html">
            <span>
              Serviplus Sebastian Torres
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login"> Iniciar sesión </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-cuenta"> Registrate </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
    {/* end header section */}
    {/* slider section */}
    <section className=" slider_section position-relative">
      <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col">
                  <div className="detail-box">
                    <div>
                      <h2>
                        Bienvenido a
                      </h2>
                      <h1>
                        serviplus
                      </h1>
                      <p>
                      Sistema de informacion para la creacion de tickets
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col">
                  <div className="detail-box">
                    <div>
                      <h2>
                        welcome to
                      </h2>
                      <h1>
                        web agency
                      </h1>
                      <p>
                        Sistema de informacion para la creacion de tickets
                      </p>
                      <div className>
                        <a href>
                          Contact us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col">
                  <div className="detail-box">
                    <div>
                      <h2>
                        welcome to
                      </h2>
                      <h1>
                        web agency
                      </h1>
                      <p>
                      Sistema de informacion para la creacion de tickets
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* end slider section */}
  </div>

  {/* info section */}
  <section className="info_section ">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="info_contact">
            <h5>
              Serviplus Sebastian Torres
            </h5>
            <div>
              <div className="img-box">
              <img src={location} alt="Descripción de la imagen" className="box-img" />
              </div>
              <p>
                Direccion
              </p>
            </div>
            <div>
              <div className="img-box">
              <img src={telephone} alt="Descripción de la imagen" className="box-img" />
              </div>
              <p>
                3236741529
              </p>
            </div>
            <div>
              <div className="img-box">
              <img src={envelope} alt="Descripción de la imagen" className="box-img" />
              </div>
              <p>
                juanxiomi9@gmail.com
              </p>
            </div>
          </div>
        </div>
        
        
          </div>
        </div>
    

  </section>
  {/* end info_section */}
  {/* footer section */}
  <section className="container-fluid footer_section">
    <p>
      © 2023 Derechos reservados a
      <a href="https://html.design/">Plantillas libres de html</a>
      Distribuido por <a href="https://themewagon.com">ThemeWagon</a>
    </p>
  </section>
  {/* footer section */}
</div>



    )
}

export default Index;