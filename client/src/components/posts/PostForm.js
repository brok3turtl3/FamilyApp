import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SimpleFileUpload from 'react-simple-file-upload';
import './PostForm.css';

const PostForm = ({ addPost }) => {
	const [formData, setFormData] = useState({
		text: '',
		images: [],
	});

	const { text, images } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPost(formData);
		setFormData({ text: '', images: [] });
	};

	function handleFile(url) {
		if(formData.images.length < 5){
		setFormData({ ...formData, images: [...formData.images, url] });
		}
	}

	return (
		<Fragment>
			<form className='submit-post' onSubmit={handleSubmit}>
				<div className='post-field'>
					<label htmlFor='text'>MESSAGE:</label>

					<textarea
						name='text'
						id='text'
						type='text'
						placeholder='What do you what to share?'
						value={text}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<div className='post-pic-section'>
					<div>
						{images.length > 0 ? (
							images.map((image, index) => {
								return <Fragment>
								<div className='post-pic-current'>
									
									<img src={image} alt='PH' className='post-pic-img'></img>
									<div>Current pic</div>
								</div>
							</Fragment>
							})
							
						) : null}
						{ images.length >= 4 ? <p className='alert-danger'>Image limit reached</p> : null}
					</div>
					
					<div>
						<SimpleFileUpload
							apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
							onSuccess={handleFile}
							preview={false}
						/>
						<p>Upload a pic</p>
						<p>Click to browse or drag and drop</p>
						<p>Max of 4 pics</p>
					</div>
				</div>

				<div className='post-buttons'>
					<button className='btn btn-primary' type='submit'>
						Submit Post
					</button>
				</div>
			</form>
		</Fragment>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
