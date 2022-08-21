import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import Hourglass from '../layout/Hourglass';
import Post from './Post'
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		
			<section className='homepage'>
				<section className='posts-overlay'>
					<div className='posts-inner'>

						{loading ? (
							<Hourglass />
						) : (
							<Fragment>
								<div class="title-bar">Forums</div>
          <p class="medium-text">Get to know everyone! Leave a post or comment.</p>
								<PostForm />
								<div className='profiles'>
								{posts.length > 0 ? (
									posts.map((post) => (
										<Post key={post._id} post={post} />
									))
								) : (<h4>No posts found...</h4>)}
								</div>
							</Fragment>
						)}
					</div>
				</section>
			</section>
		
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
