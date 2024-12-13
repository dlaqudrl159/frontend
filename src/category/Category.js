import React, { useState, memo, useMemo, useCallback } from "react";
import Choice from "./Choice";
import Region from "./Region";
import ApartmentName from "./ApartmentName";
import axios from "axios";
import SearchIcon from "./SearchIcon";
import Tab from "./Tab";
import TabContainer from "./TabContainer";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import DropDown from "./DropDown";

const initSido = '서울특별시';
const initSiguntu = '강남구';
const initDong = '개포동';

const Category = memo(({ categoryRegionState }) => {

  const [activeTab, setActiveTab] = useState(null);

  const [searchType, setSearchType] = useState('jibun'); // 'jibun' 또는 'road'

  const [selectedSido, setSelectedSido] = useState(initSido);
  const [selectedSigungu, setSelectedSigungu] = useState(initSiguntu);
  const [selectDong, setSelectedDong] = useState(initDong);
  const [inputRoadName, setInputRoadName] = useState('');
  const [apartmentname, setApartMentNmae] = useState('');

  const tabs = useMemo(() => {
    if (searchType === 'jibun') {
      return [
        { id: "choice", label: "주소 선택" },
        { id: "region", label: categoryRegionState },
        { id: "apartmentname", label: "단지명" },
      ];
    } else {
      return [
        { id: "choice", label: "주소 선택" },
        { id: "region", label: "도로명" },
        { id: "apartmentname", label: "단지명" },
      ];
    }
  }, [searchType, categoryRegionState]);

  const handleTabClick = (tabId) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const handleSelectState = useCallback(() => {
    setSearchType(searchType === 'road' ? 'jibun' : 'road');
    setSelectedSido(initSido)
    setSelectedSigungu(initSiguntu)
    setSelectedDong(initDong)
    setInputRoadName('')
    setApartMentNmae('')
  }, [searchType])


  const getCategoryClickData = useCallback(async (ex1, ex2, ex3, ex4) => {
    const response = await axios.get('/api/getCategoryClickData', {
      params: {
        eex1: ex1,
        eex2: ex2,
        eex3: ex3,
        eex4: ex4
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {

    })

  }, [])

  const handleCategoryClick = useCallback(() => {
    if (searchType === 'jibun') {
      getCategoryClickData(selectedSido, selectedSigungu, selectDong, apartmentname)
    } else {
      if (inputRoadName === '') {
        alert('도로명을 입력해주십시요');
        return;
      }
      getCategoryClickData(selectedSido, selectedSigungu, inputRoadName, apartmentname)
    }
  }, [searchType, selectedSido, selectedSigungu, selectDong, inputRoadName, apartmentname, getCategoryClickData])

  const getRoadNameList = useCallback(async () => {
    console.log(inputRoadName)
    if (inputRoadName === '') {
      alert('도로명을 입력해주세요');
      return
    }
    const response = await axios.get('/api/getRoadNameList', {
      params: {
        ex1: selectedSido,
        ex2: selectedSigungu,
        ex3: inputRoadName
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {

    })
  }, [inputRoadName, selectedSido, selectedSigungu])

  const renderTabContent = () => {
    switch (activeTab) {
      case "choice":
        return (
          <Choice searchType={searchType} handleSelectState={handleSelectState} />
        );
      case "region":
        return (
          <Region searchType={searchType}
            selectedSido={selectedSido} setSelectedSido={setSelectedSido}
            setSelectedSigungu={setSelectedSigungu} selectedSigungu={selectedSigungu}
            selectDong={selectDong} setSelectedDong={setSelectedDong}
            inputRoadName={inputRoadName} setInputRoadName={setInputRoadName}
            getRoadNameList={getRoadNameList} />
        )
      case "apartmentname":
        return (
          <ApartmentName apartmentname={apartmentname} setApartMentNmae={setApartMentNmae} handleCategoryClick={handleCategoryClick} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="Category" style={styles.category}>
      <TabContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActice={activeTab === tab.id}
            onClick={handleTabClick}
          />
        ))}
        <SearchIcon />
      </TabContainer>
      <DropDown additionalStyle={styles.sidePanel}></DropDown>
      {renderTabContent()}
    </div>
  );
});

const styles = {
  category: {
    width: '500px',
    height: '98%',
    //backgroundColor : 'white',
    position: 'absolute',
    left: '20px',
    top: '2%',
    pointerEvents: 'none'  // 마우스 이벤트를 무시
  },
  sidePanel: {
    position : 'absolute',
    top: '200px'
  }
};

export default Category;