import React, { useEffect, useState, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './layout/layout';
import {Routes, Route} from "react-router-dom";
import BasicMap from './kakaomap2/BasicMapInit';
import Category from './kakaomap2/Category';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import SidePanel from './kakaomap2/SidePanel';

function App() {
  console.log("App 함수부분")

  const [categoryRegionState , setCategoryRegionState] = useState(null);

  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  const handleMarkerData = (data) => {
    setSelectedMarkerData(data);
  }

  const setCategoryRegion = useCallback((region) => {
    setCategoryRegionState(region);
  }, []);

  return (
  <>
    {console.log("App 렌더링")}
    <header style={{height:"5%"}}> 
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{marginLeft:"0px"}} >
        <Navbar.Brand> <Link to="/">국토교통부 아파트 매매 실거래 상세 자료</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <Link className="nav-link" to="/basicmap">테스트입니다</Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
    <div className="App" style={{height:"95%"}}>
    <BasicMap setCategoryRegion={setCategoryRegion} handleMarkerData={handleMarkerData} ></BasicMap>
    {categoryRegionState && <Category categoryRegionState={categoryRegionState}></Category>}
    {selectedMarkerData && <SidePanel selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData}></SidePanel>}
    </div>
    
    
    
    

    </>    
  );
}

export default App;