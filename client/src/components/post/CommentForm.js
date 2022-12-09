import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';
import {
	addNotification,
	addWatchlistNotification,
} from '../../actions/notifications';
import './CommentForm.css';

const CommentForm = ({
	addComment,
	postId,
	addNotification,
	addWatchlistNotification,
	user,
	auth,
}) => {
	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addComment(postId, { text });

		if (user !== auth.user._id) {
			addNotification(postId, 'commented on your post');
		}
		addWatchlistNotification(postId, 'commented on a post of interest');
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
					<Link to='/posts' className='btn'>
						Back to Forums
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
	addNotification: PropTypes.func.isRequired,
	addWatchlistNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	addComment,
	addNotification,
	addWatchlistNotification,
})(CommentForm);
