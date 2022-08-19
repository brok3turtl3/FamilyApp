import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost}) => {

  const [formData, setFormData] = useState({
    subject: '',
    text: ''
  });

  const {
    subject,
    text
  } = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({subject: '', text: ''});

  }

  

  return (
    <Fragment>
      <form className='post-form' onSubmit={handleSubmit}>
							<h3>
								Please enter any information you would like to add or update. Everything is optional.
							</h3>
      <div className='register-field'>
									<label htmlFor='subject'>Subject:</label><br></br>
										
										<input
											name='subject'
											id='subject'
											type='text'
											placeholder='Subject'
											value={subject}
											onChange={handleChange}
											required
										/>
									</div>
                  <div className='register-field'>
									<label htmlFor='text'>Text:</label><br></br>
										
										<textarea
											name='text'
											id='text'
											type='text'
											placeholder='Text'
											value={text}
											onChange={handleChange}
                      required
										></textarea>
									
								</div>
                <button className='btn' type='submit'>
								Submit Post
							</button>
                </form>
    </Fragment>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost})(PostForm)