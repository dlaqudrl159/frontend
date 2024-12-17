import React, { memo } from "react";
import TabDropDown from "./tab/TabDropDown";
import { Box } from "@mui/material";

const Choice = memo(({ searchType, handleSelectState }) => {

  return (
    <TabDropDown>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
            width: '45%',
            height: '40px',
            textAlign: 'center',
            fontSize: '16px',
            ...(searchType === 'jibun' && {
              backgroundColor: '#007bff',
              color: 'white',
              border: '1px solid #0056b3'
            })
          }}
          onClick={() => handleSelectState()}
        >지번 검색
        </Box>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
            width: '45%',
            height: '40px',
            textAlign: 'center',
            fontSize: '16px',
            ...(searchType === 'road' && {
              backgroundColor: '#007bff',
              color: 'white',
              border: '1px solid #0056b3'
            })
          }}
          onClick={() => handleSelectState()}
        >도로명 검색
        </Box>
      </Box>
    </TabDropDown>
  )

})

const styles = {
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