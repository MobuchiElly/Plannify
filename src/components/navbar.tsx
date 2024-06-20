import React, {useState} from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [lightTheme, setLightTheme] = useState(true);
  return (
    <nav className='h-36 w-screen bg-gray-700 bottom-0 text-white flex items-center'>
      <div className='relative w-full h-full py-3 mb-4 lg:mb-0'>
        <h1 className='text-5xl text-center p-2 font-bold'>Plannify</h1>
        <h2 className='text-center text-2xl font-mono p-2 font-[500]'>Never Fail to Plan<span className='hidden lg:inline-flex'>...</span> <span className='sm:text-center hidden lg:inline-flex lg:text-justify'>Never Plan to Fail</span></h2>
        <button className='absolute right-10 hidden lg:inline-flex top-10' onClick={() => setLightTheme(!lightTheme)}>
          {
            lightTheme ? <FaMoon size={32}/>
             : 
             <FaSun size={32} color="gray"/>
          }
        </button>
      </div>
    </nav>
  )
}

export default Navbar