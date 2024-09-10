import React ,{ useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Loading = (props) => {

    
  

    return (
        <>      
      <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>로딩중</Modal.Title>
        </Modal.Header>
        <Modal.Body>로딩중입니다.</Modal.Body>
        
      </Modal>
        </>
    )

}

export default Loading;