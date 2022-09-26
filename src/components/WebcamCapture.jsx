import { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
    width: 250,
    height: 370,
    facingMode: "user",
};

function WebcamCapture() {

    const webcamRef = useRef(null); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        
        dispatch(setCameraImage(imageSrc));

        setTimeout(() => {
            navigate("./preview");
        }, 0);
    }, [dispatch, navigate, webcamRef])

  return (
    <div className='webcamCapture'>
        <Webcam 
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            ref = {webcamRef}
            screenshotFormat="image/webp"
            videoConstraints={videoConstraints}
        />
        <PhotoCameraIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
        />
    </div>
  )
}

export default WebcamCapture
