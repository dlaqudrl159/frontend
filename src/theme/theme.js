import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 768,  // 모바일 브레이크포인트
        lg: 1024, // 태블릿 브레이크포인트
        xl: 1280  // 데스크탑 브레이크포인트
      },
    },
  })