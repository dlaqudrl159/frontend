import { Box, Button, Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoginContainer = styled(Box)(() => ({
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
}))

export const LoginTitle = styled(Box)(() => ({
    margin: '0 0 20px 0',
    color: '#333',
    textAlign: 'center',
    fontWeight : "normal"
}))

export const LoginInput = styled(Input)(() => ({
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '100%',
    margin: '5px'
}))

export const LoginButton = styled(Button)(() => ({
    padding: '12px',
    backgroundColor: '#ccc',
    color: 'black',
    border: '1px solid #ccc',
    width: "30%",
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '70%'
}))