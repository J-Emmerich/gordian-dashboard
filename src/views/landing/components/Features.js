import Grid from '@mui/material/Grid'
import Card from './Card'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/system'


const Features = ({features}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Container sx={{pt: 10}}>
            <Typography mt={5} sx={{textAlign: 'center'}} component="h2" variant="h2">Todo lo que necesitas para tu negocio</Typography>
        <Grid container spacing={5} mt={15}>
            
            {features.map((feature) => (
                <Card feature={feature} key={feature.name}/>
                ))}
        </Grid>
                </Container>
    )
}

export default Features;
