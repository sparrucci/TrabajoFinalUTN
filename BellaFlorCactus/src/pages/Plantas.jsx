import { useState } from "react";
import useCrearPlanta from "../hooks/useCrearPlanta";
import useFetchPlantas from "../hooks/useFetchPlantas";
import FormularioPlanta from "../components/FormularioPlanta";
import useActualizarPlanta from "../hooks/useActualizarPlanta";
import useEliminarPlanta from "../hooks/useEliminarPlanta";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// tiene la responsabilidad de mapear y de llamar a la API
function Plantas() {
  const [plantaEnEdicion, setPlantaEnEdicion] = useState(null);
  const { error, loading, plantas, setPlantas, fetchPlantas } =
    useFetchPlantas();
  const { usuario } = useAuth();
  const { crearPlanta } = useCrearPlanta();
  const { actualizarPlanta } = useActualizarPlanta();
  const { eliminarPlanta } = useEliminarPlanta();

  const handleCrear = async (datos) => {
    const nuevaPlanta = await crearPlanta(datos);
    if (nuevaPlanta) {
      // Este set nos evita un llamdo a la API
      // pero tiene el problema de que si la API falla podria tener un dato fantasma
      setPlantas((actuales) => [...actuales, nuevaPlanta]);
    }
    // llamamos de nuevo para evitar tener un dato fantasma
    fetchPlantas();
  };

  const handleActualizar = async (id, cambios) => {
    const plantaActualizada = await actualizarPlanta(id, cambios);
    if (plantaActualizada) {
      // Actualiza el estado de las plantas con los nuevos cambios
      // permite evitar un llamado a la API
      setPlantas((actuales) =>
        actuales.map((p) => (p.id === id ? plantaActualizada : p)),
      );
    }
  };

  const handleEliminar = async (id) => {
    const eliminado = await eliminarPlanta(id);
    if (eliminado) {
      //este filter tambien evita un llamado a la API
      setPlantas((actuales) => actuales.filter((p) => p.id !== id));
    }
  };

  // Manejar errores
  if (loading) return <p className="cargando">Cargando plantas... </p>;
  if (error) return <p> Error al cargar plantas: {error}</p>;

  return (
    <section className="tarjeta personajes">
      <div className="personajes-header">
        <h2>Cactus y Suculentas de mi propia API</h2>
      </div>

      <FormularioPlanta
        onCrear={handleCrear}
        plantaEnEdicion={plantaEnEdicion}
        onActualizar={handleActualizar}
        onCancelar={() => setPlantaEnEdicion(null)}
      />

      <div className="grid-personajes">
        {plantas.map((planta) => (
          <Link
            to={`/plantas/${planta.id}`}
            className="tarjeta-personaje"
            key={planta.id}
          >
            <article>
              {planta.image ? (
                <img src={planta.image} alt={planta.name} />
              ) : (
                <div className="avatar-generico">{planta.name}</div>
              )}
              <h3>{planta.name}</h3>
              <p className="estado">
                {planta.status} . {planta.species}
              </p>
              {usuario && (
                <div className="tarjeta-personaje-acciones">
                  <button
                    type="button"
                    className="boton-editar"
                    onClick={() => setPlantaEnEdicion(planta)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="boton-eliminar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEliminar(planta.id);
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

export default Plantas;
