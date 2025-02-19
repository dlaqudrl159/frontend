import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoadingContainer = styled(Box)(() => ({
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
}))

export const LoadingContent = styled(Box)(() => ({
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}))

export const LoadingP = styled(Typography)(() => ({
    margin: 0,
    fontSize: 25
}))