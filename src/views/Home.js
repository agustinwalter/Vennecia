import React,  { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../index.scss'
import './styles/home.scss'
import Header from '../components/Header'
import LandingPage from '../views/LandingPage'
import ValidationProcess from '../views/ValidationProcess'
import BuyTickets from '../views/BuyTickets'
// import HasTickets from '../views/HasTickets'
// import TicketsAssigneds from '../views/TicketsAssigneds'
import PendingValidation from './PendingValidation'

const Home = ({ venneciaUser }) => {
  const [render, setRender] = useState({})
  
  useEffect(() => {
    if(venneciaUser !== undefined){
      // console.log('Obteniendo estado del usuario, estado actual:')
      // console.log(venneciaUser)
      setRender({
        status: venneciaUser.status,
        subStatus: venneciaUser.subStatus,
      })
    }
  }, [venneciaUser])

  return(
    <React.Fragment>
      <Header />

      {(() => {
        switch (render.status) {
          case 'USER_NOT_VALIDATED':
            return(<ValidationProcess/>)
          case 'USER_VALIDATED':
            if(render.subStatus === 'PENDING_VALIDATION') return(<PendingValidation/>)
            return(<BuyTickets/>)
          // case 'HAS_TICKETS':
          //   return(<HasTickets/>)
          // case 'TICKETS_ASSIGNEDS':
          //   return(<TicketsAssigneds/>)
          default: return(<LandingPage />)
        }
      })()}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    venneciaUser: state.vennecia.user
  }
}

export default connect(mapStateToProps)(Home)