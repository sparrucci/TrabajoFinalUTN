import { Link } from "react-router-dom";

// Index — vive en "/". Landing simple, separada de la pantalla del CRUD:
// no pide datos a ninguna API, solo presenta la app y linkea hacia adentro.
function Index() {
  return (
    <section className="tarjeta index">
      <h2>Bienvenido</h2>
      <p>
        <em>
          (Esta app administra characters de Plantas contra una API creada en
          mockAPI. Desde acá se ingresa al CRUD completo: crear, ver el detalle
          de cada uno, editar y eliminar. Para la sesión también se utiliza una
          API pero resta completar el CRUD para que quede completo)
        </em>
      </p>

      <Link to="/plantas" className="boton-link">
        Ir a Bella Flor CACTUS →
      </Link>

      <div className="contenedor-hero">
        <img
          src="../public/hero.png"
          alt="Bella Flor Cactus"
          className="imagen-redondeada"
        ></img>
      </div>
    </section>
  );
}

export default Index;
