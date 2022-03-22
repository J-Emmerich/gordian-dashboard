import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import{ ReactComponent as HeroSVG} from '../../../assets/gordian-hero-min-view.svg';
import { scroller } from 'react-scroll';
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from 'styled-components'
import { NavLink } from 'react-router-dom';

const Hero = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const highMatches = useMediaQuery(theme.breakpoints.down('sm'))
    return (
<Container sx={[{ mt: 1}, matches && {mt: 6, flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}]}>
<Fade timeout={2000} in >


    <Box sx={[{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', maxWidth: '100%'}, matches && {flexDirection: 'column', mt: 3}]}>
<Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '600px'}}>
        <Typography mt={5} textAlign="center" component="h2" variant="h2" >
       CRM Sin Complicación
        </Typography>
        <Typography component="p" variant="body"  sx={{mt: 5}}>
      Transforma tu negocio, gestiona todo lo que ocurre en tu empresa en un solo software.
        </Typography>
        <Box  sx={{mt: 5, textAlign: "center"}}>
        <Button variant='contained' component={NavLink} to="/register">Crear cuenta demo</Button>
        </Box>
    </Box>
    <Box sx={[{maxHeight: '400px', maxWidth: '400px', width: '400px'} ,highMatches && {mt: 5, width: '250px', height: '250px'}]} >
         <HeroSVG  />
        </Box>
    </Box>

        </Fade>
        <Box sx={{ textAlign: 'center', pt: 5}}>

<ArrowDownwardIcon sx={{cursor: 'pointer'}} fontSize='large' onClick={()=>{scroller.scrollTo('section2', {
  duration: 1500,
  delay: 100,
  smooth: true,
  

})}}/>
</Box>
</Container>
    )
}

export default Hero;