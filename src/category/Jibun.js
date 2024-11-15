import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import Dong from "./Dong";

const Jibun = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, selectDong, setSelectedDong }) => {

  return (
    <div style={{ ...styles.dropdown, ...styles.regionDropdown }}>
      <div style={styles.selectContainer}>
        <Sido selectedSido={selectedSido} setSelectedSido={setSelectedSido} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sido>
        <Sigungu selectedSido={selectedSido} selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sigungu>
      </div>
      <div style={styles.dongList}>
        <Dong selectDong={selectDong} setSelectedDong={setSelectedDong} selectedSido={selectedSido} selectedSigungu={selectedSigungu}></Dong>
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
  regionDropdown: {
    height: "150px",
    backgroundColor: "#ffffff",
  },
  selectContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  dongList: {
    maxHeight: '200px',
    overflow: 'auto',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
  },
}

export default Jibun;