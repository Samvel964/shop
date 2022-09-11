import './style.scss';
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from '../../components/Footer/index';

export const Main = () => {
    return(
    <div>
        <Header/>
        <div className='outLet'>
            <Outlet/>
        </div>        
        <Footer/>
    </div>)
}
