import { styled } from '@mui/material/styles';
import { Box, Button, FormControl, Input, MenuItem, Select, Typography } from "@mui/material";

export const CategoryContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    height: 'auto',
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
}))

export const SearchPanelHeaderTitle = styled(Typography)(() => ({
    fontWeight: 500,
    color: '#333',
    padding: '0 10px',

}))

export const SearchPanelHeaderCloseButton = styled(Button)(() => ({
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'black'
}))

export const SearchPanelContent = styled(Box)(() => ({
    height: '75%',
    overflowY: 'auto',
    fontSize: '18px'
}))

export const SearchPanelResultContainer = styled(Box)(() => ({
    height: '10%',
    display: 'flex',
    alignItems: 'center'
}))

export const SearchPanelResult = styled(Typography)(() => ({
    marginLeft: '3%'
}))

export const SearchPanelFooter = styled(Box)(() => ({
    height: '15%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    width: '100%',
    justifyContent: 'center',
}))

export const RoadContainer = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    width: '100%',
    justifyContent: 'center',
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

export const RoadNameClickButton = styled(Button)(() => ({
    width: "16%",
    height: '35px',
    border: '1px solid #ccc',
    marginTop: '3px',
    marginBottom: "3px",
    color: 'black'
    
}))