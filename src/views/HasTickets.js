import React from 'react'
import Button from '@material-ui/core/Button';
import './styles/has-tickets.scss'
import faxion from '../img/faxion.png';
import Friends from '../components/Friends'

const cantTickets = 2

const HasTickets = () => {
  return(
    <div className="div-tickets">
      <div style={{textAlign: 'center'}}>
        <img className="logo-bl" src={faxion} alt="Logo de Faxion" />
      </div>
      
      <Friends
        cantTickets={cantTickets}
        showWarningMessage={true}
      />

      <Button
        color="primary"
        style={{marginTop: '12px'}}
        onClick={()=>{  }}
      >Comprar más entradas</Button>

    </div>
  )
}

export default HasTickets