import React, { useState, useEffect } from 'react'
import { getBolicheData } from '../store/actions/ticketsActions'
import { connect } from 'react-redux'
import faxion from '../img/faxion.png';
import './styles/buy-tickets.scss'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MobileStepper from '@material-ui/core/MobileStepper';
import Dialog from '@material-ui/core/Dialog'; 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Friends from '../components/Friends'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  liSel: {
    background: 'linear-gradient(0deg, #90caf9 0%, #90caf9 100%)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  greenBtn: {
    background: 'linear-gradient(0deg, #4caf50 0%, #4caf50 100%)',
  },
  blueBtn: {
    background: 'linear-gradient(0deg, #90caf9 0%, #90caf9 100%)',
  },
  blackText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold'
  }
}));

const BuyTickets = ({ticketsState, getBolicheData}) => {  
  const classes = useStyles();

  const [stepNum, setStepNum] = useState('0%')
  const [activeStep, setActiveStep] = useState(0)
  const [cantTickets, setCantTickets] = useState(1)
  const [dialogCantTickets, setDialogCantTickets] = useState(false);
  const [newPublicImage, setNewPublicImage] = useState('');
  const [newPublicName, setNewPublicName] = useState('');
  const [publicsMatched, setPublicsMatched] = useState([])

  const ticketAmount = ticketsState.baseAmountTicket || 0
  const publicsDatabase = [
    {
      name: 'Camila García',
      picture:'https://material-ui.com/static/images/avatar/3.jpg'
    },
    {
      name: 'Rodrigo Gauna',
      picture:'https://material-ui.com/static/images/avatar/2.jpg'
    }
  ]

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === 0) setStepNum('-100%')
    else if(activeStep === 1) setStepNum('-200%')
    else if(activeStep === 2) setStepNum('-300%')
  }
  
  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 1) setStepNum('0%')
    else if(activeStep === 2) setStepNum('-100%')
    else if(activeStep === 3) setStepNum('-200%')
  }

  const searchPublic = event => {
    const search = event.target.value
    setNewPublicName(search)
    if(search.length > 2){
      publicsDatabase.forEach(publicR => {
        if(publicR.name.toLowerCase().includes(search.toLowerCase())){
          publicsMatched.push(publicR)
          setPublicsMatched([...publicsMatched])
        }
      });
    }else setPublicsMatched([])
  }

  function selectPublic(publicR){
    setNewPublicImage(publicR.picture)
    setNewPublicName(publicR.name)
    setPublicsMatched([])
  }

  useEffect(() => { getBolicheData() }, [getBolicheData])

  return(
    <div className="div-buy">
      <div style={{textAlign: 'center'}}>
        <img className="logo-bl" src={faxion} alt="Logo de Faxion" />
      </div>

      <div className="steps" style={{marginLeft: stepNum}}>
        <div className="step">
          <p style={{margin: '0 0 20px 0'}}>¿Cuántas entradas querés?</p>

          <ButtonGroup
            orientation="vertical"
            color="default"
            aria-label="vertical outlined primary button group"
          >
            {[1, 2, 3, 4, 5].map((i) => {
              return <Button
                key={i}
                onClick={()=>{ setCantTickets(i) }}
                classes={cantTickets === i ? { 
                  root: classes.blueBtn,
                  label: classes.blackText
                } : {}}
              >{i}</Button>
            })}

            <Button 
              onClick={()=>{setDialogCantTickets(true)}}
              classes={cantTickets > 5 ? { 
                root: classes.blueBtn,
                label: classes.blackText
              } : {}}
            >{
              cantTickets > 5 ? cantTickets : 'Más'
            }</Button>
          </ButtonGroup>

          <div className="div-price-bt">
            <span>Vas a pagar</span>
            <span>${cantTickets * ticketAmount}</span>
          </div>
        </div>

        <div className="step">
          <Friends
            cantTickets={cantTickets}
            showWarningMessage={false}
          />
        </div>

        <div className="step" style={{overflow: 'scroll'}}>
          <p style={{margin: '0 0 20px 0'}}>¿Ingresás por lista?</p>
          <p className="p-lis">Escribí el nombre de la pública y obtené un descuento del <b>50%</b> entrando antes de las <b>2:30hs</b></p>
          <TextField
            margin="dense"
            id="find-public"
            fullWidth
            placeholder='Ej. Camila García'
            value={newPublicName}
            variant="outlined"
            style={{margin: 0}}
            onChange={searchPublic}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar
                    className={classes.small}
                    alt={`Foto de perfil`}
                    src={newPublicImage}
                  />
                </InputAdornment>
              )
            }}
          />
          <List dense style={{
            padding: 0,
            border: '1px solid rgba(255, 255, 255, 0.23)'
          }}>
            {publicsMatched.map((publicR, i) => {
              return (
                <ListItem 
                  key={`public-${i}`} 
                  button 
                  onClick={()=>{selectPublic(publicR)}}
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.small}
                      alt={`Foto de perfil`}
                      src={publicR.picture}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={publicR.name}/>
                </ListItem>
              );
            })}
          </List>
        </div>

        <div className="step">
          <p style={{margin: '0 0 20px 0'}}>Revisá si está todo bien</p>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableBody>
                <TableRow key='row-1'>
                  <TableCell component="th" scope="row">Día</TableCell>
                  <TableCell align="right">Este jueves</TableCell>
                </TableRow>
                <TableRow key='row-2'>
                  <TableCell component="th" scope="row">Entradas</TableCell>
                  <TableCell align="right">{cantTickets} x ${ticketAmount}</TableCell>
                </TableRow>
                {newPublicName !== '' ?
                  <TableRow key='row-3'>
                    <TableCell component="th" scope="row">Lsta</TableCell>
                    <TableCell align="right">{newPublicName}</TableCell>
                  </TableRow> : <tr></tr>
                }
                <TableRow key='row-4'>
                  <TableCell component="th" scope="row"><b>TOTAL</b></TableCell>
                  <TableCell align="right"><b>${cantTickets * ticketAmount}</b></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {newPublicName !== '' ?
            <div className="div-info">
              <InfoOutlinedIcon/>
              <p className="p-lis">Te devolvemos <b>${cantTickets * ticketAmount * .5}</b> si ingresás antes de las <b>2:30hs</b>.</p>
            </div> : ''
          }
          <div className="div-btn-pay">
            <Button 
              classes={{ root: classes.greenBtn }} 
              variant="contained" 
              // href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=309438352-57d0ed25-2433-48f6-a4c9-b7ff3f5adf99"
              href="/compra-completada"
            >Pagar</Button>
          </div>
        </div>
      </div>

      <MobileStepper
        style={{padding: '20px'}}
        variant="dots"
        steps={4}
        activeStep={activeStep}
        nextButton={
          <Button 
            classes={activeStep === 3 ? {} : { root: classes.blueBtn }} 
            disabled={activeStep === 3} 
            variant={activeStep === 3 ? "outlined" : "contained"} 
            onClick={nextStep}
          >Siguiente</Button>
        }
        backButton={
          <Button variant="outlined" disabled={activeStep === 0} onClick={prevStep} >
            Anterior
          </Button>
        }
      />

      <Dialog 
        open={dialogCantTickets} 
        onClose={()=>{setDialogCantTickets(false)}} 
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogContentText style={{textAlign: 'center'}}>¿Cuántas?</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cant-tickets"
            type="number"
            variant='outlined'
            fullWidth
            style={{textAlign: 'center'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            const cant = parseInt(document.getElementById('cant-tickets').value)
            if(cant > 0) setCantTickets(cant)
            setDialogCantTickets(false)
          }} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

const mapStateToProps = state => {
  return{
    ticketsState: state.tickets
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getBolicheData: () => dispatch(getBolicheData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTickets)