import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api"

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName:"",
            password:"",
            nombre:"",
            apellido:"",
            dni:"",
            errores:[]

         }
    }

    cambioValor= (u) =>{
        const state=this.state;
        state[u.target.name]=u.target.value;
        this.setState({ state, errores:[] });

    }

    verificarError(elemento) {

        return this.state.errores.indexOf(elemento) !==-1;

    }

    enviarDatos= (u) =>{
        u.preventDefault();
       

        const{userName,password,nombre,apellido,dni}= this.state;
      

        var errores=[];
        if(!userName)errores.push("error_userName");
        if(!password)errores.push("error_password");
        if(!nombre)errores.push("error_nombre");
        if(!apellido)errores.push("error_apellido");
        if(!dni)errores.push("error_dni");

        this.setState({errores:errores});
        if (errores.length>0)return false;


        var datosEnviar= {userName:userName, password:password, nombre:nombre, apellido:apellido, dni:dni}


        fetch(Api+"?insertar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
                        
            console.log(datosRespuesta);
            this.props.history.push("/");
            
        })

        .catch(console.log)
    }


    


    render() { 

        const{userName,password,nombre,apellido,dni}= this.state;

        return ( 
            <div className="card">
                <div className="card-header">
                    Usuarios
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>

                         <div className="form-group">
                          <label htmlFor="">Usuario:</label>
                          <input required type="text" name="userName" id="userName" value={userName} onChange={this.cambioValor} className={ ((this.verificarError("error_userName"))?"is-invalid":"" )+" form-control"} placeholder="Ingresa el usuario" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback"></small>
                         
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Contraseña:</label>
                          <input required type="text" name="password" id="password" value={password} onChange={this.cambioValor} className={ ((this.verificarError("error_password"))?"is-invalid":"" )+" form-control"} placeholder="Ingresa contraseña del usuario" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback"></small>
                         
                        </div>

                          
                        <div className="form-group">
                          <label htmlFor="">Nombre:</label>
                          <input required type="text" name="nombre" id="nombre" value={nombre} onChange={this.cambioValor} className={ ((this.verificarError("error_nombre"))?"is-invalid":"" )+" form-control"} placeholder="Ingresa el nombre del usuario" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback"></small>
                         
                        </div>

                        <div className="form-group">
                         <br></br>
                          <label htmlFor="">Apellido:</label>
                          <input required  type="text" name="apellido" id="apellido" value={apellido} onChange={this.cambioValor} className={ ((this.verificarError("error_apellido"))?"is-invalid":"" )+" form-control"} placeholder="Ingresa el apellido del usuario" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback"></small>
                          <br></br>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">DNI:</label>
                          <input required  type="text" name="dni" id="dni" value={dni} onChange={this.cambioValor} className={ ((this.verificarError("error_dni"))?"is-invalid":"" )+" form-control"} placeholder="Ingresa el dni del usuario" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback"></small>
                          <br></br>
                        </div>
                             <br></br>
                            <div className="btn-group" role="group" aria-label="">
                                <tr> 
                                    <td><button type="submit" className="btn btn-success">Agregar nuevo usuario</button></td>
                                </tr>
                               <tr>
                                   <td><Link to={"/"} className="btn btn-primary">Cancelar</Link></td>
                               </tr>
                            </div>

                    </form>
                   
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div>

            
         );
    }
}
 
export default Crear;
