import React, { useState, useEffect } from 'react'
import { addFriendToFirebase } from '../store/actions/authActions'
import { connect } from 'react-redux'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Snackbar from '@material-ui/core/Snackbar'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Dialog from '@material-ui/core/Dialog'; 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import algoliasearch from 'algoliasearch/lite';
import './styles/friends.scss'

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

const AssignLater = ({cantTickets, showWarningMessage})=>{
  if(!showWarningMessage && cantTickets !== 1){
    return(
      <p 
        className="p-lis" 
        style={{
          margin: '15px 0 0 0', 
          fontSize: '13px'
        }}
      >Podés asignar las entradas más adelante.</p>
    )
  }
  return null
}

const DoneButton = ({availableTickets, showWarningMessage})=>{
  const classes = useStyles();
  if(showWarningMessage){
    return(
      <Button
        variant="contained"
        style={{marginTop: '20px'}}
        className={availableTickets === 0 ? classes.greenBtn : ''}
        disabled={availableTickets !== 0}
        onClick={()=>{  }}
      >¡Listo!</Button>
    )
  }
  return null
}

const client = algoliasearch('I1V3GOAM46', '9120ad3e234608f6f66eb2bae0cd9293');
const usersName = client.initIndex('users');

const Friends = ({
  cantTickets,
  showWarningMessage,
  updateAssignedTickets,
  addFriendToFirebase,
  state
}) => {    
  console.log(state)

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState('');
  const [availableTickets, setAvailableTickets] = useState(cantTickets);
  const [dialogAddFriend, setDialogAddFriend] = useState(false);
  const [newFriend, setNewFriend] = useState({});
  const [friendsMatched, setFriendsMatched] = useState([])
  const [friends, setFriends] = useState([
    {
      name: state.firebase.auth.displayName,
      image: state.firebase.auth.photoURL,
      hasTicket: true
    },
    ...state.auth.friends
  ])

  const setTicketToFriend = (friend, i) => {
    if(friend.hasTicket !== false){
      if(cantTickets > 1){
        friends[i].hasTicket = false
        setAvailableTickets(availableTickets+1)
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
          setAvailableTickets(availableTickets-1)
          setFriends([...friends])
        }else{
          setTextErrorMessage('Ya no te quedan entradas.')
          setErrorMessage(true)
        } 
      }
    }
  }

  const searchFriend = event => {
    const search = event.target.value
    if(search.length > 2){
      usersName.search(search).then(({ hits }) => {
        setFriendsMatched(hits)
      });
    }else setFriendsMatched([]) 
    setNewFriend({
      name: search,
      image: ''
    })
  }

  const addNewFriend = () => {
    if(newFriend.objectID){
      const exist = state.auth.friends.find(friend => friend.docId === newFriend.objectID)
      if(exist !== undefined){
        setTextErrorMessage('Esta persona ya está en tu lista de amig@s.')
        setErrorMessage(true)
      }else{
        addFriendToFirebase({
          name: newFriend.name,
          image: newFriend.image,
          docId: newFriend.objectID,
          hasTicket: false
        })
      }
    }else{
      setTextErrorMessage('Seleccioná a tu amig@ de la lista.')
      setErrorMessage(true)
    }
  }

  function selectFriend(friend){
    setNewFriend(friend)
    setFriendsMatched([])
  }

  useEffect(()=>{
    setAvailableTickets(cantTickets - 1)
    friends.forEach((f, i) => { friends[i].hasTicket = false });
    friends[0].hasTicket = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantTickets])

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
                    src={friend.image}
                  />
                </ListItemAvatar>
                <ListItemText primary={friend.name}/>
                { friend.hasTicket ? <CheckCircleRoundedIcon/> : '' }
              </ListItem>
            );
          })}
        </List>
      </Card>

      {/* Botón agregar amig@ */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddRoundedIcon />}
        style={{marginTop: '20px'}}
        onClick={()=>{ setDialogAddFriend(true) }}
      >Agregar amig@</Button>

      {/* Mensaje de asignar entradas más adelante */}
      <AssignLater
        cantTickets={cantTickets}
        showWarningMessage={showWarningMessage}
      />

      {/* Botón de listo */}
      <DoneButton
        availableTickets={availableTickets}
        showWarningMessage={showWarningMessage}
      />
      
      {/* Mesnaje de no te quedan entradas */}
      <Snackbar 
        open={errorMessage} 
        autoHideDuration={5000} 
        onClose={()=>{ setErrorMessage(false) }}
        // message="Ya no te quedan entradas."
        message={textErrorMessage}
        TransitionComponent={Transition}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setErrorMessage(false) }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      ></Snackbar>

      {/* Dialogo para agregar amig@ */}
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
            value={newFriend.name || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar
                    className={classes.small}
                    alt={`Foto de perfil`}
                    src={newFriend.image}
                  />
                </InputAdornment>
              )
            }}
            onChange={searchFriend}
          />

          {friendsMatched.length > 0 &&
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
                        src={friend.image}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={friend.name}/>
                  </ListItem>
                );
              })}
            </List>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            setDialogAddFriend(false)
            setNewFriend({})
            setFriendsMatched([])
          }} color="secondary">
            Cancelar
          </Button>
          <Button onClick={addNewFriend} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addFriendToFirebase: (newFriend) => dispatch(addFriendToFirebase(newFriend)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)