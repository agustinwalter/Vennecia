import React from 'react'
import { connect } from 'react-redux'
import './styles/home.scss'
import UserNotValidated from './UserNotValidated'
import Header from './Header'

const UserNotLogged = () => {
  return <h2>UserNotLogged</h2>
}

const UserValidated = () => {
  return <h2>UserValidated</h2>
}

const Home = ({status}) => {
  return(
    <React.Fragment>
      <Header />
      <div className="pd-top">
        {(() => {
          switch (status) {
            case 'USER_NOT_LOGGED':
              return(<UserNotLogged/>)
            case 'USER_NOT_VALIDATED':
              return(<UserNotValidated/>)
            case 'USER_VALIDATED':
              return(<UserValidated/>)
            default:
              return(null)
            }
        })()}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    status: state.auth.status
  }
}

export default connect(mapStateToProps)(Home)