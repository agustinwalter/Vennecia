import React, { useState } from 'react'
import './styles/validation-process.scss'
import front from '../img/front.jpg';
import back from '../img/back.jpg';
import Button from '@material-ui/core/Button';
import selfie from '../img/selfie.jpg';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import CropperImage from '../components/CropperImage'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  input: {
    display: 'none',
  }
});

const ValidationProcess = () => {
  const classes = useStyles();

  const [showCropperImage, setShowCropperImage] = useState('100vh')
  const [statusImage, setStatusImage] = useState('NOT_LOADED')
  const [validationStep, setValidationStep] = useState('VALIDATION_STEP_ONE')
  const [openDialog, setOpenDialog] = useState(false)
  const [prevImage, setPrevImage] = useState('')

  let elements = {
    image: front,
    message: <p>Para que puedas ingresar a los boliches, necesitamos validar tu identidad y verificar que tenés la edad suficiente.<br/><b>Subí una foto de la cara frontal de tu DNI.</b></p>,
    btnLabel: 'Subir foto',
    cropperImageMessage: 'Recortá la imagen para que solo se vea el DNI:'
  }
  switch (validationStep) {
    case 'VALIDATION_STEP_TWO':
      elements = {
        image: back,
        message: <p>Ahora, subí una foto del <b>dorso de tu DNI.</b></p>,
        btnLabel: 'Subir foto',
        cropperImageMessage: 'Recortá la imagen para que solo se vea el DNI:'
      }
      break;
    case 'VALIDATION_STEP_THREE':
      elements = {
        image: selfie,
        message: <p>Por último, <b>envianos una selfie sonriendo :)</b></p>,
        btnLabel: 'Sacar selfie',
        cropperImageMessage: '¿Querés enviar esta foto?'
      }
      break;
    default: break;
  }

  const handleFile = (files) => {
    setPrevImage(URL.createObjectURL(files[0]))
    setShowCropperImage('0vh')
  }
  
  function uploadImage(){
    setStatusImage('UPLOADING')
    setTimeout(() => {
      setStatusImage('UPLOADED')
    }, 2000);
    setShowCropperImage('100vh')
  }

  return(
    <div className="container">
      <div className="help-img">
        <img src={elements.image} alt="Imágen de ayuda" width="100%"></img>
      </div>

      <h2>Validá tu identidad</h2>

      {elements.message}

      {{
        'NOT_LOADED': 
          <div className="action-btn">
            { validationStep === 'VALIDATION_STEP_THREE' ? 
              <Button variant="contained" color="primary" href="/camara">
                {elements.btnLabel}
              </Button>
            :
              <Button variant="contained" color="primary" onClick={()=>{
                setOpenDialog(true)
              }}>
                {elements.btnLabel}
              </Button>
            }
          </div>,
        'UPLOADING': 
          <div className="uploading">
            <div className="prev-img" style={{backgroundImage: `url('${prevImage}')`}}></div>
            <LinearProgress variant="determinate" value={50} className="progress" />
            <p>Subiendo foto</p>
          </div>,
        'UPLOADED': 
          <div className="uploaded">
            <CheckCircleOutlineRoundedIcon className="done"/>
            <p>¡Listo! Podés continuar con el siguiente paso.</p>
            <Button variant="contained" color="primary" onClick={()=>{
              if(validationStep === 'VALIDATION_STEP_ONE') setValidationStep('VALIDATION_STEP_TWO')
              else if(validationStep === 'VALIDATION_STEP_TWO') setValidationStep('VALIDATION_STEP_THREE')
              setStatusImage('NOT_LOADED')
            }}>
              Siguiente paso
            </Button>
          </div>
      }[statusImage]}
    
      <CropperImage 
        show={showCropperImage} 
        hide={()=>{ setShowCropperImage('100vh') }}
        message={elements.cropperImageMessage}
        prevImage={prevImage}
        uploadImage={ uploadImage }
      />

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Subir foto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Desde dónde querés subir la foto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <input
            accept="image/*"
            capture="camera"
            className={classes.input}
            id="text-button-camera"
            type="file"
            onChange={ (e) => handleFile(e.target.files) }
          />
          <label htmlFor="text-button-camera">
            <Button component="span" color="primary" onClick={() => setOpenDialog(false)}>Cámara</Button>
          </label>

          <input
            accept="image/*"
            className={classes.input}
            id="text-button-file"
            type="file"
            onChange={ (e) => handleFile(e.target.files) }
          />
          <label htmlFor="text-button-file">
            <Button component="span" color="primary" onClick={() => setOpenDialog(false)}>Galería</Button>
          </label>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ValidationProcess