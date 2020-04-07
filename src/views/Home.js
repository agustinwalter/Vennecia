import React from 'react'
import { connect } from 'react-redux'
import '../index.scss'
import Header from '../components/Header'
import LandingPage from '../views/LandingPage'
import ValidationProcess from '../views/ValidationProcess'
import BuyTickets from '../views/BuyTickets'

const Home = ({status}) => {
  return(
    <React.Fragment>
      <Header />

      {(() => {
        switch (status) {
          case 'USER_NOT_LOGGED':
            return(<LandingPage />)
          case 'USER_NOT_VALIDATED':
            return(<ValidationProcess/>)
          case 'USER_VALIDATED':
            return(<BuyTickets/>)
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