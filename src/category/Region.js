import React, { memo } from "react";
import Jibun from "./Jibun";
import Road from "./Road";

const Region = memo(({ searchType,
    selectedSido, setSelectedSido,
    selectedSigungu, setSelectedSigungu,
    selectDong, setSelectedDong,
    inputRoadName, setInputRoadName, getRoadNameList }) => {

    const renderRegion = () => {

        return searchType === 'jibun' ?
            <Jibun selectedSido={selectedSido} setSelectedSido={setSelectedSido}
                selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu}
                selectDong={selectDong} setSelectedDong={setSelectedDong} />
            :
            <Road selectedSido={selectedSido} setSelectedSido={setSelectedSido}
                selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu}
                setSelectedDong={setSelectedDong}
                inputRoadName={inputRoadName} setInputRoadName={setInputRoadName}
                getRoadNameList={getRoadNameList} />;

    }

    return (
        <>
            {renderRegion()}
        </>
    );

})

export default Region;