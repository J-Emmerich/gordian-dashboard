import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LandingNavigation from '../../navigation/LandingNavigation';

const Landing = () => {
return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
<LandingNavigation />
<Container sx={{backgroundColor: "green"}}>

<div>Hello is landing</div>
</Container>
<Box component='footer' sx={{mt: 'auto', backgroundColor: "purple"}}>
    <Typography variant='h2' component='p'>This is a Sticky footer</Typography>
</Box>

    </Box>
)
}

export default Landing