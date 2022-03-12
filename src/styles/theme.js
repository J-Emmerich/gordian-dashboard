import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
    palette : {
        primary: {main: "#332a50ff",
    light: '#594E77', light2: '#8275A1', light3: '#AC9FCD'},
        secondary: {main: "#d30c7bff"},
        background: {paper: "#D9CAFB"},
        text: {main: "#738290ff"}
    },
    background: {
        primary : "#332a50ff"
    }
    
    
});
theme = responsiveFontSizes(theme);
export default theme;