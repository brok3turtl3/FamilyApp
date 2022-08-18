import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import Hourglass from '../layout/Hourglass';
import Post from './Post'

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		
			<section className='background'>
				<section className='dark-overlay'>
					<div className='homepage-container'>

						{loading ? (
							<Hourglass />
						) : (
							<Fragment>
								<h1>TEST</h1>
								{/* <PostForm /> */}
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
