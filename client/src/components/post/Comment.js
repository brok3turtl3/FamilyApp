import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Comment = ({postId, comment: { _id, text, name, user, date}, auth}) => {
  return (
    <div className='posts'>
						<div className='subject'>
							
							<div>{name}</div>
						</div>
						<div className='body'>{text}</div>
						<div className='post-buttons'></div>
					</div>
  )
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { } )(Comment)