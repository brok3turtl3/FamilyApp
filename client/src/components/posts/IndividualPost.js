import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { editPost, deletePost, toggleLike } from '../../actions/post';

import { addNotification } from '../../actions/notifications';
import Linkify from 'react-linkify';

const IndividualPost = ({
	deletePost,
	addNotification,
	toggleLike,
	auth,
	post: {
		_id,
		subject,
		text,
		name,
		user,
		likes,
		viewed,
		comments,
		date,
		image,
		posterImage
	},
}) => {
	const [isHovering, setisHovering] = useState();
	const navigate = useNavigate();

	const handleMouseOver = () => {
		setisHovering(true);
	};

	const handleMouseOut = () => {
		setisHovering(false);
	};

	const toggleHovering = () => {
		setisHovering(!isHovering);
	};

	const navigateComments = () => {
		navigate(`/posts/${_id}`);
	};

	const handleLikeClick = () => {
		toggleLike(_id);
// console.log(auth.user)
// console.log(`Value of user in Post submission ${user}`)
		addNotification( _id, 'liked your post');
	};

	const linkStyle = {
		color: 'white',
	};

	return (
		<div className='posts'>
			<div className='subject'>
				<div className='post-img-thumb'>
					<img src={posterImage} alt='PH'></img>
				</div>

				<div className='poster-info'>
					<div>{name}</div>
					<div>{date.substring(0, 10)}</div>
				</div>

				<div className='post-delete'>
					{!auth.loading && user === auth.user._id && (
						<Fragment>
							<Link style={linkStyle} to={`/posts/edit/${_id}`} type='button'>
								<i className='fa-solid fa-pen hover'></i>
							</Link>

							<i
								onClick={(e) => deletePost(_id)}
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
				<div className='body'>{text}</div>
			</Linkify>
			{image ? <img className='post-image' src={image} alt='ph'></img> : null}
			{likes.length > 0 ? (
				<div
					className='likes-counter'
					onClick={toggleHovering}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<i className='fa-solid fa-thumbs-up'>
						<span className='fa'>{likes.length}</span>
					</i>
				</div>
			) : null}
			<div className='post-buttons'>
				{isHovering && (
					<div className='likes-display'>
						{' '}
						{likes.map((like) => (
							<div key={like.name}>{like.name}</div>
						))}{' '}
					</div>
				)}
				<span>
					<i
						className='fa-solid fa-thumbs-up likes hover'
						onClick={handleLikeClick}
					>
						{' '}
						<span className='fa'>Like</span>
					</i>
				</span>
				<span onClick={navigateComments}>
					<i className='fa-solid fa-comments likes hover'>
						{' '}
						<span className='fa'>Comments {comments.length}</span>
					</i>
				</span>
			</div>
		</div>
	);
};

IndividualPost.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addNotification: PropTypes.func.isRequired,
	toggleLike: PropTypes.func.isRequired,
	editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	editPost,
	deletePost,
	addNotification,
	toggleLike,
})(IndividualPost);
