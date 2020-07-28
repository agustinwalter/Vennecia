import React from 'react'
import './styles/cropper-image.scss'
import Button from '@material-ui/core/Button';

const CropperImage = ({ show, hide, message, prevImage, uploadImage }) => {
  return(
    <div className="div-crop-img" style={{ top: show }}>
      <p>{message}</p>

      <div 
        className="prev-img-cr" 
        style={{backgroundImage: `url(${prevImage})`}}
      >
        <div></div>
      </div>

      <div className="div-btns-crp">
        <Button variant="outlined" color="primary" onClick={()=>{ hide() }}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={()=>{ 
          uploadImage()
        }}>
          Enviar
        </Button>
      </div>
    </div> 
  )
}

export default CropperImage