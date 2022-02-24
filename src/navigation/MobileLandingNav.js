import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import styled from 'styled-components';
import { scroller } from 'react-scroll';
import { NavLink } from "react-router-dom";
const StyledButton = styled(Button)`
${({theme}) => `
background-image: linear-gradient(120deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%);
background-repeat: no-repeat;
background-size: 100% 0;
background-position: 0 88%;
transition: ${theme.transitions.create(['background-size'], {duration: theme.transitions.duration.short})};
            &:hover {
              background-size: 100% 0.2em;
              background-color: inherit;
`}`;


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
<Box component="nav" sx={{display: 'flex', flexDirection: 'column', width: '250px'}}>

<StyledButton onClick={()=>{
setOpen(false); 
scroller.scrollTo('section2', {
  duration: 1500,
  delay: 100,
  smooth: true,
})} } >Caracteristicas</StyledButton>
<Divider variant="middle" orientation="horizontal" flexItem component="span" />
<StyledButton component="a" href="https://github.com/j-emmerich/Gordian-Knot">Código</StyledButton>
<Divider  flexItem component="span"  />
<StyledButton onClick={()=>{
setOpen(false); 
scroller.scrollTo('roadmap', {
  duration: 1500,
  delay: 100,
  smooth: true,
})} }>Roadmap</StyledButton>
<Divider  flexItem component="span"  />

<StyledButton component={NavLink} to="/login">Mi Cuenta</StyledButton>

</Box>
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