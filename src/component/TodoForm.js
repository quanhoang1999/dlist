import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onAddTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}

                placeholder="Nhập việc cần làm..."
            />
            <button type="submit">Thêm</button>
        </form>
    );
}

export default TodoForm;