import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import '../styles/TodoContainer.css'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm';

// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

const TodoContainer = () => {

  const loadedTodos = localStorage.getItem("todos") 
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
  
  const [todos, setTodos] = useState(loadedTodos);

  const [active, setActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleShowAll = () => {
    setActive(true);
    setShowCompleted(false);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(true);
    setActive(false);
  };

  // Filter todos based on the showAll and showCompleted states
  const filteredTodos = active
    ? todos.filter((todo=> !todo.completed))
    : showCompleted
    ? todos.filter((todo) => todo.completed)
    : [];

  const addTodo = todo => {
    const random = () => {
      return Math.floor((Math.random() * 10) * 100000000000)
    }
    const newTodo = {
      // id: uuidv4(), to generate unique id keys.
      id: random(),
      task: todo,
      completed: false,
      createdAt: new Date().toLocaleString(),
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    
  };


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  

  const toggleComplete = id => {
    setTodos(todos.map((todo)=> todo.id === id ? {
      ...todo, completed: !todo.completed
    } : todo))
  }

  const deleteTodo = id => {
    let updatedTodos = todos.filter(todo => todo.id !== id)
    return setTodos(updatedTodos)

  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, isEditing : !todo.isEditing
    } : todo
    ))
  }

  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, 
      task,
      isEditing: !todo.isEditing
    }
    : todo
    ))
  }
  
  return (
    <div className='todoContainer'>
      <h1 className='todoList'>Todo List</h1>
      <TodoForm addTodo = {addTodo}/>
      <div className="toggle-buttons">
        <button onClick={toggleShowAll} className={active ? 'active' : 'off'}>Active</button>
        <button onClick={toggleShowCompleted} className={showCompleted ? 'showCompleted' : 'off'}>Completed</button>
      </div>
      {filteredTodos.map((todo) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} todo={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      ))}

    </div>
  )
}

export default TodoContainer