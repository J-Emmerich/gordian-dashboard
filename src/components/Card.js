import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Chip from '@mui/material/Chip'

const Card = ({feature}) => {
    return (
<Grid item xs={4}>
<Paper elevation={0} >
    <Typography component='h3' variant='h4'>{feature.name}</Typography>
<Box sx={{display: 'flex', mt: 5}}>
<SvgIcon sx={{width: "50px", height: "50px", mr: 5}}><path d={feature.icon}/></SvgIcon>
<Typography component='p' variant="body">{feature.description}</Typography>
{feature.isAvailable === "false" && <Chip label="¡Luego!" color="secondary" />}
</Box>

</Paper>
</Grid>

    )
}

export default Card;