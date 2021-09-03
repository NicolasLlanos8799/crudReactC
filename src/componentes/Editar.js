import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api"

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados:false, 
            usuario:[]
            
          }
    }

    cambioValor= (u) =>{
        const state=this.state.usuario;
        state[u.target.name]=u.target.value;
        this.setState({ usuario:state });

    }

    enviarDatos = (u) =>{
        u.preventDefault();
       
        const{id,userName, password,nombre,apellido,dni}= this.state.usuario;
        

        var datosEnviar= {id:id, userName:userName, password:password, nombre:nombre, apellido:apellido, dni:dni}


        fetch(Api+"?actualizar=1",{
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

    componentDidMount(){
        console.log(this.props.match.params.id);

        fetch(Api+"?consultar="+this.props.match.params.id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
                        
            console.log("=>"+datosRespuesta);

            this.setState({
                 datosCargados:true, 
                 usuario:datosRespuesta[0]
                })
            
        })

        .catch(console.log)

    }

 

    render() { 
        const{datosCargados,usuario}=this.state

        if(!datosCargados){
             return(<div>Cargando...</div>);
             }
        else{


        return ( <div className="card">
            <div className="card-header">
                Editar Usuarios
            </div>
            <div className="card-body">
              

                <form onSubmit={this.enviarDatos}>
               

                            <div className="form-group">
                            <label htmlFor="">ID:</label>
                            <input type="text" readOnly className="form-control" value={usuario.id}  onChange={this.cambioValor} name="id" id="id" aria-describedby="helpId" placeholder=""/>
                            <small id="helpId" className="form-text text-muted">ID del usuario</small>
                            <br></br>
                            </div>

                            <div className="form-group">
                             <br></br>
                            <label htmlFor="">Usuario:</label>
                            <input type="text" name="userName" id="userName" value={usuario.userName} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Ingresa el usuario</small>
                           
                          </div>

                          <div className="form-group">
                             <br></br>
                            <label htmlFor="">Contraseña:</label>
                            <input type="text" name="password" id="password" value={usuario.password} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Ingresa la contraseña del usuario</small>
                           
                          </div>


                          <div className="form-group">
                             <br></br>
                            <label htmlFor="">Nombre:</label>
                            <input type="text" name="nombre" id="nombre" value={usuario.nombre} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Ingresa el nombre del usuario</small>
                           
                          </div>
  
                          <div className="form-group">
                           <br></br>
                            <label htmlFor="">Apellido:</label>
                            <input type="text" name="apellido" id="apellido" value={usuario.apellido} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Ingresa el apellido del usuario</small>
                            <br></br>
                          </div>
  
                          <div className="form-group">
                           <br></br>
                            <label htmlFor="">DNI:</label>
                            <input type="text" name="dni" id="dni" value={usuario.dni} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Ingresa el dni del usuario</small>
                            <br></br>
                          </div>
                               <br></br>
                              <div className="btn-group" role="group" aria-label="">
                                  <tr>
                                      <td>
                                      <button type="submit" className="btn btn-success">Actualizar datos</button>
                                      </td>
                                  </tr>
                                <tr>
                                    <td>
                                    <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                                    </td>
                                </tr>
                              </div>
  
                      </form>

            </div>
            <div className="card-footer text-muted">
                
            </div>
        </div>  );
        }
    }
}
 
export default Editar;