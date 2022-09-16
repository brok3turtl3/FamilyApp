import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteComment } from '../../actions/post'

const Comment = ({postId, deleteComment, comment: { _id, text, name, user, date}, auth}) => {


  

  return (



    <div className='posts'>
						<div className='subject'>
							
							<div>{name}</div>
              <div>{date.substring(0,10)}</div>
						</div>
						<div className='body'>{text}</div>
						{!auth.loading && user === auth.user._id && (
            <div className='post-buttons'>
              <button onClick={() => deleteComment(postId, _id)} type="button">Delete Comment</button>
              </div>
              )}
					</div>
          
  )
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment } )(Comment)