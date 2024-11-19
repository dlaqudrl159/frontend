import React, { useState, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoMap from './kakaomap/KakaoMap';
import Category from './category/Category';
import AptTranscationHistory from './aptTranscationHistory/AptTranscationHistory';
import Layout from './layout/Layout';

function App() {
  console.log("App 함수부분")

  const [categoryRegionState, setCategoryRegionState] = useState(null);

  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  
  const handleMarkerData = useCallback((data) => {
    setSelectedMarkerData(data);
  }, []);

  const setCategoryRegion = useCallback((region) => {
    setCategoryRegionState(region);
  }, []);

  return (
    <>
      {console.log("App 렌더링")}
      <Layout />
      <div className="App" style={{ height: "95%" }}>
        <KakaoMap setCategoryRegion={setCategoryRegion} handleMarkerData={handleMarkerData} />
        {categoryRegionState && <Category categoryRegionState={categoryRegionState} />}
        {selectedMarkerData && <AptTranscationHistory selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} />}
      </div>






    </>
  );
}

export default App;