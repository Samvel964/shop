import './style.scss';
import error from './image/errorPage.png';

export const ErrorPage = () => {
    return (
        <div className='errorPage'>
            <img src={error} alt="page not found" />
        </div>
    )
}
