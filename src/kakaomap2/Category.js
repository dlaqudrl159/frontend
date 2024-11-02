import React, { useState, memo, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Category = memo(({ categoryRegionState }) => {
  console.log("Category함수부분")
  const [activeTab, setActiveTab] = useState(null);
  const [searchType, setSearchType] = useState('jibun'); // 'jibun' 또는 'road'
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');

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
                onClick={() => setSearchType('jibun')}
              >
                지번으로 검색
              </div>
              <div 
                style={{
                  ...styles.searchTypeButton,
                  ...(searchType === 'road' ? styles.activeSearchType : {})
                }}
                onClick={() => setSearchType('road')}
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
                  <select 
                    value={selectedSido} 
                    onChange={(e) => setSelectedSido(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">시/도 선택</option>
                    {/* 시/도 옵션들 */}
                  </select>
                  <select 
                    value={selectedSigungu} 
                    onChange={(e) => setSelectedSigungu(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">시/군/구 선택</option>
                    {/* 시/군/구 옵션들 */}
                  </select>
                </div>
                <div style={styles.currentRegion}>
                  {categoryRegionState}
                </div>
                <div style={styles.dongList}>
                  {/* 해당 구의 읍면동 리스트 */}
                </div>
              </div>
            );
          } else {
            return (
              <div style={{ ...styles.dropdown, ...styles.regionDropdown }}>
                <div style={styles.selectContainer}>
                  <select 
                    value={selectedSido} 
                    onChange={(e) => setSelectedSido(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">시/도 선택</option>
                    {/* 시/도 옵션들 */}
                  </select>
                  <select 
                    value={selectedSigungu} 
                    onChange={(e) => setSelectedSigungu(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">시/군/구 선택</option>
                    {/* 시/군/구 옵션들 */}
                  </select>
                </div>
                <input 
                  type="text" 
                  placeholder="도로명을 입력하세요" 
                  style={styles.input}
                />
              </div>
            );
          }
      case "apartmentname":
        return (
          <div style={{ ...styles.dropdown, ...styles.apartmentDropdown }}>
            <h3>단지명 검색</h3>
            <input type="text" placeholder="단지명 입력" />
            <button>검색</button>
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
    height: "200px",
    backgroundColor: "#ffffff",
  },
  apartmentDropdown: {
    height: "180px",
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
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  selectContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  select: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  currentRegion: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
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