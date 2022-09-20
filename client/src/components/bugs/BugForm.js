import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBug } from '../../actions/bug';
import SimpleFileUpload from 'react-simple-file-upload';

const BugForm = ({ addBug }) => {
	const [formData, setFormData] = useState({
		subject: '',
		text: '',
		image: ''
	});

	const { subject, text } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBug(formData);
		setFormData({ subject: '', text: '', image: '' });
	};

	function handleFile(url) {
		console.log('The URL of the file is ' + url);
		setFormData({...formData, image: url});
	}

	return (
		<Fragment>
			<form className='submit-post' onSubmit={handleSubmit}>
				{/* <div className='post-field'>
					<label htmlFor='subject'>SUBJECT:</label>

					<input
						name='subject'
						id='subject'
						type='text'
						placeholder='Subject'
						value={subject}
						onChange={handleChange}
						required
					/>
				</div> */}
				<div className='post-field'>
					<label htmlFor='text'>MESSAGE:</label>
					
					<textarea
						name='text'
						id='text'
						type='text'
						placeholder='What do you what to suggest/report?'
						value={text}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<div>
				<SimpleFileUpload
										apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
										onSuccess={handleFile}
									/>
									<p>Upload a pic</p>
									<p>Click to browse or drag and drop</p>
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

BugForm.propTypes = {
	addBug: PropTypes.func.isRequired,
};

export default connect(null, { addBug })(BugForm);