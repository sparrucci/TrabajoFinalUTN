import { useState } from "react";

const FORM_VACIO = {
  name: "",
  species: "",
  status: "",
  image: "",
};

//es tipo ENUM
const ESTADOS = ["Actuando", "Jugando", "unknown"];

// Este componente tiene la responsabillidad de reunir la información para crear el registro. No es responsable del envío de los datos
function FormularioSpider({
  spiderEnEdicion,
  onCrear,
  onCancelar,
  onActualizar,
}) {
  //formulario controlado: es un formulario linkeado con el estado. Es un objeto
  const [form, setForm] = useState(FORM_VACIO);
  const [enviando, setEnviando] = useState(false);

  
// Fix del warning "setState síncrono dentro de un efecto"
const [spiderAnterior, setSpiderAnterior] = useState(spiderEnEdicion);
  if (spiderEnEdicion !== spiderAnterior) {
    setSpiderAnterior(spiderEnEdicion);
    setForm(
      spiderEnEdicion
        ? {
            name: spiderEnEdicion.name,
            species: spiderEnEdicion.species,
            status: spiderEnEdicion.status,
            image: spiderEnEdicion.image || "",
          }
        : FORM_VACIO,
    );
  }


  //Usa los atributos name y value para saber que parte del objeto form actualizar
  //sin importar cuantos cambios tenga el formulario
  //ni tampoco el tipo de input que fue utilizado
  const manejarCambios = (evento) => {
    const { name, value } = evento.target;
    setForm((actual) => ({ ...actual, [name]: value }));
  };

  const handleSubmit = async (evento) => {
    //despues lo completamos
    evento.preventDefault();
    if (form.name.trim() === "" || form.species.trim() === "") return;

    // agrego Try catch porque me seguia dando error
    setEnviando(true);
    try{
      if (spiderEnEdicion) {
        await onActualizar(spiderEnEdicion.id, form);
      } else {
        // el await genera una pausa, manda la info y espera rpta
        await onCrear(form);
        //hasta que no responsa la API no setea el formulario
        setForm(FORM_VACIO);
      }
    } catch (error) {
      console.error("hubo un error al enviar:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-personaje">
      <h3>
        {" "}
        {spiderEnEdicion
          ? `Editando a ${spiderEnEdicion.name}`
          : "Creando un Spider"}{" "}
      </h3>
      <div className="campo">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios}
          placeholder="Ej: Spider-Man"
        />
      </div>
      <div className="campo">
        <label htmlFor="species">Especie</label>
        <input
          type="text"
          id="species"
          name="species"
          value={form.species}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios}
          placeholder="Ej: Humano-Arácnido"
        />
      </div>

      {/* Lo cambie por un select porque no lo tomaba*/}
      <div className="campo">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={manejarCambios}
        >
          <option value="">Selecciona un estado...</option>
          {ESTADOS.map((estado, index) => (
            <option key={index} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      <div className="campo campo-ancho">
        <label htmlFor="image">URL de la foto</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="https://..."
          value={form.image}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios}
        />
      </div>
      {/*//preview de imagenes //copio el código del profe
          Tarjeta que se escribe sola: React redibuja esto en cada tecla
          porque "form" cambia con cada onChange — la prueba visual de
          que el input está controlado. */}
      <div className="tarjeta-preview">
        {form.image ? (
          <img src={form.image} alt="" className="tarjeta-preview-imagen" />
        ) : (
          <div className="tarjeta-preview-avatar">{form.name || "?"}</div>
        )}
        <span className={`estado estado-${form.status.toLowerCase()}`}>
          {form.name || "Nombre..."} · {form.species || "Especie..."}
        </span>
      </div>

      <div className="formulario-botones">
        {/* disable permite que si un boton esta en true no pueda ser usado */}
        <button type="submit" disabled={enviando}>
           {enviando ? "Guardando..." : spiderEnEdicion ? "Guardar cambios": "Crear Spider"}
        </button>

        {spiderEnEdicion && (
          <button
            className="botón-secundario"
            onClick={onCancelar}
            type="button"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioSpider;
