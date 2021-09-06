import React from "react";
import { Link } from "react-router-dom";
import ApiAct from "../servicios/apiAct";

class ListarAct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleados: [],
    };
  }

  borrarActividades = (id) => {
    console.log(id);

    fetch(ApiAct + "?borrar=" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.cargarDatos();
      })
      .catch(console.log);
  };

  cargarDatos() {
    fetch(ApiAct)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({ datosCargados: true, actividades: datosRespuesta });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, actividades } = this.state;

    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-success" to={"/crearAct"}>
              Agregar nueva actividad
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de Actividades</h4>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Usuarios Inscriptos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actividades.map((actividad) => (
                  <tr key={actividad.id}>
                    <td>{actividad.id}</td>
                    <td>{actividad.nombre}</td>
                    <td>{actividad.inscriptos}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link
                          className="btn btn-primary"
                          to={"/EditarAct/" + actividad.id}
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.borrarActividades(actividad.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}

export default ListarAct;
