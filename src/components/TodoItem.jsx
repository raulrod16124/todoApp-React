import React from 'react'

export function TodoItem( { todo, deleteTask, taskFinished } ) {

    const { id, date, task, completed } = todo

    const handleDeleteTask = () => {
        deleteTask(id);
    }

    const handleChecktask = () => {
        taskFinished(id)
    }

    return (
        <li className="task">
            <input className="check" type="checkbox" onChange={handleChecktask}/>
            <p>{task}</p>
            <p>{date}</p>
            <i className="far fa-times-circle close" onClick={handleDeleteTask}></i>
        </li>
    )
}
