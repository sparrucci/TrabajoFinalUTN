import { useState } from "react";
import { URL_PLANTAS } from "../utils/api";

function useCrearPlanta() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearPlanta = async (nuevaPlanta) => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch(URL_PLANTAS, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(nuevaPlanta),
      });
      if (!respuesta.ok) {
        throw new Error("No se pudo crear el character: `$(respuesta.status)`");
      }

      return await respuesta.json();
    } catch (error) {
      setError(error.message || "Ocurrio un error al crear el character");
    } finally {
      setLoading(false);
    }
  };

  return { crearPlanta, loading, error };
}

export default useCrearPlanta;
