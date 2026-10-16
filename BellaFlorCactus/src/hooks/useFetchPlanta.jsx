import { useState, useEffect } from "react";
import { URL_PLANTAS } from "../utils/api";

// Custom Hook de lectura de UNA SOLA planta, por id. Hermano de
// useFetchPlantas (plural) — mismo patrón, pero pide un recurso puntual
// en vez de la colección entera. Pensado para la página de detalle, donde
// el id sale de la URL con useParams().
function useFetchPlanta(id) {
  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mismo fix que en useFetchPersonajes: nada de setState síncrono antes
    // del primer await, para no disparar el warning de "setState síncrono
    // dentro de un efecto".
    const cargarPlanta = async () => {
      try {
        const respuesta = await fetch(`${URL_PLANTAS}/${id}`);

        if (!respuesta.ok) {
          throw new Error(
            `Error en la llamada: ${respuesta.status} ${respuesta.statusText}`,
          );
        }

        const datos = await respuesta.json();
        setPlanta(datos);
        setError(null);
      } catch (err) {
        setError(err.message || "Ocurrió un error en la API");
      } finally {
        setLoading(false);
      }
    };

    cargarPlanta();
  }, [id]); // si cambia el id de la URL, se vuelve a pedir solo

  return { planta, setPlanta, loading, error };
}

export default useFetchPlanta;
