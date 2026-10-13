import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSpider from "../hooks/useFetchSpider";
import useActualizarSpider from "../hooks/useActualizarSpider";
import useEliminarSpider from "../hooks/useEliminarSpider";
import FormularioSpider from "../components/FormularioSpider";
import { useAuth } from "../context/AuthContext";


// Página de detalle — vive en "/Spiders/:id". El :id de la ruta se lee
// con useParams() y viaja directo al Custom Hook de fetch singular.
function DetalleSpider() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const { spider, setSpider, loading, error } = useFetchSpider(id);
  const { actualizarSpider } = useActualizarSpider();
  const { eliminarSpider } = useEliminarSpider();

  const [editando, setEditando] = useState(false);

  if (loading) return <p className="cargando">Cargando spider...</p>;
  if (error) return <p className="error-mensaje">Error: {error}</p>;

  const handleActualizar = async (idSpider, cambios) => {
    const actualizado = await actualizarSpider(idSpider, cambios);
    if (actualizado) {
      setSpider(actualizado); // reflejar el cambio sin volver a pedir todo
      setEditando(false);
    }
  };

  const handleEliminar = async () => {
    const seEliminó = await eliminarSpider(spider.id);
    if (seEliminó) {
      navigate("/"); // navegación programática: no hay un <Link> que clickear acá
    }
  };

  return (
    <section className="tarjeta detalle-personaje">
      <button type="button" className="boton-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {editando ? (
        <FormularioSpider
          spiderEnEdicion={spider}
          onActualizar={handleActualizar}
          onCancelar={() => setEditando(false)}
        />
      ) : (
        <>
          {spider.image ? (
            <img src={spider.image} alt={spider.name} className="detalle-imagen" />
          ) : (
            <div className="avatar-generico avatar-grande">{spider.name}</div>
          )}

          <h2>{spider.name}</h2>
          <p className={`estado estado-${spider.status.toLowerCase()}`}>
            {spider.status} · {spider.species}
          </p>

          
          <div className="detalle-acciones">
            <button type="button" className="boton-editar" onClick={() => setEditando(true)}>
              Editar
            </button>
            <button type="button" className="boton-eliminar" onClick={handleEliminar}>
              Eliminar
            </button>
          </div>
          
        </>
      )}
    </section>
  );
}

export default DetalleSpider;
