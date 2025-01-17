import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import TabDropDown from "./tab/TabDropDown";
import { RoadContainer, RoadNameClickButton, RoadNameInsertInput } from "../styles/Category.Styles";

const Road = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, setSelectedDong, inputRoadName, setInputRoadName, getRoadNames }) => {

  return (
    <TabDropDown>
      <RoadContainer className="roadContainer">
        <Sido
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          setSelectedSigungu={setSelectedSigungu}
          setSelectedDong={setSelectedDong} />
        <Sigungu
          selectedSido={selectedSido}
          selectedSigungu={selectedSigungu}
          setSelectedSigungu={setSelectedSigungu}
          setSelectedDong={setSelectedDong} />
        <RoadNameInsertInput
          value={inputRoadName}
          type="text"
          placeholder="도로명을 입력하세요"
          onChange={(e) => {
            setInputRoadName(e.target.value);
          }}
        />
        <RoadNameClickButton onClick={() => {getRoadNames()}}>검색</RoadNameClickButton>
      </RoadContainer>
    </TabDropDown>
  )

});

export default Road;