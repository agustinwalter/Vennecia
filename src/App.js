import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './views/Home'
import Boliches from './views/Boliches'
import BuyCompleted from './views/BuyCompleted'
import Admin from './views/Admin'
import AvailableBoliches from './views/AvailableBoliches'
import NotFound from './views/NotFound'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { getUserData } from './store/actions/authActions'
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

const App = ({ auth, getUserData, userDataLoaded, gettingData }) => {
  const [loading, setLoading] = useState(true);

  if(auth.uid && loading) getUserData()
  if((userDataLoaded || (auth.isLoaded && auth.isEmpty)) && loading && !gettingData) setLoading(false)
  if(gettingData && !loading) setLoading(true)

  return (
    <ThemeProvider theme={theme}>
      <Router>

        { loading && <Loader /> }

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/boliches-disponibles" component={AvailableBoliches} />
          <Route path="/boliches" component={Boliches} />
          <Route path="/compra-completada" component={BuyCompleted} />
          <Route path="/admin" >
            <Admin stillLoading={loading} />
          </Route>
          <Route component={NotFound} />
        </Switch>

      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return{
    auth: state.firebase.auth,
    userDataLoaded: state.auth.userDataLoaded,
    gettingData: state.auth.gettingData
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUserData: () => dispatch(getUserData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)