import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Roadmap from './Roadmap';
import Fade from '@mui/material/Fade';  
import Link from '@mui/material/Link';
import{ ReactComponent as AboutSVG} from '../../../assets/about-min-view.svg';

import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/system'


const About = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
const showSVG = (mobile) => {
  return(

      <Box sx={[{flexGrow: 1, width: "100%", mr: 10}, mobile && {mt: 3, width: '80%'}]}>
         <AboutSVG width={"100%"} />
        </Box>
      )
}
    return (
    <Container sx={[{pt: 10, flexDirection: 'column', marginY: 12}, matches && {flexDirection: 'column', mt: 5, mb: 2}]}>
<Fade timeout={2000} in >
    <Box sx={[{display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }, matches && {flexDirection: 'column'}]}>
        <Box >      
<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h2" variant="h2" textAlign={"center"}>
          Roadmap
        </Typography>
        
        <Typography  component="p" variant="body"  sx={{textAlign: 'center', marginY: 8, fontSize: "20px"}}>
       Puedes acompañar el desarrollo del proyecto en <Link href="https://github.com/j-emmerich/gordian-knot/issues">nuestro bugtracker.</Link>
        </Typography>
        {matches && showSVG(matches)}
    </Box>
 <Roadmap />
        </Box>
     {!matches && showSVG(matches)}
    
        </Box>
  
        </Fade>
        </Container>
    
)
}

export default About