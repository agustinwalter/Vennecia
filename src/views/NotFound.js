import React from 'react'
import Header from '../components/Header'
import '../index.scss'

export default () => {
  return(
    <React.Fragment>
      <Header />
      <div className="pd-top">
        <h2>404 Page Not Found</h2>
      </div>
    </React.Fragment>
  )
}