import './style.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from './images/logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { setClassName } from '../../features/styleSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../api/auth';

export const Dashboard = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()

    const [mini, setMini] = useState('dashboard');
    const [icon, setIcon] = useState('left');
    const [small, setSmall] = useState(false);
    const [user, setUser] = useState()

    useEffect(() => {
        getUser().then(res => {
            setUser(res.data.user)
        })
    },[]);

    useEffect(() => {
        dispatch(setClassName(small));
        // eslint-disable-next-line
    },[pathname])

    const onClickHandler = () => {
        if (mini === 'dashboard') {
            setMini('dashboard mini')
            setIcon('right')
            dispatch(setClassName(true))
            setTimeout(() => {
                setSmall(!small)
            },180)
        } else {
            setMini('dashboard')
            setIcon('left')
            dispatch(setClassName(false))
            setTimeout(() => {
                setSmall(!small)
            },350)
        }
    }

    return(
        <div className={mini}>
            <div className='dashboard-open-btn '>
                <div onClick={() => onClickHandler()}>
                    <div className={icon}>&#60;</div>
                </div>
            </div>
            <div className='dashboard-img-block'>
                <img src={logo} width='90' alt="logo" className={!small ? '' : 'hidden'}/>
            </div>
            <div className='dashboard-tools'>
                <ul>
                    <li>{!small ? <Link to='/dashboard'><DashboardIcon/> Dashboard</Link> : <Link to='/dashboard' title='Dashboard'><DashboardIcon/></Link>}</li>
                    <li>{!small ? <Link to='/dashboard/products'><ProductionQuantityLimitsIcon/> Products</Link> :  <Link to='/dashboard/products' title='Products'><ProductionQuantityLimitsIcon/></Link>}</li>
                    <li>{!small ? <Link to='/dashboard/categories'><CategoryIcon/> Categories</Link> : <Link to='/dashboard/categories' title='Categories'><CategoryIcon/></Link> }</li>
                </ul>
            </div>
        </div>
    )
}
