import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { editPost, deletePost, addLike, removeLike } from '../../actions/post';
import Linkify from 'react-linkify';


const IndividualPost = ({
	deletePost,
	addLike,
	removeLike,
	auth,
	post: { _id, subject, text, name, user, likes, comments, date, image},
}) => {
	return (
		<div className='posts'>
			<div className='subject'>
				<div>SUBJECT : {subject}</div>
				<div>BY : {name}</div>
				<div>POSTED ON : {date.substring(0,10)}</div>
			</div>
			<Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
        <a target="blank" style={{color: 'yellow'}} href={decoratedHref} key={key}>
            {decoratedText}
        </a>
    )}>
			<div className='body'>{text}</div>
			</Linkify>
			{image ? (<img src={image} alt="ph"></img>) : null}
			<div className='post-buttons'>
				<i className='fa-solid fa-thumbs-up likes'>
					{' '}
					<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
				</i>
				<button className='btn' type='button' onClick={(e) => addLike(_id)}>
					Like
				</button>
				<button className='btn' type='button' onClick={(e) => removeLike(_id)}>
					Unlike
				</button>
				<Link to={`/posts/${_id}`} className='btn' type='button'>
					Comments {comments.length}
				</Link>
				{!auth.loading && user === auth.user._id && (
					<Fragment>
					<Link to={`/posts/edit/${_id}`} className='btn' type='button'>
					Edit
				</Link>
					<button
						className='btn'
						type='button'
						onClick={(e) => deletePost(_id)}
					>
						Delete Post
					</button>
					</Fragment>
				)}
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
	editPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { editPost, deletePost, addLike, removeLike })(
	IndividualPost
);
