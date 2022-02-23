import LandingNavigation from '../navigation/LandingNavigation';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const Header = () => {
    return (
        <Container maxWidth='xl' sx={{display: 'flex', padding: 5}}>
<Box sx={{mr: "auto", display: 'flex'}}>
    <FingerprintIcon />
    <Typography variant='subtitle1' component='h2'>Gordian Knot</Typography>
</Box>
<LandingNavigation />
</Container>
    )
}

export default Header;