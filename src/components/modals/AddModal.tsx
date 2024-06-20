import React, {useState, useEffect} from 'react'
import { Task } from '../pages/Home'

interface AddModalProps {
    AddTodo: (newTask: Task) => void,
    closeModal: () => void,
    modalOpen: boolean
}

const AddModal: React.FC<AddModalProps> = ({AddTodo, modalOpen, closeModal}) => {
const [taskDesc, setTaskDesc] = useState('');
const [colorScheme, setcolorScheme] = useState('#00ff00');
const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault;
        if(!taskDesc){
         setError('Enter a task to be done befre submitting');
         return;   
        }
        AddTodo({
            id: '',
            title: taskDesc,
            color: colorScheme
        })
        setTaskDesc('');
        setcolorScheme('#00ff00');
        closeModal();
    }

    useEffect(() => {
        modalOpen ? document.body.style.overflow === "hidden" : document.body.style.overflow === "auto";
    }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
        <div className='h-[70vh] w-full mx-5 bg-white lg:w-[60vw] min-w-[50vw] mb-6 mt-20 p-4 px-6 relative flex flex-col justify-center items-center rounded-xl'>
            <span className='absolute top-0 right-4 font-bold text-2xl cursor-pointer' onClick={closeModal}>x</span>
            <div className='pt-2 w-[75vw] md:w-[70vw] lg:w-[50vw]'>
                <textarea rows={4} cols={30} value={taskDesc} placeholder="Enter a task" onChange={(e) => {
                    e.preventDefault;
                    setError('');
                    setTaskDesc(e.target.value);
                }} className='outline outline-1 w-full p-2 mb-6 rounded mt-4 resize-none'/>
                <label className='font-semibold'>Choose a Color Scheme</label>
                <input type="color" value={colorScheme} onChange={(e) => {
                    e.preventDefault;
                    setcolorScheme(e.target.value);
                }} className='outline outline-1 w-full p-2 mb-10 rounded'/>
                <button className='bg-green-700 text-white px-6 py-4 w-full rounded-xl mt-6' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='h-10 w-full text-lg font-semibold text-center text-red-700'>
                {error && error}
            </div>
        </div>
    </div>
  )
}

export default AddModal;