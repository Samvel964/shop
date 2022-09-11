import './style.scss'
import logo from './logo.png';

export const Loader = () => {
    return(
        <div className='loader-div'>
            <img src={logo} alt="loading..." />
        </div>
    )
}
