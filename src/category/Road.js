import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import DropDown from "./DropDown";

const Road = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, setSelectedDong, inputRoadName, setInputRoadName, getRoadNameList }) => {

  return (
    <DropDown>
      <div style={styles.selectContainer}>
        <Sido selectedSido={selectedSido} setSelectedSido={setSelectedSido} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sido>
        <Sigungu selectedSido={selectedSido} selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sigungu>
      </div>
      <input
        value={inputRoadName}
        type="text"
        placeholder="도로명을 입력하세요"
        style={styles.inputRoadName}
        onChange={(e) => {
          setInputRoadName(e.target.value);
        }}
      />
      <button style={styles.button} onClick={getRoadNameList}>검색</button>
    </DropDown>
  )

});

const styles = {
  selectContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  inputRoadName: {
    width: '80%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    border: '1px solid #ccc',
    marginLeft: '5px',
    width: "10%",
    height: "30%"
  },
}

export default Road;