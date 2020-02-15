import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import FlipCameraIosRoundedIcon from '@material-ui/icons/FlipCameraIosRounded';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";

const styles = {
  divCamera: {
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
    background: 'linear-gradient(0deg, rgba(0,50,100,1) 0%, rgba(0,25,50,1) 100%)',
    fontSize: 0,
    height: '100vh',
  },
  normalVideo: {
    transform: 'rotateY(0deg)'
  },
  mirrorVideo: {
    transform: 'rotateY(180deg)'
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
  changingCamera: {
    position: 'absolute',
    color: 'white',
    top: 'calc(50% - 7px)',
    fontSize: '14px',
    margin: 0,
  }
}

class UploadImageFromCamera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: '',
      facingMode: FACING_MODES.USER,
      isImageMirror: true
    }
  }
 
  componentDidMount () {
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    this.startCameraMaxResolution(this.state.facingMode);
  }
 
  startCameraMaxResolution (idealFacingMode) {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
    .catch((error) => {
      console.error('Camera not started!', error);
    });
  }
 
  takePhoto () {
    const config = {
      sizeFactor: 1,
      isImageMirror: this.state.isImageMirror
    };
    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
  }
  
  switchCamera(){
    if(this.state.isImageMirror){
      console.log('cambiando a camara trasera')
      this.setState({ 
        facingMode: FACING_MODES.ENVIRONMENT,
        isImageMirror: false
      });
    }else{
      console.log('cambiando a camara frontal')
      this.setState({ 
        facingMode: FACING_MODES.USER,
        isImageMirror: true
      });
    }
    this.startCameraMaxResolution(this.state.facingMode);
  }
 
  stopCamera () {
    this.cameraPhoto.stopCamera()
    .catch((error) => {
      console.log('No camera to stop!:', error);
    });
  }

  render () {
    return (
      <div style={styles.divCamera}>
        <p style={styles.changingCamera}>Cambiando cámara...</p>

        <video
          style={
            this.state.isImageMirror ? styles.mirrorVideo : styles.normalVideo
          }
          ref={this.videoRef}
          autoPlay={true}
        />

        <div style={styles.divButtons}>
          <Fab style={styles.fab} size="small" aria-label="change-camera" onClick={ () => { this.switchCamera(); }}>
            <FlipCameraIosRoundedIcon />
          </Fab>
          <Fab style={styles.fab} aria-label="take-picture" onClick={ () => { this.takePhoto(); }}>
            <AddAPhotoRoundedIcon />
          </Fab>
          <Link to="/">
            <Fab style={styles.fab} size="small" aria-label="close-camera" onClick={ () => { this.stopCamera(); }}>
              <CloseRoundedIcon />
            </Fab>
          </Link>
        </div>
      </div>
    );
  }
}
 
export default UploadImageFromCamera;