import React from 'react'
import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
        <main className='min-h-screen'>
          <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default Layout