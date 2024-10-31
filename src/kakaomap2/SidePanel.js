import React, { useEffect, useRef, useState, memo, useMemo, useCallback} from 'react';
import { json } from 'react-router-dom';

const SidePanel = memo(({selectedMarkerData , setSelectedMarkerData}) => {
  const modalRef = useRef();

  const [selectedRoadIndex, setSelectedRoadIndex] = useState(0);  // 기본값 0으로 첫 번째 데이터 선택
  const [selectedYear, setSelectedYear] = useState(
        selectedMarkerData[0].years[0].toString()
  );

  const handleRoadChange = (e) => {
    const newIndex = Number(e.target.value);
    setSelectedRoadIndex(newIndex);
    setSelectedYear(selectedMarkerData[newIndex].years[0].toString());
  };

  const currentApt = selectedMarkerData[selectedRoadIndex];
  const filteredData = currentApt.apiDtoList.filter(
        item => item.year.toString() === selectedYear
    );
  
  console.log(selectedMarkerData);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedMarkerData(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedMarkerData]);

 

  return (
      <div style={styles.overlay}>
          <div ref={modalRef} style={styles.modal}>

                <select 
                    value={selectedRoadIndex}
                    onChange={handleRoadChange}
                    style={styles.roadSelect}
                >
                    {selectedMarkerData.map((data, index) => (
                        <option key={index} value={index}>
                            {data.nameCountDto.roadname}
                        </option>
                    ))}
                </select>
                <div style={styles.content}>
                    <div style={styles.header}>
                        <h2>[아파트] {currentApt.nameCountDto.apartmentname}</h2>
                        <p>{currentApt.nameCountDto.sigungu} {currentApt.nameCountDto.bungi}</p>
                        <p>{currentApt.nameCountDto.roadname}</p>
                        <button onClick={() => {setSelectedMarkerData(null)}} style={styles.closeButton}>X</button>
                    </div>

                    <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        style={styles.yearSelect}
                    >
                        {currentApt.years.map(year => (
                            <option key={year} value={year}>{year}년</option>
                        ))}
                    </select>

              <table style={styles.table}>
                  <thead>
                      <tr>
                          <th>전용면적(㎡)</th>
                          <th>거래금액(만원)</th>
                          <th>거래일</th>
                          <th>층</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredData.map((item, index) => (
                          <tr key={index}>
                              <td>{parseInt(item.areaforexclusiveuse)}</td>
                              <td>{item.dealamount}</td>
                              <td>{item.dealyearmonth.substring(4,6)}.{item.dealday}</td>
                              <td>{item.floor}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              </div>
          </div>
      </div>
  );
});

const styles = {
  overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
  },
  modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      width: '600px',
      maxHeight: '80vh',
      overflow: 'auto',
      position: 'relative',
  },
  header: {
      marginBottom: '20px',
  },
  closeButton: {
      position: 'absolute',
      right: '10px',
      top: '10px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
  },
  select: {
      width: '100%',
      padding: '8px',
      marginBottom: '20px',
      borderRadius: '4px',
      border: '1px solid #ddd',
  },
  table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
  },
  'th, td': {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center',
  },
  th: {
      backgroundColor: '#f5f5f5',
  },
  selectorContainer: {
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
},
mainSelect: {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
},
content: {
  padding: '20px',
},
yearSelect: {
  width: '100%',
  padding: '8px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ddd',
}
};

export default SidePanel;