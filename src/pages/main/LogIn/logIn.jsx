import './style.scss';
import { FormInput } from '../../../components/FormInput';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { logIn } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../features/userSlice';

export const LogIn = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const onInputHnadler = (e,id) => {
        data[id] = e.target.value
        setData({...data});        
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        logIn(data).then(res => {
            dispatch(setUserData(res.data.user))
            window.location.href = '/'
        })
    }

    return(
        <div className='log-in'>
        <p className='h1'>Log in</p>
        <form className='form' onSubmit={(e) => onSubmitHandler(e)} onChange={(e) => onInputHnadler(e, e.target.id)}>
            <FormInput label='Email' type='email' id={'email'} placeholder='Enter your email' message=''/>
            <FormInput label='Password' type='password' id={'password'}  placeholder='Enter your password' message=''/>
            <Button variant="outline-secondary" type='submit' className='d-block mx-auto my-4'>Log in</Button>
        </form>           
    </div>
    )
}
