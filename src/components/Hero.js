import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import{ ReactComponent as HeroSVG} from '../assets/gordian-hero-min.svg';


import { scroller } from 'react-scroll';
const Hero = ({ title, description}) => {
    return (
<Container sx={{pt: 10, flexDirection: 'column'}}>
<Fade timeout={2000} in >
    <Box sx={[{display: 'flex', alignItems: 'center' }]}>
<Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography component="h2" variant="h2">
            {title}
        </Typography>
        <Typography component="p" variant="body"  sx={{mt: 5}}>
        {description}
        </Typography>
        <Box  sx={{mt: 5, textAlign: "center"}}>
        <Button variant='contained'>Crear cuenta demo</Button>
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