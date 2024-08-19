import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const addTodo = () => {
    let updatedTodos;
    if (newTodo) {
      if (editingIndex !== null) {
        // Chỉnh sửa công việc
        updatedTodos = todos.map((todo, index) =>
          index === editingIndex ? { ...todo, text: newTodo } : todo
        );
        setEditingIndex(null);
      } else {
        // Thêm công việc mới
        updatedTodos = [...todos, { id: todos.length + 1, text: newTodo, completed: false }];
      }
      setTodos(updatedTodos);
      setNewTodo('');
      // Lưu danh sách công việc vào Local Storage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const editTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditingIndex(index);
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>{editingIndex !== null ? 'Edit Todo' : 'Add Todo'}</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
          <button onClick={() => toggleTodo(index)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => editTodo(index)}>Edit</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
