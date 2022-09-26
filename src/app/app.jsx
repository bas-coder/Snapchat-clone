import React, { useEffect } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import Login from '../components/Login';
import Preview from '../components/Preview';
import ChatView from '../components/ChatView';
import Chats from '../components/Chats';
import { logout,login } from '../features/appSlice';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid, 
        }))
      } else {
        dispatch(logout())
      }
    })      
  }, [])
  

  return (
    <div className="app">
     <Router>
      {!user ? (
        <Login />
      ): (
        <div className="app__body">
          <div className='app__bodyBackground'>
            <Routes>
            <Route path="/chats/view" 
              element = { <ChatView /> }
            />
            <Route path="/chats" 
              element = { <Chats /> }
            />
            <Route path="/preview" 
              element = { <Preview /> }
            />          
            <Route exact path="/" 
              element = { <WebcamCapture /> }
            />
            </Routes>
          </div>
        </div>
      )}

     </Router>
    </div>
  );
}

export default App;
