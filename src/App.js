import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectRoutes from './ProjectRoutes';
import { Loader } from './components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './features/userSlice';
import { setLoader } from './features/loaderSlice';
import ScrollToTop from './scrollToTop';


function App() {
  const { pathname } = useLocation();
  const isLoad = useSelector(state => state.loader.data.showloader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoader({showloader: true}));
    
    getUser().then(res => {
      dispatch(setUserData(res.data.user));

      if (res.data.user &&
        ['/log-in','/registration'].includes(pathname)) {
          navigate('/');
      } /*else if (res?.data?.user.role !== 'customer' &&
       ['/dashboard/categories'].includes(pathname)) {
        navigate('/');
      }*/
    });
    dispatch(setLoader({showloader: false}));
    // eslint-disable-next-line
  },[pathname]);

  return (
    <div className="App">
      {isLoad && <Loader/>}
      <ScrollToTop/>
      <ProjectRoutes />
    </div>
  );
}

export default App;
