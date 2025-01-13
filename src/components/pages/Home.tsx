import { devToolsEnhancer } from '@reduxjs/toolkit/dist/devtoolsExtension';
import { taskCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import { nanoid } from 'nanoid';
import React,{ useState, useEffect } from 'react';
import { GiCalendar } from "react-icons/gi";
import AddModal from '../modals/AddModal';
import EditModal from '../modals/EditModal';

export interface Task {
  id: string,
  title: string,
  color: string,
  reminderTime?: number,
}

const Home = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const scheduleReminder = (task: Task) => {
    if(task.reminderTime && task.reminderTime > Date.now()) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage({
          todoItem: task,
          reminderTime: task.reminderTime - Date.now ()
        })
      })
    }
  }

  const AddTodo = (newTask: Task) => {
    const task = {...newTask, id:nanoid()};
    setTodos((prevTodoList:Task[]) => [...prevTodoList, task]);
    scheduleReminder(task);
  }

  const deleteTodo = (taskId: string) => {
    setTodos((prevTodoList:Task[]) => prevTodoList.filter((task) => taskId !== task.id));
  }

  const editTodo = (taskId:string, updatedTask: Task) => {
    setTodos((prevToDoList:Task[]) => prevToDoList.map((task:Task) => task.id === taskId ? updatedTask : task));
    if(updatedTask.reminderTime && updatedTask.reminderTime > Date.now()){
      scheduleReminder(updatedTask);
    }
  }

  const handleEdit = (taskId: string) => {
    setSelectedTask(todos.find((task) => task.id === taskId));
    setIsEditing(true);
  }

  useEffect(() => {
    localStorageLoaded ? localStorage.setItem("todoStorage", JSON.stringify(todos)) : null;
  }, [todos, localStorageLoaded]);

  useEffect(() => {
    const todoList = localStorage.getItem('todoStorage');
    if(todoList){
      const loadedTodos: Task[] = JSON.parse(todoList);
      setTodos(loadedTodos);
      loadedTodos.forEach(scheduleReminder);
    }
    setLocalStorageLoaded(true);
  }, [])
  

  return (
    <div className='text-black text-lg flex justify-center items-center p-2 pt-4'>
      <div className='bg-gradient-to-tl from-purple-400 to-purple-500  min-h-[65vh] h-auto mx-1 lg:mx-0 w-full lg:w-[65vw] lg:flex lg:gap-4 px-0 lg:px-4 lg:justify-between rounded-lg shadow-md group mt-4 lg:mt-9'>
        <div className='hidden h-full lg:flex justify-center w-1/3 text-center mx-10'>
          <div className='text-white text-center text-7xl font-semibold p-2 group-hover:animate-spin mt-[30vh]'>Plannify</div>
        </div>
        <div className='w-full lg:w-2/3 h-full  pt-10 px-4 lg:px-15'>
          <div className='flex justify-between '>
            <span className='w-1/2 flex items-center'>
              <span className='mr-1 inline-flex border border-black text-white'><GiCalendar size={29}/></span>
              <span className='font-bold font-mono text-4xl text-white'>Event</span>
            </span>
            <button className='text-5xl font-mono font-extrabold z-30 hover:scale-105' onClick={() => setModalOpen(true)}>+</button>
          </div>
          <div className='overflow-hidden'>
            {todos.length !== 0 ? todos.map((task:Task) => (
            <div key={task.id} className='min-h-20 bg-white shadow my-4 rounded-md flex items-center px-1 justify-between'>
              <span className='font-[500] bg-slate-50 px-1 py-2 w-3/4'>{task.title}</span>
              <span className='w-1/4 ml-2 '>
                <button className='bg-slate-600 text-white px-3.5 rounded-lg py-2 m-1' onClick={() => handleEdit(task.id)}>Edit</button>
                <button className='bg-red-600 text-white px-4 py-2 rounded-lg m-1' onClick={() => deleteTodo(task.id)}>Del</button>
              </span>
            </div>
            )) : <div className='bg-white mt-7 rounded shadow p-4 text-center text-lg font-medium font-mono'>No Scheduled Tasks</div>}
          </div>          
        </div>
        {modalOpen && <AddModal AddTodo={AddTodo} modalOpen={modalOpen} closeModal={()=>setModalOpen(false)}/>}
        {isEditing && <EditModal selectedTask={selectedTask} EditTodo={editTodo} modalOpen={isEditing} closeModal={()=>setIsEditing(false)}/>}
      </div>
    </div>
  )
}

export default Home