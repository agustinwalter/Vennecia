import React, { useRef, useEffect, useState } from 'react'
import { scroller, Element } from 'react-scroll';
import './styles/boliches.scss'
import Button from '@material-ui/core/Button';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ConfirmationNumberRoundedIcon from '@material-ui/icons/ConfirmationNumberRounded';
import LocalBarRoundedIcon from '@material-ui/icons/LocalBarRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import virtualBarImage from '../img/virtual-bar.png';
import smartAlbumImage from '../img/smart-album.png';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Boliches = () => {
  const howWork = useRef(null);
  const forDisco = useRef(null);
  const virtualBar = useRef(null);
  const smartAlbum = useRef(null);
  const pricing = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);
  const ref12 = useRef(null);
  const percentageRef = useRef(null);

  const [howWorkPosition, setHowWorkPosition] = useState('0%')
  const [forDiscoPosition, setForDiscoPosition] = useState('0%')
  const [virtualBarPosition, setVirtualBarPosition] = useState('0%')
  const [smartAlbumPosition, setSmartAlbumPosition] = useState('0%')
  const [pricingPosition, setPricingPosition] = useState('0%')
  const [ml1, setMl1] = useState('100vw')
  const [ml2, setMl2] = useState('100vw')
  const [ml3, setMl3] = useState('100vw')
  const [ml4, setMl4] = useState('100vw')
  const [ml5, setMl5] = useState('100vw')
  const [ml6, setMl6] = useState('100vw')
  const [ml7, setMl7] = useState('100vw')
  const [ml8, setMl8] = useState('100vw')
  const [ml9, setMl9] = useState('100vw')
  const [ml10, setMl10] = useState('100vw')
  const [ml11, setMl11] = useState('100vw')
  const [ml12, setMl12] = useState('100vw')
  const [percentage, setPercentage] = useState('100')
  const [percVisib, setPercVisib] = useState(false)
  const [showDialogValidation, setShowDialogValidation] = useState(false)

  const scH = window.innerHeight

  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      const a = scH - window.scrollY
  
      let s = howWork.current.offsetTop + a
      if(s < scH && s >= -200) setHowWorkPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = forDisco.current.offsetTop + a
      if(s < scH && s >= -200) setForDiscoPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = virtualBar.current.offsetTop + a
      if(s < scH && s >= -200) setVirtualBarPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = smartAlbum.current.offsetTop + a
      if(s < scH && s >= -200) setSmartAlbumPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = pricing.current.offsetTop + a
      if(s < scH && s >= -200) setPricingPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      
      s = ref1.current.offsetTop + a; if(s < scH) setMl1(0) 
      s = ref2.current.offsetTop + a; if(s < scH) setMl2(0) 
      s = ref3.current.offsetTop + a; if(s < scH) setMl3(0) 
      s = ref4.current.offsetTop + a; if(s < scH) setMl4(0) 
      s = ref5.current.offsetTop + a; if(s < scH) setMl5(0) 
      s = ref6.current.offsetTop + a; if(s < scH) setMl6(0) 
      s = ref7.current.offsetTop + a; if(s < scH) setMl7(0) 
      s = ref8.current.offsetTop + a; if(s < scH) setMl8(0) 
      s = ref9.current.offsetTop + a; if(s < scH) setMl9(0) 
      s = ref10.current.offsetTop + a; if(s < scH) setMl10(0) 
      s = ref11.current.offsetTop + a; if(s < scH) setMl11(0) 
      s = ref12.current.offsetTop + a; if(s < scH) setMl12(0) 
      s = percentageRef.current.offsetTop + a; if(s < scH) setPercVisib(true) 
    });
  }, [scH]);

  useEffect(() => {
    if(percentage > 5 && percVisib){
      setTimeout(() => {
        setPercentage(percentage - 1)
      }, 3);
    }
  }, [percentage, percVisib]);
  
  return(
    <React.Fragment>
      <div className='party-image'>
        <div className="first-text">
          <h2 className="text">¿Tenés un boliche?</h2>
          <p className="text">Agilizá el ingreso de personas con nuestro innovador sistema de <b>Face ID</b>.</p>
        </div>
        <div className="first-button">
          <Button variant="contained" color="primary" onClick={()=>{
            scroller.scrollTo('how-work', {
              duration: 1000,
              delay: 0,
              smooth: true,
              offset: -36,
            });
          }}>
            Conocé más
          </Button>
        </div>
      </div>
      
      <div className="content">
        <Element name="how-work">
          <p className="text">
            <b>Vennecia</b> es un sistema de reconocimiento facial, diseñado exclusivamente para boliches, con el que podrás:
            <br/>
            <br/>
          </p>
        </Element>

        <ul className="ul">
          <li ref={ref1} style={{ marginLeft: ml1 }}>
            <PersonRoundedIcon/>
            <p className="text">
              <b>Verificar la edad de las personas:</b> Detectamos si tus clientes tienen la edad suficiente para ingresar al boliche. 
              <a href="/" onClick={e=>{
                e.preventDefault()
                setShowDialogValidation(true)
              }}><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref2} style={{ marginLeft: ml2 }}>
            <ConfirmationNumberRoundedIcon/>
            <p className="text">
              <b>Vender entradas de forma efectiva:</b> Le dimos otra vuelta de tuerca a la venta de entradas.
              <a href="/" onClick={e => {
                e.preventDefault()
                scroller.scrollTo('for-disco', {
                  duration: 1000,
                  delay: 0,
                  smooth: true,
                  offset: 0,
                });
              }}><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref3} style={{ marginLeft: ml3 }}>
            <LocalBarRoundedIcon/>
            <p className="text">
              <b>Vender bebidas de forma efectiva:</b> Revolucioná la venta de tragos con Virtual Bar.
              <a href="/" onClick={e => {
                e.preventDefault()
                scroller.scrollTo('virtual-bar', {
                  duration: 1000,
                  delay: 0,
                  smooth: true,
                  offset: 0,
                });
              }}><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref4} style={{ marginLeft: ml4 }}>
            <WatchLaterRoundedIcon/>
            <p className="text">
              <b>Sobre todo, ofrecer una mejor experiencia:</b> Tus clientes pasan más de 1 hora haciendo fila, ya sea para ingresar o comprar un trago. Con Vennecia reducí ese tiempo a solo minutos.
            </p>
          </li>
        </ul>

        <div className="img-fac-rec" ref={howWork} style={{ backgroundPositionY: howWorkPosition }}>
          <div className="shadow sh-top"></div>
          <h3>¿Cómo funciona?</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <ul className="ul">
          <li ref={ref5} style={{ marginLeft: ml5 }}>
            <p className="li-num">1</p>
            <p className="text">
              Empezamos instalando nuestra <b>cámara de reconocimiento</b> en cada puerta de ingreso que tengas. <b>Totalmente gratis :)</b>
            </p>
          </li>
          <li ref={ref6} style={{ marginLeft: ml6 }}>
            <p className="li-num">2</p>
            <p className="text">
              Tus clientes llegan al boliche y pasan por el <b>cacheo de seguridad</b> (en caso de que lo hagas).
            </p>
          </li>
          <li ref={ref7} style={{ marginLeft: ml7 }}>
            <p className="li-num">3</p>
            <p className="text">
              Luego se paran frente a la cámara, nuestro sistema los reconoce, valida su edad y confirma si compraron la entrada. 
            </p>
          </li>
          <li ref={ref8} style={{ marginLeft: ml8 }}>
            <p className="li-num">4</p>
            <p className="text">
              Si todo está en orden se les informa mediante una pantalla que pueden ingresar. ¡Y listo! El reconocimiento y se realiza en <b>menos de dos segundos</b> por lo que tendrás un flujo constante de personas ingresando.
            </p>
          </li>
        </ul>

        <Element name="for-disco">
          <div 
            id="for-disco"
            className="img-fac-rec" 
            ref={forDisco} 
            style={{ backgroundPositionY: forDiscoPosition }}
          >
            <div className="shadow sh-top"></div>
            <h3>Diseñado para boliches</h3>
            <div className="shadow sh-bot"></div>
          </div>
        </Element>

        <p className="text">
          Nuestra <b>venta de entradas</b> está pensanda para boliches. Podrás ofrecer:
          <br/>
          <br/>
        </p>

        <ul className="ul">
          <li ref={ref9} style={{ marginLeft: ml9 }}>
            <MoneyOffRoundedIcon/>
            <p className="text">
              <b>Ingreso Free</b> o con descuento hasta la hora que quieras (mujeres, hombres o ambos sexos).
            </p>
          </li>
          <li ref={ref10} style={{ marginLeft: ml10 }}>
            <CakeRoundedIcon/>
            <p className="text">
              Ingreso Free para <b>cumpleañeros</b> y lista de amigos.
            </p>
          </li>
          <li ref={ref11} style={{ marginLeft: ml11 }}>
            <FormatListBulletedRoundedIcon/>
            <p className="text">
              <b>Lista de figuras públicas.</b> Te brindamos un sistema de administración para automatizar los ingresos por lista y pago de comisiones.
            </p>
          </li>
          <li ref={ref12} style={{ marginLeft: ml12 }}>
            <DoneRoundedIcon/>
            <p className="text">
              <b>¡Y todo lo que quieras!</b> Cada boliche es distinto, así que si estas opciones no se ajustan a tus necesidades escribinos y diseñamos algo exclusivo para vos. 
              <a href="https://wa.me/543412622966"><b>Contactar</b></a>
            </p>
          </li>
        </ul>

        <Element name="virtual-bar">
          <div 
            id="virtual-bar"
            className="img-fac-rec" 
            ref={virtualBar} 
            style={{ backgroundPositionY: virtualBarPosition }}
          >
            <div className="shadow sh-top"></div>
            <h3>Virtual Bar</h3>
            <div className="shadow sh-bot"></div>
          </div>
        </Element>

        <p className="text">
          Tus clientes quieren disfrutar la noche y pasarla bien con sus amigos, no esperar en la barra para comprar un trago.
          <br/>
        </p>
        <p className="text">
          <b>Virtual Bar</b> es nuestra solución a este problema, las personas van a poder comprar las bebidas desde Vennecia y simplemente pasar a buscarlas por la barra, mostrando un <b>código QR.</b>
          <br/>
          <br/>
        </p>

        <div style={{ textAlign: 'center' }}>
          <img src={virtualBarImage} alt="Capturas de pantalla de Virtual Bar" width="90%"/>
        </div>

        <div 
          id="smart-album"
          className="img-fac-rec" 
          ref={smartAlbum} 
          style={{ backgroundPositionY: smartAlbumPosition }}
        >
          <div className="shadow sh-top"></div>
          <h3>Smart Album</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <p className="text">
          ¿Tenés un fotógrafo? Te ofrecemos <b>Smart Album</b>, un almacenamiento en la nube donde podrás subir todas las fotos.
          <br/>
        </p>
        <p className="text">
          Nuestro sistema de <b>Face ID</b> reconoce quién aparece en cada imágen y <b>se la envía automáticamente</b> para que pueda repostearla en sus redes.
          <br/>
          <br/>
        </p>

        <div style={{ textAlign: 'center' }}>
          <img src={smartAlbumImage} alt="Captura de pantalla de Smart Album" width="90%"/>
        </div>

        <div 
          id="pricing" 
          className="img-fac-rec" 
          ref={pricing} 
          style={{ backgroundPositionY: pricingPosition }}
        >
          <div className="shadow sh-top"></div>
          <h3>Precios</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <div className="div-price">
          <span className="five-percent" ref={percentageRef}>{percentage}%</span>
          <span>solo eso</span>
        </div>

        <p className="text">
          Te ofrecemos la cámara totalmente gratis, junto con la instalación y el mantenimiento.
          <br/>
        </p>
        <p className="text">
          Luego combramos una pequeña comisión del 5% por cada entrada o bebida vendida desde nuestro sistema. Así de simple.
          <br/>
          <br/>
        </p>
        <p className="text">
          <b>El futuro llegó, contáctanos para integrar Vennecia en tu boliche.</b>
          <br/>
          <br/>
        </p>
        <div className="last-button">
          <Button variant="contained" color="primary" href="https://wa.me/543412622966">
            Contactar
          </Button>
        </div>

      </div>

      <Dialog 
        onClose={()=>{setShowDialogValidation(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={showDialogValidation}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={()=>{setShowDialogValidation(false)}}>
          Validación de edad
        </DialogTitle>
        <DialogContent dividers>
          <ul className="ul-dialog">
            <li>
              Validamos la identidad de cada persona mediante un escaneo de su DNI (ambos lados) y un escaneo facial. 
            </li>
            <li>
              Obtenemos su fecha de cumpleaños para que puedas ofrecerle promociones.
            </li>
            <li>
              Solo vendemos entradas a personas que tengan edad suficiente para ingresar.
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{setShowDialogValidation(false)}} color="primary">
            Entendido
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  )
}

export default Boliches