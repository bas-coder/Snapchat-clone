import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//ICONS
import { Avatar } from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

//FIREBASE
import { db } from "../app/firebase";

//STORE
import ReactTimeago from 'react-timeago';
import { selectImage, selectUser } from '../features/appSlice'
import { useNavigate } from 'react-router-dom';

//COMPONENTS
import ChatView from './ChatView';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open  = () => {
    if (!read) {
        dispatch(selectImage(imageUrl));
        db.collection('posts').doc(id).set({
            read: true,
        }, { merge: true });
        navigate('/chats/view');
    }
  }  

  return (
    <div onClick={open} className='chat'>
        <Avatar className='chat__avatar' src={user.profilePic} />
        <div className="chat__info">
            <h4>{ username }</h4>
            <p>
               {!read && "Tap to view - "}{" "}<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
            </p>
        </div>

       {!read && <div className="chat__readIcon">
        <p>1</p> 
       </div>}
    </div>
  )
}

export default Chat