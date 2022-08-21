import React, { Fragment }from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Post = ({ auth, post: { _id, subject, text, name, user, likes, comments, date}}) => {
  return (
    // <div className='small-profile'>
    //   <h2>{subject}</h2>
    //   <h1>{text}</h1>
    //   <h1>{name}</h1>
    // </div>
    <div class="posts">
            <div class="subject">
              <div>SUBJECT : {subject}</div>
              <div>{name}</div>
            </div>
            
            <div class="body">{text}</div>
          </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Post)