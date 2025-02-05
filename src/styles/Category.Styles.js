import { styled } from '@mui/material/styles';
import { Box, Button, FormControl, Input, MenuItem, Select, Typography } from "@mui/material";

export const CategoryContainer = styled(Box)(({ theme }) => ({
    height: 'auto',
    position: 'absolute',
    left: '20px',
    top: '2%',
    pointerEvents: 'none',
    [theme.breakpoints.up('xs')]: {
        width: '280px',
    },
    [theme.breakpoints.up('sm')]: {
        width: '320px',
    },
    [theme.breakpoints.up('md')]: {
        width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '500px',
    },
    zIndex : 1
}));

export const TabContainer = styled(Box)(() => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto'
}));

export const TabMenu = styled(Box)(() => ({
    width: '100%',
    height: '20%',
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    pointerEvents: 'auto'
}))

export const TabBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isactive'
})(({ isactive }) => ({
    width: "30%",
    height: "80%",
    border: "1px solid black",
    backgroundColor: isactive ? "lightgray" : "#f3f5ff",
    textAlign: "center",
    lineHeight: '35px',
    color: "black",
    cursor: "pointer",
    marginLeft: "1%",
    marginRight: "1%",
    fontWeight: isactive ? "bold" : "normal",
}))

export const TabContent = styled(Box)(() => ({
    width: '100%',
    height: '80%',
    pointerEvents: 'auto',
}))

export const TabDropDownBox = styled(Box)(() => ({
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    pointerEvents: 'auto' //마우스 이벤트 작동
}))

export const SearchPanelContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    pointerEvents: 'auto', //마우스 이벤트 작동
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.up('xs')]: {
        height: '280px',
    },
    [theme.breakpoints.up('sm')]: {
        height: '320px',
    },
    [theme.breakpoints.up('md')]: {
        height: '400px',
    },
    [theme.breakpoints.up('lg')]: {
        height: '500px',
    },
}))

export const SearchPanelHeader = styled(Box)(() => ({
    height: '10%',
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
    padding: '0 16px',
    backgroundColor: '#fafafa',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
}))

export const SearchPanelHeaderTitle = styled(Typography)(() => ({
    fontWeight: 600,
    color: '#2c3e50',
    fontSize: '1.1rem',
    padding: '0 10px',
    letterSpacing: '0.3px',
}))

export const SearchPanelHeaderCloseButton = styled(Button)(() => ({
    width: '32px',
    minWidth: 'unset',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
    padding: '8px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        color: '#333',
    },
}))

export const SearchPanelContent = styled(Box)(() => ({
    height: '75%',
    overflowY: 'auto',
    fontSize: '18px',
    padding: '8px 0',
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

export const SearchPanelResultContainer = styled(Box)(() => ({
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f8f9fa',
    },
    borderBottom: '1px solid #f0f0f0',
}))

export const SearchPanelResult = styled(Typography)(() => ({
    marginLeft: '3%',
    color: '#4a4a4a',
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

export const SearchPanelFooter = styled(Box)(() => ({
    height: '15%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderTop: '1px solid #eaeaea',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
}))

export const ChoiceContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}))

export const ChoiceButton = styled(Button)(() => ({
    width: '100%',
    border: '1px solid black',
    margin: '5px'
}))

export const ChoiceButtonContent = styled(Typography)(() => ({
}))

export const JibunContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '5px',
}))

export const RoadContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '5px',
}))

export const SidoContainer = styled(Box)(() => ({
    width: '48%'
}))

export const SigunguContainer = styled(Box)(() => ({
    width: '48%'
}))

export const DongContainer = styled(Box)(() => ({
    width: '97%'
}))

export const RegionFormControl = styled(FormControl)(() => ({
    width: '100%',
    height: '35px',
    marginTop: '3px',
    marginBottom: "3px"
}))

export const RegionSelect = styled(Select)(() => ({
    height: "35px"
}))

export const RegionMenuItem = styled(MenuItem)(() => ({
    height: "30px",
}))

export const RoadNameInsertInput = styled(Input)(() => ({
    width: '80%',
    height: '35px',
    border: '1px solid #ccc',
    marginTop: '3px',
    marginBottom: "3px",
}))

export const RoadNameClickButton = styled(Button)(({ theme }) => ({
    width: "16%",
    minWidth: '0px',
    height: '35px',
    border: '1px solid #ccc',
    marginTop: '3px',
    marginBottom: "3px",
    color: 'black',
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '16px',
    },
}))

export const ApartmentNameContainer = styled(Box)(() => ({
    width: '100%',
    display : 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '5px',
}))

export const ApartmentNameHeaderTitle = styled(Box)(() => ({
    width: '100%',
    height: '30%',
    fontSize: '30px',
    margin: '0px'
}))

export const ApartmentNameInput = styled(Input)(() => ({
    width: '80%',
    height: '35px',
    border: '1px solid #ccc',
    marginTop: '3px',
    marginBottom: "3px",
}))

export const ApartmentNameButton = styled(Button)(({ theme }) => ({
    width: "16%",
    minWidth: '0px',
    height: '35px',
    border: '1px solid #ccc',
    marginTop: '3px',
    marginBottom: "3px",
    color: 'black',
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '16px',
    },
}))