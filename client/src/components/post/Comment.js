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
	comment: { _id, text, name, user, commentorPic, date },
	auth,
}) => {

	const linkStyle = {
		color: 'white',
	};

	return (
		<div className='comment'>
			<div className='banner'>
				<Link to={`/profile/${user}`}>
					<div className='poster-img-thumb '>
						<img src={`${commentorPic}?donotusecache`} alt='PH' className='profile-link'></img>
					</div>
				</Link>
				<div className='poster-info'>
					<div>{name}</div>
					<div>{date.substring(0, 10)}</div>
				</div>

				<div className='post-delete'>
					{!auth.loading && user === auth.user._id && (
						<Fragment>
							

							<i
								onClick={(e) => deleteComment(postId, _id)}
								className='fa-solid fa-trash hover-danger'
							>
								{' '}
								X
							</i>
						</Fragment>
					)}
				</div>
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
