import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
	const [formData, setFormData] = useState({
		subject: '',
		text: '',
	});

	const { subject, text } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPost(formData);
		setFormData({ subject: '', text: '' });
	};

	return (
		<Fragment>
			<form className='submit-post' onSubmit={handleSubmit}>
				<div className='post-field'>
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
				</div>
				<div className='post-field'>
					<label htmlFor='text'>MESSAGE:</label>
					
					<textarea
						name='text'
						id='text'
						type='text'
						placeholder='What do you what to share'
						value={text}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<div className='post-buttons'>
					<button className='btn' type='submit'>
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
