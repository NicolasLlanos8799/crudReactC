import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api"




class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            usuarios: []
        }
    }

    borrarRegistros=(id)=> {
        console.log(id);

        fetch(Api+"?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
                        
            console.log(datosRespuesta);
            this.cargarDatos();
        })

        .catch(console.log)

    }


    cargarDatos(){

        fetch(Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
                        
            console.log(datosRespuesta);
            this.setState({ datosCargados:true, usuarios:datosRespuesta})
            
        })

        .catch(console.log)

    }

    componentDidMount(){
        this.cargarDatos();

    }


    render() { 
        const{datosCargados,usuarios}=this.state

        if(!datosCargados){ return(<div>Cargando...</div>); }
        else{


            return ( 
                <div className="card">
                    <div className="card-header">
                    <Link className="btn btn-success" to={"/Crear"}> Agregar nuevo usuario</Link> 
                    </div>
                    <div className="card-body">
                      <h4> Lista de Usuarios </h4>
                    <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(
                        (usuario)=>(
                            <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido}</td>
                        <td>{usuario.dni}</td>
                        <td> 
                            <div className="btn-group" role="group" aria-label="">
                                <Link className="btn btn-primary" to={"/Editar/"+usuario.id} 

                                
                                >Editar</Link>


                                <button className="btn btn-danger"
                                onClick={()=>this.borrarRegistros(usuario.id)}
                                >Borrar</button>
                            </div>    
                            

                        </td>
                    </tr>
                        )
                    )}

                    
                </tbody>
            </table>                  
                    </div>
                    <div className="card-footer text-muted">
                        
                    </div>
                </div>

                );
        }
    }
}
 
export default Listar;