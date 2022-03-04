import React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton  from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";


function Nav() {
  return (
    <>
      <List>
<ListItem >
  <ListItemButton component={NavLink} to='../app'>

  <ListItemIcon><HomeIcon /></ListItemIcon>
   <ListItemText primary="Home"/>
  </ListItemButton>
    </ListItem>   
  

<ListItem>
  <ListItemButton component={NavLink} to="facturas">

  <ListItemIcon><ReceiptIcon /></ListItemIcon>
   <ListItemText primary="Facturas"/>
  </ListItemButton>
    </ListItem>   

<ListItem >
  <ListItemButton component={NavLink} to="clientes">

  <ListItemIcon><PersonIcon /></ListItemIcon>
   <ListItemText primary="Clientes"/>
  </ListItemButton>
    </ListItem>   

<ListItem >
  <ListItemButton component={NavLink} to="ajustes">

  <ListItemIcon><SettingsIcon /></ListItemIcon>
   <ListItemText primary="Ajustes"/>
  </ListItemButton>
    </ListItem>   
      </List>
    </>
  );
}


export default Nav;
