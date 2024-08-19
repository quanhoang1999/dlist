import React from 'react';

function TodoItem({ todo, index, onDeleteTodo }) {
    return (
        <li>
            {todo}
            <button onClick={() => onDeleteTodo(index)}>Xóa</button>
        </li>
    );
}

export default TodoItem;