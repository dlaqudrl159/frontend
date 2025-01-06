import React, { useState, memo, useCallback } from "react";
import Choice from "./Choice";
import Region from "./Region";
import ApartmentName from "./ApartmentName";
import axios from "axios";
import Tab from "./tab/Tab";
import SearchPanel from "./SearchPanel";
import { useTab } from "./tab/useTab";
import { CategoryContainer, TabContainer, TabMenu, TabContent } from "../styles/Category.Styles";


const initSido = '서울특별시';
const initSiguntu = '강남구';
const initDong = '개포동';

const Category = memo((props) => {

  const [searchType, setSearchType] = useState('jibun'); // 'jibun' 또는 'road'

  const { activeTab, setActiveTab, tabs } = useTab(searchType);

  const [selectedSido, setSelectedSido] = useState(initSido);
  const [selectedSigungu, setSelectedSigungu] = useState(initSiguntu);
  const [selectDong, setSelectedDong] = useState(initDong);
  const [inputRoadName, setInputRoadName] = useState('');
  const [apartmentname, setApartMentNmae] = useState('');

  const [searchData, setSearchData] = useState(null);

  const handleTabClick = (tabId) => {
    setSearchData(null);
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


  const getCategoryClickData = useCallback(async (searchType, korSido, sigungu, dongORroadName, apartmentname) => {
    const response = await axios.post('/api/getCategoryClickData', {
      searchType: searchType,
      korSido: korSido,
      sigungu: sigungu,
      dongORroadName: dongORroadName,
      apartmentname: apartmentname

    }, {}).then(response => {
      console.log(response);
      setSearchData(response.data);
    }).catch(error => {
      console.error(error);
    })

  }, [])

  const handleCategoryClick = useCallback(() => {
    if (searchType === 'jibun') {
      getCategoryClickData(searchType, selectedSido, selectedSigungu, selectDong, apartmentname)
    } else {
      if (inputRoadName === '') {
        alert('도로명을 입력해주십시요');
        return;
      }
      getCategoryClickData(searchType, selectedSido, selectedSigungu, inputRoadName, apartmentname)
    }
  }, [searchType, selectedSido, selectedSigungu, selectDong, inputRoadName, apartmentname, getCategoryClickData])

  const getRoadNames = useCallback(async () => {
    console.log(inputRoadName)
    if (inputRoadName === '') {
      alert('도로명을 입력해주세요');
      return
    }
    const response = await axios.post('/api/getRoadNames', {

      korSido: selectedSido,
      sigungu: selectedSigungu,
      roadName: inputRoadName

    }, {}).then(response => {
      console.log(response);
      setSearchData(response.data);
    }).catch(error => {
      console.error(error);
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
            getRoadNames={getRoadNames} />
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
    <CategoryContainer className="::::::::">
      <TabContainer>
        <TabMenu>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              label={(searchType === 'jibun' && tab.id === 'region') ? props.categoryRegionState : tab.label}
              isActive={activeTab === tab.id}
              onClick={handleTabClick}
            />
          ))}
        </TabMenu>
        <TabContent>
          {renderTabContent()}
        </TabContent>
      </TabContainer>

      {searchData && <SearchPanel searchData={searchData} setSearchData={setSearchData} setInputRoadName={setInputRoadName} searchType={searchType} activeTab={activeTab} setSelectedMarkerData={props.setSelectedMarkerData} mapInstanceRef={props.mapInstanceRef} initMarkers={props.initMarkers}></SearchPanel>}
    </CategoryContainer>
  );
});

export default Category;