import React from 'react'
import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import './images.css'

const Images = ({ id, images: {images}}) => {
  console.log(id)

  const [originalImage, setOriginalImage] = useState(false);
  const [originalImageSrc, setOriginalImageSrc] = useState('');

  const showImage = (e) => {
    if(window.innerWidth > 500){
      setOriginalImage(true)
      setOriginalImageSrc(e.target.src)
      console.log(originalImage)
      console.log(e.target.src)
      }
    
  }

  const closeImage = () => {
    setOriginalImage(false)
    setOriginalImageSrc('')
  }

  return (
    <Fragment>
      { originalImage === true ? <div id='original-image'><img  className="o-image" onClick={() => closeImage()}src={originalImageSrc} alt="PH"></img></div> : null}
    <div>Images</div>
    <br />
    <div className='images-container'>
									{images.filter(image => 
										image.user === id
									).map((image, index) => {
                    // return <p>{image.imageUrl}</p>
										return  (<Fragment key={index}>
                      <div onClick={(e) => showImage(e)}>
                      <img className="image" src={image.imageUrl}    alt="PH" />
                      </div>
                      </Fragment>)
									})
									}
								</div>
                </Fragment>
  )
}

const mapStateToProps = (state) => ({
	images: state.images
});

export default connect(mapStateToProps)(Images)