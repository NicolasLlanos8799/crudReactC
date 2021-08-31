
import './App.css';

import Listar from "./componentes/Listar";
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";
import WorkOut from "./image/workout.png";


import {Route, BrowserRouter as Router  } from "react-router-dom"

import { Link } from "react-router-dom"


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
            <Link className="nav-item nav-link active" to={"/"}> <img className="logo" src={WorkOut}  alt=""/> <span className="sr-only"></span></Link>
            {/* <Link className="nav-item nav-link" to={"/crear"}>Crear usuario</Link>
            <Link className="nav-item nav-link" to={"/editar"}>Editar usuario</Link> */}
        </div>
    </nav>

    <div className="container">
     <br></br>
     <br></br>
    

     <Route exact path="/" component={Listar}></Route>
     <Route path="/crear" component={Crear}></Route>
     <Route path="/editar/:id" component={Editar}></Route> 
     
    </div>
    </Router>
  );
}

export default App;
