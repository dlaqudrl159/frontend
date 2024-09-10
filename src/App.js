import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './layout/layout';
import {Routes, Route} from "react-router-dom";
import BasicMap from './kakaomap/BasicMap2';

function App() {
  return (
  <>
    <Layout>
    <div className="App" style={{height:"95%"}}>
    
    <Routes>
    <Route path ="/" element={<BasicMap/>}> </Route>
    

    </Routes>
    </div>
    
    </Layout>
    
    

    </>    
  );
}

export default App;
