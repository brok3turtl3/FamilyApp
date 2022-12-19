import React from 'react'
import { Fragment } from 'react';
import { connect } from 'react-redux';
import './images.css'

const Images = ({ id, images: {images}}) => {
  console.log(id)
  return (
    <Fragment>
    <div>Images</div>
    <br />
    <div className='images-container'>
									{images.filter(image => 
										image.user === id
									).map((image, index) => {
                    // return <p>{image.imageUrl}</p>
										return  (<Fragment>
                      <img src={image.imageUrl} key={index} alt="PH" />
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