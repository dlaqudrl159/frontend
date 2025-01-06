import React, { memo } from 'react';
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