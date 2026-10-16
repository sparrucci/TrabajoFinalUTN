import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPlanta from "../hooks/useFetchPlanta";
import useActualizarPlanta from "../hooks/useActualizarPlanta";
import useEliminarPlanta from "../hooks/useEliminarPlanta";
import FormularioPlanta from "../components/FormularioPlanta";
import { useAuth } from "../context/AuthContext";

// Página de detalle — vive en "/Plantas/:id". El :id de la ruta se lee
// con useParams() y viaja directo al Custom Hook de fetch singular.
function DetallePlanta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const { planta, setPlanta, loading, error } = useFetchPlanta(id);
  const { actualizarPlanta } = useActualizarPlanta();
  const { eliminarPlanta } = useEliminarPlanta();

  const [editando, setEditando] = useState(false);

  if (loading) return <p className="cargando">Cargando planta...</p>;
  if (error) return <p className="error-mensaje">Error: {error}</p>;

  const handleActualizar = async (idPlanta, cambios) => {
    const actualizada = await actualizarPlanta(idPlanta, cambios);
    if (actualizada) {
      setPlanta(actualizada); // reflejar el cambio sin volver a pedir todo
      setEditando(false);
    }
  };

  const handleEliminar = async () => {
    const seElimino = await eliminarPlanta(planta.id);
    if (seElimino) {
      navigate("/"); // navegación programática: no hay un <Link> que clickear acá
    }
  };

  return (
    <section className="tarjeta detalle-personaje">
      <button
        type="button"
        className="boton-volver"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      {editando ? (
        <FormularioPlanta
          plantaEnEdicion={planta}
          onActualizar={handleActualizar}
          onCancelar={() => setEditando(false)}
        />
      ) : (
        <>
          {planta.image ? (
            <img
              src={planta.image}
              alt={planta.name}
              className="detalle-imagen"
            />
          ) : (
            <div className="avatar-generico avatar-grande">{planta.name}</div>
          )}

          <h2>{planta.name}</h2>
          <p className={`estado estado-${planta.status.toLowerCase()}`}>
            {planta.status} · {planta.species}
          </p>

          <div className="detalle-acciones">
            <button
              type="button"
              className="boton-editar"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>
            <button
              type="button"
              className="boton-eliminar"
              onClick={handleEliminar}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default DetallePlanta;
