import React, { useState } from 'react'
import { URL_SPIDERS } from '../utils/api'


function useCrearSpider() {
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(null)

    const crearSpider = async (nuevoSpider)=>{
        setLoading(true)
        setError(null)
        try {
            const respuesta = await fetch(URL_SPIDERS, {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify(nuevoSpider),
            })
            if(!respuesta.ok){
                throw new Error("No se pudo crear el character: `$(respuesta.status)`");
            }

            return await respuesta.json()

        } catch (error) {
            setError(error.message || "Ocurrio un error al crear el character")
        } finally {
            setLoading(false)
        }
    }


  return { crearSpider, loading, error}
}

export default useCrearSpider