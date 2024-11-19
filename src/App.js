import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import Admin from './admin/Admin';

function App() {

  return (
    <>

    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/admin' element={<Admin/>} />
    </Routes>

    </>
  );
}

export default App;