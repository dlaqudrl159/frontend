import React, { useState, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BasicMap from './kakaomap2/BasicMapInit';
import Category from './kakaomap2/Category';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import SidePanel from './kakaomap2/SidePanel';
import Layout from './layout/layout';

function App() {
  console.log("App 함수부분")

  const [categoryRegionState, setCategoryRegionState] = useState(null);

  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  const handleMarkerData = useCallback((data) => {
    setSelectedMarkerData(data);
  }, []);

  const setCategoryRegion = useCallback((region) => {
    setCategoryRegionState(region);
  }, []);

  return (
    <>
      {console.log("App 렌더링")}
      <Layout />
      <div className="App" style={{ height: "95%" }}>
        <BasicMap setCategoryRegion={setCategoryRegion} handleMarkerData={handleMarkerData} />
        {categoryRegionState && <Category categoryRegionState={categoryRegionState} />}
        {selectedMarkerData && <SidePanel selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} />}
      </div>





    </>
  );
}

export default App;