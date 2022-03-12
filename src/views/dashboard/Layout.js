import React, { useState, useContext } from "react";
import { Routes, Route, NavLink, Outlet} from "react-router-dom";
import constants from "../../constants/index";
import { UserContext } from "../../services/userContext";
// Components

import Nav from "../../navigation/Nav";
import InvoiceDashboard from "./invoices/InvoiceDashboard";
import CRMDashboard from "./crm/CRMDashboard";
import Home from "./Home";
import Settings from "./settings/Settings";
import AddClient from "./crm/AddClient";


import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import ListItemButton  from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import Container from '@mui/material/Container';





const drawerBleeding = 15;

const AppBar = styled(MuiAppBar)(({theme})=> ({
  zIndex: theme.zIndex.drawer + 1
}));



const Puller = styled(Box)(({ theme }) => ({
  width: 6,
  height: 30,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
}));

export default function Layout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem(constants.ACCESS_TOKEN);
  const { user, logout, selectedProject } = useContext(UserContext);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   
    <Box    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      

       <GlobalStyles
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            width: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1  }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpen(!open)}
            
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gordian Knot
          </Typography>
        
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose}>
  <ListItemButton component={NavLink} to="ajustes">

  <ListItemIcon><SettingsIcon /></ListItemIcon>
   <ListItemText primary="Ajustes"/>
  </ListItemButton>
    </MenuItem>
    <MenuItem>
    <ListItemButton onClick={()=>logout()}>
        <ListItemIcon><LogoutIcon /></ListItemIcon>
       <ListItemText>Logout</ListItemText>
        </ListItemButton>
        
    </MenuItem>
              </Menu>
            </div>
    
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={()=>toggleDrawer(false)}
      onOpen={()=>toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      width={drawerBleeding}
      ModalProps={{
      keepMounted: true,
      }}
    >
      <Toolbar />
         <Box
          sx={{
           width: '15px',
           visibility: 'visible',
             height: '100vh',
            position: 'absolute',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
           right: -drawerBleeding,
           top: 0,
           bottom: 0,
           overflow: 'visible',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'flex-end',
           paddingRight: '5px'
          }}
        >
          <Puller />
         
        </Box>
        <Box
          sx={{
           
            pb: 2,
            height: '100%',
            overflow: 'visible',
          }}
        >
         <Nav toggle={toggleDrawer}/>
        
        </Box>
    </SwipeableDrawer>
<main>
  <Container>

<Routes>
            <Route path="/clientes" element={<CRMDashboard token={token}  />}>
              </Route>
              <Route path='/clientes/anadirnuevo' element={<AddClient token={token}/>} />
            <Route path="/facturas" element={ <InvoiceDashboard token={token} />}/>
            <Route path="/ajustes" element={<Settings token={token}  />} />
            <Route index element={<Home token={token} user={user} />} />
          </Routes>

          <Outlet />
  </Container>
</main>
          </Box>
      
  );
}