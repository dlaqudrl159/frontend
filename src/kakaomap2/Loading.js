import React from "react";
import Modal from 'react-bootstrap/Modal';

const Loading = (props) => {
    console.log("Loading 함수부분")
    return (
        <>
      {console.log("Loading 렌더링")}      
      <Modal show={props.IsLoadingState}>
        <Modal.Header closeButton>
          <Modal.Title>로딩중</Modal.Title>
        </Modal.Header>
        <Modal.Body>로딩중입니다.</Modal.Body>
      </Modal>
        </>
    )

}

export default Loading;