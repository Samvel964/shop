import './style.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { logOut } from '../../api/auth';

export const ButtonToggleDropdown = ({title}) => {

    const onClickHandler = async () => {
        await logOut();
        localStorage.removeItem('user-token');
        window.location.href = '/';
    }
    
    return(
    <DropdownButton id="dropdown-item-button" title={title} variant='outline' className='drop'>
        <Link to='/dashboard'><Dropdown.Item as="button"><DashboardOutlinedIcon/> Dashboard</Dropdown.Item></Link>
        <Link to='/my-profile'><Dropdown.Item as="button"><AccountCircleOutlinedIcon/> My profile</Dropdown.Item></Link>
        <Dropdown.Item as="button" onClick={() => onClickHandler() }><LogoutIcon/> Log out</Dropdown.Item>
    </DropdownButton>
    );
}
