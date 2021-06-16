import React, { Fragment, useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 }from 'uuid';
import { TodoList } from './components/TodoList';
import './css/style.css';

const KEY = "todoApp.todos";

export function App() {

    // Uso de useState para gestionar los estados dentro de la función. Destructuín para obtener los estados y el modificador de estados
    const [ todos, setTodos ] = useState([{
        id: 1,
        date: '00/00/0000',
        task: 'Write my first task',
        completed: false
    }]);

    // Uso de useRef para obtener el valor del input a través de una referencia como atributo
    const takeTodoRef = useRef();

    // Uso de useEffect para guardar datos en el localStore del navegador
    // Obtener datos del localstore
    useEffect( () => {
        const storeTodos = JSON.parse(localStorage.getItem(KEY));
        if(storeTodos){
            setTodos(storeTodos);
        }
    }, [] );
    // Guardar datos en localstore
    useEffect( () => {
        localStorage.setItem( KEY, JSON.stringify(todos) );
    }, [todos] );

    // Función para introducir la tarea nueva obtenida desde la referencia del input
    const handleTodoAdd = () => {

        const task = takeTodoRef.current.value;

        const date = (new Date().toLocaleDateString());

        if( task === "" ) return;

        // Uso del modificador de estados para introducir el estado anterior con [...prevState] y el todo nuevo
        setTodos( ( prevTodos ) => {

            return [...prevTodos, { id: uuidv4(),date , task, completed: false } ] 

        })

        takeTodoRef.current.value = null;

    };

    // Función tarea finalizada
    const taskFinished = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find( (todo) => todo.id === id);
        todo.completed = !todo.completed;
        console.log(newTodos);
        setTodos(newTodos);
    }

    // Función para eliminar tareas, se crea en el padre y se pasa a los componentes hijos como parámetros hasta que llegue al componente que lea el evento
    const deleteTask = (id) => {
        console.log(id);
        const newTodos = todos.filter( todo  => todo.id !== id );
        console.log(newTodos);
        setTodos(newTodos);

    }

    return (
        <Fragment>
            <h1 className="title1">Manage your tasks</h1>
            <div className="setTodos">
                <input type="text" className="input" ref={takeTodoRef} placeholder="Introduce your task"/>
                <button type="button" className="btn" onClick={handleTodoAdd}><i class="fas fa-plus"></i></button>
            </div>
            <h3 className="pendingTask">{todos.filter( ( todo ) => !todo.completed ).length} pending tasks</h3>
            <div className="contentTodos">
                <TodoList todos={todos} deleteTask={deleteTask} taskFinished={taskFinished} />
            </div>
        </Fragment>
    );
}
