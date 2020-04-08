import React from 'react'
import { connect } from 'react-redux'
import '../index.scss'
import Header from '../components/Header'
import LandingPage from '../views/LandingPage'
import ValidationProcess from '../views/ValidationProcess'
import BuyTickets from '../views/BuyTickets'
import HasTickets from '../views/HasTickets'
import TicketsAssigneds from '../views/TicketsAssigneds'

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
          case 'HAS_TICKETS':
            return(<HasTickets/>)
          case 'TICKETS_ASSIGNEDS':
            return(<TicketsAssigneds/>)
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