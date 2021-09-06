import React from "react";
import { Link } from "react-router-dom";
import ApiAct from "../servicios/apiAct";

class CrearAct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      inscriptos: "",
      errores: [],
    };
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores: [] });
  };

  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }

  enviarDatos = (e) => {
    e.preventDefault();
    console.log("Actividad enviada...");

    const { nombre, inscriptos } = this.state;
    console.log(nombre);
    console.log(inscriptos);

    var errores = [];
    if (!nombre) errores.push("error_nombre");
    if (!inscriptos) errores.push("error_inscriptos");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    var datosEnviar = { nombre: nombre, inscriptos: inscriptos };

    fetch(ApiAct + "?insertar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  render() {
    const { nombre, inscriptos } = this.state;

    return (
      <div className="card">
        <div className="card-header">Actividades</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Nombre:</label>
              <input
                required
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.cambioValor}
                value={nombre}
                className={
                  (this.verificarError("error_nombre") ? "is_invalid" : "") +
                  " form-control"
                }
                placeholder="Ingrese nombre de Actividad"
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback"></small>
            </div>

            <div className="form-group">
              <label htmlFor="">Inscriptos:</label>
              <input
                required
                type="text"
                name="inscriptos"
                id="inscriptos"
                onChange={this.cambioValor}
                value={inscriptos}
                className={
                  (this.verificarError("error_inscriptos")
                    ? "is_invalid"
                    : "") + " form-control"
                }
                placeholder="Ingrese numero de Inscriptos"
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback"></small>
            </div>

            <p></p>

            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar
              </button>
              <Link to={"/"} className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default CrearAct;
