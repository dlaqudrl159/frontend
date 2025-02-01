import React, { memo, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";

const MainHeader = memo(() => {

    const [open, setOpen] = useState(false);
    const navigator = useNavigate();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleMenuUrl = (url) => {
        switch (url) {
            case '아파트': {
                navigator("/apartment")
                return;
            }
            default: {
                alert("준비중입니다.");
                return;
            }
        }
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['아파트', '연립/다세대', '단독/다가구', '오피스텔'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => { handleMenuUrl(text) }}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
    const DrawList2 = (
        <Box sx={{ flexGrow: 6, display: { xs: 'none', md: 'flex' }, gap: '5%' }}>
            {['아파트', '연립/다세대', '단독/다가구', '오피스텔'].map((text, index) => (
                <Typography key={text} variant="h6" component="div" onClick={() => { handleMenuUrl(text) }} >
                    {text}
                </Typography>
            ))}
        </Box>
    );
    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{ height: '10dvh', justifyContent: 'center' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, whiteSpace: 'nowrap' }} onClick={() => { navigator("/") }}>
                        아파트 거래내역 조회
                    </Typography>
                    {DrawList2}
                    <IconButton
                        onClick={toggleDrawer(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: "inline-flex", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    )

})

export default MainHeader;