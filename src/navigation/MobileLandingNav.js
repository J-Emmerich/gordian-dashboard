import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ChevronLeft from "@mui/icons-material/ChevronLeft"


import {useState} from 'react'
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <ClickAwayListener onClickAway={()=>setOpen(false)} >
    <Container sx={{background: 'red'}}>


      <Drawer  ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }} variant="persistent" open={open} >
<Box ml={'auto'}><IconButton onClick={()=>setOpen(false)}><ChevronLeft fontSize="large"/></IconButton></Box>
        <List style={{ width: 250 }}>
            
          {["Home", "Our Services", "Contact Us", "About Us"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
   <Box >

      <AppBar
        position="fixed"
        sx={{backgroundColor: '#fff'}}
        >
        <Toolbar>
        <IconButton onClick={()=>setOpen(true)}>
          <MenuIcon fontSize="large"/>
         </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1}}>
    <FingerprintIcon color={'primary'}/>
    <Typography color={'primary.main'} variant='subtitle1' component='h2' pl={1}>Gordian Knot</Typography>
</Box>
        </Toolbar>
      </AppBar>
   
        </Box>
    </Container>
    </ClickAwayListener>
  );
};

export default Header