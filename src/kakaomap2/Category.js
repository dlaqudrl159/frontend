import React, { useState , memo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Category = memo(({categoryRegionState}) => {
  const [activeTab, setActiveTab] = useState(null);
  console.log("Category함수부분")
  const tabs = [
    { id: "year", label: "2024" },
    { id: "choice", label: "지번주소" },
    { id: "region", label: categoryRegionState },
    { id: "apartmentname", label: "단지명" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "year":
        return (
          <div style={{...styles.dropdown, ...styles.yearDropdown}}>
            <h3>Select Year</h3>
            <select>
              <option>{"2024"}</option>
              <option>{parseInt(2024) - 1}</option>
              <option>{parseInt(2024) - 2}</option>
            </select>
          </div>
        );
      case "choice":
        return (
          <div style={{...styles.dropdown, ...styles.choiceDropdown}}>
            <h3>지번주소 선택</h3>
            <input type="text" placeholder="주소 입력" />
          </div>
        );
      case "region":
        return (
          <div style={{...styles.dropdown, ...styles.regionDropdown}}>
            <h3>지역 선택</h3>
            <ul>
              <li>{categoryRegionState}</li>
              <li>Other Region 1</li>
              <li>Other Region 2</li>
            </ul>
          </div>
        );
      case "apartmentname":
        return (
          <div style={{...styles.dropdown, ...styles.apartmentDropdown}}>
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
    //<div id="name" style={styles.container}>
     // <div id="map" style={styles.map}>
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
        
       <div>
       {renderTabContent()}
      </div>
    </div>
  );
});

const styles = {
  //container: { width: "100%", height: "100%" },
  //map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
  tabContainer: {
    width: "500px",
    height: "5%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 3,
    top: "1%",
    left: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    border: "1px solid black",
    width: "22%",
    height: "80%",
    backgroundColor: "gray",
    textAlign: "center",
    lineHeight: '35px',
    color: "black",
    cursor: "pointer",
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
    top: "10%",
    left: "20px",
    padding: "10px",
  },
  yearDropdown: {
    height: "150px",
    backgroundColor: "#f0f0f0",
  },
  choiceDropdown: {
    height: "120px",
    backgroundColor: "#e0e0e0",
  },
  regionDropdown: {
    height: "200px",
    backgroundColor: "#d0d0d0",
  },
  apartmentDropdown: {
    height: "180px",
    backgroundColor: "#c0c0c0",
  },
};

export default Category;