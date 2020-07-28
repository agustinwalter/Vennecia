import React, { useState, useEffect } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { 
  generatePeopleList, 
  updateTicketToFriend, 
  switchTicketToFriend, 
  addFriendToFirebase } from '../store/actions/authActions'
import { connect } from 'react-redux'
import './styles/friends.scss'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { makeStyles } from '@material-ui/core/styles';
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
import algolia from '../img/algolia.png';
import { algoliaConfig } from '../config.json'

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

const client = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
const usersName = client.initIndex('users');

const Friends = ({
  purchaseDetails,
  switchTicketToFriend,
  generatePeopleList,
  updateTicketToFriend,
  showWarningMessage,
  addFriendToFirebase
}) => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState('');
  const [dialogAddFriend, setDialogAddFriend] = useState(false);
  const [newFriend, setNewFriend] = useState({});
  const [friendsMatched, setFriendsMatched] = useState([])

  const peopleList = purchaseDetails.peopleList || []

  useEffect(() => { generatePeopleList() }, [generatePeopleList])

  // Funciones
  const updateAssignedTickets = (docId, hasTicket) => {
    if(purchaseDetails.cantOfTickets === 1){
      if(!hasTicket) switchTicketToFriend(docId)
    }else{
      if(hasTicket){
        updateTicketToFriend(docId, hasTicket)
        return;
      }

      if(purchaseDetails.cantOfTickets > purchaseDetails.assignedTickets){
        updateTicketToFriend(docId, hasTicket)
      }else{
        setTextErrorMessage('Ya no te quedan entradas.')
        setErrorMessage(true) 
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

  const selectFriend = friend => {
    setNewFriend({
      docId: friend.objectID,
      name: friend.name,
      image: friend.image,
      hasTicket: false
    })
    setFriendsMatched([])
  }

  const addNewFriend = () => {
    if(newFriend.docId) addFriendToFirebase(newFriend)
    setDialogAddFriend(false)
    setNewFriend({})
    setFriendsMatched([])
  }

  // Componentes
  const FriendsList = ()=>{
    if(peopleList.length === 0) return <p>Cargando...</p>

    return <Card className={classes.card}>
      <List dense>  
        {peopleList.map((friend, i) => {
          return (
            <ListItem 
              key={`friend-${i}`} 
              button 
              classes={friend.hasTicket ? {root: classes.liSel} : {}}
              onClick={()=>{ updateAssignedTickets(friend.docId, friend.hasTicket) }}
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
  }
  
  const InfoMessage = ()=>{
    const availableTickets = purchaseDetails.cantOfTickets - purchaseDetails.assignedTickets
    if(showWarningMessage){
      if(availableTickets > 0){
        return (
          <div className="div-info info-warning">
            <InfoOutlinedIcon/>
            <p className="p-message">
              Cada entrada debe asignarse a una persona, de lo contrario no podrá ingresar al boliche. <b>Tenés {availableTickets} entrada{availableTickets > 1 ? 's' : ''} sin asignar.</b>
            </p>
          </div>
        )
      }
    }else{
      if(availableTickets > 0)
        return <p className="av-tickets">Te queda{availableTickets > 1 ? 'n' : ''} <b>{availableTickets}</b> entrada{availableTickets > 1 ? 's' : ''}</p> 
    }
    return null;
  }

  const AssignLater = ()=>{
    if(!showWarningMessage && purchaseDetails.cantOfTickets !== 1){
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

  const DoneButton = ()=>{
    if(showWarningMessage){
      const availableTickets = purchaseDetails.cantOfTickets - purchaseDetails.assignedTickets
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

  return <React.Fragment>

    {/* ¿Para quién es la entrada? */}
    <p className="p-first">{
      purchaseDetails.cantOfTickets === 1 ? '¿Para quién es la entrada?' : '¿Para quienes son las entradas?'
    }</p>

    {/* Mensaje de cuantas entradas le quedan */}
    <InfoMessage/>
      
    {/* Lista de amigos */}
    <FriendsList/>

    {/* Mensaje de asignar entradas más adelante */}
    <AssignLater/>

    {/* Botón agregar amig@ */}
    <Button
      variant="outlined"
      color="primary"
      startIcon={<AddRoundedIcon />}
      style={{marginTop: '20px'}}
      onClick={()=>{ setDialogAddFriend(true) }}
    >Agregar amig@</Button>

    {/* Botón de listo */}
    <DoneButton/>

    {/* Mesnaje de no te quedan entradas */}
    <Snackbar 
      open={errorMessage} 
      autoHideDuration={5000} 
      onClose={()=>{ setErrorMessage(false) }}
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
      
        <div style={{ textAlign: 'right' }}>
          <a target="blank" href='https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&utm_content=instantsearchjs.netlify.app&utm_campaign=poweredby'>
            <img style={{ width: '110px' }} src={algolia} alt="Logo de Algolia" />
          </a>
        </div>

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
}

const mapStateToProps = state => {
  return{
    purchaseDetails: state.vennecia.purchaseDetails
  }
}

const mapDispatchToProps = dispatch => {
  return{
    switchTicketToFriend: (docId) => dispatch(switchTicketToFriend(docId)),
    generatePeopleList: () => dispatch(generatePeopleList()),
    updateTicketToFriend: (docId, hasTicket) => dispatch(updateTicketToFriend(docId, hasTicket)),
    addFriendToFirebase: (friend) => dispatch(addFriendToFirebase(friend)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)