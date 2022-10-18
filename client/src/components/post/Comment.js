import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Linkify from 'react-linkify';
import './Comment.css'

const Comment = ({
	postId,
	deleteComment,
	comment: { _id, text, name, user, date },
	auth,
}) => {
	return (
		<div className='comment'>
			<div className='comment-banner'>
				<div>{name}</div>
				<div>{date.substring(0, 10)}</div>
			</div>
			<Linkify
				componentDecorator={(decoratedHref, decoratedText, key) => (
					<a
						target='blank'
						style={{ color: 'yellow' }}
						href={decoratedHref}
						key={key}
					>
						{decoratedText}
					</a>
				)}
			>
				<div className='comment-body'>{text}</div>
			</Linkify>
			{!auth.loading && user === auth.user._id && (
				<div className='comment-buttons'>
					<button onClick={() => deleteComment(postId, _id)} type='button'>
						Delete Comment
					</button>
				</div>
			)}
		</div>
	);
};

Comment.propTypes = {
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
