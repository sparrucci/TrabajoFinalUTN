import { useState, useEffect } from "react";
import { URL_SPIDERS } from "../utils/api";

// Custom Hook de lectura de UN SOLO spider, por id. Hermano de
// useFetchSpiders (plural) — mismo patrón, pero pide un recurso puntual
// en vez de la colección entera. Pensado para la página de detalle, donde
// el id sale de la URL con useParams().
function useFetchSpider(id) {
  const [spider, setSpider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mismo fix que en useFetchPersonajes: nada de setState síncrono antes
    // del primer await, para no disparar el warning de "setState síncrono
    // dentro de un efecto".
    const cargarSpider = async () => {
      try {
        const respuesta = await fetch(`${URL_SPIDERS}/${id}`);

        if (!respuesta.ok) {
          throw new Error(`Error en la llamada: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        setSpider(datos);
        setError(null);
      } catch (err) {
        setError(err.message || "Ocurrió un error en la API");
      } finally {
        setLoading(false);
      }
    };

    cargarSpider();
  }, [id]); // si cambia el id de la URL, se vuelve a pedir solo

  return { spider, setSpider, loading, error };
}

export default useFetchSpider;
