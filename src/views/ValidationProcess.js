import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles/validation-process.scss'
import front from '../img/front.jpg';
import back from '../img/back.jpg';
import Button from '@material-ui/core/Button';
import selfie from '../img/selfie.jpg';

const ValidationProcess = ({status}) => {
  let helpImage = front

  switch (status) {
    case 'VALIDATION_STEP_TWO':
      helpImage = back
      break;
    case 'VALIDATION_STEP_THREE':
      helpImage = selfie
      break;
    default:
      break;
  }
  
  return(
    <div className="container">
      <div className="help-img">
        <img src={helpImage} alt="Imágen de ayuda" width="100%"></img>
      </div>

      <h2>Validá tu identidad</h2>

      <p>Para que puedas ingresar a los boliches, necesitamos validar tu identidad y verificar que tenés la edad suficiente.<br/><b>Subí una foto de la cara frontal de tu DNI.</b></p>

      <div className="action-btn">
        <Button variant="contained" color="primary">
          Subir foto
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    status: state.auth.status
  }
}

export default connect(mapStateToProps)(ValidationProcess)