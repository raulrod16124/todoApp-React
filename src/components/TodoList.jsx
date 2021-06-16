import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({ todos, deleteTask, taskFinished }) {
    return (
        <ul className="list">
            {todos.map( ( todo ) => (
                <TodoItem key={todo.id} todo={todo} deleteTask={deleteTask} taskFinished={taskFinished} />
            ))}
        </ul>
    )
}
