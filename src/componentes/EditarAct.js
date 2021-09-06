import React from "react";
import { Link } from "react-router-dom";
import ApiAct from "../servicios/apiAct";

class EditarAct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: false, actividad: [] };
  }

  cambioValor = (e) => {
    const state = this.state.actividad;

    state[e.target.name] = e.target.value;
    this.setState({ actividad: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    console.log("Cambios enviados...");
    const { id, nombre, inscriptos } = this.state.actividad;
    console.log(id);
    console.log(nombre);
    console.log(inscriptos);

    var datosEnviar = { id: id, nombre: nombre, inscriptos: inscriptos };

    fetch(ApiAct + "?actualizar=1", {
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

  componentDidMount() {
    console.log(this.props.match.params.id);

    fetch(ApiAct + "?consultar=" + this.props.match.params.id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log("=>" + datosRespuesta);
        this.setState({ datosCargados: true, actividad: datosRespuesta[0] });
      })
      .catch(console.log);
  }

  render() {
    const { datosCargados, actividad } = this.state;

    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">Editar Actividades</div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="">ID: </label>
              <input
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.cambioValor}
                value={actividad.id}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted"></small>
            </div>

            <form onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">Nombre:</label>
                <input
                  required
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={this.cambioValor}
                  value={actividad.nombre}
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted"></small>
              </div>

              <div className="form-group">
                <label htmlFor="">Inscriptos:</label>
                <input
                  required
                  type="text"
                  name="inscriptos"
                  id="inscriptos"
                  onChange={this.cambioValor}
                  value={actividad.inscriptos}
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted"></small>
              </div>

              <p></p>

              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Actualizar
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
}

export default EditarAct;
