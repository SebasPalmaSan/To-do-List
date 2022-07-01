import React from "react";
import { nanoid } from "nanoid";
function App() {

  const [ tarea, setTarea ] = React.useState('')
  const [ tareas, setTareas ] = React.useState([])
  const [ editarTarea, setEditarTarea ] = React.useState(false)
  const [ idTarea, setIdTarea ] = React.useState('')
  const [ errorTarea, setErrorTarea ] = React.useState(null)
  const agregarNuevaTarea = e => {
    e.preventDefault();
    
    if (!tarea.trim()){
      console.log('Elemento Vacío')
      setErrorTarea('El campo no puede estar vacío')
      return
    }
    console.log(tarea);
    setTareas([...tareas, {id: nanoid(), nombreTarea:tarea}])
    setTarea('')
    setErrorTarea(null)
  }

  const eliminarTarea = id => {
    const filterArray = tareas.filter(item => item.id !== id)
    setTareas(filterArray)
  }

  const editar = item => {
    console.log(item)
    setEditarTarea(true)
    setTarea(item.nombreTarea)
    setIdTarea(item.id)
  }

  const editarTareaPendiente = e => {
    e.preventDefault();
    if (!tarea.trim()){
      console.log('Elemento Vacío')
      setErrorTarea('El campo no puede estar vacío')
      return
    }
    const arrayEditado = tareas.map(
      item => item.id === idTarea ? {idTarea, nombreTarea:tarea} : item
      )

    setTareas(arrayEditado)
    setEditarTarea(false)
    setTarea('')
    setIdTarea('')
    setErrorTarea(null)
  }

  return (
    <div className="container mt-2">
      <h1 className="text-center">TO DO LIST</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">

            {
              
              tareas.length === 0 ? (
                <li className="list-group-item">No hay Tareas pendientes</li>

              ) : (

                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>
  
                    <button 
                      className="btn btn-danger btn-sm float-right mx-1"
                      onClick={() => eliminarTarea(item.id)}
                      >
                        Eliminar
                    </button>
  
                    <button 
                      className="btn btn-success btn-sm float-right mx-1"
                      onClick={() => editar(item)}
                      >
                        Editar
                    </button>
  
                  </li>
                ))

              )
              
            }

        </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              editarTarea ? 'Editar Tarea' : 'Agregar una Tarea Nueva'
            }
          </h4>
          <form onSubmit={editarTarea ? editarTareaPendiente : agregarNuevaTarea}>

            {
              errorTarea ? <span className="text-danger">{errorTarea}</span> : null
            }

            <input 
            type="text" 
            className="form-control mb-2"
            placeholder="Ingrese nueva tarea" 
            onChange={e => setTarea(e.target.value)}
            value={tarea}
            />

            {
              editarTarea ? (
                <button className="btn btn-info btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;


