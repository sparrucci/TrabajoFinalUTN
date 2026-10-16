import { useEffect } from "react";
import { useState } from "react";
import { URL_PLANTAS } from "../utils/api";

function useFetchPlantas() {
  // Los datos que me trae la API
  const [plantas, setPlantas] = useState([]);
  // Loading para avisarle al usuario que su petición se está cargando
  const [loading, setLoading] = useState(true);
  // Error, para enviarlo a la pantalla y que el usr lo pueda ver en tiempo real
  const [error, setError] = useState(null);

  // Implementación de Función principal - aca NO se está ejecutando
  const fetchPlantas = async () => {
    // seteamos el loading en true para asegurarnos de que estará en true, es decir que no quedó basura de la ejecución anterior
    //hacemos lo mismo con el error
    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(URL_PLANTAS);
      //valido y, si algo salió mal, capturo el error
      console.log(respuesta);
      if (!respuesta.ok) {
        throw new Error(
          `Error en la llamada: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      //parsea de JSON a objeto de javascript
      // ahora tenemos el control total y, entre otras cosas, puedo aplicarle metodos de tipos (string, array, objetos, numeros)
      //aplicarle funciones, bucles , destructurarlo
      const plantasParseadas = await respuesta.json();

      // este formato --> setPlantas(plantasParseadas.results); no funciona con mi API
      // ya que el formato de mi API es distinto a:
      // { info: {...}, results: [...] }
      setPlantas(plantasParseadas);
    } catch (error) {
      setError(error.message || "Ocurrió un error en la API");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlantas();
  }, []);

  return { plantas, loading, error, fetchPlantas, setPlantas };
}

export default useFetchPlantas;
