import './style.scss';
import { Link } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logOut } from '../../api/auth';

export const DashboardTopLine = () => {
    const onClickHandler = async() => {
        await logOut();
        window.location.href = '/';
        localStorage.removeItem('user-token');
    }
    return(
        <div className='top-line'>
           <div className='d-flex justify-content-center align-items-center'>
                <Link to='/' className='btn btn-success px-4'>Go to main page</Link>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <button 
                className='btn btn-outline-secondary px-4' 
                onClick={() => onClickHandler()}
                title='Log out'
                >
                    <LogoutRoundedIcon/></button>
            </div>
        </div>
    )
}
