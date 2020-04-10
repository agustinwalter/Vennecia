import React, { useState, useEffect } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  liSel: {
    background: 'linear-gradient(0deg, #90caf9 0%, #90caf9 100%)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  card: {
    margin: 0
  }
}));

const WarningMessage = ({availableTickets, showWarningMessage})=>{
  if(availableTickets >= 1 && showWarningMessage){
    return (
      <div className="div-info info-warning">
        <InfoOutlinedIcon/>
        <p className="p-message">
          Cada entrada debe asignarse a una persona, de lo contrario no podrá ingresar al boliche. <b>Tenés {availableTickets} entrada{availableTickets > 1 ? 's' : ''} sin asignar.</b>
        </p>
      </div>
    )
  }
  return null;
}

const AvailableTickets = ({availableTickets, showWarningMessage})=>{
  if(!showWarningMessage && availableTickets > 0){
    if(availableTickets === 1) return <p className="av-tickets">Te queda <b>1</b> entrada</p> 
    else return <p className="av-tickets">Te quedan <b>{availableTickets}</b> entradas</p>
  }
  return null;
}

const Friends = ({
  cantTickets,
  availableTickets,
  showWarningMessage,
  updateAssignedTickets
}) => {
  const classes = useStyles();

  const [friends, setFriends] = useState([])

  const setTicketToFriend = (friend, i) => {
    const assignedTickets = cantTickets - availableTickets
    if(friend.hasTicket !== false){
      if(cantTickets > 1){
        friends[i].hasTicket = false
        // updateAssignedTickets(assignedTickets-1)
        setFriends([...friends])
      }
    }else{
      if(cantTickets === 1){
        friends.map((friend2, i2) => {
          if(friend2.hasTicket !== false) return friends[i2].hasTicket = false
          return null
        })
        friends[i].hasTicket = true
        setFriends([...friends])
      }else{
        if(availableTickets > 0){
          friends[i].hasTicket = true
          // updateAssignedTickets(assignedTickets+1)
          setFriends([...friends])
        }
        // else setErrorMessage(true)
      }
    }
  }
  
  useEffect(() => {
    // Obtener lista de amigos de la base de datos
    console.log('Obteniendo lista de amigos...')
    setTimeout(() => {
      setFriends([
        {
          name: 'Agustín Walter',
          picture:'https://lh3.googleusercontent.com/a-/AOh14Gjxz-9LMuqCS2R1NfOnpYuxK2Y9k8iz8zveuxr6',
          hasTicket: true
        },
        {
          name: 'Fransisco Raggiardo',
          picture:'https://material-ui.com/static/images/avatar/2.jpg',
          hasTicket: false
        }
      ])
    }, 1000);
  }, []);

  return(
    <React.Fragment>

      {/* ¿Para quién es la entrada? */}
      <p className="p-first">{
        cantTickets === 1 ? '¿Para quién es la entrada?' : '¿Para quienes son las entradas?'
      }</p>

      {/* Mensaje de advertencia */}
      <WarningMessage
        availableTickets={availableTickets}
        showWarningMessage={showWarningMessage}
      />

      {/* Mensaje de cuantas entradas le quedan */}
      <AvailableTickets
        availableTickets={availableTickets}
        showWarningMessage={showWarningMessage}
      />
      
      {/* Lista de amigos */}
      <Card className={classes.card}>
        <List dense>  
          {friends.map((friend, i) => {
            return (
              <ListItem 
                key={`friend-${i}`} 
                button 
                classes={friend.hasTicket ? {root: classes.liSel} : {}}
                onClick={()=>{ setTicketToFriend(friend, i, updateAssignedTickets) }}
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.small}
                    alt={`Foto de perfil`}
                    src={friend.picture}
                  />
                </ListItemAvatar>
                <ListItemText primary={friend.name}/>
                { friend.hasTicket ? <CheckCircleRoundedIcon/> : '' }
              </ListItem>
            );
          })}
        </List>
      </Card>

    </React.Fragment>
  )
}

export default Friends