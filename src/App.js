import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './views/Home'
// import Boliches from './views/Boliches'
// import BuyCompleted from './views/BuyCompleted'
// import Admin from './views/Admin'
// import AvailableBoliches from './views/AvailableBoliches'
// import NotFound from './views/NotFound'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { loadUserData, appReady } from './store/actions/authActions'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const styles = {
  loader: {
    width: '100vw',
    height: '100vh',
    background: '#303030',
    position: 'fixed',
    zIndex: '10000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'lighter',
  },
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    }
  },
});

const Loader = () => {
  return(
    <div style={styles.loader}>
      <h1 style={styles.logo}>Vennecia</h1>
      <CircularProgress size={30} />
    </div>
  ) 
}

const App = ({ loadingApp, firebaseAuth, loadUserData, appReady }) => {

  useEffect(() => {
    if(firebaseAuth.isLoaded && firebaseAuth.isEmpty){
      appReady()
      console.log('El usuario no está loggeado.')
    } else if(firebaseAuth.isLoaded && !firebaseAuth.isEmpty){
      loadUserData()
      // console.log('El usuario está loggeado.')
    } 
  }, [appReady, firebaseAuth, loadUserData])

  return (
    <ThemeProvider theme={theme}>
      <Router>

        { loadingApp && <Loader /> }

        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/boliches-disponibles" component={AvailableBoliches} />
          <Route path="/boliches" component={Boliches} />
          <Route path="/compra-completada" component={BuyCompleted} />
          <Route path="/admin" >
            <Admin stillLoading={loading} />
          </Route>
          <Route component={NotFound} /> */}
        </Switch>

      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return{
    loadingApp: state.vennecia.general.loadingApp,
    firebaseAuth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadUserData: () => dispatch(loadUserData()),
    appReady: () => dispatch(appReady())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)