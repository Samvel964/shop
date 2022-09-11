import './style.scss';
import { Dashboard } from "../../components/Dashboard";
import { Outlet } from "react-router-dom";
import { DashboardTopLine } from '../../components/DashboardTopLine';
import { useSelector } from 'react-redux';

export const DashboardLayout = () => {
    const smallDahsboard = useSelector(state => state.style.className);

    return(
        <>
            <div className={smallDahsboard ? 'small-dash' :'dashboardLayout'}>
                <Dashboard/>
            </div>
            <div className={smallDahsboard ? 'small-outlet' :'outlet'}>
                <DashboardTopLine />
                <Outlet/>
            </div>
        </>
    )
}
