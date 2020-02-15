import React from 'react'
import './styles/boliches.scss'
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Element, scroller } from 'react-scroll';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './Header'
// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
// Images
import persons from '../img/persons.png';
import dni from '../img/dni-and-tickets.png';
import facial from '../img/facial-recognition.png';
import add_person from '../img/add-person.png';
import camera from '../img/camera.png';
import clock from '../img/clock.png';
import free from '../img/free.png';
import cinco from '../img/cinco.png';
import mercadopago from '../img/mercadopago.png';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
  
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1da1f2',
    }
  },
});

function goToSection(section){
  scroller.scrollTo(section, {
    duration: 500,
    smooth: true
  });
}

const Boliches = () => {
  goToSection('section-one')
  return(
    <React.Fragment>
      <Header />
      <Element name="section-one">
        <div className="section-one">
          <div className="div-background"></div>
          <div className="text">
            <h2>¿Tenés un boliche?</h2>
            <h3>Te ofrecemos un avanzado sistema de reconocimiento facial para controlar el ingreso de personas</h3>
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
            <h3>Un problema que tienen los boliches es el amontonamiento de gente a la hora de ingresar.</h3>
            <div className="horizontal-space"></div>
            <img src={persons} className="image" alt="Fila de personas"></img>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <img src={dni} className="image" alt="Entradas y DNI"></img>
            <div className="horizontal-space"></div>
            <h3 className="rigth">Pedir DNIs y vender entradas en la puerta hace que el ingreso sea lento.</h3>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <h3>Por eso creamos Vennecia, un sistema de reconocimiento facial que se encarga de controlar el ingreso de personas al boliche.</h3>
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
            <img src={add_person} className="image" alt="Persona registrándose"></img>
            <div className="horizontal-space"></div>
            <h3 className="rigth">Las personas se registran en nuestro sistema y compran las entradas online.</h3>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <h3>Al llegar al boliche, una pequeña cámara escanea su rostro y verifica si son mayores de edad. Si todo está en orden, ingresan.</h3>
            <div className="horizontal-space"></div>
            <img src={camera} className="image" alt="Cámara"></img>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <img src={clock} className="image" alt="Reloj"></img>
            <div className="horizontal-space"></div>
            <h3 className="rigth">Cada persona entra al establecimiento en menos de 10 segundos.</h3>
          </div>
          <br></br><br></br><br></br><br></br>
          <div className="center-button">
            <ThemeProvider theme={theme}>
              <Fab variant="extended" size="medium" color="primary" className="button" onClick={goToSection.bind(this, 'section-four')}>
                ¿Cuánto cuesta?
                <ExpandMoreOutlinedIcon />
              </Fab>
            </ThemeProvider>
          </div>
        </div>
      </Element>
      
      <Element name="section-four">
        <div className="section-four">
          <div className="text-and-image">
            <h3>La cámara y la instalación es totalmente gratis :)</h3>
            <div className="horizontal-space"></div>
            <img src={free} className="image" alt="Moneda tachada"></img>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <img src={cinco} className="image" alt="5%"></img>
            <div className="horizontal-space"></div>
            <h3 className="rigth">Luego, cobramos una comisión de solo el 5% por cada entrada vendida.</h3>
          </div>
          <br></br><br></br>
          <div className="text-and-image">
            <h3>También se suma una pequeña comisión de Mercado Pago, el servicio que usamos para procesar los pagos y enviarte el dinero. Encontrá más info en la sección de preguntas frecuentes.</h3>
            <div className="horizontal-space"></div>
            <img src={mercadopago} className="image" alt="Mercado Pago"></img>
          </div>
          <br></br><br></br><br></br><br></br>
          <div className="center-button">
            <ThemeProvider theme={theme}>
              <Fab variant="extended" size="medium" color="primary" className="button" onClick={goToSection.bind(this, 'section-five')}>
                Preguntas frecuentes
                <ExpandMoreOutlinedIcon />
              </Fab>
            </ThemeProvider>
          </div>
        </div>
      </Element>
      
      <Element name="section-five">
        <div className="section-five">
          <h2>Preguntas frecuentes</h2>
          
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>¿Cuánto cobra Mercado Pago?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Mercado Pago tiene un sistema de comisiones que deben ser elegidos por el propietario del boliche. Las opciones son las siguientes:
                <br></br>5,99% + IVA - El dinero se entrega en el momento
                <br></br>3,49% + IVA - El dinero se entrega a los 14 días
                <br></br>1,99% + IVA - El dinero se entrega a los 30 días
                <br></br>El propietario puede cambiar a la opción que desee en cualquier momento.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>¿Quién controla el ingreso de personas?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              Junto a la cámara tiene que haber una persona de seguridad (proporcionada por el boliche). La cámara informará, tanto a él como al usuario si éste puede ingresar o no. En caso de que no pueda ingresar, el seguridad tendrá que apartarlo de la fila para dejar pasar a las demás personas.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>¿Las personas pueden seguir ingresando de la forma tradicional?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Si, al ser un sistema novedoso no queremos imponerlo. Las personas van a poder optar por usarlo o seguir entrando con su DNI como lo hacen habitualmente.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>¿Qué pasará con los promotores?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Implementaremos listas de promotores dentro de nuestro sistema.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>¿En que etapa se encuentra el proyecto?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              El proyecto se encuentra en su etapa final de desarrollo, solo falta terminar algunos detalles y conseguir boliches asociados.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </div>
      </Element>

    </React.Fragment> 
  )
}

export default Boliches