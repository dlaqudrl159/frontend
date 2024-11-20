import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import Login from './admin/Login';
import PrivateRoute from './admin/PrivateRoute';
import DashBoard from './admin/DashBoard';

function App() {

  return (
    <>

    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route element={<PrivateRoute />}>
    <Route path='/admin/dashboard' element={<DashBoard />}></Route>
    </Route>
    </Routes>

    </>
  );
}

export default App;