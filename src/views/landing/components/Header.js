import {lazy, Suspense} from 'react'
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/material/styles'
import MobileHeader from '../../../navigation/MobileLandingNav'
const DesktopLandingNav = lazy(()=>import ('../../../navigation/DesktopLandingNav.js'))

const Header = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))
    const showNav = () => {
        if(matches) {
            return  <Suspense fallback={<MobileHeader />}>
            <DesktopLandingNav />
          </Suspense>
        } else return <MobileHeader />
    }

    
    return (
    <>
    {showNav()}
    </>
)
}

export default Header;