import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header'
import './styles/admin.scss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}))

const Admin = ({stillLoading, user}) => {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    function getParameterByName(name) {
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(window.location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var userId = getParameterByName('userId');

    // Obtener datos del usuario
    if(!stillLoading && user.isAdmin){
      console.log('Obteniendo información de ' + userId)  
      setTimeout(() => {
        setUserInfo({
          name: 'Agustín Walter',
          age: '21',
          gender: 'Hombre',
          status: 'Pendiente',
          frontDNI: 'https://firebasestorage.googleapis.com/v0/b/vennecia-3414c.appspot.com/o/frontDNI%2FdKiARKCtJTqm0s54Civ4.jpg?alt=media&token=0490b05f-6ca9-4020-897f-9156aaeaffcc',
          backDNI: 'https://firebasestorage.googleapis.com/v0/b/vennecia-3414c.appspot.com/o/backDNI%2FdKiARKCtJTqm0s54Civ4.jpg?alt=media&token=576de223-979d-4f24-a5d0-aea1a9a95350',
          selfie: 'https://firebasestorage.googleapis.com/v0/b/vennecia-3414c.appspot.com/o/userFace%2FdKiARKCtJTqm0s54Civ4.jpg?alt=media&token=294eb238-263f-4a43-b3fd-0d87099e3f60',
        })
      }, 500);
    }
  }, [stillLoading, user.isAdmin])

  if(
    (!stillLoading && user.status === 'USER_NOT_LOGGED') ||
    (!stillLoading && !user.isAdmin)
  ) return <Redirect to='/' />; 
  
  return(
    <React.Fragment>
      <Header />
      {!userInfo ?
        <div className="div-loader"><CircularProgress /></div> :
        
        <React.Fragment>
          <Card style={{ margin: '76px 20px 20px 20px' }}>
            <CardHeader subheader={userInfo.name} style={{ textAlign: 'center' }}></CardHeader>

            <TableContainer component={Paper}>
              <Table aria-label="simple table" size="small">
                <TableBody>
                  <TableRow key='row-name'>
                    <TableCell component="th" scope="row">Edad</TableCell>
                    <TableCell align="right">{userInfo.age}</TableCell>
                  </TableRow>
                  <TableRow key='row-gender'>
                    <TableCell component="th" scope="row">Sexo</TableCell>
                    <TableCell align="right">{userInfo.gender}</TableCell>
                  </TableRow>
                  <TableRow key='row-status'>
                    <TableCell component="th" scope="row">Estado</TableCell>
                    <TableCell align="right">{userInfo.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

          </Card>

          {['frontDNI', 'selfie', 'backDNI'].map((image) => (
            <Card style={{ margin: '0 20px 20px' }} key={image}>
              <CardMedia
                className={classes.media}
                image={userInfo[image]}
                title="Foto de validación"
                onClick={()=>{ console.log('Abriendo imagen...') }}
              />
            </Card>
          ))}          

        </React.Fragment>
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    user: state.auth,
  }
}

export default connect(mapStateToProps)(Admin)