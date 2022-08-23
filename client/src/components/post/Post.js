import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import { getPost } from '../../actions/post';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const Post = ({
	getPost,
	auth,
	post: { post, loading },
}) => {
	const { id } = useParams();
	useEffect(() => {
		getPost(id);
	}, [getPost, id]);

	return loading || post === null ? <Hourglass /> : 
  
  <Fragment>
		<div className='homepage'>
			<div className='posts-overlay'>
				<div className='posts-inner'>
					<div className='posts'>
						<div className='subject'>
							<div>SUBJECT : {post.subject}</div>
							<div>{post.name}</div>
						</div>
						<div className='body'>{post.text}</div>
						<div className='post-buttons'></div>
					</div>
          <CommentForm postId={post._id}/>
          
				</div>
			</div>
		</div>
	</Fragment>
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
