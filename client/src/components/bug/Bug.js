import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import { getBug } from '../../actions/bug';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './Bug.css';

const Bug = ({
	getBug,
	auth,
	bug: { bug, loading },
}) => {
	const { id } = useParams();
	useEffect(() => {
		getBug(id);
	}, [getBug, id]);

	return loading || bug === null ? <Hourglass /> : 
  
  <Fragment>
		<div className='post-container-'>
			<div className='post-overlay'>
				<div className='post-inner'>
					<div className='original-post'>
						<div className='subject'>
							
							<div>{bug.name}</div>
							<div>{bug.date.substring(0,10)}</div>
						</div>
						<div className='body'>{bug.text}</div>
						<div className='post-buttons'></div>
					</div>
          <CommentForm postId={bug._id}/>
					{bug.comments.map(comment => (
						<Comment key={comment._id} comment={comment} bugId={bug._id} />
					))}
          
				</div>
			</div>
		</div>
	</Fragment>
};

Bug.propTypes = {
	getBug: PropTypes.func.isRequired,
	bug: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	bug: state.bug,
	auth: state.auth,
});

export default connect(mapStateToProps, { getBug })(Bug);