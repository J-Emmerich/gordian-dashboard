import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Roadmap from './Roadmap';
import Fade from '@mui/material/Fade';  
import Link from '@mui/material/Link';
import{ ReactComponent as AboutSVG} from '../assets/about-min.svg';



const About = () => {
return (
    <Container sx={{pt: 10, flexDirection: 'column', marginY: 12}}>
<Fade timeout={2000} in >
    <Box sx={[{display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }]}>
        <Box >

      
<Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography component="h2" variant="h2" textAlign={"center"}>
          Roadmap
        </Typography>
        <Typography  component="p" variant="body"  sx={{textAlign: 'center', marginY: 8, fontSize: "20px"}}>
       Puedes acompañar el desarrollo del proyecto en <Link href="https://github.com/j-emmerich/gordian-knot/issues">nuestro bugtracker.</Link>
        </Typography>
    </Box>
 <Roadmap />
        </Box>
    <Box sx={{flexGrow: 1, width: "100%", mr: 10}}>
         <AboutSVG sx={{width: '100%', height: '100%'}}/>
        </Box>
     
        </Box>
  
        </Fade>
        </Container>
    
)
}

export default About