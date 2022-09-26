import React from 'react'
import { Button } from '@mui/material';
import { imgSrc } from '../assets/static/imgSrc';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../app/firebase';
import { login } from '../features/appSlice';


function Login() {
    const dispatch = useDispatch();
    
    const signIn = () => {
        auth.signInWithPopup( provider )
        .then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        }).catch(error => alert(error.messsage));
    };

  return (
    <div className='login'>
        <div className="login__container">
            <img src={imgSrc.snapchat} alt="" />
            <Button 
            variant='outlined'
            onClick={signIn}
            id="login__btn"
            >
                SIGN IN
            </Button>
        </div>
    </div>
  )
}

export default Login