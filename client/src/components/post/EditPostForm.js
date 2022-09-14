import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import { getPost } from '../../actions/post';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const EditPostForm = ({
	getPost,
	auth,
	post: { post, loading },
}) => {
	const { id } = useParams();
  const [text, setText] = useState('');
	
  useEffect(() => {
		getPost(id);
    setText(post.text)
    
	}, [getPost, id, post.text]);

  

	

	const handleChange = (e) => {
		setText(e.target.value);
	};

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
						<div className='body'>
              <textarea name="" id="" cols="30" rows="10" value={text} onChange={handleChange}></textarea></div>
              <div className='post-buttons'>
				<Link to="/posts" className='btn'>
						Back to Forums
					</Link>
					<button className='btn' type='submit'>
						Submit Edit
					</button>
				</div>
					</div>
          
          
				</div>
			</div>
		</div>
	</Fragment>
};

EditPostForm.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(EditPostForm);