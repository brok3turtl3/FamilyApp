import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Linkify from 'react-linkify';
import './Comment.css'

const Comment = ({
	bugId,
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
			{/* {!auth.loading && user === auth.user._id && (
				<div className='comment-buttons'>
					<button onClick={() => deleteComment(bugId, _id)} type='button'>
						Delete Comment
					</button>
				</div>
			)} */}
		</div>
	);
};

Comment.propTypes = {
	auth: PropTypes.object.isRequired,
	bugId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Comment);