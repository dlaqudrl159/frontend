import React, { memo } from "react";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import Dong from "./Dong";
import TabDropDown from "./tab/TabDropDown";
import { JibunContainer } from "../styles/Category.Styles";

const Jibun = memo(({ selectedSido, setSelectedSido, selectedSigungu, setSelectedSigungu, selectDong, setSelectedDong }) => {

  return (
    <TabDropDown>
      <JibunContainer className="jibunContainer">
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
        <Dong
          selectDong={selectDong}
          setSelectedDong={setSelectedDong}
          selectedSido={selectedSido}
          selectedSigungu={selectedSigungu} />
      </JibunContainer>
    </TabDropDown>
  )

})

export default Jibun;