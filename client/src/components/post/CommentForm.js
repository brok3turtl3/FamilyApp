import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

const CommentForm = ({ addComment, postId }) => {
	const [text, setText] = useState('');

	

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addComment(postId, {text});
		setText('');
	};

	return (
		<Fragment>
			<form className='submit-post' onSubmit={handleSubmit}>
				
				<div className='post-field'>
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
				<Link to="/posts" className='btn'>
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
  
};

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { addComment })(CommentForm);