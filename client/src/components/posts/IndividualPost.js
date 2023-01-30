import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Comment from '../post/Comment';
import CommentForm from '../post/CommentForm';

import { connect } from 'react-redux';
import {
	editPost,
	deletePost,
	toggleLike,
	toggleLaugh,
} from '../../actions/post';
import './IndividualPost.css';
import { addNotification } from '../../actions/notifications';

import Linkify from 'react-linkify';

const IndividualPost = ({
	deletePost,
	addNotification,
	toggleLike,

	toggleLaugh,
	index,
	test,
	auth,
	// post: {
	// 	_id,
	// 	subject,
	// 	text,
	// 	name,
	// 	user,
	// 	likes,
	// 	laughs,
	// 	viewed,
	// 	comments,
	// 	date,
	// 	image,
	// 	videoLink,
	// 	video,
	// 	images,
	// 	posterImage,
	// },
}) => {
	const [likeHovering, setlikeHovering] = useState();
	const [laughHovering, setlaughHovering] = useState();
	const [originalImage, setOriginalImage] = useState(false);
	const [originalImageSrc, setOriginalImageSrc] = useState('');
	const [showComments, setShowComments] = useState(false);

	const post = test.posts[index];

	const navigate = useNavigate();

	const handleLikeMouseOver = () => {
		setlikeHovering(true);
	};

	const handleLikeMouseOut = () => {
		setlikeHovering(false);
	};

	const toggleLikeHovering = () => {
		setlikeHovering(!likeHovering);
	};

	const handleLaughMouseOver = () => {
		setlaughHovering(true);
	};

	const handleLaughMouseOut = () => {
		setlaughHovering(false);
	};

	const toggleLaughHovering = () => {
		setlaughHovering(!likeHovering);
	};

	const navigateComments = () => {
		navigate(`/posts/${post._id}`);
	};

	const handleLikeClick = () => {
		toggleLike(post._id);

		if (post.user !== auth.user._id) {
			addNotification(post._id, 'liked your post');
		}
	};

	const handleLaughClick = () => {
		toggleLaugh(post._id);

		if (post.user !== auth.user._id) {
			addNotification(post._id, 'laughed at your post');
		}
	};

	const showImage = (e) => {
		if (window.innerWidth > 500) {
			setOriginalImage(true);
			setOriginalImageSrc(e.target.src);
		}
	};

	const closeImage = () => {
		setOriginalImage(false);
		setOriginalImageSrc('');
	};

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	const linkStyle = {
		color: 'white',
	};

	return (
		<div className='post'>
			{originalImage === true ? (
				<div id='original-p-image'>
					<img
						className='p-image'
						onClick={() => closeImage()}
						src={originalImageSrc}
						alt='PH'
					></img>
				</div>
			) : null}
			<div className='banner'>
				<Link to={`/profile/${post.user}`}>
					<div className='poster-img-thumb '>
						<img
							loading='lazy'
							src={`${post.posterImage}`}
							alt='PH'
							className='profile-link'
						></img>
					</div>
				</Link>
				<div className='poster-info'>
					<div>{post.name}</div>
					<div>{post.date.substring(0, 10)}</div>
				</div>

				<div className='post-delete'>
					{!auth.loading && post.user === auth.user._id && (
						<Fragment>
							<Link
								style={linkStyle}
								to={`/posts/edit/${post._id}`}
								type='button'
							>
								<i className='fa-solid fa-pen hover'></i>
							</Link>

							<i
								onClick={(e) => deletePost(post._id)}
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
				<div className='body'>{post.text}</div>
			</Linkify>
			{post.videoLink ? (
				<ReactPlayer url={post.videoLink} width='100%' />
			) : null}
			{post.video ? (
				<div>
					<video
						src={post.video}
						title='Video for Post'
						width='100%'
						height='auto'
						allow='controls'
						controls
					></video>
				</div>
			) : null}
			{post.image ? (
				<img
					loading='lazy'
					className='post-image'
					src={`${post.image}`}
					alt='ph'
				></img>
			) : null}
			{post.images.length > 0 ? (
				<div className='images-comtainer'>
					{post.images.map((image, index) => {
						return (
							<img
								onClick={(e) => showImage(e)}
								loading='lazy'
								className='post-image'
								key={index}
								src={`${image}`}
								alt='PH'
							></img>
						);
					})}
				</div>
			) : null}

			{/* LIKE AND LAUGHS COUNTERS */}
			<div className='reaction-counters'>
				{post.likes.length > 0 ? (
					<div
						className='likes-counter'
						onClick={toggleLikeHovering}
						onMouseOver={handleLikeMouseOver}
						onMouseOut={handleLikeMouseOut}
					>
						<i className='fa-solid fa-thumbs-up'>
							<span className='fa'>{post.likes.length}</span>
						</i>
					</div>
				) : null}

				{post.laughs.length > 0 ? (
					<div
						className='likes-counter'
						onClick={toggleLaughHovering}
						onMouseOver={handleLaughMouseOver}
						onMouseOut={handleLaughMouseOut}
					>
						<i className='fa-solid fa-face-laugh-squint'>
							<span className='fa'>{post.laughs.length}</span>
						</i>
					</div>
				) : null}
			</div>

			<div className='post-buttons'>
				{likeHovering && (
					<div className='likes-display'>
						{' '}
						{post.likes.map((like) => (
							<div key={like.name}>{like.name}</div>
						))}{' '}
					</div>
				)}
				{laughHovering && (
					<div className='likes-display'>
						{' '}
						{post.laughs.map((laugh) => (
							<div key={laugh.name}>{laugh.name}</div>
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
				<span>
					<i
						className='fa-solid fa-face-laugh-squint likes hover'
						onClick={handleLaughClick}
					>
						<span className='fa'>Laugh</span>
					</i>
				</span>
				{/* <span onClick={navigateComments}> */}
				<span onClick={toggleComments}>
					<i className='fa-solid fa-comments likes hover'>
						{' '}
						<span className='fa'>Comments {post.comments.length}</span>
					</i>
				</span>
			</div>
			<CommentForm
				postId={post._id}
				user={post.user}
				setShowComments={setShowComments}
				showComments={showComments}
			/>

			{showComments && post.comments.length > 0
				? post.comments.map((comment) => (
						<Comment key={comment._id} comment={comment} postId={post._id} />
				  ))
				: null}
		</div>
	);
};

IndividualPost.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addNotification: PropTypes.func.isRequired,
	toggleLike: PropTypes.func.isRequired,
	toggleLaugh: PropTypes.func.isRequired,
	editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	test: state.post,
});

export default connect(mapStateToProps, {
	editPost,
	deletePost,
	addNotification,
	toggleLike,
	toggleLaugh,
})(IndividualPost);
