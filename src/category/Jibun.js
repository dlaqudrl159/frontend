import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import Dong from "./Dong";
import DropDown from "./DropDown";

const Jibun = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, selectDong, setSelectedDong }) => {

  return (
    <DropDown>
      <div style={styles.selectContainer}>
        <Sido selectedSido={selectedSido} setSelectedSido={setSelectedSido} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sido>
        <Sigungu selectedSido={selectedSido} selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sigungu>
      </div>
      <div style={styles.dongList}>
        <Dong selectDong={selectDong} setSelectedDong={setSelectedDong} selectedSido={selectedSido} selectedSigungu={selectedSigungu}></Dong>
      </div>
    </DropDown>
  )

})

const styles = {
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