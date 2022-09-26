import React, { useEffect, useState } from 'react';

//COMPONENTS
import Chat from './Chat';

//FIREBASE
import { auth, db } from "../app/firebase";

//ICONS
import SearchIcon from '@mui/icons-material/Search'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import { RadioButtonUnchecked as RadioButtonUncheckedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Chats() {

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
      }))
      )
    )
  }, [])

  const takeSnap = () => {
    navigate('/')
  }

  return (
    <div className='chats'>
      <div className="chats__header">
        <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats__avatar' />
        <div className="chats__search">
          <SearchIcon fontSize='small'/>
          <input placeholder='Friends' type="text" />
        </div>
        <ChatBubbleIcon
         className='chats__chatIcon'
         fontSize='small'
         />
      </div>

      <div className="chats__posts">
        {posts.map(({id, data:{ profilePic, username, timestamp, imageUrl, read }}) => (
          <Chat 
          key={id}
          id={id}
          username={username}
          timestamp={timestamp}
          imageUrl={imageUrl}
          read={read}
          profilePic={profilePic}
          />
        ))}
      </div>

      <RadioButtonUncheckedIcon
       className='chats__takePicIcon'
       onClick={takeSnap}
       fontSize='large'
       />
    </div>
  )
}

export default Chats