import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import './styles/has-tickets.scss'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import faxion from '../img/faxion.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Snackbar from '@material-ui/core/Snackbar'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog'; 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Friends from '../components/Friends'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  },
  greenBtn: {
    background: 'linear-gradient(0deg, #4caf50 0%, #4caf50 100%)',
  }
}));

let assignedTickets = 1
const cantTickets = 2

const HasTickets = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState(false);
  const [dialogAddFriend, setDialogAddFriend] = useState(false);
  const [newFriendImage, setNewFriendImage] = useState('');
  const [newFriendName, setNewFriendName] = useState('');
  const [friends, setFriends] = useState([
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

  const availableTickets = cantTickets - assignedTickets

  const friendsDatabase = [
    {
      name: 'Sofía Walter',
      picture:'https://material-ui.com/static/images/avatar/3.jpg'
    },
    {
      name: 'Nahuel Osan',
      picture:'https://material-ui.com/static/images/avatar/2.jpg'
    }
  ]
  const [friendsMatched, setFriendsMatched] = useState([])

  const searchFriend = event => {
    const search = event.target.value
    setNewFriendName(search)
    if(search.length > 2){
      friendsDatabase.forEach(friend => {
        if(friend.name.toLowerCase().includes(search.toLowerCase())){
          friendsMatched.push(friend)
          setFriendsMatched([...friendsMatched])
        }
      });
    }else setFriendsMatched([])
  }

  const addNewFriend = () => {
    if(newFriendName !== ''){
      friends.push({
        name: newFriendName,
        picture: newFriendImage,
        hasTicket: false
      })
      setFriends([...friends])
    }
    setDialogAddFriend(false)
  }

  function selectFriend(friend){
    setNewFriendImage(friend.picture)
    setNewFriendName(friend.name)
    setFriendsMatched([])
  }

  function setTicketToFriend(friend, i) {
    if(friend.hasTicket !== false){
      if(cantTickets > 1){
        friends[i].hasTicket = false
        assignedTickets--
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
          assignedTickets++
          setFriends([...friends])
        }else setErrorMessage(true)
      }
    }
  }

  return(
    <div className="div-tickets">
      <div style={{textAlign: 'center'}}>
        <img className="logo-bl" src={faxion} alt="Logo de Faxion" />
      </div>
      
      <Friends
        cantTickets={cantTickets}
        availableTickets={availableTickets}
        showWarningMessage={false}
        // updateAssignedTickets={(tickets)=>{assignedTickets = tickets}}
      />

      {/* <p className="p-first">{
        cantTickets === 1 ? '¿Para quién es la entrada?' : '¿Para quienes son las entradas?'
      }</p> */}

      {/* {availableTickets >= 1 ? 
        <div className="div-info info-warning">
          <InfoOutlinedIcon/>
          <p className="p-message">
            Cada entrada debe asignarse a una persona, de lo contrario no podrá ingresar al boliche. <b>Tenés {availableTickets} entrada{availableTickets > 1 ? 's' : ''} sin asignar.</b>
          </p>
        </div> : ''
      } */}

      {/* <Card className={classes.card}>
        <List dense>  
          {friends.map((friend, i) => {
            return (
              <ListItem 
                key={`friend-${i}`} 
                button 
                classes={friend.hasTicket ? {root: classes.liSel} : {}}
                onClick={()=>{ setTicketToFriend(friend, i) }}
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
      </Card> */}

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddRoundedIcon />}
        style={{marginTop: '20px'}}
        onClick={()=>{ setDialogAddFriend(true) }}
      >Agregar amig@</Button>

      <Button
        variant="contained"
        style={{marginTop: '20px'}}
        className={availableTickets === 0 ? classes.greenBtn : ''}
        disabled={availableTickets !== 0}
        onClick={()=>{  }}
      >¡Listo!</Button>

      <Button
        color="primary"
        style={{marginTop: '12px'}}
        onClick={()=>{  }}
      >Comprar más entradas</Button>

      <Snackbar 
        open={errorMessage} 
        autoHideDuration={5000} 
        onClose={()=>{ setErrorMessage(false) }}
        message="Ya no te quedan entradas."
        TransitionComponent={Transition}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setErrorMessage(false) }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      ></Snackbar>

      <Dialog 
        open={dialogAddFriend} 
        onClose={()=>{setDialogAddFriend(false)}} 
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogContentText>Escribí el nombre de tu amig@</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="add-friend"
            fullWidth
            variant="outlined"
            style={{margin: 0}}
            value={newFriendName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar
                    className={classes.small}
                    alt={`Foto de perfil`}
                    src={newFriendImage}
                  />
                </InputAdornment>
              )
            }}
            onChange={searchFriend}
          />
          <List dense style={{
            padding: 0,
            border: '1px solid rgba(255, 255, 255, 0.23)'
          }}>
            {friendsMatched.map((friend, i) => {
              return (
                <ListItem 
                  key={`friend-matched-${i}`} 
                  button 
                  onClick={()=>{selectFriend(friend)}}
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.small}
                      alt={`Foto de perfil`}
                      src={friend.picture}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={friend.name}/>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            setDialogAddFriend(false)
          }} color="secondary">
            Cancelar
          </Button>
          <Button onClick={addNewFriend} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default HasTickets