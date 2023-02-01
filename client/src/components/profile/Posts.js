import React from 'react'
import { Fragment } from 'react';
import { connect } from 'react-redux';
import IndividualPost from '../posts/IndividualPost';
import './posts.css'

const Posts = ({id, post: {posts}}) => {
  return (
    <Fragment>
    <div>Posts</div>
    <div className="posts-inner">
    {posts.filter(post => post.user === id).map((post) => {
      return <IndividualPost key={post._id} post={post} />
    })}
    </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps)(Posts)