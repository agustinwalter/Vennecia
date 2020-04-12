import React from 'react'
import faxion from '../img/faxion.png';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const TicketsAssigneds = () => {
  return(
    <div 
      className="div-tickets" 
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <div style={{textAlign: 'center'}}>
        <img 
          className="logo-bl" 
          src={faxion} 
          alt="Logo de Faxion"
          style={{
            height: 'auto',
            width: '50vw' 
          }}
        />
      </div>

      <p className="p-first" style={{marginBottom: '17px'}}>Nos vemos el jueves</p>

      <AvatarGroup max={3}>
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
      </AvatarGroup>
    </div>
  )
}

export default TicketsAssigneds