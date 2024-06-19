import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AddTodo from './components/pages/AddTodo';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddTodo />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App