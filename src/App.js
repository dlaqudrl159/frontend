import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './layout/layout';
import {Routes, Route} from "react-router-dom";
import BasicMap4 from './kakaomap/BasicMapInit';

function App() {
  return (
  <>
    <Layout>
    <div className="App" style={{height:"95%"}}>
    
    <Routes>
    <Route path ="/" element={<BasicMap4/>}> </Route>
    

    </Routes>
    </div>
    
    </Layout>
    
    

    </>    
  );
}

export default App;
