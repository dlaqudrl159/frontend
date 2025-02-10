import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AptTranscationHistoryOverlay = styled(Box)(() => ({
    position: 'absolute',
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
    minWidth: `80%`,
    height: '80%',
    display: 'flex',
    flexDirection: 'column',  // 세로 방향으로 요소 배치
}))

export const AptTranscationHistoryHeader = styled(Box)(() => ({
    //position: 'sticky',
    //top: 0,
    height: '30%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 30px',
    backgroundColor: 'white',  // 스크롤 시 내용이 비치지 않도록
    borderBottom: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    zIndex: 1,  // 내용 위에 보이도록
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#999',
    },
}))

export const AptTranscationHistoryHeaderTitle = styled(Typography)(({ theme }) => ({
    width: '100%',
    whiteSpace: 'nowrap',
    /*[theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '24px',
    },*/
}))

export const AptTranscationHistoryHeaderJibun = styled(Typography)(() => ({
    width: '100%',
    whiteSpace: 'nowrap',
}))

export const AptTranscationHistoryHeaderRoadName = styled(Typography)(() => ({
    width: '100%',
    whiteSpace: 'nowrap',
}))

export const AptTranscationHistoryHeaderCloseButton = styled(Button)(() => ({
    width: '100%',
    background: 'none',
    display: 'inline-block',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
    textAlign: 'right'
}))

export const AptTranscationHistoryContent = styled(Box)(() => ({
    height: '70%',
    padding: '20px 30px',
    overflow: 'auto',
    flex: 1,  // 남은 공간 모두 차지
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#999',
    },
}))

export const AptTranscationHistoryRoadSelect = styled(Select)(() => ({
    width: '100%',
    minWidth : "300px",
    height: '40px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: '15px',
}))

export const AptTranscationHistoryRoadMenuItem = styled(MenuItem)(() => ({
    height: '10%'
}))

export const AptTranscationHistoryYearSelect = styled(Select)(() => ({
    width: '100%',
    minWidth : '300px',
    height: '40px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: '15px',
}))

export const AptTranscationHistoryYearMenuItem = styled(MenuItem)(() => ({
    height: '10%'
}))

export const AptTranscationHistoryContentMonthGroup = styled(Box)(() => ({
    marginBottom: '30px',
    padding: '0 20px',
    
}))

export const AptTranscationHistoryContentMonthTitle = styled(Typography)(() => ({
    padding: '15px 0',
    borderBottom: '2px solid #007bff',
    marginBottom: '15px',
    color: '#007bff',
    fontSize: '18px',
}))