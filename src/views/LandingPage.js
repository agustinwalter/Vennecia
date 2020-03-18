import React, { useRef, useEffect, useState } from 'react'
import { scroller, Element, animateScroll as scroll } from 'react-scroll';
import './styles/boliches.scss'
import Button from '@material-ui/core/Button';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ConfirmationNumberRoundedIcon from '@material-ui/icons/ConfirmationNumberRounded';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import virtualBarImage from '../img/virtual-bar.png';
import smartAlbumImage from '../img/smart-album.png';

const LandingPage = () => {
  const howWork = useRef(null);
  const forDisco = useRef(null);
  const virtualBar = useRef(null);
  const smartAlbum = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);

  const [howWorkPosition, setHowWorkPosition] = useState('0%')
  const [forDiscoPosition, setForDiscoPosition] = useState('0%')
  const [virtualBarPosition, setVirtualBarPosition] = useState('0%')
  const [smartAlbumPosition, setSmartAlbumPosition] = useState('0%')
  const [ml5, setMl5] = useState('100vw')
  const [ml6, setMl6] = useState('100vw')
  const [ml7, setMl7] = useState('100vw')
  const [ml9, setMl9] = useState('100vw')
  const [ml10, setMl10] = useState('100vw')
  const [ml11, setMl11] = useState('100vw')

  const scH = window.innerHeight

  useEffect(() => {
    scroll.scrollToTop({
      duration: 0
    });
  }, []);

  useEffect(() => {
    function handleScroll(){
      const a = scH - window.scrollY
  
      let s = howWork.current.offsetTop + a
      if(s < scH && s >= -200) setHowWorkPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = forDisco.current.offsetTop + a
      if(s < scH && s >= -200) setForDiscoPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = virtualBar.current.offsetTop + a
      if(s < scH && s >= -200) setVirtualBarPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      s = smartAlbum.current.offsetTop + a
      if(s < scH && s >= -200) setSmartAlbumPosition(`${(100 * (scH - s)) / (scH + 200)}%`)
      
      s = ref5.current.offsetTop + a; if(s < scH) setMl5(0) 
      s = ref6.current.offsetTop + a; if(s < scH) setMl6(0) 
      s = ref7.current.offsetTop + a; if(s < scH) setMl7(0) 
      s = ref9.current.offsetTop + a; if(s < scH) setMl9(0) 
      s = ref10.current.offsetTop + a; if(s < scH) setMl10(0) 
      s = ref11.current.offsetTop + a; if(s < scH) setMl11(0) 
    }
    window.addEventListener('scroll', handleScroll);
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scH]);

  return(
    <React.Fragment>
      <div className='party-image'>
        <div className="first-text">
          <h2 className="text">¿Salís a bailar?</h2>
          <p className="text">Ingresá con <b>Face ID</b> y olvidate de hacer fila.</p>
        </div>
        <div className="first-button">
          <Button variant="contained" color="primary" onClick={()=>{
            scroller.scrollTo('how-work', {
              duration: 1000,
              delay: 0,
              smooth: true,
              offset: -100,
            });
          }}>
            Conocé más
          </Button>
        </div>
      </div>
      
      <div className="content">
        <Element name="how-work">
          <p className="text">
            <b>Vennecia</b> es un sistema de reconocimiento facial para que ingreses al boliche simplemente con tu cara.
          </p>
        </Element>

        <div className="img-fac-rec" ref={howWork} style={{ backgroundPositionY: howWorkPosition }}>
          <div className="shadow sh-top"></div>
          <h3>¿Cómo funciona?</h3>
          <div className="shadow sh-bot"></div>
        </div>

        <ul className="ul">
          <li ref={ref5} style={{ marginLeft: ml5 }}>
            <PersonRoundedIcon/>
            <p className="text">
              <b>Registrate en Vennecia:</b> Te pedimos una selfie y foto del DNI para validar tu identidad.
            </p>
          </li>
          <li ref={ref6} style={{ marginLeft: ml6 }}>
            <ConfirmationNumberRoundedIcon/>
            <p className="text">
              <b>Comprá la entrada del boliche:</b> Aceptamos todas las tarjetas y dinero en efectivo.
            </p>
          </li>
          <li ref={ref7} style={{ marginLeft: ml7 }}>
            <DoneRoundedIcon/>
            <p className="text">
              <b>Ingresá sin hacer fila:</b> Cuando llegues al boliche acercate a la entrada, nuestra cámara reconocerá tu rostro e ingresarás directamente, sin mostrar tu DNI.*
            </p>
          </li>
          <p className="text">
            *Es posible que antes del ingreso te realicen un cacheo de seguridad.
          </p>
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
          Nuestra <b>venta de entradas</b> está pensanda para boliches. Te ofrecemos:
          <br/>
          <br/>
        </p>

        <ul className="ul">
          <li ref={ref9} style={{ marginLeft: ml9 }}>
            <MoneyOffRoundedIcon/>
            <p className="text">
              <b>Ingreso Free</b> o con descuento hasta cierta hora.
            </p>
          </li>
          <li ref={ref10} style={{ marginLeft: ml10 }}>
            <CakeRoundedIcon/>
            <p className="text">
              Ingreso Free para <b>cumpleañer@s</b> y lista de amig@s.
            </p>
          </li>
          <li ref={ref11} style={{ marginLeft: ml11 }}>
            <FormatListBulletedRoundedIcon/>
            <p className="text">
              Si sos <b>figura pública</b> podrás crear tu lista de invitad@s y cobrar las comisiones desde nuestro sistema.
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
          Olvidate de hacer fila para comprar un trago. Con <b>Virtual Bar</b> vas a poder comprar las bebidas desde la app y pasar a buscarlas por la barra, mostrando un código QR.
        </p>
        <br/>

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
          ¿El boliche tiene un fotógrafo? En <b>Smart Album</b> vas a poder ver todas las fotos de la noche. 
        </p>
        <p className="text">
          Por si fuera poco, nuestro sistema de <b>Face ID</b> reconocerá en cual aparecés y te la enviará automáticamente para que puedas repostearla en tus redes.
        </p>
        <br/>

        <div style={{ textAlign: 'center' }}>
          <img src={smartAlbumImage} alt="Captura de pantalla de Smart Album" width="90%"/>
        </div>
        
        <div className='footer'>
          <p className="text">
            Pronto podrás ingresar al boliche usando Vennecia, mientras tanto te dejamos algunas vías de contacto:
          </p>
          <ul>
            <li>
              <a href="https://www.instagram.com/vennecia_/" target="blank">
                <svg height="36px" width="36px" style={{ fill:'#fff'}} viewBox="0 0 511 511.9" xmlns="http://www.w3.org/2000/svg"><path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0"/><path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0"/><path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0"/></svg>
              </a>
            </li>
            <li>
              <a href="https://wa.me/543412622966" target="blank">
                <svg height="50px" width="50px" style={{ fill:'#fff'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px"><path fillRule="evenodd" d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"></path></svg>
              </a>
            </li>
            <li>
              <a href="mailto:venneciaapp@gmail.com" target="blank">
                <svg height="50px" width="39px" style={{ fill:'#fff'}} id="Capa_1" enableBackground="new 0 0 479.058 479.058" viewBox="0 0 479.058 479.058" xmlns="http://www.w3.org/2000/svg"><path d="m434.146 59.882h-389.234c-24.766 0-44.912 20.146-44.912 44.912v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159l-200.355 173.649-200.356-173.649c1.769-.736 3.704-1.159 5.738-1.159zm0 299.411h-389.234c-8.26 0-14.971-6.71-14.971-14.971v-251.648l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"/></svg>
              </a>
            </li>
          </ul>
          <p className="text v">
            V
          </p>
          <p className="text n">
            Nos vemos luego
          </p>
        </div>

      </div>

    </React.Fragment>
  )
}

export default LandingPage