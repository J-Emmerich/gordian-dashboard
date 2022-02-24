import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link'

const CTA = () => {
    return (
        <Container sx={{pt: 10, flexDirection: 'column', marginY: 6}}>
<Fade timeout={2000} in >
    
<Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography component="h2" variant="h2" textAlign={"center"}>
        Empezamos?
        </Typography>
       
        <Box textAlign={"center"} paddingY={5}>

<Button variant='contained'>Crear Cuenta demo</Button>
        </Box>
    </Box>
        </Fade>
        </Container>
    )
}

export default CTA