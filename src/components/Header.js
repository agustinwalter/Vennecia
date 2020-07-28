import React, { useState, useEffect } from 'react'
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

const Header = ({ firebaseAuth, signOut, signIn }) => {
  const classes = useStyles();

  const [leftIcon, setLeftIcon] = useState(null)
  const [rightIcon, setRightIcon] = useState(null)
  const [sessionDialog, setSessionDialog] = useState(false)
  const [headerData, setHeaderData] = useState({})

  useEffect(() => {
    if(firebaseAuth.isLoaded && firebaseAuth.isEmpty){
      setHeaderData({
        great: '¡Hola!'
      })
    }else if(firebaseAuth.isLoaded && !firebaseAuth.isEmpty){
      setHeaderData({
        great: `¡Hola, ${firebaseAuth.displayName.split(' ')[0]}!`,
        image: firebaseAuth.photoURL
      })
    }
  }, [firebaseAuth])

  const closeSessionDialog = () => {
    setLeftIcon(null)
    setSessionDialog(false)
  }
  
  const closeSession = () => {
    closeSessionDialog()
    signOut()
  }

  const openSession = () => {
    closeSessionDialog()
    signIn()
  }

  return(
    <AppBar position="fixed">
      <Toolbar className="appbar">

        {/* Icono izquierdo / Foto del usuario */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="start-menu"
          onClick={ event => setLeftIcon(event.currentTarget) }
        >
          <Avatar alt='Foto de perfil' src={headerData.image} className={classes.small}/>
        </IconButton>

        {/* Logo */}
        <h1 className="logo">
          <Link to="/" className="logo-link">Vennecia</Link>
        </h1>

        {/* Icono derecho */}
        <IconButton 
          edge="end" 
          aria-label="end-menu" 
          onClick={ event => setRightIcon(event.currentTarget) }
        >
          <MenuIcon />
        </IconButton>

        {/* Menu izquierdo */}
        <Menu
          id="start-menu"
          anchorEl={leftIcon}
          keepMounted
          open={Boolean(leftIcon)}
          onClose={ () => setLeftIcon(null) }
        >
          {headerData.image ? (
            // Loged in options
            <div>
              <div className="user-info">
                <Avatar alt='Foto de perfil' src={headerData.image} />
                <h4 className="user-name">{headerData.great}</h4>
              </div>
              <Link to="#" className="menu-link red">
                <MenuItem onClick={()=> setSessionDialog(true) }>Cerrar sesión</MenuItem>
              </Link>
            </div>
          ) : (
            // Loged out options
            <div>
              <div className="user-info">
                <h4 className="user-name">{headerData.great}</h4>
              </div>
              <Link to="/" className="menu-link">
                <MenuItem onClick={openSession}>
                  <img src={google_color} className="g-logo" alt="Icono de Google"></img>
                  Ingresá con Google
                </MenuItem>
              </Link>
            </div>
          )}          
        </Menu>

        {/* Menu derecho */}
        <Menu
          id="end-menu"
          anchorEl={rightIcon}
          keepMounted
          open={Boolean(rightIcon)}
          onClose={()=> setRightIcon(null) }
        >
          <Link to="/" className="menu-link">
            <MenuItem onClick={()=> setRightIcon(null) }>Página principal</MenuItem>
          </Link>
          <Link to="/boliches" className="menu-link">
            <MenuItem onClick={()=> setRightIcon(null) }>¿Tenés un boliche?</MenuItem>
          </Link>
        </Menu>

        {/* Diálogo de cerrar sesión */}
        <Dialog
          open={sessionDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeSessionDialog}
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
            <Button onClick={closeSessionDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={closeSession} color="secondary">
              Cerrar sesión
            </Button>
          </DialogActions>
        </Dialog>

      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return{
    firebaseAuth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch(signOut()),
    signIn: () => dispatch(signIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)