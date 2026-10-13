import { useState } from "react";
import useCrearSpider from "../hooks/useCrearSpider";
import useFetchSpiders from "../hooks/useFetchSpiders";
import FormularioSpider from "../components/FormularioSpider";
import useActualizarSpider from "../hooks/useActualizarSpider";
import useEliminarSpider from "../hooks/useEliminarSpider";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// tiene la responsabilidad de mapear y de llamar a la API
function Spiders() {
  const [spiderEnEdicion, setSpiderEnEdicion] = useState(null);
  const { error, loading, spiders, setSpiders, fetchSpiders } =
    useFetchSpiders();
  const { usuario } = useAuth();
  const { crearSpider } = useCrearSpider();
  const { actualizarSpider } = useActualizarSpider();
  const { eliminarSpider } = useEliminarSpider();

  const handleCrear = async (datos) => {
    const nuevoSpider = await crearSpider(datos);
    if (nuevoSpider) {
      // Este set nos evita un llamdo a la API
      // pero tiene el problema de que si la API falla podria tener un dato fantasma
      setSpiders((actuales) => [...actuales, nuevoSpider]);
    }
    // llamamos de nuevo para evitar tener un dato fantasma
    fetchSpiders();
  };

  const handleActualizar = async (id, cambios) => {
    const spiderActualizado = await actualizarSpider(id, cambios);
    if (spiderActualizado) {
      // Actualiza el estado de los spiders con los nuevos cambios
      // permite evitar un llamado a la API
      setSpiders((actuales) =>
        actuales.map((p) => (p.id === id ? spiderActualizado : p)),
      );
    }
  };

  const handleEliminar = async (id) => {
    const eliminado = await eliminarSpider(id);
    if (eliminado) {
      //este filter tambien evita un llamado a la API
      setSpiders((actuales) => actuales.filter((p) => p.id !== id));
    }
  };

  // Manejar errores
  if (loading) return <p className="cargando">Cargando spiders... </p>;
  if (error) return <p> Error al cargar spiders: {error}</p>;

  return (
    <section className="tarjeta personajes">
      <div className="personajes-header">
        <h2>Diferentes Spider-Man de mi propia API creada con mockapi.io</h2>
      </div>

      <FormularioSpider
        onCrear={handleCrear}
        spiderEnEdicion={spiderEnEdicion}
        onActualizar={handleActualizar}
        onCancelar={() => setSpiderEnEdicion(null)}
      />

      <div className="grid-personajes">
        {spiders.map((spider) => (
          <Link
            to={`/spiders/${spider.id}`}
            className="tarjeta-personaje"
            key={spider.id}
          >
            <article>
              {spider.image ? (
                <img src={spider.image} alt={spider.name} />
              ) : (
                <div className="avatar-generico">{spider.name}</div>
              )}
              <h3>{spider.name}</h3>
              <p className="estado">
                {spider.status} . {spider.species}
              </p>
              {usuario && (
                <div className="tarjeta-personaje-acciones">
                  <button
                    type="button"
                    className="boton-editar"
                    onClick={() => setSpiderEnEdicion(spider)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="boton-eliminar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEliminar(spider.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Spiders;
