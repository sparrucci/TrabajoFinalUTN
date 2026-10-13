import { Link } from "react-router-dom";

// Index — vive en "/". Landing simple, separada de la pantalla del CRUD:
// no pide datos a ninguna API, solo presenta la app y linkea hacia adentro.
function Index() {
  return (
    <section className="tarjeta index">
      <h2>Bienvenido</h2>
      <p>
        Esta app administra characters de Plantas contra una API 
        creada en mockAPI. Desde acá se entra al CRUD
        completo: crear, ver el detalle de cada uno, editar y eliminar.
      </p>
      <Link to="/plantas" className="boton-link">
        Ir a Bella Flor CACTUS →
      </Link>
    </section>
  );
}

export default Index;
