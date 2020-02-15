import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Header from './components/Header'
import Home from './components/Home'
import Boliches from './components/Boliches'
import NotFound from './components/NotFound'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { getUserData } from './store/actions/authActions'
import UploadImageFromCamera from './components/UploadImageFromCamera'

const styles = {
  loader: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(180deg, rgba(0,25,50,1) 0%, rgba(0,50,100,1) 100%)',
    position: 'absolute',
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
    <Router>

      { loading && <Loader /> }

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/boliches" component={Boliches} />
        <Route path="/subir-foto" component={UploadImageFromCamera} />
        <Route component={NotFound} />
      </Switch>

    </Router>
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