import React, { memo } from "react";

const Choice = memo(({ searchType, handleSelectState }) => {

  return (
    <div style={{ ...styles.dropdown, ...styles.choiceDropdown }}>
      <div style={styles.searchTypeContainer}>
        <div
          style={{
            ...styles.searchTypeButton,
            ...(searchType === 'jibun' ? styles.activeSearchType : {})
          }}
          onClick={() => handleSelectState()}
        >
          지번으로 검색
        </div>
        <div
          style={{
            ...styles.searchTypeButton,
            ...(searchType === 'road' ? styles.activeSearchType : {})
          }}
          onClick={() => handleSelectState()}
        >
          도로명으로 검색
        </div>
      </div>
    </div>
  )

})

const styles = {
  dropdown: {
    border: "1px solid black",
    width: "500px",
    position: "absolute",
    zIndex: 3,
    backgroundColor: "white",
    top: "12%",  // tabContainer의 top(7%) + height(5%)
    left: "20px",
    padding: "10px",
  },
  choiceDropdown: {
    height: "150px",  // 높이 약간 증가
    backgroundColor: "#ffffff",
  },
  searchTypeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  searchTypeButton: {
    padding: '8px 15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'white',
    width: '45%',
    textAlign: 'center',
  },
  activeSearchType: {
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #0056b3',
  },
}

export default Choice;