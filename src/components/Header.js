import React from 'react'
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import './styles/header.scss'
import { connect } from 'react-redux'
import { signOut, signIn } from '../store/actions/authActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import google_color from '../img/google-color.png';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const { auth } = props

  const [startAnchorEl, setStartAnchorEl] = React.useState(null)
  const handleStartClick = event => { setStartAnchorEl(event.currentTarget) }
  const handleStartClose = () => { setStartAnchorEl(null) }
  
  const [endAnchorEl, setEndAnchorEl] = React.useState(null)
  const handleEndClick = event => { setEndAnchorEl(event.currentTarget) }
  const handleEndClose = () => { setEndAnchorEl(null) }
  
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => { setOpen(true) }
  const handleClose = () => {
    setStartAnchorEl(null)
    setOpen(false)
  }

  const closeSession = () => {
    handleClose()
    props.signOut()
  }

  const handleSignIn = () => {
    handleClose()
    props.signIn()
  }

  let photoURL = ''
  let great = '¡Hola!'
  if(auth.photoURL){
    photoURL = auth.photoURL
    great = `¡Hola, ${auth.displayName.split(' ')[0]}!`
  }

  return(
    <AppBar position="fixed">
      <Toolbar className="appbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="start-menu"
          onClick={handleStartClick}
        >
          <Avatar alt='Foto de perfil' src={photoURL} className={classes.small}/>
        </IconButton>

        <Menu
          id="start-menu"
          anchorEl={startAnchorEl}
          keepMounted
          open={Boolean(startAnchorEl)}
          onClose={handleStartClose}
        >
          {auth.photoURL ? (
            // Loged in options
            <div>
              <div className="user-info">
                <Avatar alt='Foto de perfil' src={photoURL} />
                <h4 className="user-name">{great}</h4>
              </div>
              <Link to="#" className="menu-link red">
                <MenuItem onClick={handleClickOpen}>Cerrar sesión</MenuItem>
              </Link>
            </div>
          ) : (
            // Loged out options
            <div>
              <div className="user-info">
                <h4 className="user-name">{great}</h4>
              </div>
              <Link to="/" className="menu-link">
                <MenuItem onClick={handleSignIn}>
                  <img src={google_color} className="g-logo" alt="Icono de Google"></img>
                  Ingresá con Google
                </MenuItem>
              </Link>
              {/* <Link to="/" className="menu-link">
                <MenuItem onClick={handleStartClose}>¿No tenés cuenta de Google?</MenuItem>
              </Link> */}
            </div>
          )}          
        </Menu>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"¿Cerrar sesión?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Deseas cerrar la sesión de tu cuenta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={closeSession} color="secondary">
              Cerrar sesión
            </Button>
          </DialogActions>
        </Dialog>

        <h1 className="logo">
          <Link to="/" className="logo-link">Vennecia</Link>
        </h1>

        <IconButton edge="end" aria-label="end-menu" onClick={handleEndClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="end-menu"
          anchorEl={endAnchorEl}
          keepMounted
          open={Boolean(endAnchorEl)}
          onClose={handleEndClose}
        >
          <Link to="/" className="menu-link">
            <MenuItem onClick={handleEndClose}>Página principal</MenuItem>
          </Link>
          {/* <Link to="/boliches-disponibles" className="menu-link">
            <MenuItem onClick={handleEndClose}>Boliches disponibles</MenuItem>
          </Link> */}
          <Link to="/boliches" className="menu-link">
            <MenuItem onClick={handleEndClose}>¿Tenés un boliche?</MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return{
    auth: state.firebase.auth    
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch(signOut()),
    signIn: () => dispatch(signIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)