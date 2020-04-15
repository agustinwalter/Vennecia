import React from 'react'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import Button from '@material-ui/core/Button';
import './styles/buy-complete.scss'

const BuyCompleted = () => {
  return(
    <React.Fragment>
      <div className="div-green">
        <CheckCircleOutlineRoundedIcon/>
        <h1>¡Listo! Ya tenés tus entradas.</h1>
      </div>
      <div className="div-message">
        <p>Cuando llegués al boliche acercate a la puerta de ingreso y parate frente a la cámara.<br/><br/>Luego de que te escanee ingresá sin hacer fila.</p>
        <Button href="/" color="primary">Ir al inicio</Button>
      </div>
    </React.Fragment>
  )
}

export default BuyCompleted