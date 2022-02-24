import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styled from "styled-components";

const  FooterBox = styled('footer')(
    ({theme}) => `
    background-color: ${theme.palette.secondary.main};
    margin-top: 'auto';
    padding: 20px;`
); 

const Footer = () => {
    return (
        <FooterBox>
    <Typography textAlign="center" variant='subtitle' component='p' color="#FFF">Este proyecto fue desarrollado por <Link color="#fff" href="https://joaoemmerich.com">Joao Emmerich</Link></Typography>
</FooterBox>
    )
}

export default Footer;