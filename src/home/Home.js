import React, { memo } from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import { HomeContainer } from '../styles/Home.Styles';
import { Box, Typography } from '@mui/material';

const Home = memo(() => {

  return (
    <HomeContainer className='HomeContainer'>
      <Box sx={{ marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant='h6'>
          본 사이트는 개발자 취업 포트폴리오 제공을 위해 만든 사이트입니다.
        </Typography>
        <Typography variant='h6'>
          본 사이트에서 제공되는 정보는 국토교통부_아파트 매매 실거래가 상세 자료 API를 통해 제공됩니다.
        </Typography>
        <Typography variant='h6'>
          본 서비스에 제공하는 정보는 법적인 효력이 없으므로 참고용으로만 활용하시기 바라며, 외부 공개시에는 반드시 신고일 기준으로 집계되는 공식통계를 이용하여 주시기 바랍니다.
          본 자료는 계약일 기준입니다.(7월 계약, 8월 신고건 → 7월 거래건으로 제공)
        </Typography>
        <Typography variant='h6'>
          시도별 자료제공 계약일자 범위는 최대 1년입니다.이용에 참고하시길 바랍니다.
        </Typography>
        <Typography variant='h3'>
          서비스를 이용하시려면 위의 메뉴창에 아파트 메뉴를 클릭하시면 이용가능합니다.
        </Typography>
      </Box>
    </HomeContainer>
  );
});

export default Home;