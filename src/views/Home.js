import React from 'react'
import { connect } from 'react-redux'
import '../index.scss'
import Header from '../components/Header'
import LandingPage from '../views/LandingPage'
import ValidationProcess from '../views/ValidationProcess'

const UserValidated = () => {
  return <h2>UserValidated</h2>
}

const Home = ({status}) => {
  return(
    <React.Fragment>
      <Header />

      {(() => {
        switch (status) {
          case 'USER_NOT_LOGGED':
            return(<LandingPage />)
          case 'VALIDATION_STEP_ONE':
            return(<ValidationProcess/>)
          case 'USER_VALIDATED':
            return(<UserValidated/>)
          default:
            return(null)
        }
      })()}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    status: state.auth.status
  }
}

export default connect(mapStateToProps)(Home)