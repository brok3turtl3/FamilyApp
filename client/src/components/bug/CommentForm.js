import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/bug';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';
import { addNotification } from '../../actions/notifications';
import './CommentForm.css';

const CommentForm = ({ addComment, postId, addNotification }) => {
	const [text, setText] = useState('');

	

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addComment(postId, {text});
		console.log(postId);
		//addNotification(postId, 'commented on your post')
		setText('');
	};

	return (
		<Fragment>
			<form className='submit-comment' onSubmit={handleSubmit}>
				
				<div className='comment-field'>
					<label htmlFor='text'>MESSAGE:</label>

					<textarea
						name='text'
						id='text'
						type='text'
						placeholder='Add a comment...'
						value={text}
						onChange={handleChange}
						required
					></textarea>
				</div>
        <Alert />
				<div className='post-buttons'>
				<Link to="/bugs" className='btn'>
						Back to Feedback
					</Link>
					<button className='btn' type='submit'>
						Submit Comment
					</button>
				</div>
			</form>
		</Fragment>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	addNotification: PropTypes.func.isRequired
  
};

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { addComment, addNotification })(CommentForm);