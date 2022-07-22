import React, { useEffect, useState } from 'react'
import { firebase } from './firebase';

export const Proceso = () => {

    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState('')
    const [nota, setNota] = useState('')


    //Funcion Agregar
    const agregar = async (e) => {
        e.preventDefault()
        try {
            //Conectamos database
            const db = firebase.firestore()

            //Creo mi json
            const nuevaTarea ={
                tarea: tarea,
                nota: nota
            }

            //Mando a coleccion mi json
            const data = await db.collection('tareas').add({
                tarea: tarea,
                nota: nota
            })

            setTareas([
                ...tareas, {id: data.id, ...nuevaTarea}
            ])
            console.log("Funiciona??")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        //Obtener datos de mi base por funcion
        const obtenerDatos = async () => {
            const db = firebase.firestore()
            try {
                const data = await db.collection('tareas').get()
                console.log(data)
                const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))            
                console.log(arrayData)
                setTareas(arrayData)
            } catch (error) {
                console.log(error)
            }
        }

        //Lllamar a mi funcion
        obtenerDatos()
    },[])

  return (
    <div className='container'>
        <div className='row'>
        <div className='col-md-6'>
            <h1>Lista de Tareas</h1>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>TAREA</th>
                        <th>NOTA</th>
                        <th>EDITAR</th>
                        <th>BORRAR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Consumir mi arreglo tarea
                        tareas.map(item =>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.tarea}</td>
                                <td>{item.nota}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <div className='col-md-6'>
            <h1>Formulario</h1>
            <form onSubmit={agregar}>
                <p><input type="text" 
                className='form-control mb-2' 
                placeholder='Tarea aqui' 
                required
                onChange={e => setTarea(e.target.value)}
                /></p>
                <p><input type="text" 
                className='form-control mb-2' 
                placeholder='Nota aqui' 
                required
                onChange={e => setNota(e.target.value)}
                /></p>
                <p><button className='btn btn-dark'>Agregar</button></p>
            </form>
        </div>
    </div>
    </div>
  )
}
