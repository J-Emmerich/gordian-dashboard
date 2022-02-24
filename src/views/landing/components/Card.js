import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Chip from '@mui/material/Chip'
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/system';

const Card = ({feature}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    return (
<Grid item xs={12} sm={6} md={4} alignItems='center'>
<Paper elevation={0}  >
    <Typography component='h3' variant='h4' textAlign={'center'}>{feature.name}</Typography>
<Box sx={[{display: 'flex', mt: 5, gap: 2}, matches && {flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'}  ]}>
<SvgIcon sx={[{width: "50px", height: "50px", mr: 5}, matches && {mr: '0', width: '80px', height: '80px'}]}><path d={feature.icon}/></SvgIcon>
<Typography component='p' variant="body">{feature.description}</Typography>
{feature.isAvailable === "false"  && <Chip label="¡Luego!" color="secondary" sx={{alignSelf: 'center'}}/>}
</Box>

</Paper>
</Grid>

    )
}

export default Card;