import React, {memo} from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const layout = memo((props) => {
    console.log("layout 실행");
    return (
        <>
        {console.log("layout 렌더")}
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
        {props.children}
    

        
        </>

    )
})
export default layout;