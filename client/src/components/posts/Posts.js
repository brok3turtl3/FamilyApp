import React, { Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Hourglass from '../layout/Hourglass';
import IndividualPost from './IndividualPost';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm';
import './Posts.css';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	
	

	useEffect(() => {
		
		getPosts();
		
		
	}, [getPosts]);

	return (
		<section className='posts-container-'>
			<section className='posts-overlay'>
				<div className='posts-inner'>
					{loading ? (
						<Hourglass />
					) : (
						<Fragment>
							<div className='large'>Forums</div>
							<p className='medium'>
								Get to know everyone! Leave a post or comment.
							</p>
							<PostForm />
							<div className='main-posts'>
								{posts.length > 0 ? (
									posts.map((post, index) => (<div id={post._id} key={post._id}>
												<IndividualPost post={post} index={index}/>
											</div>)
										
									)
								) : (
									<h4>No posts found...</h4>
								)}
							</div>
						</Fragment>
					)}
				</div>
			</section>
		</section>
	);
};

Posts.propTypes = {
	// getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
