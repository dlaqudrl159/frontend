import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import TabDropDown from "./tab/TabDropDown";

const Road = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, setSelectedDong, inputRoadName, setInputRoadName, getRoadNames }) => {

  return (
    <TabDropDown>
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
      <button style={styles.button} onClick={getRoadNames}>검색</button>
    </TabDropDown>
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