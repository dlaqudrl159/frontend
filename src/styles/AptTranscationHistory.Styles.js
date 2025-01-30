import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AptTranscationHistoryOverlay = styled(Box)(() => ({
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
}))

export const AptTranscationHistoryContainer = styled(Box)(() => ({
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '80%',
    minWidth : '300px',
    height: '80%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',  // 세로 방향으로 요소 배치
}))

export const AptTranscationHistoryHeader = styled(Box)(() => ({
    //position: 'sticky',
    //top: 0,
    height : '30%',
    display : 'flex',
    flexWrap : 'wrap',
    padding: '20px 30px',
    backgroundColor: 'white',  // 스크롤 시 내용이 비치지 않도록
    borderBottom: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    zIndex: 1,  // 내용 위에 보이도록
    overflow : 'auto'
}))

export const AptTranscationHistoryHeaderTitle = styled(Typography)(({ theme }) => ({
    width : '100%',
    whiteSpace : 'nowrap',
    /*[theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '24px',
    },*/
}))

export const AptTranscationHistoryHeaderJibun = styled(Typography)(() => ({
    width :'100%',
    whiteSpace : 'nowrap',
}))

export const AptTranscationHistoryHeaderRoadName = styled(Typography)(() => ({
    width : '100%',
    whiteSpace : 'nowrap',
}))

export const AptTranscationHistoryHeaderCloseButton = styled(Button)(() => ({
    width : '100%',
    background: 'none',
    display : 'inline-block',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
    textAlign : 'right'
}))

export const AptTranscationHistoryContent = styled(Box)(() => ({
    height : '70%',
    padding: '20px 30px',
    overflow: 'auto',  // 내용이 넘칠 경우 스크롤
    flex: 1,  // 남은 공간 모두 차지
}))