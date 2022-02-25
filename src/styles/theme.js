import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
    palette : {
        primary: {main: "#332a50ff"},
        secondary: {main: "#d30c7bff"},
        background: {paper: "#fff"},
        text: {main: "#738290ff"}
    },
    background: {
        primary : "#332a50ff"
    }
    
    
});
theme = responsiveFontSizes(theme);
export default theme;