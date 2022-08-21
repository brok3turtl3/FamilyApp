import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post' 

const Post = ({
	deletePost,
	auth,
	post: { _id, subject, text, name, user, likes, comments, date },
}) => {
	return (
		<div class='posts'>
			<div class='subject'>
				<div>SUBJECT : {subject}</div>
				<div>{name}</div>
			</div>
			<div class='body'>{text}</div>
			{!auth.loading && user === auth.user._id && (
				<div className='post-buttons'>
				<button className='btn' type='button' onClick={e => deletePost(_id)}>
					Delete Post
				</button>
			</div>
			)}
		</div>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {deletePost})(Post);
