import React, { useState, memo, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Sido from "./Sido";
import Sigungu from "./Sigungu";
import Dong from "./Dong";
import axios from "axios";
import { Button } from "react-bootstrap";

const initSido = '서울특별시';
const initSiguntu = '강남구';
const initDong = '개포동';

const Category = memo(({ categoryRegionState }) => {
  console.log("Category함수부분")
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

  const handleSelectState = () => {
    if (searchType === 'road') {
      setSearchType('jibun')
      setSelectedSido(initSido)
      setSelectedSigungu(initSiguntu)
      setSelectedDong(initDong)
      setInputRoadName('')
      setApartMentNmae('')
    } else {
      setSearchType('road')
      setSelectedSido(initSido)
      setSelectedSigungu(initSiguntu)
      setSelectedDong(initDong)
      setInputRoadName('')
      setApartMentNmae('')
    }
  }

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

  const OnClick = () => {
    if (searchType === 'jibun') {
      if (apartmentname === '') {
        alert('단지명을 입력해주십시요');
        return;
      }
      getCategoryClickData(selectedSido, selectedSigungu, selectDong, apartmentname)
    } else {
      if (inputRoadName === '') {
        alert('도로명을 입력해주십시요');
        return;
      } else if (apartmentname === '') {
        alert('단지명을 입력해주십시요');
        return;
      }
      getCategoryClickData(selectedSido, selectedSigungu, inputRoadName, apartmentname)
    }
  }

  const getRoadNameList = useCallback(async() => {
    if(inputRoadName === '') {
      alert('도로명을 입력해주세요');
      return
    }
    const response = await axios.get('/api/getRoadNameList', {
      params: {
        ex1 : selectedSido,
        ex2 : selectedSigungu,
        ex3 : inputRoadName
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {

    })
  },[])

  const renderTabContent = () => {
    switch (activeTab) {
      case "choice":
        return (
          <div style={{ ...styles.dropdown, ...styles.choiceDropdown }}>
            <div style={styles.searchTypeContainer}>
              <div
                style={{
                  ...styles.searchTypeButton,
                  ...(searchType === 'jibun' ? styles.activeSearchType : {})
                }}
                onClick={() => handleSelectState()}
              >
                지번으로 검색
              </div>
              <div
                style={{
                  ...styles.searchTypeButton,
                  ...(searchType === 'road' ? styles.activeSearchType : {})
                }}
                onClick={() => handleSelectState()}
              >
                도로명으로 검색
              </div>
            </div>
          </div>
        );
      case "region":
        if (searchType === 'jibun') {
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
        } else {
          return (
            <div style={{ ...styles.dropdown, ...styles.regionDropdown }}>
              <div style={styles.selectContainer}>
                <Sido selectedSido={selectedSido} setSelectedSido={setSelectedSido} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sido>
                <Sigungu selectedSido={selectedSido} selectedSigungu={selectedSigungu} setSelectedSigungu={setSelectedSigungu} setSelectedDong={setSelectedDong}></Sigungu>
              </div>
              <input
                value={inputRoadName}
                type="text"
                placeholder="도로명을 입력하세요"
                style={styles.input}
                onChange={(e) => {
                  setInputRoadName(e.target.value);
                }}
              />
              <button style={styles.button} onClick={getRoadNameList}>검색</button>
            </div>
          );
        }
      case "apartmentname":
        return (
          <div style={{ ...styles.dropdown, ...styles.apartmentDropdown }}>
            <h3>단지명 검색</h3>
            <input
              value={apartmentname}
              type="text"
              placeholder="단지명 입력"
              style={styles.apartmentinput}
              onChange={(e) => {
                setApartMentNmae(e.target.value);
              }}
            />
            <button style={styles.button} onClick={OnClick}>검색</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {console.log("Category랜더")}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {})
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
        <div style={styles.searchIcon}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
});

const styles = {

  tabContainer: {
    width: "500px",
    height: "5%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 3,
    top: "7%",
    left: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    border: "1px solid black",
    width: "30%",
    height: "80%",
    backgroundColor: "#f3f5ff",
    textAlign: "center",
    lineHeight: '35px',
    color: "black",
    cursor: "pointer",
    marginLeft: "1%"
  },
  activeTab: {
    backgroundColor: "lightgray",
    fontWeight: "bold",
  },
  searchIcon: {
    height: "80%",
    textAlign: "center",
    lineHeight: '35px',
    marginRight: "5px",
  },
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
  choiceDropdown: {
    height: "150px",  // 높이 약간 증가
    backgroundColor: "#ffffff",
  },
  regionDropdown: {
    height: "150px",
    backgroundColor: "#ffffff",
  },
  apartmentDropdown: {
    height: "150px",
    backgroundColor: "#ffffff",
  },
  searchTypeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
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
  input: {
    width: '80%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  apartmentinput: {
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
};

export default Category;