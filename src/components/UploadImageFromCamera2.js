import React from 'react'
import Camera from 'react-html5-camera-photo';
import FlipCameraIosRoundedIcon from '@material-ui/icons/FlipCameraIosRounded';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Fab from '@material-ui/core/Fab';

import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

  const styles = {
    divCamera: {
      display: 'flex',
      overflow: 'hidden',
      justifyContent: 'center',
      position: 'relative',
      background: '#001932',
      fontSize: 0,
      height: '100vh',
    },
    divButtons: {
      position: 'absolute',
      bottom: '5vh',
    },
    fab: {
      background: '#1da1f2',
      color: 'white',
      margin: '5px'
    },
  }

// let camera = new Camera()

function handleTakePhoto2 () {

  let videoElement = document.getElementsByTagName("video")[0];;
  let cameraPhoto = new CameraPhoto(videoElement);

  cameraPhoto.startCamera()
  .then((stream)=>{
    const config = {};
    let dataUri = cameraPhoto.getDataUri(config);
    console.log('success!')
    console.log(dataUri)
  })
  .catch((error)=>{
    console.log('error')
    console.log(error)
  });

  console.log('dataUri');
}

const UploadImageFromCamera = () => {  
  return(
    <div style={styles.divCamera}>
      <Camera
        isFullscreen = {true}
        // onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      />

      <div style={styles.divButtons}>
        <Fab style={styles.fab} size="small" aria-label="change-camera">
          <FlipCameraIosRoundedIcon />
        </Fab>
        <Fab style={styles.fab} aria-label="take-picture" onClick={handleTakePhoto2}>
          <AddAPhotoRoundedIcon />
        </Fab>
        <Fab style={styles.fab} size="small" aria-label="close-camera">
          <CloseRoundedIcon />
        </Fab>
      </div>

    </div>
  ) 
}

export default UploadImageFromCamera
