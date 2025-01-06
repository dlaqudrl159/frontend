import React, { memo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import KakaoMap from '../kakaomap/KakaoMap';
import { HomeContainer } from '../styles/Home.Styles';
const Home = memo(() => {
  return (
    <HomeContainer className='HomeContainer'>
      <KakaoMap />
    </HomeContainer>
  );
});

export default Home;