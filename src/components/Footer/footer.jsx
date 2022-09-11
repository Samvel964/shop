import './style.scss';
import logo from './images/logo.png';
import { NavLink } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export const Footer = () => {
    return(
        <footer className='container-fluid'>
            <div className="logo">
                <img src={logo} alt="logo" width={40}/>               
            </div>
            <div className='links'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/contact'>Contact us</NavLink>
            </div>
            <div className='social'>
                <a href="facebook.com"><FacebookRoundedIcon /></a>
                <a href="twitter.com"><TwitterIcon/></a>
                <a href="instagram.com"><InstagramIcon/></a>
            </div>
        </footer>
    )
}
