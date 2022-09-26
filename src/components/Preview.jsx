import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// ICONS
import {
  Close as CloseIcon,
  Note as NoteIcon,
  Crop as CropIcon,
  Timer as TimerIcon,
  Create as CreateIcon,
  MusicNote as MusicNoteIcon,
  AttachFile as AttachFileIcon,
  TextFields as TextFieldsIcon,
} from '@mui/icons-material';

// STORE
import { resetCameraImage, selectCameraImage } from '../features/cameraSlice';
import { selectUser } from '../features/appSlice';
import { v4 as uuid } from 'uuid';

// FIREBASE
import { db, storageRef } from "../app/firebase";
import firebase from 'firebase';

// COMPONENTS
import { SendBtn } from '../components/core';

function Preview() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cameraImage = useSelector(selectCameraImage)

  // STATE
  const [isUploading, setIsOploading] = useState(false);
  

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true })
    }
  }, [cameraImage, navigate])

  const closePreview = () => {
    dispatch(resetCameraImage())
  }

  const uploadToStorage = async () => {
    const postImageRef = storageRef.child(`post-images/${uuid()}`);

    await postImageRef.putString(cameraImage, 'data_url');

    const imageUrl = await postImageRef.getDownloadURL();

    return imageUrl;
  };

  const savePostToFireStore = async () => {
    setIsOploading(true);

    const imageUrl = await uploadToStorage();

    await db.collection('posts')
      .doc()
      .set({
        imageUrl: imageUrl,
        username: user.displayName,
        read: false,
        profilePic: user.profilePic,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
    navigate("/chats", {replace: true})
      
    setTimeout(() => {
      setIsOploading(false);

      closePreview();
    }, 0);
  }

  return (
    <div className='preview'>
      <CloseIcon className='preview__close' onClick={ closePreview } />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt={'Story'} />

      <SendBtn
        title={'Send Now'}
        loadingCopy={'PLEASE WAIT'}
        loading={isUploading}
        handleOnClick={savePostToFireStore}
      />
    </div>
  )
}

export default Preview;
