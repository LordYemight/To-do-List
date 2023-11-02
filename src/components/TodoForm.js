import React, { useState } from 'react'
import '../styles/TodoForm.css'


const TodoForm = ({ addTodo }) => {

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('')
    value === '' ? alert('Enter Todo') : addTodo(value)

  }

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        value={value}
        placeholder='Add your to do'
        className='addTodo'
      />
      <button type='submit' className='todo-btn'>
        Add Task
      </button>
    </form>
  )
}

export default TodoForm