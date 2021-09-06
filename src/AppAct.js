import "./AppAct.css";

import ListarAct from "./componentes/ListarAct";
import CrearAct from "./componentes/CrearAct";
import EditarAct from "./componentes/EditarAct";
import { Route, BrowserRouter as Router } from "react-router-dom";

// import { Link } from "react-router-dom";

function AppAct() {
  return (
    <Router>
      {/* <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>
            Actividades <span className="sr-only"></span>
          </Link>
        </div>
      </nav> */}

      <div className="container">
        <br></br>

        <Route exact path="/" component={ListarAct}></Route>
        <Route path="/crearAct" component={CrearAct}></Route>
        <Route path="/editarAct/:id" component={EditarAct}></Route>
      </div>
    </Router>
  );
}

export default AppAct;
