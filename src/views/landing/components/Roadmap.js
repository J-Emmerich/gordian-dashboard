import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/system'
const Roadmap = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (

    <Grid container sx={[{ml: 10}, matches && {ml: 0}]}>
<Grid item xs={12} md={6}>
<List >

<ListItem>
  <ListItemIcon>
    <Checkbox disabled />
  </ListItemIcon>
  <ListItemText>
    Gestión de Usuarios / Añadir Colaboradores
  </ListItemText>
</ListItem>
<ListItem>
  <ListItemIcon>
    <Checkbox disabled />
  </ListItemIcon>
  <ListItemText>Dashboard con estadísticas</ListItemText>
</ListItem>
<ListItem>
  <ListItemIcon>
    <Checkbox disabled />
  </ListItemIcon>
  <ListItemText>
    Subir ficheros / Gestionar contratos de los clientes
  </ListItemText>
</ListItem>
</List>
</Grid>
<Grid item  xs={12} md={6}>
<List>
<ListItem>
  <ListItemIcon>
    <Checkbox disabled checked={true}/>
  </ListItemIcon>
  <ListItemText>Validación de los formularios</ListItemText>
</ListItem>
<ListItem>
  <ListItemIcon>
    <Checkbox disabled />
  </ListItemIcon>
  <ListItemText>Notificaciones con Socket.IO</ListItemText>
</ListItem>
<ListItem>
  <ListItemIcon>
    <Checkbox disabled />
  </ListItemIcon>
  <ListItemText>
    Establecer tema front-end / Añadir tema oscuro
  </ListItemText>
</ListItem>
</List>
</Grid>
    </Grid>
    
  
  )
}

export default Roadmap;