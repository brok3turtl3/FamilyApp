import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Hourglass from '../layout/Hourglass';
import { editPost, getPost } from '../../actions/post';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditPostForm.css';

import { EDIT_POST_RESET } from '../../actions/types';

const EditPostForm = ({ editPost, getPost, auth, edit: { post, loading, success, postEdit } }) => {
	const { id } = useParams();
	const [text, setText] = useState('');
	const dispatch = useDispatch()
	const navigate = useNavigate()

	

	useEffect(() => {
		if(postEdit.success === true){
			dispatch({ type: EDIT_POST_RESET})
			navigate('/posts')
			return
		}else	if (!post.text || post._id !== id) {
			getPost(id);
		}
		else{
			setText(post.text)
		}
	}, [dispatch, post, id, getPost, success, postEdit.success]);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		editPost(id, { text });
		setText('');
		
	};

	return loading || post === null ? (
		<Hourglass />
	) : (
		<Fragment>
			<div className='edit-post-form'>
				<div className='overlay'>
					<div className='epf-inner'>
						<div className='epf-post'>
							<form onSubmit={handleSubmit}>
								<div className='subject'>
									<div>{post.name}</div>
									<div>{post.date.substring(0, 10)}</div>
									
								</div>
								<div className='edit-post-field'>
									<textarea
										name=''
										id=''
										cols='30'
										rows='10'
										value={text}
										onChange={handleChange}
									></textarea>
								</div>

								<div className='epf-buttons'>
									<Link to='/posts' className='btn'>
										Back to Forums
									</Link>
									<button className='btn' type='submit'>
										Submit Edit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

EditPostForm.propTypes = {
	getPost: PropTypes.func.isRequired,
	edit: PropTypes.object.isRequired,
	editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	
	auth: state.auth,
	edit: state.edit
});

export default connect(mapStateToProps, { getPost, editPost })(EditPostForm);
