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

const Hero = ({ title, description}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    return (
<Container sx={[{pt: 1, flexDirection: 'column', mt: 5}, matches && {mt: 6, alignItems: 'center', flexWrap: 'wrap'}]}>
<Fade timeout={2000} in >
    <Box sx={[{display: 'flex', alignItems: 'center'}, matches && {flexDirection: 'column', mt: 3}]}>
<Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography component="h2" variant="h2" >
            {title}
        </Typography>
        <Typography component="p" variant="body"  sx={{mt: 5}}>
        {description}
        </Typography>
        <Box  sx={{mt: 5, textAlign: "center"}}>
        <Button variant='contained' component={NavLink} to="/register">Crear cuenta demo</Button>
        </Box>
    </Box>
    <Box sx={{flexGrow: 1, width: "100%"}}>
         <HeroSVG  sx={{width: '100%', height: '100%'}}/>
        </Box>
    </Box>
  
        </Fade>
        <Box sx={{ textAlign: 'center', pt: 10}}>

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