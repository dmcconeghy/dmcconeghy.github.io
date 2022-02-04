import { useState } from 'react'
import NewTodoForm from "./NewTodoForm";
import Todo from './Todo';
import "./App.css";


function TodoList() {

    const [todoList, setTodoList] = useState([])

    const addTodo = newTodo => {
        setTodoList(todos => [...todos, newTodo])

    }

    const update = (id, updatedText) => {
        setTodoList(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, text: updatedText } : todo 
            )
        )
    }

    const remove = id => {
        setTodoList(todos => todos.filter(todo => todo.id !== id))
    }

    const renderTodos = todoList.map(todo => (
        <Todo 
            key={todo.id}
            id={todo.id}
            text={todo.text}
            handleRemove={remove}
            update={update}
        />
    )) 

  return (
  <div>
      <NewTodoForm addTodo = { addTodo }/><br/>
      <div>
          <h4>Your Todos:</h4>
          <div className="TodoList">
            <ul >{renderTodos}</ul>
        </div>
      </div>
  </div>
  )
}

export default TodoList;
