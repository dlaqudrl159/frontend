import React, { memo } from "react";
import TabDropDown from "./tab/TabDropDown";

const Choice = memo(({ searchType, handleSelectState }) => {

  return (
    <TabDropDown>
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
    </TabDropDown>
  )

})

const styles = {
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