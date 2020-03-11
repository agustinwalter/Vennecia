import React, { useRef, useEffect } from 'react'
import { animateScroll as scroll} from 'react-scroll';
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

  const [howWorkPosition, setHowWorkPosition] = React.useState('0%')
  const [forDiscoPosition, setForDiscoPosition] = React.useState('0%')
  const [virtualBarPosition, setVirtualBarPosition] = React.useState('0%')
  const [smartAlbumPosition, setSmartAlbumPosition] = React.useState('0%')
  const [pricingPosition, setPricingPosition] = React.useState('0%')
  const [ml1, setMl1] = React.useState('100vw')
  const [ml2, setMl2] = React.useState('100vw')
  const [ml3, setMl3] = React.useState('100vw')
  const [ml4, setMl4] = React.useState('100vw')
  const [ml5, setMl5] = React.useState('100vw')
  const [ml6, setMl6] = React.useState('100vw')
  const [ml7, setMl7] = React.useState('100vw')
  const [ml8, setMl8] = React.useState('100vw')
  const [ml9, setMl9] = React.useState('100vw')
  const [ml10, setMl10] = React.useState('100vw')
  const [ml11, setMl11] = React.useState('100vw')
  const [ml12, setMl12] = React.useState('100vw')
  const [percentage, setPercentage] = React.useState('100')
  const [percVisib, setPercVisib] = React.useState(false)

  const screenHeight = window.innerHeight
  window.addEventListener('scroll', ()=>{
    const a = screenHeight - window.scrollY

    let scroll = howWork.current.offsetTop + a
    if(scroll < screenHeight && scroll >= -200){
      const percent = 100 - ((scroll + 200) / (screenHeight + 200) * 100)
      setHowWorkPosition(`${percent}%`)
    }
    scroll = forDisco.current.offsetTop + a
    if(scroll < screenHeight && scroll >= -200){
      const percent = 100 - ((scroll + 200) / (screenHeight + 200) * 100)
      setForDiscoPosition(`${percent}%`)
    }
    scroll = virtualBar.current.offsetTop + a
    if(scroll < screenHeight && scroll >= -200){
      const percent = 100 - ((scroll + 200) / (screenHeight + 200) * 100)
      setVirtualBarPosition(`${percent}%`)
    }
    scroll = smartAlbum.current.offsetTop + a
    if(scroll < screenHeight && scroll >= -200){
      const percent = 100 - ((scroll + 200) / (screenHeight + 200) * 100)
      setSmartAlbumPosition(`${percent}%`)
    }
    scroll = pricing.current.offsetTop + a
    if(scroll < screenHeight && scroll >= -200){
      const percent = 100 - ((scroll + 200) / (screenHeight + 200) * 100)
      setPricingPosition(`${percent}%`)
    }

    scroll = ref1.current.offsetTop + a; if(scroll < screenHeight) setMl1(0)
    scroll = ref2.current.offsetTop + a; if(scroll < screenHeight) setMl2(0)
    scroll = ref3.current.offsetTop + a; if(scroll < screenHeight) setMl3(0)
    scroll = ref4.current.offsetTop + a; if(scroll < screenHeight) setMl4(0)
    scroll = ref5.current.offsetTop + a; if(scroll < screenHeight) setMl5(0)
    scroll = ref6.current.offsetTop + a; if(scroll < screenHeight) setMl6(0)
    scroll = ref7.current.offsetTop + a; if(scroll < screenHeight) setMl7(0)
    scroll = ref8.current.offsetTop + a; if(scroll < screenHeight) setMl8(0)
    scroll = ref9.current.offsetTop + a; if(scroll < screenHeight) setMl9(0)
    scroll = ref10.current.offsetTop + a; if(scroll < screenHeight) setMl10(0)
    scroll = ref11.current.offsetTop + a; if(scroll < screenHeight) setMl11(0)
    scroll = ref12.current.offsetTop + a; if(scroll < screenHeight) setMl12(0)

    scroll = percentageRef.current.offsetTop + a; if(scroll < screenHeight) setPercVisib(true)

  });

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
            scroll.scrollTo(screenHeight);
          }}>
            Conocé más
          </Button>
        </div>
      </div>
      
      <div className="content">
        <p className="text">
          <b>Vennecia</b> es un sistema de reconocimiento facial, diseñado exclusivamente para boliches, con el que podrás:
          <br/>
          <br/>
        </p>

        <ul className="ul">
          <li ref={ref1} style={{ marginLeft: ml1 }}>
            <PersonRoundedIcon/>
            <p className="text">
              <b>Verificar la edad de las personas:</b> Detectamos si tus clientes tienen la edad suficiente para ingresar al boliche. 
              <a href="#"><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref2} style={{ marginLeft: ml2 }}>
            <ConfirmationNumberRoundedIcon/>
            <p className="text">
              <b>Vender entradas de forma efectiva:</b> La venta de entradas digitales no es novedad, sin embargo, en Vennecia le dimos otra vuelta de tuerca.
              <a href="#"><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref3} style={{ marginLeft: ml3 }}>
            <LocalBarRoundedIcon/>
            <p className="text">
              <b>Vender bebidas de forma efectiva:</b> Revolucioná la venta de tragos con Virtual Bar.
              <a href="#"><b>Conocé más</b></a>
            </p>
          </li>
          <li ref={ref4} style={{ marginLeft: ml4 }}>
            <WatchLaterRoundedIcon/>
            <p className="text">
              <b>Por sobre todo, ofrecer una mejor experiencia:</b> Muchos de tus clientes pasan más de 1 hora haciendo fila, ya sea para ingresar o comprar un trago, con Vennecia, reducí este tiempo a solo minutos.
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
              Empezamos instalando nuestra <b>cámara de reconocimiento</b> en cada puerta de ingreso que tengas. Tranquilo, la cámara, instalación y mantenimiento son <b>totalmente gratis :)</b>
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
              Luego se paran frente a la cámara, nuestro sistema los reconoce, valida su edad y confirma si ya compraron la entrada. 
            </p>
          </li>
          <li ref={ref8} style={{ marginLeft: ml8 }}>
            <p className="li-num">4</p>
            <p className="text">
              Si todo está en orden se les informa mediante una pantalla que ya pueden ingresar. ¡Y listo! El reconocimiento y se realiza en <b>menos de dos segundos</b> por lo que tendrás un flujo constante de personas ingresando.
            </p>
          </li>
        </ul>

        <div className="img-fac-rec" ref={forDisco} style={{ backgroundPositionY: forDiscoPosition }}>
          <div className="shadow sh-top"></div>
          <h3>Diseñado para boliches</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <p className="text">
          Nuestra <b>venta de entradas</b> está pensanda exclusivamente para boliches, estás son algunas opciones que podes ofrecer:
          <br/>
          <br/>
        </p>

        <ul className="ul">
          <li ref={ref9} style={{ marginLeft: ml9 }}>
            <MoneyOffRoundedIcon/>
            <p className="text">
              <b>Ingreso Free</b> o con descuento hasta la hora que quieras (para mujeres, hombres o ambos sexos).
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
              <a href="#"><b>Contactar</b></a>
            </p>
          </li>
        </ul>

        <div className="img-fac-rec" ref={virtualBar} style={{ backgroundPositionY: virtualBarPosition }}>
          <div className="shadow sh-top"></div>
          <h3>Virtual Bar</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <p className="text">
          Tus clientes quieren disfrutar la noche y pasarla bien con sus amigos, no esperar en la barra para comprar un trago.
          <br/>
        </p>
        <p className="text">
          <b>Virtual Bar</b> es nuestra solución a este problema, las personas van a poder comprar las bebidas desde Vennecia y simplemente pasar a buscarlas por la barra, mostrando un <b>código QR.</b>
          <br/>
          <br/>
        </p>

        <div className="img-fac-rec" ref={smartAlbum} style={{ backgroundPositionY: smartAlbumPosition }}>
          <div className="shadow sh-top"></div>
          <h3>Smart Album</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <p className="text">
          ¿Tenés a un fotógrafo? Te ofrecemos <b>Smart Album</b>, un almacenamiento en la nube donde podes subir todas las fotos.
          <br/>
        </p>
        <p className="text">
          Nuestro sistema de <b>Face ID</b> se encarga de reconocer quién aparece en cada imágen y <b>se la envía automáticamente</b> para que pueda repostearla en sus redes.
          <br/>
          <br/>
        </p>

        <div className="img-fac-rec" ref={pricing} style={{ backgroundPositionY: pricingPosition }}>
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
          <b>El futuro llegó, contáctanos para integrar a Vennecia en tu boliche.</b>
          <br/>
          <br/>
        </p>
        <div className="last-button">
          <Button variant="contained" color="primary">
            Contactar
          </Button>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Boliches