import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import styled from 'styled-components'
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
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


const DesktopLandingNav = () => {
return (
  <Container maxWidth='xl'  sx={{display: 'flex', padding: 5}}>

  <Box sx={{mr: "auto", display: 'flex'}}>
    <FingerprintIcon />
    <Typography variant='subtitle1' component='h2' pl={1}>Gordian Knot</Typography>
</Box>

<Box component="nav" sx={{display: 'flex', alignContent:'center'}}>

    <StyledButton >Caracteristicas</StyledButton>
    <Divider variant="middle" orientation="vertical" flexItem component="span" />
    <StyledButton>Código</StyledButton>
    <Divider orientation="vertical" flexItem component="span"  />
    <StyledButton>Sobre Gordian Knot</StyledButton>
    <Box sx={{ml: 'auto', pl: 15}}>
    <StyledButton>Mi Cuenta</StyledButton>
    </Box>
</Box>
</Container>
)
}

export default DesktopLandingNav