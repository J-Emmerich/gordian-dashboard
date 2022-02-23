import Box from '@mui/material/Box';
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Footer from '../../components/Footer'
import {Element} from 'react-scroll';
import Features from '../../components/Features'
import About from '../../components/About'
import data from '../../services/featuresData.json'
import CTA from '../../components/CTA';
const Landing = () => {
return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        
<Header />
    <Hero title="CRM Sin Complicación" description="Transforma tu negocio, gestiona todo lo que ocurre en tu empresa en un solo software."/>
<Element name="section2">
    <Features features={data}/>
    </Element>       
    <About />
    <CTA />
<Footer />


    </Box>
)
}

export default Landing