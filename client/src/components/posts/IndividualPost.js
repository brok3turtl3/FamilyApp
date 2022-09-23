import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { editPost, deletePost, addLike, removeLike } from '../../actions/post';
import Linkify from 'react-linkify';
import { ResultWithContext } from 'express-validator/src/chain';

const IndividualPost = ({
	deletePost,
	addLike,
	removeLike,
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
	},
}) => {
	const [isHovering, setisHovering] = useState();

	const handleMouseOver = () => {
		setisHovering(true);
	};

	const handleMouseOut = () => {
		setisHovering(false);
	};

	const toggleHovering = () => {
		setisHovering(!isHovering);
	};

	const linkStyle = {
		color: 'white'

	}

	return (
		<div className='posts'>
			<div className='subject'>
				
				
				<div className='img-thumb'>
					<img src='' alt='PH'></img>
				</div>

				<div className="poster-info">
					<div>{name}</div>
					<div>{date.substring(0, 10)}</div>
				</div>

				<div className="post-delete">
					{!auth.loading && user === auth.user._id && (
						<Fragment>
<Link style={linkStyle}  to={`/posts/edit/${_id}`}
							
							type='button'>
						<i className="fa-solid fa-pen hover"></i>
</Link>

						<i
							onClick={(e) => deletePost(_id)}
							className='fa-solid fa-trash hover-danger'
						>
							{' '}
							X
						</i></Fragment>
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
			<div className='post-buttons'>
				{isHovering && (
					<div className='likes-display'>
						{' '}
						{likes.map((like) => (
							<div key={like.name}>{like.name}</div>
						))}{' '}
					</div>
				)}
				<i
					className='fa-solid fa-thumbs-up likes hover'
					onClick={(e) => addLike(_id)}
				>
					<span>
						{' '}
						{likes.length > 0 && (
							<span
								onClick={toggleHovering}
								onMouseOver={handleMouseOver}
								onMouseOut={handleMouseOut}
							>
								{likes.length}
							</span>
						)}
					</span>
				</i>

				<button
					className='btn btn-primary'
					type='button'
					onClick={(e) => addLike(_id)}
				>
					Like
				</button>

				<button
					className='btn btn-primary'
					type='button'
					onClick={(e) => removeLike(_id)}
				>
					Unlike
				</button>
				<Link to={`/posts/${_id}`} className='btn btn-primary' type='button'>
					Comments {comments.length}
				</Link>
				
			</div>
		</div>
	);
};

IndividualPost.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	editPost,
	deletePost,
	addLike,
	removeLike,
})(IndividualPost);
