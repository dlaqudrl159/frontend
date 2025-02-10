import { Box, Button, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PaginationContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width : '100%',
    gap: '5px',
    margin:'3px'
}))

export const PaginagionButton = styled(Button, {shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'isdisabled'})(({theme, isactive, isdisabled}) => ({
    width : '15%',
    minWidth : '0px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isdisabled ? '#ddd' : (isactive ? '#007bff' : '#ddd'),
    backgroundColor: isdisabled ? '#f5f5f5' : (isactive ? '#007bff' : 'white'),
    cursor: isdisabled ? 'not-allowed' : 'pointer',
    color: isdisabled ? '#999' : (isactive ? 'white' : []),
    [theme.breakpoints.up('xs')]: {
        fontSize: '8px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '10px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '12px',
    },

}))