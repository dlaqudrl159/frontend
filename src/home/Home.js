import React, {memo, useState, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoMap from '../kakaomap/KakaoMap';
import Category from '../category/Category';
import AptTranscationHistory from '../aptTranscationHistory/AptTranscationHistory';
import Header from '../header/Header';

const Home = memo(() => {

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
        <Header />
        <div className="Home" style={{ height: "95%" }}>
          <KakaoMap setCategoryRegion={setCategoryRegion} handleMarkerData={handleMarkerData} />
          {categoryRegionState && <Category categoryRegionState={categoryRegionState} />}
          {selectedMarkerData && <AptTranscationHistory selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} />}
        </div>
  
  
  
  
  
  
      </>
    );
  });

export default Home;