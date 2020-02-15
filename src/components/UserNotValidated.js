import React from 'react'
import './styles/user-not-validated.scss'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Fab from '@material-ui/core/Fab';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import dniFront from '../img/dni-and-tickets.png';
import dniBack from '../img/dni-and-tickets.png';
import face from '../img/facial-recognition.png';
import faceSmile from '../img/facial-recognition.png';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';

const useStyles = makeStyles({
  mobileStepper: {
    background: 'none'
  },
  dotActive: {
    background: 'white'
  },
  whiteColor: {
    color: 'white'
  },
  stepper: {
    background: 'none',
    width: '90vw',
    padding: 0,
    paddingTop: '5px'
  },
  fab: {
    background: '#1da1f2',
    color: 'white'
  },
  inputFile: {
    display: 'none'
  }
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 18,
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
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: completed ? <DoneRoundedIcon/> : <h2 className='pd-top-2'>1</h2>,
    2: completed ? <DoneRoundedIcon/> : <h2 className='pd-top-2'>2</h2>,
    3: completed ? <DoneRoundedIcon/> : <h2 className='pd-top-2'>3</h2>,
    4: completed ? <DoneRoundedIcon/> : <h2 className='pd-top-2'>4</h2>,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
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

const UserNotValidated = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0)
  const handleNextStep = () => { setActiveStep(prevActiveStep => prevActiveStep + 1) }
  const handleBackStep = () => { setActiveStep(prevActiveStep => prevActiveStep - 1) }

  let stepMessage = 'Necesitamos que subás una foto del lado frontal de tu DNI.'
  let stepImage = dniFront
  switch (activeStep) {
    case 1:
      stepMessage = 'Ahora, una foto del lado trasero de tu DNI.'
      stepImage = dniBack
      break;
    case 2:
      stepMessage = 'Ya casi terminás, subí una selfie tuya. Se tiene que ver tu cara de frente y sin sonreir.'
      stepImage = face
      break;
    case 3:
      stepMessage = '¡La última foto, envianos una selfie sonriendo!'
      stepImage = faceSmile
      break;
    default:
      break;
  }

  return(
    <div className="background">
      <img src={stepImage} className="step-image" alt="Imágen del paso actual"></img>

      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={classes.stepper}
      >
        <Step key='step-1'>
          <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
        </Step>
        <Step key='step-2'>
          <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
        </Step>
        <Step key='step-3'>
          <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
        </Step>
        <Step key='step-4'>
          <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
        </Step>
      </Stepper>

      <p className="step-message">{stepMessage}</p>

      <div className="center-button">
        <input
          accept="image/*"
          className={classes.inputFile}
          id="contained-button-file"
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Fab
            variant="extended"
            size="medium"
            component="span"
            className={classes.fab}
          >
            <ImageRoundedIcon/>
            Subir foto
          </Fab>
        </label>
      </div>

      <MobileStepper
        variant="dots"
        steps={4}
        position="bottom"
        activeStep={activeStep}
        classes={{
          root: classes.mobileStepper,
          dotActive: classes.dotActive
        }}
        nextButton={
          <Button 
            className={classes.whiteColor} 
            size="small" 
            onClick={handleNextStep} 
            disabled={activeStep === 3}
          >
            Siguiente
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button 
            className={classes.whiteColor} 
            size="small" 
            onClick={handleBackStep} 
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Anterior
          </Button>
        }
      />
    </div>
  )
}

export default UserNotValidated