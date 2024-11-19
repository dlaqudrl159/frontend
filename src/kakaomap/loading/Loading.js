import React, { memo } from "react";

const Loading = memo(() => {
  console.log("Loading 함수부분")
  return (
    <>
      {console.log("Loading 렌더링")}
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <p style={styles.modalBody}>로딩중입니다.</p>
        </div>
      </div>
    </>
  )
})
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    margin: 0,
    fontSize: 25
  },
};
export default Loading;