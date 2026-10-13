import { useState } from "react";
import { URL_SPIDERS } from "../utils/api";

// Este delete es HARD delete ya que elimina el dato
// Diferente al SOFT delete que es un borrado lógico 
// es decir se agrega un dato mas en un campo de la tabla
// generalmente  "deletedAt" como timestamp

function useEliminarSpider() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const eliminarSpider = async (id) => {
    setLoading(false);
    setError(null);

    try {
      const respuesta = await fetch(`${URL_SPIDERS}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo eliminar el character: ${respuesta.status}`,
        );
      }
      return true;
    } catch (error) {
      setError(error.message || "Ocurrio un error al eliminar el character");
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, eliminarSpider };
}

export default useEliminarSpider;
