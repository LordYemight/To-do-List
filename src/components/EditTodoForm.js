import React, { useState } from 'react'
import '../styles/EditTodoForm.css'

const EditTodoForm = ({ editTodo, todo }) => {

  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, todo.id)
    setValue('')
  }

  return (
    <form className="todoEditForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        value={value}
        placeholder='Update task'
        className='addTodo'
      />
      <button type='submit' className='todo-btn'>
        Update
      </button>
    </form>
  )
}

export default EditTodoForm;