import React, {createContext, useState} from 'react'

const StorageContext = createContext();

const storageProvider = ({children}) => {
    const [todos, setTodos] = useState([]);
    const addTodo = () => {

    }
    const removeTodo = () => {

    }
    const editTodo = () => {
        
    }
  return (
    <div>

    </div>
  )
}

export default storageProvider