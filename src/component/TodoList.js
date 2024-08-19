import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo }) {
    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} index={index} onDeleteTodo={onDeleteTodo} />
            ))}
        </ul>
    );
}

export default TodoList;