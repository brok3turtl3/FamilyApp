import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import Hourglass from '../layout/Hourglass';

const Posts = ({ getPosts, post: {posts, loading}}) => {

  useEffect(() => {
    getPosts();
  }, [getPosts])

	return (<Fragment>
		<section className='background'>
			<section className='dark-overlay'>
				
			</section>
		</section>
	</Fragment>)
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
