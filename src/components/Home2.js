import React from 'react'
import './styles/home.scss'
import Fab from '@material-ui/core/Fab';
// import YouTube from 'react-youtube';
import { Element, scroller } from 'react-scroll';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import persons from '../img/persons.png';
import dni from '../img/dni-and-tickets.png';
import facial from '../img/facial-recognition.png';
import add_person from '../img/add-person.png';
import youtube from '../img/youtube.png';
import google from '../img/google.png';
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import DoneIcon from '@material-ui/icons/Done';
import StepConnector from '@material-ui/core/StepConnector';
import ImageIcon from '@material-ui/icons/Image';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1da1f2',
    }
  }
});

function goToSection(section){
  scroller.scrollTo(section, {
    duration: 500,
    smooth: true
  });
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 20,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(0deg, rgba(23,212,235,1) 0%, rgba(29,161,242,1) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(0deg, rgba(23,212,235,1) 0%, rgba(29,161,242,1) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(0deg, rgba(23,212,235,1) 0%, rgba(29,161,242,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(0deg, rgba(23,212,235,1) 0%, rgba(29,161,242,1) 100%)',
  },
});
const stepperStyles = makeStyles({
  stepper: {
    background: 'none'
  }
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    // 1: <h2>1</h2>,
    1: <DoneIcon />,
    2: <DoneIcon />,
    // 2: <h2>2</h2>,
    3: <h2>3</h2>,
    4: <h2>4</h2>
  };
  return (
    <div
      className={
        clsx(
          classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
          }
        )
      }
    >
      {icons[String(props.icon)]}
    </div>
  );
}
ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const mobileStepperStyles = makeStyles({
  root: {
    background: 'none',
    width: 'calc(100vw - 16px)'
  },
  dotActive: {
    'background-color': 'white'
  },
  button: {
    color: 'white'
  }
});

const imageStyles = makeStyles(theme => ({
  card: {
    background: 'none',
    margin: 'auto'
  },
  media: {
    height: '19vh',
    width: '52vw'
  },
}));

const Home = props => {
  const { auth } = props

  const [activeStep, setActiveStep] = React.useState(2);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  if(!auth.uid){
    // Is logged
    const classes = stepperStyles();
    const mobileStepperClasses = mobileStepperStyles();
    const imageClasses = imageStyles();
    const steps = ['1','2','3','4']
    return(
      <div className="blue-background">
        <h2 className="actual-step">Paso 3 de 4</h2>
        <Stepper 
          className={classes.stepper} 
          alternativeLabel 
          connector={<ColorlibConnector />}
          activeStep={activeStep}
        >
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <img src={facial} className="image" height="80px" alt="Reconocimiento facial"></img>
        <h3>Ahora necesitamos una selfie tuya. Se tiene que ver tu cara, en primer plano y sin sonreir.</h3>

        <div className="blue-button">
          <ThemeProvider theme={theme}>
            <Fab variant="extended" size="medium" color="primary">
              <ImageIcon />
              Subir foto
            </Fab>
          </ThemeProvider>
        </div>

        <MobileStepper
          variant="dots"
          steps={4}
          position="bottom"
          activeStep={activeStep}
          classes={{
            root: mobileStepperClasses.root,
            dotActive: mobileStepperClasses.dotActive,
          }}
          nextButton={
            <Button 
              className={mobileStepperClasses.button} 
              size="small" 
              onClick={handleNext} 
              disabled={activeStep === 3}
            >
              Siguiente
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button 
              className={mobileStepperClasses.button} 
              size="small" 
              onClick={handleBack} 
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Anterior
            </Button>
          }
        />
      </div>
    )
  }else{
    // Is not logged
    return(
      <React.Fragment>
        <Element name="section-one">
          <div className="section-one">
            <div className="div-background"></div>
            <div className="text">
              <h2>¿Salís a bailar?</h2>
              <h3>Creamos Vennecia para solucionar un problema que todas y todos tuvimos alguna vez...</h3>
            </div>
            <div className="fade"></div>
            <ThemeProvider theme={theme}>
              <Fab variant="extended" size="medium" color="primary" className="button" onClick={goToSection.bind(this, 'section-two')}>
                Conocé más
                <ExpandMoreOutlinedIcon />
              </Fab>
            </ThemeProvider>
          </div>
        </Element>
  
        <Element name="section-two">
          <div className="section-two">
            <div className="text-and-image">
              <h3>Seguramente haces fila a la hora de entrar al baile. A nadie le gusta esperar.</h3>
              <div className="horizontal-space"></div>
              <img src={persons} className="image" alt="Fila de personas"></img>
            </div>
            <br></br><br></br>
            <div className="text-and-image">
              <img src={dni} className="image" alt="Entradas y DNI"></img>
              <div className="horizontal-space"></div>
              <h3 className="rigth">También te piden el DNI y en muchos casos compras la entrada en la boletería.</h3>
            </div>
            <br></br><br></br>
            <div className="text-and-image">
              <h3>Todo esto hace lento el ingreso de personas. Por eso creamos Vennecia, un sistema de reconocimiento facial para agilizar este proceso.</h3>
              <div className="horizontal-space"></div>
              <img src={facial} className="image" alt="Reconocimiento facial"></img>
            </div>
            <br></br><br></br><br></br><br></br>
            <div className="center-button">
              <ThemeProvider theme={theme}>
                <Fab variant="extended" size="medium" color="primary" className="button" onClick={goToSection.bind(this, 'section-three')}>
                  ¿Cómo funciona?
                  <ExpandMoreOutlinedIcon />
                </Fab>
              </ThemeProvider>
            </div>
          </div>
        </Element>
  
        <Element name="section-three">
          <div className="section-three">
            <div className="text-and-image">
              <img src={youtube} className="image" alt="Icono de YouTube"></img>
              <div className="horizontal-space"></div>
              <h3 className="rigth">El funcionamiento es muy simple, mirá este video para entenderlo.</h3>
            </div>
            <br></br><br></br>
            <div className="center-video">
              {/* <YouTube className="video" videoId="HiwcBExomNI"/> */}
            </div>
            <br></br><br></br>
            <div className="text-and-image">
              <h3>Ingresá ahora y dejá de perder tiempo en la fila del boliche!</h3>
              <div className="horizontal-space"></div>
              <img src={add_person} className="image" alt="Persona registrándose"></img>
            </div>
            <br></br><br></br><br></br><br></br>
            <div className="center-button">
              <ThemeProvider theme={theme}>
                <Fab variant="extended" size="medium" color="primary" className="button" onClick={props.signIn}>
                  <img src={google} className="g-button-img" alt="Icono de Google"></img>
                  Ingresá con Google
                </Fab>
              </ThemeProvider>
            </div>
          </div>
        </Element>
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return{
    auth: state.firebase.auth    
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signIn: () => dispatch(signIn())
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Home)