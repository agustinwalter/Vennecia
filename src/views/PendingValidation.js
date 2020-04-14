import React from 'react'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import './styles/buy-complete.scss'

const PendingValidation = ({status}) => {
  return(
    <React.Fragment>
      <div className="div-green" style={{
        padding: '56px 20px 0 20px',
        textAlign: 'center'
      }}>
        <CheckCircleOutlineRoundedIcon/>
        <h1>Estamos validando tu identidad :)</h1>
      </div>
      <div className="div-message" style={{
        height: 'calc(65vh - 56px)'
      }}>
        <p>Revisaremos tus datos y en unos minutos te enviaremos un email de confirmación.<br/><br/>¡Luego pordás empezar a comprar entradas!</p>
      </div>
    </React.Fragment>
  )
}

export default PendingValidation