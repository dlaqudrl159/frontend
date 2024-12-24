import React, { memo, useState, useCallback } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import Category from '../category/Category';
import AptTranscationHistory from '../aptTranscationHistory/AptTranscationHistory';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import store from '../redux/reducer/store';

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
    <Provider store={store}>
      <Box sx={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        <KakaoMap setCategoryRegion={setCategoryRegion} handleMarkerData={handleMarkerData} />
        {categoryRegionState && <Category categoryRegionState={categoryRegionState} setSelectedMarkerData={setSelectedMarkerData} />}
        {selectedMarkerData && <AptTranscationHistory selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} />}
      </Box>
    </Provider>
  );
});

export default Home;