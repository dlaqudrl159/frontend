import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import Login from './admin/Login';
import PrivateRoute from './admin/PrivateRoute';
import DashBoard from './admin/DashBoard';
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme/theme";
import KakaoMap from './kakaomap/KakaoMap';


function App() {

  return (
    <>

      <Routes>

        <Route path='/' element={
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Home />
            </MainLayout>
          </ThemeProvider>
        }></Route>

        <Route path='/apartment' element={
          <ThemeProvider theme={theme}>
            <MainLayout>
              <KakaoMap />
            </MainLayout>
          </ThemeProvider>
        } />

        <Route path='/login' element={
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Login />
            </MainLayout>
          </ThemeProvider>
        } />

        <Route element={<PrivateRoute />}>
          <Route path='/admin/dashboard' element={
            <DashBoard />
          }>
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;